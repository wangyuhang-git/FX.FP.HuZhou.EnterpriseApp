import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectNavPage } from './project-nav.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectNavPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectNavPageRoutingModule {}
