import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkRootsComponent } from './link-roots.component';

describe('LinkRootsComponent', () => {
  let component: LinkRootsComponent;
  let fixture: ComponentFixture<LinkRootsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkRootsComponent]
    });
    fixture = TestBed.createComponent(LinkRootsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
