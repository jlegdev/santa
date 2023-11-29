import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewContainerComponent } from './event-view-container.component';

describe('EventViewContainerComponent', () => {
  let component: EventViewContainerComponent;
  let fixture: ComponentFixture<EventViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventViewContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
