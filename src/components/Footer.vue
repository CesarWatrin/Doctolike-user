<script setup>
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  deferredPrompt = e;
});

const installPWA = async () => {
  if (deferredPrompt !== null) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      deferredPrompt = null;
    }
  }
};
</script>

<template>
  <div class="fixed bottom-0 mb-4 w-full flex justify-center">
    <button
      class="px-8 py-4 bg-blue-500 text-white rounded"
      @click="installPWA"
    >
      Download PWA
    </button>
  </div>
</template>
