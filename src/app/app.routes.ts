import { Routes } from '@angular/router';
import { DashboardPage } from './features/dashboard/dashboard.page';
import { NotFoundPageLayout } from './core/layout/not-found-page/not-found-page.layout';

export const routes: Routes = [
  {
    path: 'home',
    component: DashboardPage
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./features/books/book.routes').then((rte)=>rte.booksRoutes),
  },
  {
    path: '',
    component: DashboardPage
  },
  {
    path: '**',
    component: NotFoundPageLayout
  }

];
