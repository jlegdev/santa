import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreateContainerComponent } from './event-create-container.component';

describe('EventCreateContainerComponent', () => {
  let component: EventCreateContainerComponent;
  let fixture: ComponentFixture<EventCreateContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventCreateContainerComponent]
    });
    fixture = TestBed.createComponent(EventCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
