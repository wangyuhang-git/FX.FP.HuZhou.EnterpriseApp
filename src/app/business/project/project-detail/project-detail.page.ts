import { Component, OnInit } from '@angular/core';

//导入路由参数
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss']
})
export class ProjectDetailPage implements OnInit {

  public projectInfo: any;

  public change: string = "项目概况";

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //参数快照的方式获取传递的数据
    //this.activeRoute.snapshot.queryParams["projectInfo"];
    //用参数订阅的方式获取传递的数据
    this.activeRoute.queryParams.subscribe(params => {
      this.projectInfo = JSON.parse(params['projectInfo']);

      //console.log(this.projectInfo);
    });
  }

  /*
  segmentChanged(e: any) {
    console.log(e);
    this.change = e.value;
  }
  */
  //返回
  onLeftClick() {
    this.router.navigate(['project-nav'], {
      queryParams: {
        "projectInfo": JSON.stringify(this.projectInfo)
      }
    });
  }
  //切换
  choose(e: any) {
    this.change = e.value;
  }
}
