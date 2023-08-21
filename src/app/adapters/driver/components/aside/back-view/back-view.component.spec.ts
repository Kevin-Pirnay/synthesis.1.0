import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackViewComponent } from './back-view.component';

describe('BackViewComponent', () => {
  let component: BackViewComponent;
  let fixture: ComponentFixture<BackViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackViewComponent]
    });
    fixture = TestBed.createComponent(BackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
