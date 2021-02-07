import { Component } from '@angular/core';

import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [CommonService]
})
export class Tab1Page {
  
  public list:any;
  public object:any;
  constructor(private commonService:CommonService) { 
    //this.list = commonService.GetList();
  }

  ngOnInit():void{
    this.getData();
  }

  getData(){
    var api='api/Student/GetPageStudentsAsync';
    this.commonService.ajaxPost(api,{PageIndex:2,PageSize:5,SortDic:{'Age':'d'}}).then((Response)=>{
        //this.list=Response;  
        this.object = Response;      
        this.list=this.object.rows;
        console.log(this.list);
    })
  }

}
