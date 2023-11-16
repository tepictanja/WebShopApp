// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  firebaseConfig :{
    apiKey: "AIzaSyDCxYQ7Pq-7VDUfIBZ8eiXR72KISCoNq-4",
    authDomain: "webshop-32f7e.firebaseapp.com",
    projectId: "webshop-32f7e",
    storageBucket: "webshop-32f7e.appspot.com",
    messagingSenderId: "941237949039",
    appId: "1:941237949039:web:28141e0fcacb642373739a",
    measurementId: "G-HRZPXHRLWQ"

  }
};


const app = initializeApp(environment.firebaseConfig);
const storage = getStorage(app);
getAnalytics(app);
export default storage;
