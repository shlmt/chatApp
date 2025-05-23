import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { User } from '../models/user.interface'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn$ = new BehaviorSubject<boolean>(false)
  private userDetails$ = new BehaviorSubject<User|undefined>(undefined)

  constructor(
    private afs:AngularFirestore,
    private afAuth:AngularFireAuth,
    private router:Router ) {
       const savedUserString = sessionStorage.getItem('user')
       if(savedUserString) this.isLoggedIn$.next(true) 
        afAuth.authState.subscribe(user=>{
          if (user) {
            if (user.displayName) {
              this.userDetails$.next(user as User)
              sessionStorage.setItem('user', 'true')
            }
            else {
              this.getUserFromFirestore(user.uid)
                .then(firestoreUser => {
                  this.userDetails$.next(firestoreUser)
                  sessionStorage.setItem('user', 'true')
                })
                .catch(() => sessionStorage.removeItem('user'))
            }
          }
          else
            sessionStorage.removeItem('user')
          this.isLoggedIn$.next(!!user)
        })
    }

    public signInWithGoogle = ()=>{
      this.authLogin(new firebase.default.auth.GoogleAuthProvider())
    }

    public signInWithGithub = () => {
      this.authLogin(new firebase.default.auth.GithubAuthProvider())
    }

    public signOut = ():Promise<void> => {
      return this.afAuth.signOut().then(()=>{
        this.userDetails$.next(undefined)
        sessionStorage.removeItem('user')
        this.router.navigate(['/'])
      })
    }

    public isLoggedIn = ():Observable<boolean> => this.isLoggedIn$.asObservable()

    public subUserData = ():Observable<User|undefined> => this.userDetails$.asObservable()
    public getUserData = ():User|undefined => this.userDetails$?.value
    public getUserId = ():string|undefined => this.userDetails$.value?.uid

    private authLogin = (provider:firebase.default.auth.AuthProvider) => {
      this.afAuth.signInWithPopup(provider).then(res=>{
        this.isLoggedIn$.next(true)
        this.setUserData(res.user as User, res.additionalUserInfo?.username)
        this.router.navigate(['/chat'])
      })
    }

    private setUserData = (user?:User, username?:string|null):Promise<void>|void => {
      if(!user) return
      const userData:User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName ?? username,
        photoURL: user.photoURL
      }
      const userRef:AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`)
      return userRef.set(userData, { merge: true }).catch(error => {
        console.error('Error saving user data:', error)
      })  
    }

    private getUserFromFirestore = (uid: string): Promise<User | undefined> => {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`)
      return userRef
        .get()
        .toPromise()
        .then(doc => (doc.exists ? doc.data() as User : undefined))
        .catch(error => {
          console.error('Error reading user data from Firestore:', error)
          return undefined
        })
    }
    

}
