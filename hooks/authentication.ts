import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

import { User } from '../models/User';

const userState = atom<User>({
  key: 'user',
  default: null,
})

async function createUserIfNotFound(user: User) {
  const db = getFirestore();
  const usersCollection = collection(db, 'users');
  const userRef = doc(usersCollection, user.uid);
  const document = await getDoc(userRef);
  if (document.exists()) {
    // 書き込みの方が高いので！
    return
  }

  await setDoc(userRef, {
    name: 'taro' + new Date().getTime(),
  })
}

export function useAuthentication() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user != null) {
      return
    }
    const auth = getAuth();

    signInAnonymously(auth).catch(function (error) {
      // Handle Errors here.
      console.error(error);
    })

    onAuthStateChanged(auth, function (firebaseUser) {
      if (firebaseUser) {
        const loginUser: User = {
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
          name: ''
        }
        setUser(loginUser);
        createUserIfNotFound(loginUser);
      } else {
        // User is signed out.
        setUser(null);
      }
    })
  },[])

  return { user };
}