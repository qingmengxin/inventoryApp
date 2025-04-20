import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'add-item',
    loadComponent: () => import('./add-item/add-item.page').then(m => m.AddItemPage),
  },
  {
    path: 'update-delete',
    loadComponent: () => import('./update-delete/update-delete.page').then(m => m.UpdateDeletePage),
  },
  {
    path: 'privacy-security',
    loadComponent: () => import('./privacy-security/privacy-security.page').then(m => m.PrivacySecurityPage),
  }
];
