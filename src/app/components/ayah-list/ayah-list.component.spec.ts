import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyahListComponent } from './ayah-list.component';

describe('AyahListComponent', () => {
  let component: AyahListComponent;
  let fixture: ComponentFixture<AyahListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyahListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyahListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
