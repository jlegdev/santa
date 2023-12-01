import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreateViewComponent } from './event-create-view.component';

describe('EventCreateViewComponent', () => {
  let component: EventCreateViewComponent;
  let fixture: ComponentFixture<EventCreateViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventCreateViewComponent]
    });
    fixture = TestBed.createComponent(EventCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
