import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventeditorComponent } from './eventeditor.component';

describe('EventeditorComponent', () => {
  let component: EventeditorComponent;
  let fixture: ComponentFixture<EventeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
