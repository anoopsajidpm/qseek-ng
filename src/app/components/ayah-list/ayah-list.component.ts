import { Component, OnInit, Input, Output } from '@angular/core';
//import { IndexService } from '../../services/index.service';
import { EventEmitter } from '@angular/core';

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
  @Output() ayahToRecite = new EventEmitter();

  clickCount = 0;

  constructor() { }

  ngOnInit() {
    
  }

  isSelectedTrans(lang) {
    return this.translations.find(item => (item.lang === lang) && item.selected);
  }

  

  reciteAyah(indx, lang) {
   // console.log(evt);
    //console.log(this.surahData);
    this.clickCount++;
    if (lang === 'ar') {
    setTimeout(() => {
      /* if (this.clickCount === 1) {
        // single
      } else if (this.clickCount === 2) {
        // double
      } */
      const ayah = {
        'text': this.surahData.audios[indx][0].audio,
        'clicked': this.clickCount
      }
      this.ayahToRecite.emit(ayah);
      this.clickCount = 0;
    }, 250);
    }
  }
}
