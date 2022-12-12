<script setup>
import Header from "../components/Header.vue";
</script>

<template>
  <Header class="fixed top-0 w-full" />
  <div class="layout-container mt-16">
    <slot />
  </div>
</template>
