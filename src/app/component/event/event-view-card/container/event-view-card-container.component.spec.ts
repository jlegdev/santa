import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewCardContainerComponent } from './event-view-card-container.component';

describe('EventViewCardContainerComponent', () => {
  let component: EventViewCardContainerComponent;
  let fixture: ComponentFixture<EventViewCardContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventViewCardContainerComponent]
    });
    fixture = TestBed.createComponent(EventViewCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
