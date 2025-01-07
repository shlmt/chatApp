import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmojiKeyboardComponent } from './emoji-keyboard.component';


describe('EmojiKeyboardComponent', () => {
  let component: EmojiKeyboardComponent;
  let fixture: ComponentFixture<EmojiKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmojiKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
