<script setup>
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { auth } from "../firebase/config";

const email = ref(null);
const password = ref(null);
const hasError = ref(false);

const onLogin = async () => {
  try {
    const r = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    if (r.user) {
      window.navigator.vibrate(200);
      console.log("log in");
    }
  } catch (e) {
    window.navigator.vibrate(2000);
    hasError.value = true;
  }
};
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          v-model="email"
          :class="hasError && 'border-red-500'"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="email"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          :class="hasError && 'border-red-500'"
          id="password"
          type="password"
          placeholder="password"
        />
        <p v-if="hasError" class="text-red-500 text-xs italic pt-2">
          Username or password is incorrect.
        </p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="onLogin"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>
