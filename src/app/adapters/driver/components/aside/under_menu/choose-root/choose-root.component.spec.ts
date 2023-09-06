import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRootComponent } from './choose-root.component';

describe('ChooseRootComponent', () => {
  let component: ChooseRootComponent;
  let fixture: ComponentFixture<ChooseRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseRootComponent]
    });
    fixture = TestBed.createComponent(ChooseRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
