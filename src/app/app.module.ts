import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IndexService } from './services/index.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SurahsComponent } from './components/surah-list/surahList.component';
import { ParamsComponent } from './components/params/params.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { SearchComponent } from './components/search/search.component';
import { AyahListComponent } from './components/ayah-list/ayah-list.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { Play, PlayFill, Pause, PauseFill, MusicPlayer, ArrowLeftCircle, ArrowRightCircle, Search } from 'ngx-bootstrap-icons';

// Select some icons (use an object, not an array)
const icons = {
  Play,
  PlayFill,
  Pause,
  PauseFill,
  MusicPlayer,
  ArrowLeftCircle,
  ArrowRightCircle,
  Search
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SurahsComponent,
    ParamsComponent,
    DetailViewComponent,
    SearchComponent,
    AyahListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(icons),
    RouterModule.forRoot([
      {
        path: 'quran',
        component: HomeComponent // SurahsComponent
      },
      {
        path: 'surah',
        component: HomeComponent // DetailViewComponent
      },
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: ':params',
            component: HomeComponent
          }
        ]
      }
    ])
  ],
  providers: [
    IndexService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
