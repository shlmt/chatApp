import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomBtnComponent } from './add-room-btn.component';

describe('AddRoomBtnComponent', () => {
  let component: AddRoomBtnComponent;
  let fixture: ComponentFixture<AddRoomBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoomBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
