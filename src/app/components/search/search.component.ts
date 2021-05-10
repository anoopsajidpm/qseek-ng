import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
/* import { Location } from '@angular/common';
import { isNumber } from 'util'; */
// import { setTimeout } from 'timers';
import { IndexService } from '../../services/index.service';
//import { filter } from 'rxjs/operators';
import { AyahListComponent } from '../ayah-list/ayah-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchInput = new EventEmitter();

  @Input()
  inputValue: string;

  @Input()
  surahList: any;

  @Input()
  surahClicked: number;

  surahIndex: any;
  selectedSurah: any;
  name: any;

  maxInputLimit = 6236;

  constructor(private mySvc: IndexService) {
    // this.inputValue = '';
    console.log(this.inputValue);
  }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.surahList);
      if (!this.surahList) {
        this.getSurahs('surah');
      }
    }, 1000);
  }

  surahSelected(indx) {
    console.log(indx);

    this.surahIndex = indx ? indx : undefined;
    this.selectedSurah = indx ? this.surahList.filter((res) => res.number === indx) : undefined;


    setTimeout(() => {
      console.log(this.selectedSurah);
      this.inputValue = '';
      this.maxInputLimit = indx ? this.selectedSurah[0].numberOfAyahs : 6236;
    }, 100);

  }

  inputChange() {
    console.log(this.inputValue);
    /*  if ( !isNumber(this.inputValue)) {
       console.log('asdf');
     } */

    const regex = /^[0-9]+$/;
    let inpString = this.inputValue;

    const newChar = inpString.charAt(inpString.length - 1);

    console.log(newChar);
    // Validate TextBox value against the Regex.
    const isValid = regex.test(newChar);

    if (!isValid) {
      console.log('Only Alphabets and Numbers allowed.');
      // inpString = inpString.replace(newChar, '');
      inpString = inpString.slice(0, inpString.length - 1);
      if (newChar === ':') { // --------- if the char is : -- set the left part to Surah num
        if (inpString.includes(':')) {
          // if surah is already set
          console.log('surah already yes');
          // check the second part for ayah total
          //const totAyahs = this.selectedSurah[0].numberOfAyahs;
          const split2 = parseInt(inpString.split(':')[1]);
          console.log(this.maxInputLimit);
          if (split2 > this.maxInputLimit) {
            inpString = inpString.replace(inpString.charAt(inpString.length - 1), '');
          }

        } else {
          // tslint:disable-next-line: radix
          if (parseInt(inpString) <= 114 && parseInt(inpString) > 0) {
            this.surahIndex = inpString;
            this.surahSelected(parseInt(inpString));
          } else {
            // tslint:disable-next-line: radix
            if (parseInt(inpString) < 1 || inpString === '') {
              inpString = '';
            } else {
              if (inpString.length < 3) {
                inpString = inpString.replace(inpString.charAt(inpString.length - 1), '');
              } else {
                inpString = inpString.slice(0, 2);
              }
            }
            this.surahIndex = inpString;
            this.surahSelected(parseInt(inpString));
            inpString += inpString ? ':' : '';
          }
        }
      }
    } else {
      if (inpString.includes(':')) {
        // if surah is already set
        console.log('surah already yes');
        // check the second part for ayah total
        //const totAyahs = this.selectedSurah[0].numberOfAyahs;
        const split2 = parseInt(inpString.split(':')[1]);
        console.log(this.maxInputLimit);
        if (split2 > this.maxInputLimit) {
          inpString = inpString.replace(inpString.charAt(inpString.length - 1), '');
        }
      } else {
        // tslint:disable-next-line: radix
        if (parseInt(inpString) > this.maxInputLimit) {
          //inpString = inpString.slice(0, 3);
          inpString = inpString.replace(inpString.charAt(inpString.length - 1), '');
        }
      }
    }
    //console.log(inpString);
    setTimeout(() => {
      this.inputValue = inpString;
    }, 100);


    if (this.inputValue.includes(':')) {
      /* if (this.inputValue.split(':')[0].match('/[a-z]/i')){
        console.log('sdfas');
      } */
      // this.surahIndex =  this.inputValue.split(':')[0];
      /* if (<string>(this.inputValue).split(':' | @'^[0-9*#+]+$')[0] <== 114) {
        this.surahIndex =  this.inputValue.split(':')[0];
      } */
    }
  }
  searchClick() {
    // console.log(this.inputValue);
    if (this.inputValue) {
      // console.log(this.inputValue);
      // $location.path('/user/' + $scope.userId, false);
      // location.assign('?ayah=' + this.inputValue);
      if (this.inputValue.includes(':')) {
        this.searchInput.emit(this.inputValue);
      } else {
        if (this.surahIndex) {
          this.searchInput.emit(this.surahIndex + ':' + this.inputValue);
        }
      }
    }
  }

  getSurahs(param) {
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
  processData(data) {
    this.surahList = data.data;

    if (this.inputValue && !this.surahIndex) {
      console.log(this.inputValue);
      if (this.inputValue.includes(':')) {
        this.surahSelected(parseInt(this.inputValue.split(':')[0]));
      }
    }
    //this.surahList.emit(data.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    if (changes.surahClicked && changes.surahClicked.currentValue) {
      const indx = changes.surahClicked.currentValue;
      //this.maxInputLimit = this.selectedSurah[0].numberOfAyahs; // : 6236;
      this.surahSelected(indx);
    }
    if(changes.inputValue && changes.inputValue.currentValue) {
      const curInput = changes.inputValue.currentValue;
      if(curInput.split(':').length > 1) {
        this.surahIndex = curInput.split(':')[0];
        this.inputValue = curInput.split(':')[1];
      }
    }
  }
}
