import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';
// import { ConsoleReporter } from 'jasmine';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit, OnChanges {

  @Input()
  selectedSurah: any;
  surah: number;

  @ViewChild('qseekPlayer') qseekPlayer: ElementRef;
  // @Input()
  // details: any;

  @Input()
  ayah: string;

  // @Input() audio: boolean;
  // @Input()

  editions = [];

  audioSource = '';
  audioTime = '';
  // @Input()
  // translations: string;
  // audio: string;

  urlString = '';

  surahData: any;
  ayahData = [];
  translations = [];

  @Input()
  urlParams: any;


  newUrl: string;
  navOn: any;
  transOn: any;

  surahAudio = [];
  currentTrack = 0;

  showDetails = false;

  totalAyahs = 6236; // total number os ayahs in holy quran;
  constructor(private mySvc: IndexService, private router: Router) {
    // this.ayah = '2:203';
    // let el = document.getElementById('trans-en'); // + <string>ed.split('.')[0]);
    // console.log(el);
    this.editions = [
      'quran-simple-enhanced',
      'en.asad',
      'ml.abdulhameed',
      'ar.alafasy'
    ];


  }

  
  reciteSurah() {
      
      let index = this.currentTrack;
      console.log(this.surahAudio.length);
      this.changeAudioSrc(this.surahAudio[index]);
      
    
    this.qseekPlayer.nativeElement.onended = () => {
      console.log(this.surahAudio);
      index++;
      if (index < this.surahAudio.length) {
        //index++;
        this.currentTrack = index;
        this.changeAudioSrc(this.surahAudio[index]);
        //index++;
       // this.currentTrack = index >= this.surahAudio.length ? 0 : index;
      } else {
        this.currentTrack = 0;
      }
    };
  }

  changeAudioSrc(src, clickCount?){
    if (this.audioSource !== src) {
      this.audioSource = src;
      this.qseekPlayer.nativeElement.load();
      this.audioTime = '';
    }
    /* if (this.qseekPlayer.nativeElement.paused) {
      this.qseekPlayer.nativeElement.play();
    } */
    //console.log(this.surahAudio);
    if (this.qseekPlayer.nativeElement.paused) {
      // console.log(dur);
       this.qseekPlayer.nativeElement.currentTime = this.audioTime;
       this.qseekPlayer.nativeElement.play();
     } else {
       //console.log(this.qseekPlayer.nativeElement.currentTime);
       this.audioTime = clickCount && clickCount === 2 ? '' : this.qseekPlayer.nativeElement.currentTime;
       this.qseekPlayer.nativeElement.pause();
     }
  }

  reciteAyah(srcData) {
    console.log(srcData);
    this.changeAudioSrc(srcData.text, srcData.clicked);
  }
  // http://api.alquran.cloud/v1/ayah/262/editions/quran-uthmani,en.asad,en.pickthall

  ngOnInit() {
    // console.log(this.urlParams.n);

    // this.surah = this.selectedSurah ? this.selectedSurah.number : 0;



    if (this.urlParams) {
      // if url parameters there
      this.surah = this.urlParams.surah ? this.urlParams.surah : 0;
      // if (!this.surah) {
      this.ayah = !this.surah && this.urlParams.ayah ? this.urlParams.ayah : undefined;
      // }
      // }
      this.navOn = <number>(this.urlParams.nav || this.urlParams.n);
      this.transOn = this.urlParams.trans || this.urlParams.t ? this.urlParams.trans || this.urlParams.t : undefined;

    }
    // if (this.navOn === undefined ) {
    this.navOn = this.navOn === undefined || <string>this.navOn === '1' ? true : false;
    // }

    /* if (this.urlParams && (this.urlParams.trans || this.urlParams.t)) {
      this.transOn = this.urlParams.trans || this.urlParams.t;
    } else {
      this.transOn = undefined;
    } */


    // if (this.surah || this.ayah) {
    this.initEditions();
    // }
    // this.isInTrans('en');
    this.getData();

  }

  initEditions() {
    // this.navOn = this.urlparam && this.urlparam.nav ? this.urlparam.nav : undefined;
    // this.transOn = this.urlparam && this.urlparam.trans ? this.urlparam.trans : undefined;
    let lang;
    if (this.editions) {
      this.editions.forEach((ed) => {
        if (<string>(ed).includes('.')) {
          lang = <string>(ed).split('.')[0];
          if (lang !== 'ar') {
            // el = document.getElementById('trans-' + <string>(ed).split('.')[0]);
            // console.log(this.urlParams.trans);
            this.translations.push({
              'edition': ed,
              'lang': <string>ed.split('.')[0],
              // tslint:disable-next-line: max-line-length
              'selected': this.transOn && (this.transOn.toUpperCase() === lang.toUpperCase() || this.transOn.toUpperCase() === 'ALL') ? true : false
            });
          }
        }
      });
      console.log(this.translations);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(changes);
    if (changes.selectedSurah) {
      if (changes.selectedSurah.currentValue) {
        this.surah = this.selectedSurah ? this.selectedSurah.number : 0;
        this.router.navigate(['/'], { queryParams: { surah: this.surah } });
      }
    } else {
      if (changes.ayah) {
        if (changes.ayah.currentValue) {
          this.router.navigate(['/'], { queryParams: { ayah: this.ayah } });
        }
      }
    }


    //this.surah = this.selectedSurah ? this.selectedSurah.number : 0;

    console.log(this.surah);
    if (this.surah || this.ayah) {
      // this.initDetails();
      this.getData();
    }
  }


  setParams() {
    let urltxt = '';
    if (this.ayah) {
      this.newUrl = '/?ayah=';
      urltxt = 'ayah/' + this.ayah + '/';
    } else {
      this.newUrl = '/?surah=';
      urltxt = 'surah/' + (this.surah > 0 ? this.surah : 1) + '/';
    }

    urltxt += 'editions/';


    if (this.editions) {
      urltxt += this.editions; // .quran + ',' + this.editions.trans + ',' + this.editions.audio;
    }

    // console.log(urltxt);
    return urltxt;
  }

  isSelectedTrans(lang) {
    // console.log(lang);
    return this.translations.find(item => (item.lang === lang) && item.selected);
  }
  /*
  q_edition_ar: 'quran-simple-enhanced',
      q_edition_trans: ['en.asad', 'ml.abdulhameed'], //'en.pickthall',
      q_edition_audio: 'ar.alafasy',
  cachedFetch('https://api.alquran.cloud/v1/ayah/' + filter + '/editions/' + q_editions)

  // http://api.alquran.cloud/v1/surah/262/editions/quran-simple-enhanced,en.asad,ml.abdulhameed,ar.alafasy
    */
  transClick(event) {
    /* console.log(event.target.value);
    console.log(this.translations);
  */
    this.translations.forEach((trans, i) => {
      if (trans.lang === event.target.value) {
        trans.selected = event.target.checked;
      }
    });


    console.log(this.translations);

  }


  // gets data through service call
  getData() {
    this.urlString = this.setParams();
    console.log(this.urlString);
    this.surahData = new Array();
    return this.mySvc.fetchData(this.urlString)
      .subscribe(
        data => {
          console.log(data);
          // this.surahData.push(data);
          this.processData(data);
        }, error => {
          console.log('Error' + error);
        }
      );
  }

  processData(data) {
    const sData = data.data;
    console.log(this.selectedSurah);
    const surahDetails = this.ayah ? sData[0].surah : sData[0];

    surahDetails.ayahInfo = {};
    console.log(surahDetails);

    if (this.ayah) {
      surahDetails.ayahInfo = {
        'hizbQuarter': sData[0].hizbQuarter,
        'juz': sData[0].juz,
        'manzil': sData[0].manzil,
        'number': sData[0].number,
        'numberInSurah': sData[0].numberInSurah,
        'page': sData[0].page,
        'ruku': sData[0].ruku,
        'sajda': sData[0].sajda
      };
    }
    // console.log(sData[0].name);
    // console.log(surahDetails);
    // const len = sData.length; // number of editions retreived
    const totAyahs = (this.ayah ? 1 : sData[0].ayahs.length);
    // console.log(totAyahs);
    const surah = {
      'surahInfo': surahDetails,
      'audio': '',
      'mp3': [],
      'ayahs': new Array(totAyahs),
      'audios': new Array(totAyahs)
    };
    const ayah = new Array(totAyahs);
    const audio = new Array(totAyahs);
    for (let i = 0; i < totAyahs; i++) {
      const temp = [];
      const audioTemp = [];
      let surah_ayah;
      sData.forEach((item) => {
        // console.log(item);
        surah_ayah = (this.ayah ? item : item.ayahs[i]);
        // console.log(surah_ayah);
        if (item.edition.format === 'audio') {
          audioTemp.push({
            'audio': surah_ayah.audio,
            'mp3': surah_ayah.audioSecondary
          });
          surah.audio = surah_ayah.audio;
          surah.mp3 = surah_ayah.audioSecondary;
        } else {
          temp.push({
            'number': i + 1,
            'verse': surah_ayah.text,
            'lang': item.edition.language
          });
        }
      });
      ayah[i] = temp;
      audio[i] = audioTemp;
    }
    surah.ayahs = ayah;
    surah.audios = audio;
    this.surahAudio = this.surah ? this.getPlaylist(audio) : undefined;
    this.audioSource = audio[0][0].audio; // initialize with first ayah audio
    // console.log(surah);
    this.surahData = surah;

    console.log(this.surahData);
  }

  getPlaylist(audios) {
    const playlist = [];
    console.log(audios);
    audios.forEach(item => {
      playlist.push(item[0].audio);
    });
    return playlist;
  }

  navBtnClick(evt) {
    const btn = evt.target.value; // || evt;
    let limit = 114;
    console.log(this.surahData);
    let currentNum = this.surahData.surahInfo ? this.surahData.surahInfo.number : undefined;
    // this.urlParam = '/?surah=';
    if (this.ayah) {
      // this.urlParam = '/?ayah=';
      limit = this.surahData.surahInfo ? this.surahData.surahInfo.numberOfAyahs : undefined;
      currentNum = this.surahData.surahInfo ? this.surahData.surahInfo.ayahInfo.numberInSurah : undefined;
    }

    if (btn === 'back') {
      if (currentNum > 1) {
        if (this.ayah) {
          this.ayah = this.surahData.surahInfo.number + ':' + (<number>this.surahData.surahInfo.ayahInfo.numberInSurah - 1);
          // this.urlParam += this.surahData.surahInfo.surahNo + ':' + (<number>this.surahData.surahInfo.ayahInfo.numberInSurah - 1);
          this.router.navigate(['/'], { queryParams: { ayah: this.ayah } });
        } else {
          this.surah--;
          this.router.navigate(['/'], { queryParams: { surah: this.surah } });
          // this.urlParam += <number>(this.surahData.surahInfo.surahNo) - 1;
        }
      }
    }
    if (btn === 'next') {
      if (currentNum < limit) {
        if (this.ayah) {
          this.ayah = this.surahData.surahInfo.number + ':' + (<number>this.surahData.surahInfo.ayahInfo.numberInSurah + 1);
          this.router.navigate(['/'], { queryParams: { ayah: this.ayah } });
          // this.urlParam += this.surahData.surahInfo.surahNo + ':' + (<number>this.surahData.surahInfo.ayahInfo.numberInSurah + 1);
        } else {
          this.surah++;
          this.router.navigate(['/'], { queryParams: { surah: this.surah } });
          // this.urlParam += <number>(this.surahData.surahInfo.surahNo) + 1;
        }
      }
    }

    if (btn) {
      this.getData();
    }
    /* console.log(this.urlParam);
    return this.urlParam; */
  }

  setUrlParams(actn) {
    let params;
    if (this.urlParams) {
      if (this.urlParams.trans || this.urlParams.t) {
        if (this.urlParams.nav || this.urlParams.n) {
          params = {
            t: this.urlParams.trans || this.urlParams.t,
            n: this.urlParams.nav || this.urlParams.n
          };
        } else {
          params = {
            n: this.urlParams.nav || this.urlParams.n
          };
        }
      } else {
        if (this.urlParams.nav || this.urlParams.n) {
          params = {
            n: this.urlParams.nav || this.urlParams.n
          };
        } else {
          params = {};
        }
      }
    }

    // = this.urlParams;
    if (this.ayah) {
      // this.ayah = this.surahData.surahInfo.number + ':' + (<number>this.surahData.surahInfo.ayahInfo.numberInSurah - 1);
      params.ayah = this.ayah; // += this.surahData.surahInfo.surahNo + ':' + (<number>this.surahData.surahInfo.ayahInfo.numberInSurah - 1);
    } else {
      if (this.surah) {
        const i: number = this.surah + 1;
        params.surah = i;
      }
      // this.surah--;
      // this.urlParam += <number>(this.surahData.surahInfo.surahNo) - 1;
    }
    console.log(params);
    return params;
  }
}
