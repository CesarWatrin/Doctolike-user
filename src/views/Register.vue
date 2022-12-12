<script setup>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref } from "vue";
import { auth, db } from "../firebase/config";

const firstName = ref(null);
const lastName = ref(null);
const email = ref(null);
const password = ref(null);
const address = ref(null);
const zipcode = ref(null);
const town = ref(null);
const hasError = ref(false);
const newUser = ref(null);

const onRegister = async () => {
  try {
    const r = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    if (r.user) {
      newUser.value = r.user.uid;
      window.navigator.vibrate(200);
      await setDoc(doc(db, "client", newUser.value), {
        first_name: firstName.value,
        last_name: lastName.value,
        address: address.value,
        zipcode: zipcode.value,
        town: address.value,
      });
    }
  } catch (e) {
    window.navigator.vibrate(2000);
    hasError.value = true;
    console.log(e);
  }
};
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-wrap">
      <div class="mr-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="firstName"
          >
            First name
          </label>
          <input
            v-model="firstName"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            placeholder="first name"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="lastName"
          >
            Last name
          </label>
          <input
            v-model="lastName"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            placeholder="last name"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="email"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="password"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="onRegister"
          >
            Register
          </button>
        </div>
      </div>
      <div class="ml-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="address"
          >
            Address
          </label>
          <input
            v-model="address"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="address"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="zipcode"
          >
            Zipcode
          </label>
          <input
            v-model="zipcode"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="zipcode"
            type="text"
            placeholder="zipcode"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="town">
            Town
          </label>
          <input
            v-model="town"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="town"
            type="text"
            placeholder="town"
          />
        </div>
        <p v-if="hasError" class="text-red-500 text-xs italic pt-2">
          An error as occurred.
        </p>
      </div>
    </form>
  </div>
</template>
