import { Component } from '@angular/core';

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

  public list: any;
  public Response: any;

  public LoginInfo: any;

  //public ep_AccountType: string = localStorage.getItem("ep_AccountType");
  //public ep_OrganizationCode: string = localStorage.getItem("ep_OrganizationCode");

  constructor(
    private projectService: ProjectService,
    private storage: Storage) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.storage.get(TOKEN_KEY).then(val => {
      this.LoginInfo = JSON.parse(val);
      this.projectService.getProjectList(this.LoginInfo.AccountType, this.LoginInfo.OrganizationCode).then((Response) => {
        //this.list=Response;  
        this.Response = Response;
        this.list = this.Response.Data;
      })
    });
  }

}
