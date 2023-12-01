import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUpdateViewComponent } from './event-update-view.component';

describe('EventUpdateViewComponent', () => {
  let component: EventUpdateViewComponent;
  let fixture: ComponentFixture<EventUpdateViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventUpdateViewComponent]
    });
    fixture = TestBed.createComponent(EventUpdateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
