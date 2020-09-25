import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, filter, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  baseUrl = 'https://api.alquran.cloud/v1/'; //surah'

  constructor(private http: HttpClient) { }

  fetchData(arg) {
    //console.log(this.baseUrl + arg);
    return this.http.get(this.baseUrl + arg)
    .pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.log(error)
      )
    );
  }

}
