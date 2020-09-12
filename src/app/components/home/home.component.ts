import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Qseek';
  surahNo = 0;
  surahList: any;
  selectedSurah: any;
  ayahInput: string;
  searchEnable = true;

  /* navOn: any;
  transOn: any; */
  urlparam: any; /*  = {
    'surah':undefined,
    'ayah':undefined
  } */
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      const nav = params.nav || params.n;
      if(nav === '0') {
        this.searchEnable = false;
      }
      //this.urlparam.surah = params['surah']
      //this.urlparam.ayah = params['ayah'];
      this.urlparam = params;
    });
  
    if(this.urlparam.ayah){
      this.ayahInput = <string>this.urlparam.ayah;
    } else {
      if(this.urlparam.surah){
        this.surahNo = <number>this.urlparam.surah;
      }
    }
    

    
  }

  surahClicked(surah) {
    // console.log('called');
    console.log(surah);
    this.selectedSurah = surah;
    this.surahNo = surah.number;
  }

  searchClicked(input) {
    console.log(input);
    this.ayahInput = input ? input : '';
    
  }

  setSurahList(data){
    this.surahList = data;
    console.log(this.surahList);
  }
}
