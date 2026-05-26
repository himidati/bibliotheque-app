import { Routes } from '@angular/router';
import { BookListPage } from './pages/book-list/book-list.page';
import { BookDetailPage } from './pages/book-detail/book-detail.page';
export const booksRoutes: Routes = [
  {
    path : '',
    component: BookListPage,
    pathMatch: 'full'
  },
  {
    path:':id',
    component: BookDetailPage,
    pathMatch: 'full'
  },
]
