import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: localStorage.getItem("user"),
    userInfo: {},
  }),
  actions: {
    async login(email, password) {
      try {
        const r = await signInWithEmailAndPassword(auth, email, password);
        if (r.user) {
          window.navigator.vibrate(200);
          this.user = r.user.uid;
          localStorage.setItem("user", r.user.uid);
          return true;
        }
      } catch (e) {
        window.navigator.vibrate(2000);
        console.log(e);
        return false;
      }
    },
    async register(
      email,
      password,
      firstName,
      lastName,
      address,
      zipcode,
      town
    ) {
      try {
        const r = await createUserWithEmailAndPassword(auth, email, password);
        if (r.user) {
          window.navigator.vibrate(200);
          this.user = r.user.uid;
          localStorage.setItem("user", r.user.uid);
          await setDoc(doc(db, "users", r.user.uid), {
            first_name: firstName,
            last_name: lastName,
            address: address,
            zipcode: zipcode,
            town: town,
          });
          return true;
        }
      } catch (e) {
        window.navigator.vibrate(2000);
        console.log(e);
        return false;
      }
    },
    async logout() {
      signOut(auth)
        .then(() => {
          this.user = null;
          localStorage.removeItem("user");
          this.router.push({ name: "login" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  getters: {
    getUser() {
      return this.user;
    },
  },
});
