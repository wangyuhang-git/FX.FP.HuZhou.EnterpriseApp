import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { TabsPage } from '../tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {//创建路由，跳转至TabsPage
    path: 'tabs',
    component: TabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule { }
