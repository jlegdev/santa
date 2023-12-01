import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewCardComponent } from './event-view-card.component';

describe('EventViewCardComponent', () => {
  let component: EventViewCardComponent;
  let fixture: ComponentFixture<EventViewCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventViewCardComponent]
    });
    fixture = TestBed.createComponent(EventViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
