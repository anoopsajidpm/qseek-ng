import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
//import * as data from '../json/options.json' ;

const greetingPoster = new Promise((resolve, reject) => {
  console.log('Inside Promise (proof of being eager)');
  resolve('Welcome! Nice to meet you.');
});

const greetingLady$ = new Observable(observer => {
  console.log('Inside Observable (proof of being lazy)');
  observer.next('Hello! I am glad to get to know you.');
  observer.complete();
});


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Qseek';
  
  
  

  constructor() {
   // console.log()
  }

  ngOnInit(): void {
    console.log('Before calling then on Promise');
    greetingPoster.then(res => console.log(`THEN: Greeting from promise: ${res}`));

    console.log('Before calling subscribe on Observable');
    greetingLady$.subscribe({
      next: console.log,
      complete: () => console.log('SUB: End of conversation with preety lady')
    });
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    //console.log(data);
  }
  
}
