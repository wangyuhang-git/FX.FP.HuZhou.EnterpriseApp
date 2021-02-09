import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

////导入tabs组件，引起Type TabsPage is part of the declarations of 2 modules 错误，改为导入组件
//import { TabsPage } from '../tabs/tabs.page';

//导入TabsPageModule模块
import { TabsPageModule } from '../tabs/tabs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    TabsPageModule//导入TabsPageModule
  ],
  declarations: [LoginPage]//注册TabsPage
})
export class LoginPageModule { }
