import { Component } from '@angular/core';
import { Router } from '@angular/router';
//导入下来滚动
import { IonInfiniteScroll } from '@ionic/angular';
import { ProjectService } from '../services/project/project.service';

//导入本地缓存
import { Storage } from '@ionic/storage';

//定义常量 token
const TOKEN_KEY = "auth-token";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [ProjectService]
})
export class Tab1Page {

  public list: any = [];
  public Response: any;

  public LoginInfo: any;

  //当前页码
  public currentPage: any = 1;
  //每页显示的跳转
  public pageSize = 10;
  public hasMore: boolean = true;

  //public ep_AccountType: string = localStorage.getItem("ep_AccountType");
  //public ep_OrganizationCode: string = localStorage.getItem("ep_OrganizationCode");

  constructor(
    private projectService: ProjectService,
    private storage: Storage,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getData(this.currentPage, null);
  }

  getData(pageIndex: number, e: any) {
    this.storage.get(TOKEN_KEY).then(val => {
      this.LoginInfo = JSON.parse(val);
      this.projectService.getProjectList(pageIndex, this.pageSize, this.LoginInfo.AccountType, this.LoginInfo.OrganizationCode).then((Response) => {
        //this.list=Response;  
        this.Response = Response;
        this.list = this.list.concat(this.Response.rows);
        this.currentPage++;
        if (e) {
          //请求完成数据以后告诉ion-infinite-scroll更新数据
          e.target.complete();
          //最后一页的话禁用滚动插件
          if (this.Response.rows.count < this.pageSize) {
            e.target.disabled = true;
            this.hasMore = false;
          }
        }
      })
    });
  }


  loadData(e) {
    //console.log(this.currentPage);
    this.getData(this.currentPage, e);
  }

  onClick(projectInfo: any) {
    //console.log(projectInfo);
    this.router.navigate(['project-detail'], {
      queryParams: {
        "projectInfo": JSON.stringify(projectInfo)
      }
    });
  }
}
