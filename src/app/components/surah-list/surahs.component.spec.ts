import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurahsComponent } from './surahList.component';

describe('SurahsComponent', () => {
  let component: SurahsComponent;
  let fixture: ComponentFixture<SurahsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurahsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurahsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
