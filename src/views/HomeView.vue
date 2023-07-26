<script setup>
import { ref } from 'vue';

const id = ref('');
const clientToken = ref('');
const amount = ref('');

// On submit, make a post request to the server
const submit = async () => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id.value,
      clientToken: clientToken.value,
      amount: amount.value,
    }),
  });
  const data = await response.json();
  console.log(data);
};

</script>

<template>
  <main>
    <v-form>
      <v-text-field
        v-model="id"
        label="Id"
        type="number"
        maxlength="1"
        required
      ></v-text-field>
      <v-text-field
        v-model="clientToken"
        label="Client Token"
        type="text"
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
