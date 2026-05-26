import { Component, computed, inject, input, InputSignal } from '@angular/core';

import { TableModule } from 'primeng/table';
import { BookCrudService } from '../../services/book.crud.service';
import { BookDetailPage } from '../book-detail/book-detail.page';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { GlobalSpinnerLayout } from '../../../../core/layout/global-spinner/global-spinner.layout';
import { Dialog } from 'primeng/dialog';
import { BookFormPage } from '../book-form/book-form.page';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book, BookForm } from '../../../../shared/models/book.model';
import { DataStore } from '../../data.store';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  startWith,
  take,
  timeout,
} from 'rxjs';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { HighlightPipe } from '../../../../shared/pipes/highligh.pipe';
import { AsyncPipe } from '@angular/common';
import { InputText } from 'primeng/inputtext';


@Component({
  selector: 'app-book-list',
  imports: [
    TableModule,
    Button,
    GlobalSpinnerLayout,
    Dialog,
    BookFormPage,
    Toast,
    AsyncPipe,
    HighlightPipe,
    ReactiveFormsModule,
    InputText,
  ],
  providers: [DataStore], // <-- Fournit l'instance pour ce composant et ses enfants !
  templateUrl: './book-list.page.html',
  styleUrl: './book-list.page.css',
})
export class BookListPage {
  readonly #router = inject(Router);
  readonly #booksCrud = inject(BookCrudService);
  readonly #store = inject(DataStore);
  readonly #toast: MessageService = inject(MessageService);

  // HttpResourceRef retourne les données
  booksListRes = this.#booksCrud.getAllBooks;

  // Signal computed pour afficher la liste
  booksList = computed(() => this.booksListRes.value() ?? []);

  isLoading = this.#store.isLoading;

  isDialogVisible = false;

  // Autorise : Lettres (tous accents inclus), espaces, tirets et apostrophes
  authorRegex = /^[.\p{L}\s'-]+$/u;
  // Autorise : Lettres (avec accents), Chiffres, espaces, tirets et apostrophes
  titleRegex = /^[.\p{L}\p{N}\s'-]+$/u;

  isEditMode = false;
  currentBookId?: string;

  // 1. Le contrôle de la barre de recherche
  searchControl = new FormControl('');

  searchTerm$: Observable<string> = this.searchControl.valueChanges.pipe(
    startWith(''),
    map((value) => (value ? value.trim().toLowerCase() : '')),
    debounceTime(300),
    distinctUntilChanged(),
  );

  // 3. L'Observable final combiné qui filtre les livres
  // Il va réagir dès que la liste change OU dès que l'utilisateur tape une lettre
  filteredBooks$: Observable<Book[]> = this.searchTerm$.pipe(
    map((term) => {
      const allBooks = this.booksList();
      if (!term) return allBooks;

      // Filtrer les livres dont le titre ou l'auteur correspond
      return allBooks.filter(
        (book) =>
          book.title?.toLowerCase().includes(term) || book.author?.toLowerCase().includes(term),
      );
    }),
  );

  bookForm: FormGroup<BookForm> = new FormGroup<BookForm>({
    title: new FormControl('', [Validators.required, Validators.pattern(this.titleRegex)]),
    author: new FormControl('', [Validators.required, Validators.pattern(this.authorRegex)]),
    isbn: new FormControl(undefined),
    publisher: new FormControl(undefined),
    publicationDate: new FormControl(undefined),
    pages: new FormControl(undefined),
    language: new FormControl(undefined),
    description: new FormControl(undefined),
    category: new FormControl(undefined),
    rating: new FormControl(undefined),
    available: new FormControl(undefined),
    createdAt: new FormControl(undefined),
  });

  gotToDetail(bookId: string) {
    this.#router.navigate([`/books/${bookId}`]);
    console.log('click');
  }

  // Pour ajouter un livre
  addBook() {
    this.isDialogVisible = true;
  }

  // 2. Déclencher la Modification (Pré-remplir le formulaire)
  editBook(book: Book, event: Event) {
    event.stopPropagation(); // Évite de déclencher le clic de la carte (goToDetail)
    this.isEditMode = true;
    this.currentBookId = book.id;

    // On injecte les données du livre dans le formulaire
    this.bookForm.patchValue(book);
    this.isDialogVisible = true;
  }

  onSave() {
    console.log('onsave appelé');
    // Optionnel : On peut forcer la validation visuelle si l'utilisateur clique sur enregistrer
    this.bookForm.markAllAsTouched();

    if (this.bookForm.invalid) {
      console.log('invalid');
      return; // On arrête tout si le formulaire n'est pas valide
    }

    this.isLoading.set(true);

    // Envoi des données au service de l'API
    const bookData = this.bookForm.value;
    // On choisit la bonne requête HTTP selon le mode
    const request$ =
      this.isEditMode && this.currentBookId
        ? this.#booksCrud.updateBook(this.currentBookId, bookData) // Votre méthode de mise à jour
        : this.#booksCrud.createBook(bookData);

    request$
      .pipe(
        filter((bookRes: Book) => !!bookRes?.id),
        timeout(5000),
        take(1),
      )
      .subscribe({
        next: (book: Book) => {
          this.#toast.add({
            severity: 'success',
            summary: 'Book added',
            detail: `The book titled ${book.title} by ${book.author} was added`,
            life: 3000,
          });
        },
        error: (err) => {
          console.error("L'enregistrement a échoué :", err);
          this.#store.isLoading.set(false);
        },
        complete: () => {
          console.log('complete');
          this.#store.isLoading.set(false);
          this.isDialogVisible = false;
          this.bookForm.reset(); // On vide le formulaire pour la prochaine fois
          this.booksListRes.reload(); // Recharge la liste en tâche de fond
        },
      });
  }

  // 4. Supprimer un livre
  deleteBook(bookId: string, event: Event) {
    event.stopPropagation(); // Évite d'ouvrir le détail au clic sur supprimer

    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      this.isLoading.set(true);

      this.#booksCrud
        .deleteBook(bookId)
        .pipe(take(1), timeout(5000))
        .subscribe({
          next: () => {
            this.#toast.add({
              severity: 'info',
              summary: 'Livre supprimé',
              detail: 'Le livre a été retiré de la bibliothèque.',
              life: 3000,
            });
          },
          error: () => this.isLoading.set(false),
          complete: () => {
            this.#store.isLoading.set(false);
            this.booksListRes.reload(); // Rafraîchit la liste
          },
        });
    }
  }

  onCancel() {
    this.isDialogVisible = false;
  }
}
