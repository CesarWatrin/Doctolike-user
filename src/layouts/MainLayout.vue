<script setup>
import Header from "../components/Header.vue";
import { useAuthStore } from "../store/auth";
import Footer from "../components/Footer.vue";

const userStore = useAuthStore();
</script>

<template>
  <Header v-if="userStore.getUser !== null" class="fixed top-0 w-full" />
  <div class="layout-container mt-16">
    <slot />
  </div>
  <Footer v-if="userStore.getUser === null" />
</template>
