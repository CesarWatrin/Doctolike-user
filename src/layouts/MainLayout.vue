<script setup>
import Header from "../components/Header.vue";
import { useAuthStore } from "../store/auth";

const userStore = useAuthStore();
</script>

<template>
  <Header v-if="userStore.getUser !== null" class="fixed top-0 w-full" />
  <div class="layout-container mt-16">
    <slot />
  </div>
</template>
