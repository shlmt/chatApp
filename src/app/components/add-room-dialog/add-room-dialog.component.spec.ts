import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomDialogComponent } from './add-room-dialog.component';

describe('AddRoomDialogComponent', () => {
  let component: AddRoomDialogComponent;
  let fixture: ComponentFixture<AddRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoomDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
