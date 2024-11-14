import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn$ = new BehaviorSubject<boolean>(false)
  private userDetails$ = new Subject<User>()

  constructor(
    private afs:AngularFirestore,
    private afAuth:AngularFireAuth,
    private router:Router ) {
      afAuth.authState.subscribe(user=>{
        if(user){
          this.userDetails$.next(user as User)
          this.isLoggedIn$.next(true)
        }
        else{
          this.isLoggedIn$.next(false)
        } 
      })
     }

    public signInWithGoogle = ()=>{
      this.authLogin(new firebase.default.auth.GoogleAuthProvider())
    }

    public signOut = ():Promise<void> => {
      return this.afAuth.signOut().then(()=>{
        this.userDetails$.next(undefined)
        this.router.navigate(['/'])
      });
    }

    public isLoggedIn = ():Observable<boolean> => this.isLoggedIn$.asObservable()

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
      // const userRef:AngularFirestoreDocument<User> = this.afs.doc(`users/${user?.uid}`)
      // return userRef.set(userData,{merge:true})
    }

}
