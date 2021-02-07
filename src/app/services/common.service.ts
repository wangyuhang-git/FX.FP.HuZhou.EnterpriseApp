import { Injectable } from '@angular/core';
//引入httpclient
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  //设置一个域名，为了好维护后续读取配置
  public config: any = {
    //域名：
    //domain: 'http://localhost:5001/'http://60.12.107.219:502/api/Student/GetPageStudentsAsync
    domain: 'http://60.12.107.219:502/'
  }


  public list: any = [];

  constructor(public http: HttpClient) {

  }

  GetList() {
    for (let i = 0; i < 10; i++) {
      this.list.push(`我是第${i}条数据`);
    }
    return this.list;
  }

  //封装了一个get请求
  ajaxGet(url) {
    var api = this.config.domain + url;
    return new Promise((resolve, reject) => {
      this.http.get(api).subscribe((response) => {
        resolve(response);
      }, (err) => {
        reject(err);
      })
    })
  }

  //封装了一个post请求 
  ajaxPost(url: String, json: Object) {    
    var api = this.config.domain + url;
    console.log(api);
    return new Promise((resove, reject) => {
      this.http.post(api, json).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }


}
