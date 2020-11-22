import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  pageTitle: string;
  pageTitleRight: string;
  playPause: string;
  clickCount = 0;
  qseek_player = {
    'play': 1,
    'pause': 2,
    'stop': 3,
    'replay': 4
  }
  audioStatus = 0;
  //@Output() urlInput = new EventEmitter();

  /* navOn: any;
  transOn: any; */
  urlparam: any; /*  = {
    'surah':undefined,
    'ayah':undefined
  } */
  constructor(private route: ActivatedRoute) { 
    this.playPause = 'play-fill';
  }

  clickAudioControl() {
    console.log(this.clickCount);
    this.clickCount++;
    setTimeout(() => {
      /* if (this.clickCount === 1) {
        // single
      } else if (this.clickCount === 2) {
        // double
      } */
      console.log(this.clickCount);
      if(this.clickCount === 1) {
        this.audioStatus = this.audioStatus === this.qseek_player.play ? this.qseek_player.pause : this.qseek_player.play;
      } else {
        this.audioStatus = this.qseek_player.replay;
      }
      
      /* const ayah = {
        'text': this.surahData.audios[indx][0].audio,
        'clicked': this.clickCount
      } */
      
      //this.ayahToRecite.emit(ayah);
      this.clickCount = 0;
    }, 250);
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      const nav = params.nav || params.n;
      if (nav === '0') {
        this.searchEnable = false;
      }

      if (params.vod) {
        this.pageTitle = params.ayah ? 'Today\'s Verse' :
          (params.surah ? 'Surah of the Day' : '');
      }
      this.pageTitleRight = params.ayah ? 'Ayah: ' + params.ayah :
        (params.surah ? 'Surah: ' + params.surah : '');
        
      /* else {
        this.pageTitle = params.ayah ? 'Ayah - ' + params.ayah :
          (params.surah ? 'Surah - ' + params.surah : '');
          this.pageTitleRight = params.ayah ? 'Ayah - ' + params.ayah :
          (params.surah ? 'Surah: ' + params.surah : '');
      } */
      /* this.pageTitle = params.vod ? "Today's Verse" : 
      (params.ayah ? 'Ayah - ' + params.ayah :
      params.surah ? 'Surah - ' + params.surah : ''); */
      //} else {


      this.urlparam = params;
    });

    if (this.urlparam.ayah) {
      this.ayahInput = <string>this.urlparam.ayah;
    } else {
      if (this.urlparam.surah) {
        this.surahNo = <number>this.urlparam.surah;
      }
    }
  }


  surahClicked(surah) {
    // console.log('called');
    console.log(surah);
    this.pageTitle = surah.name;
    this.selectedSurah = surah;
    this.surahNo = surah.number;
  }

  searchClicked(input) {
    console.log(input);
    this.ayahInput = input ? input : '';
    this.pageTitle = 'Ayah:' + this.ayahInput;
  }

  setSurahList(data) {
    this.surahList = data;
    console.log(this.surahList);
  }
}
