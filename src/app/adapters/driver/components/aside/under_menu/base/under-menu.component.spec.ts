import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderMenuComponent } from './under-menu.component';

describe('UnderMenuComponent', () => {
  let component: UnderMenuComponent;
  let fixture: ComponentFixture<UnderMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnderMenuComponent]
    });
    fixture = TestBed.createComponent(UnderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
