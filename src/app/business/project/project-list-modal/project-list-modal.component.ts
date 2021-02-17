import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-project-list-modal',
  templateUrl: './project-list-modal.component.html',
  styleUrls: ['./project-list-modal.component.scss']
})
export class ProjectListModalComponent implements OnInit {

  //@Input() keyWord: string;
  keyWord: string = "";
  SEGMENTNAME: string = "";
  CONSTRUCTPERMITNUM: string = "";
  SEGMENTADDRESSAREA: string = "";

  constructor(private navParams: NavParams) {
    //console.log(this.navParams);
  }

  ngOnInit() {

  }
  //关闭模态弹框
  dismissModal(type: string) {
    this.navParams.data.modal.dismiss({
      'SearchDic': type == 'search' ? this.getSearch() : ''
    });
  }

  getSearch() {
    let search: any = {};
    search["s_0_SEGMENTNAME|CONSTRUCTPERMITNUM"] = this.keyWord;
    search["s_0_SEGMENTNAME"] = this.SEGMENTNAME;
    search["s_0_CONSTRUCTPERMITNUM"] = this.CONSTRUCTPERMITNUM;
    search.s_1_SEGMENTADDRESSAREA = this.SEGMENTADDRESSAREA;
    return search;
  }

}

