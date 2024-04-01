import * as firebase from 'firebase/app';
import { getStorage,ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCfpw2KE7-86AD3UJE6Uz_uk5_dD9sDmbw",
    authDomain: "curious-mender-320213.firebaseapp.com",
    projectId: "curious-mender-320213",
    storageBucket: "curious-mender-320213.appspot.com",
    messagingSenderId: "256067225397",
    appId: "1:256067225397:web:80b9c1f620ef4fc0a0ee7c"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Export Firebase storage instance
export const storage = getStorage(firebase.app);