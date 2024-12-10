import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordBtnComponent } from './record-btn.component';

describe('RecordBtnComponent', () => {
  let component: RecordBtnComponent;
  let fixture: ComponentFixture<RecordBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
