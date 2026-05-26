import { Injectable, inject} from '@angular/core';
import { HttpClient,httpResource, HttpResourceRef } from '@angular/common/http';
import {Book} from '../../../shared/models/book.model';
import {environment} from '../../../shared/data-access/environnement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookCrudService {
  readonly #http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/books`;

  // HttpResource pour getAllBooks
  getAllBooks: HttpResourceRef<Book[]> = httpResource<Book[]>(
    () => this.apiUrl
  );

  // Obtenir un livre par ID
  getBookById(id: string): Observable<Book> {
    return this.#http.get<Book>(`${this.apiUrl}/${id}`);
  }

  // Créer un livre
  createBook(book: Book): Observable<Book> {
    return this.#http.post<Book>(this.apiUrl, book);
  }

  // Mettre à jour un livre
  updateBook(id: string, book: Book): Observable<Book> {
    return this.#http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  // Supprimer un livre
  deleteBook(id: string): Observable<void> {
    return this.#http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
