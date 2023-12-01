import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUpdateContainerComponent } from './event-update-container.component';

describe('EventUpdateContainerComponent', () => {
  let component: EventUpdateContainerComponent;
  let fixture: ComponentFixture<EventUpdateContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventUpdateContainerComponent]
    });
    fixture = TestBed.createComponent(EventUpdateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
