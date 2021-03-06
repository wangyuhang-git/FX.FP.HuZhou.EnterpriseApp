import { Injectable } from '@angular/core';

import { CommonService } from '../common.service';

//导入本地缓存
import { Storage } from '@ionic/storage';

//定义常量 token
const TOKEN_KEY = "auth-token";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public LoginInfo: any;
  public Response: any;
  public list: any;

  constructor(
    private storage: Storage,
    private httpService: CommonService
  ) { }



  getProjectList(pageIndex: number, pageSize: number, accountType: string, organizationCode: string, searchDic: any) {
    //获取所属项目清单
    var api = 'api/Project';
    return this.httpService.ajaxPost(api, {
      'PageIndex': pageIndex,
      'PageSize': pageSize,
      'accountType': accountType,
      'organizationCode': organizationCode,
      'SearchDic': searchDic
    })
  }

}
