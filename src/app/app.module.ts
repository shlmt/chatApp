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
import { DarkModeDirective } from './dark-mode.directive'
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
    DarkModeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
