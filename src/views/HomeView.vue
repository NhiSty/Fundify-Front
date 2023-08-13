<script setup>
import { ref } from 'vue';

const id = ref('91fda44c-24ab-4b6e-bdee-c58f16d46e70');
const clientToken = ref('1FUBIiSKD1MOfwa7JosooVO1maUz0PfFODkaAw1mg1ob6O9/fDpRZed0UsbpXr986LQJWpFpxl4pqwK8V/JzZg==');
const amount = ref('');

const setCookie = (name, value, min) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + min * 60 * 1000);
  const cookieValue = encodeURIComponent(value) + (min ? `; expires=${expirationDate.toUTCString()}` : '');
  document.cookie = `${name}=${cookieValue}; path=/; secure; SameSite=strict`;
};


// On submit, make a post request to the server
const submit = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${id.value}:${clientToken.value}`,
      },
      body: JSON.stringify({
        id: id.value,
        merchantId: id.value,
        amount: amount.value,
        userId: "e6c834bc-2597-4689-866e-85bd687ef13f",
        currency: 'USD',
      }),
    });
    const data = await response.json();
    setCookie('clientSecret', data.clientSecret, 60 );

    if (document.cookie.indexOf('clientSecret') === -1) {
    }else{
      window.location.href = data.url
    }

  } catch (error) {
    console.log(error);
  }
};

</script>

<template>
  <main>
    <v-form>
      <v-text-field
        v-model="id"
        label="Id"
        type="text"
        placeholder="3d8047b9-9cc1-407a-861a-bd1b48595b5d"
        required
      ></v-text-field>
      <v-text-field
        v-model="clientToken"
        label="Client Token"
        type="textarea"
        required
      ></v-text-field>
      <v-text-field
        v-model="amount"
        label="Amount"
        type="number"
        min="1"
        required
      ></v-text-field>
      <v-btn
        color="primary"
        @click="submit"
      >
        Submit
      </v-btn>
    </v-form>
  </main>
</template>
