import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ayah-list',
  templateUrl: './ayah-list.component.html',
  styleUrls: ['./ayah-list.component.scss']
})
export class AyahListComponent implements OnInit {

  @Input()
    surahData: any;
  @Input()
    translations: any;
  
  constructor() { }

  ngOnInit() {
  }

  isSelectedTrans(lang){
    return this.translations.find(item => (item.lang === lang) && item.selected);
  }
}
