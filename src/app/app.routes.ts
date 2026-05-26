import { Routes } from '@angular/router';
import { DashboardPage } from './features/dashboard/dashboard.page';
import { NotFoundPageLayout } from './core/layout/not-found-page/not-found-page.layout';

export const routes: Routes = [
  {
    path: 'home',
    component: DashboardPage
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
