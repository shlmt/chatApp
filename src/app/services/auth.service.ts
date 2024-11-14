import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afs:AngularFirestore,
    private afAuth:AngularFireAuth ) { }

    public signInWithGoogle = ()=>{
      this.authLogin(new firebase.default.auth.GoogleAuthProvider())
    }
    private authLogin = (provider:firebase.default.auth.AuthProvider) => {
      this.afAuth.signInWithPopup(provider).then(res=>{
        this.setUserData(res.user as User)
      });
    }

    private setUserData = (user?:User):Promise<void>|void => {
      if(!user) return
      const userData:User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }
      const userRef:AngularFirestoreDocument<User> = this.afs.doc(`users/${user?.uid}`)
      return userRef.set(userData,{merge:true})
    }

}
