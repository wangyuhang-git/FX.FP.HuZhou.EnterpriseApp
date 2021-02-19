import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectNavPageRoutingModule } from './project-nav-routing.module';

import { ProjectNavPage } from './project-nav.page';

//导入Zorro组件
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectNavPageRoutingModule,
    NgZorroAntdMobileModule
  ],
  declarations: [ProjectNavPage]
})
export class ProjectNavPageModule { }
