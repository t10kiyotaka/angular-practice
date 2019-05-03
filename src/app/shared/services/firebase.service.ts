import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  EMAIL = 't10kiyotaka@gmail.com';
  PASSWORD = 'password'

  constructor() {
    const config = {
      apiKey: "AIzaSyD6PjXr1QSnQvi5a9JcsKiqesQIgL5u-iM",
      authDomain: "angular-sample-fb9e4.firebaseapp.com",
      databaseURL: "https://angular-sample-fb9e4.firebaseio.com",
      projectId: "angular-sample-fb9e4",
      storageBucket: "angular-sample-fb9e4.appspot.com",
      messagingSenderId: "855078411993"
    };
    firebase.initializeApp(config);
    this.signInOrCreateUser(this.EMAIL, this.PASSWORD)
  }

  signInOrCreateUser(email, password): void {
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
      console.log(userCredential.user.uid);
      firebase.auth().currentUser.getIdToken().then((token: string) => {
        console.log(token);
      });
    }).catch(() => {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
        firebase.auth().currentUser.getIdToken().then((token: string) => {
          console.log(token);
        });
      });
    });
  }
}