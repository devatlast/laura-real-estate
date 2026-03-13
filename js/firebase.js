

import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import{
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {getAuth} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import{getStorage} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyALbOpTETw_frAM69EShElsdOSXTfI7P_s",
  authDomain: "laura-real-estate-22426.firebaseapp.com",
  projectId: "laura-real-estate-22426",
  storageBucket: "laura-real-estate-22426.firebasestorage.app",
  messagingSenderId: "322710388126",
  appId: "1:322710388126:web:81d1b06cef7571c2246a8f"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export async function getListings() {
    const snapshot = await getDocs(collection(db, "properties"));
    let listings = [];
    snapshot.forEach((doc) => {
        listings.push({id: doc.id,...doc.data()});
    });
    return listings;

}

export async function addListing(listing){
    await addDoc(collection(db, "properties"), listing);
}

export async function deleteListing(slug) {
    await deleteDoc(doc(db, "properties", slug));
}
