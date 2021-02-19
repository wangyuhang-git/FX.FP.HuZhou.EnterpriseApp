import { Injectable } from '@angular/core';

import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private httpService: CommonService) { }
  
  getDictionaryByCode(dictionaryCode: string) {
    var api = "api/Dictionary";
    return this.httpService.ajaxPost(api, { 'dictionaryCode': dictionaryCode })
  }

}

