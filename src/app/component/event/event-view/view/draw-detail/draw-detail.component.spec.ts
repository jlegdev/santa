import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawDetailComponent } from './draw-detail.component';

describe('DrawDetailComponent', () => {
  let component: DrawDetailComponent;
  let fixture: ComponentFixture<DrawDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawDetailComponent]
    });
    fixture = TestBed.createComponent(DrawDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
