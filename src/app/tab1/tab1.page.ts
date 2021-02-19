import { Component } from '@angular/core';
import { Router } from '@angular/router';
//导入下来滚动模块和模态弹框
import { IonInfiniteScroll, ModalController, IonRouterOutlet } from '@ionic/angular';
import { ProjectService } from '../services/project/project.service';
import { ProjectListModalComponent } from '../business/project/project-list-modal/project-list-modal.component';
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
  //是否还有超过一页的数据
  public hasMore: boolean = true;

  public searchDic: any = {};

  //public ep_AccountType: string = localStorage.getItem("ep_AccountType");
  //public ep_OrganizationCode: string = localStorage.getItem("ep_OrganizationCode");

  constructor(
    private projectService: ProjectService,
    private storage: Storage,
    private router: Router,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet) {

  }

  ngOnInit(): void {
    this.getData(this.currentPage, null);
  }

  getData(pageIndex: number, e: any) {
    this.storage.get(TOKEN_KEY).then(val => {
      this.LoginInfo = JSON.parse(val);
      this.projectService.getProjectList(pageIndex, this.pageSize, this.LoginInfo.AccountType, this.LoginInfo.OrganizationCode, this.searchDic).then((Response) => {
        //this.list=Response;  
        this.Response = Response;
        this.currentPage++;
        if (e) {
          //每次上滑获取的数据追加，将所有的数据都显示
          this.list = this.list.concat(this.Response.rows);
          //请求完成数据以后告诉ion-infinite-scroll更新数据
          e.target.complete();
          //最后一页的话禁用滚动插件
          if (this.Response.rows.count < this.pageSize) {
            e.target.disabled = true;
            this.hasMore = false;
          }
        } else {
          //只显示当前获取的数据
          this.list = this.Response.rows;
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
    this.router.navigate(['project-nav'], {
      queryParams: {
        "projectInfo": JSON.stringify(projectInfo)
      }
    });
  }

  async showModal() {
    const modal = await this.modalController.create({
      component: ProjectListModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      //presentingElement: await this.routerOutlet.nativeEl,//通过路由呈现模态弹框对象或者用下面的
      //presentingElement: await this.modalController.getTop(),//通过控制器呈现模态弹框对象
      //componentProps: { 'keyWord': '这个是列表页面传递到modal' }//向模态弹框传值
    });
    await modal.present();

    modal.onDidDismiss().then(res => {
      if (res.data.SearchDic) {
        this.searchDic = res.data.SearchDic;
        this.currentPage = 1;
        //console.log(this.searchDic);
        this.getData(this.currentPage, null);
      }
    });
  }

}
