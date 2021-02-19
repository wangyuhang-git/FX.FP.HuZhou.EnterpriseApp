import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { ToastService } from 'ng-zorro-antd-mobile'

@Component({
  selector: 'app-project-nav',
  templateUrl: './project-nav.page.html',
  styleUrls: ['./project-nav.page.scss'],
})
export class ProjectNavPage implements OnInit {

  public projectInfo: any;
  constructor(
    private activetedRoute: ActivatedRoute,
    private router: Router,
    private toast: ToastService) { }

  /*
  navList: any[] = [
    { title: "项目详情", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { title: "代办事项", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { title: "整改通知", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { title: "停工通知", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { title: "重大危险源", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { title: "关键岗位", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { title: "视频监控", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { title: "起重机械", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { title: "扬尘噪音", url: "project-detail", icon: "/assets/icon/favicon.png" }];
  
    data = this.navList.map((_val, i) => ({
    icon: this.navList[i].icon,
    text: this.navList[i].title
  }));
  */
  //grid宫格，需要属性text和icon,url是为宫格跳转扩展的
  navList: any[] = [
    { text: "项目详情", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { text: "代办事项", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { text: "整改通知", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { text: "停工通知", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { text: "重大危险源", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { text: "关键岗位", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { text: "视频监控", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { text: "起重机械", url: "project-detail", icon: "/assets/icon/favicon.png" },
    { text: "扬尘噪音", url: "project-detail", icon: "/assets/icon/favicon.png" }];

  ngOnInit() {
    this.activetedRoute.queryParams.subscribe(params => {
      if (params["projectInfo"]) {
        this.projectInfo = JSON.parse(params["projectInfo"]);
      }
    })
  }

  onLeftClick() {
    this.router.navigate(['tabs/tab1']);
  }

  click(e: any) {
    //console.log(e.data.text);
    let navItem: any = this.navList.find(c => c.text == e.data.text);
    if (navItem) {
      if (navItem.text != '项目详情') {
        this.toast.offline('功能开发中！', 1000);
      } else {
        this.router.navigate([navItem.url], {
          queryParams: {
            "projectInfo": JSON.stringify(this.projectInfo)
          }
        });
      }
    }
  }

}
