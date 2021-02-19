import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

////导入路由守卫
//import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    //canActivate: [AuthGuardService],//设置路由守卫，添加后导致登录要点两次？？？
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },  {
    path: 'project-detail',
    loadChildren: () => import('./business/project/project-detail/project-detail.module').then( m => m.ProjectDetailPageModule)
  },
  {
    path: 'project-nav',
    loadChildren: () => import('./business/project/project-nav/project-nav.module').then( m => m.ProjectNavPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
