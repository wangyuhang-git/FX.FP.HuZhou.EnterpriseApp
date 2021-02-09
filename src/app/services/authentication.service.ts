import { Injectable } from '@angular/core';
//导入platform
import { Platform } from '@ionic/angular';
//导入rxjs，支持订阅存储
import { BehaviorSubject } from 'rxjs';

//导入本地缓存
import { Storage } from '@ionic/storage';

/* 导入公用服务 */
import { CommonService } from '../services/common.service';

//导入弹框
import { AlertController, NavController } from '@ionic/angular';

//导入路由
import { Router } from '@angular/router';

//定义常量 token
const TOKEN_KEY = "auth-token";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //定义鉴权状态
  public authenticationState = new BehaviorSubject(false);

  //定义用户信息
  public LoginInfo: any;

  //定义消息
  public msg: string;

  constructor(
    private httpService: CommonService,
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private platform: Platform) {
    /* this.storage.ready().then(() => {

    }); 
    */
    this.platform.ready().then(() => {
      this.CheckToken();
    });
  }

  public Login(username: string, password: string) {
    let api = "api/UserLogin";
    let param = { "userName": username, "userPwd": password };
    this.httpService.ajaxPost(api, param).then((response) => {
      //this.presentAlert(JSON.stringify(response));
      this.LoginInfo = response;
      if (this.LoginInfo.StatusCode != 200) {//登录失败
        if (this.LoginInfo.StatusCode == 400) {
          this.msg = "用户名或密码不正确！";
        } else {
          this.msg = this.LoginInfo.Info;
        }
        this.presentAlert(this.msg);
      } else {//登录成功
        //记录缓存
        /*
        localStorage.setItem("ep_AccountType", this.userInfo.Data.AccountType);
        localStorage.setItem("ep_OrganizationCode", this.userInfo.Data.OrganizationCode);
        */

        this.storage.set(TOKEN_KEY,JSON.stringify(this.LoginInfo.Data)).then(res => {
          this.authenticationState.next(true);
        });

        //跳转至tab页面
        //方式一
        /*this.router.navigate(['/tabs/tab1'],{
          queryParams:{
            "accountType":this.loginInfo.Data.AccountType,
            "organizationCode":this.loginInfo.Data.OrganizationCode
          }
        })*/
        //方式二    
        //this.navCtrl.navigateRoot(['/tabs/tab1']);
        //方式三
        this.router.navigateByUrl('/tabs/tab1')
      }
    })
  }

  Logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  IsAuthenticated() {
    return this.authenticationState.value;
  }

  CheckToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }


  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: '提示信息',
      message: msg,
      buttons: ['确认']
    });
    await alert.present();
  }
}
