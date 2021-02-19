import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

//导入字典服务
import { DictionaryService } from '../../../services/dictionary/dictionary.service';

import { Storage } from '@ionic/storage';

const DIC_KEY = "area-dic";

@Component({
  selector: 'app-project-list-modal',
  templateUrl: './project-list-modal.component.html',
  styleUrls: ['./project-list-modal.component.scss'],
  providers: [DictionaryService]//提供字典服务
})
export class ProjectListModalComponent implements OnInit {

  //@Input() keyWord: string;
  keyWord: string = "";
  SEGMENTNAME: string = "";
  CONSTRUCTPERMITNUM: string = "";
  SEGMENTADDRESSAREA: string = "";

  public areaList: any = [];

  constructor(
    private navParams: NavParams,
    private dictionaryService: DictionaryService,
    private storage: Storage
  ) {
    //console.log(this.navParams);

  }

  ngOnInit() {
    //初始化项目所属区域字典值，如果有缓存则读取缓存中的值
    this.storage.get(DIC_KEY).then(res => {
      this.areaList = JSON.parse(res);
      if (!this.areaList) {
        this.dictionaryService.getDictionaryByCode("AddressArea").then(res => {
          this.areaList = res;
          this.storage.set(DIC_KEY, JSON.stringify(this.areaList));
        });
      }
    });


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

