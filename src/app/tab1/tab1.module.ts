import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
//导入自定义模态弹框组件（此次必须，不然模态弹框中没办法使用双向数据绑定）
import { ProjectListModalComponent } from '../business/project/project-list-modal/project-list-modal.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page,ProjectListModalComponent]
})
export class Tab1PageModule { }
