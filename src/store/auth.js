import { defineStore } from "pinia";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

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
    async register() {},
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
