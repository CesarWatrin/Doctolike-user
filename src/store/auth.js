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
          this.user = r.user.accessToken;
          localStorage.setItem("user", r.user.accessToken);
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
