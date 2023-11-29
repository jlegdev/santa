import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventJoinContainerComponent } from './event-join-container.component';

describe('EventJoinContainerComponent', () => {
  let component: EventJoinContainerComponent;
  let fixture: ComponentFixture<EventJoinContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventJoinContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventJoinContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
