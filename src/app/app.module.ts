import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HeaderComponent } from './components/header/header.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { ChatComponent } from './components/chat/chat.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { AddRoomBtnComponent } from './components/add-room-btn/add-room-btn.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddRoomDialogComponent } from './components/add-room-dialog/add-room-dialog.component';
import { MessageComponent } from './components/message/message.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { DatePipe } from '@angular/common';
import { RecordBtnComponent } from './components/record-btn/record-btn.component';
import { InputChatComponent } from './components/input-chat/input-chat.component';
import { SignInDialogComponent } from './components/sign-in-dialog/sign-in-dialog.component';
import { FormsModule } from '@angular/forms';
import { EmojiKeyboardComponent } from './components/emoji-keyboard/emoji-keyboard.component';
import { FilterReactionsPipe } from './pipes/filter-reactions.pipe';
import { LinkTagPipe } from './pipes/link-tag.pipe';
import { CopyOnDoubleclickDirective } from './directives/copy-on-doubleclick.directive';
import { FocusOnLoadDirective } from './directives/focus-on-load.directive';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatContainerComponent,
    ChatComponent,
    RoomListComponent,
    AddRoomBtnComponent,
    HomeComponent,
    NotFoundComponent,
    AddRoomDialogComponent,
    MessageComponent,
    RelativeTimePipe,
    RecordBtnComponent,
    InputChatComponent,
    SignInDialogComponent,
    EmojiKeyboardComponent,
    FilterReactionsPipe,
    LinkTagPipe,
    CopyOnDoubleclickDirective,
    FocusOnLoadDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
