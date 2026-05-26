import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { Book } from '../../../../shared/models/book.model';
import { BookCrudService } from '../../services/book.crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalSpinnerLayout } from '../../../../core/layout/global-spinner/global-spinner.layout';
import { DataStore } from '../../data.store';

@Component({
  selector: 'app-book-detail',
  imports: [GlobalSpinnerLayout],
  templateUrl: './book-detail.page.html',
  styleUrl: './book-detail.page.css',
})
export class BookDetailPage /*implements OnInit*/ {
  readonly #booksCrud = inject(BookCrudService);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #store = inject(DataStore);


  // 1. CAPTURE AUTOMATIQUE DE L'URL :
  // Angular lie le paramètre ':id' de la route directement à cet input
  id = input<string | null>(null);

  constructor() {
    // 3. Déclenchement automatique dès que l'ID dans l'URL change
    effect(() => {
      const bookId = this.id();

      if (bookId) {
        // L'URL contient un ID, on charge le livre
        this.loadBook(bookId);
      } else if (!this.book()) {
        // Pas d'ID dans l'URL et pas de livre fourni en direct par la liste
        this.error.set('ID du livre manquant');
      }
    });
  }

  private loadBook(id: string) {
    this.isLoading.set(true);
    this.error.set(null);

    this.#booksCrud.getBookById(id).subscribe({
      next: (book) => {
        this.ibook.set(book);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.error.set('Erreur lors du chargement du livre');
        this.isLoading.set(false);
        setTimeout(() => this.#router.navigate(['/books']), 2000);
      },
    });
  }

  // 1. L'input reçu depuis la liste
  book = input<Book | null>(null);

  // 2. Le signal interne pour le chargement via URL
  ibook = signal<Book | null>(null);

  isLoading = this.#store.isLoading;
  error = signal<string | null>(null);

  // 3. Un signal unique combiné pour le HTML
  // Si book() existe (fourni par la liste), on l'utilise. Sinon, on prend ibook().
  displayBook = computed(() => this.book() || this.ibook());

  /*ngOnInit() {
    const id = this.#route.snapshot.paramMap.get('id');

    if (id) {
      // On est sur la page de détail dédiée (/books/:id)
      this.loadBook(id);
    } else if (!this.book()) {
      // On n'a pas d'ID dans l'URL ET pas de livre fourni par le parent (vrai problème)
      this.error.set('ID du livre manquant');
    }
  }

  private loadBook(id: string) {
    this.isLoading.set(true);
    this.error.set(null);

    this.#booksCrud.getBookById(id).subscribe({
      next: (book) => {
        this.ibook.set(book);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du livre:', err);
        this.error.set('Erreur lors du chargement du livre');
        this.isLoading.set(false);
        setTimeout(() => this.#router.navigate(['/books']), 2000);
      },
    });
  }*/
}
