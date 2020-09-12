import { Component, OnInit, EventEmitter, Output, AfterContentChecked } from '@angular/core';
import { IndexService } from '../../services/index.service';
@Component({
  selector: 'app-surahs',
  templateUrl: './surahList.component.html',
  styleUrls: ['./surahList.component.scss']
})
export class SurahsComponent implements OnInit {

  @Output() surahChange = new EventEmitter();
  @Output()
  surahList = new EventEmitter();
  counter = 0;

  title = 'Surah Index';
  surahs = [];

  //totalAyahs: number;
  constructor (private mySvc: IndexService) { }

  ngOnInit() {
    // this.getSurahList();
    this.getData('surah');
  }

/*   getSurahList(){
    this.getData('surah');
  } */

  /* getSurah(surah, audio = 'ar.alafasy'){
    this.getData('surah/' + surah + '/' + audio);
  } */

  // - event function -- click

  listItemClick(i){
    // console.log('hey I am  clicked in child');
    this.surahChange.emit(this.surahs[i - 1]);
    // console.log(this.surahs[i - 1]); //.number);
  }

  getData(param ) {
    //console.log(param);
    return this.mySvc.fetchData(param)
    .subscribe(
      data => {
       // console.dir(data);
        this.processData(data);
      },
      error => console.log('oops', error)
    );
  }
  processData(data){
    this.surahs = data.data;
    this.surahList.emit(data.data);
  }
}
