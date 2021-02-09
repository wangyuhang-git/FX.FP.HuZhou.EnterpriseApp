import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';//导入弹框

/* 导入服务 */
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthenticationService]
})
export class LoginPage implements OnInit {

  public msg: string;
  public loginInfo: any;
  public username: string;
  public password: string;
  constructor(
    private authService: AuthenticationService,
    private alertController: AlertController) {

  }

  ngOnInit() {
  }


  /*改为调用鉴权服务登录
  //用户登录
  onLogin() {
    let api = "api/UserLogin";
    let param = { "userName": this.username, "userPwd": this.password };
    this.httpService.ajaxPost(api, param).then((response) => {
      this.loginInfo = response;
      if (this.loginInfo.StatusCode != 200) {//登录失败
        if (this.loginInfo.StatusCode == 400) {
          this.msg = "用户名或密码不正确！";
        } else {
          this.msg = this.loginInfo.Info;
        }
        this.presentAlert(this.msg);
      } else {//登录成功
        //记录缓存
        //localStorage.setItem("ph_IPUrl", ip);
        localStorage.setItem("ep_AccountType", this.loginInfo.Data.AccountType);
        localStorage.setItem("ep_OrganizationCode", this.loginInfo.Data.OrganizationCode);
        //跳转至tab页面
        //this.router.navigate(['/tabs'],{
        //  queryParams:{
        //    "accountType":this.loginInfo.Data.AccountType,
        //    "organizationCode":this.loginInfo.Data.OrganizationCode
        //  }
        //})
        this.router.navigateByUrl('/tabs/tab1')
        //this.navCtrl.navigateRoot(['/tabs/tab1']);
      }
    })
  }
  */

  onLogin() {
    this.authService.Login(this.username, this.password);
  }


  onForgetpwd() {

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
