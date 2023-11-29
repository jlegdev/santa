import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListContainerComponent } from './event-list-container.component';

describe('EventListContainerComponent', () => {
  let component: EventListContainerComponent;
  let fixture: ComponentFixture<EventListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
