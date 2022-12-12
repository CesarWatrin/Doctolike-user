import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/Login.vue";
import RegisterView from "../views/Register.vue";
import DoctorsView from "../views/Doctors.vue";
import AppointmentsView from "../views/Appointments.vue";
import { useAuthStore } from "../store/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/",
      name: "doctor",
      component: DoctorsView,
    },
    {
      path: "/appointments",
      name: "appointment",
      component: AppointmentsView,
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (
    authStore.getUser === null &&
    to.name !== "login" &&
    to.name !== "register"
  ) {
    return { name: "login" };
  }

  if (authStore.getUser && (to.name === "login" || to.name === "register")) {
    return { name: "doctor" };
  }
});

export default router;
