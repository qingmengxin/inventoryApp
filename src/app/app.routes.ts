import { Routes } from '@angular/router';
import { HomePage } from './home/home.page'; // 导入 Home 页面组件
import { AddItemPage } from './add-item/add-item.page'; // 导入其他页面组件
import { UpdateDeletePage } from './update-delete/update-delete.page';
import { PrivacySecurityPage } from './privacy-security/privacy-security.page';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage, // Home 页面组件
  },
  {
    path: 'add-item',
    component: AddItemPage, // 添加商品页
  },
  {
    path: 'update-delete',
    component: UpdateDeletePage, // 更新/删除页
  },
  {
    path: 'privacy-security',
    component: PrivacySecurityPage, // 隐私与安全页
  },
  {
    path: '', // 默认重定向到 Home
    redirectTo: 'home',
    pathMatch: 'full',
  },
];