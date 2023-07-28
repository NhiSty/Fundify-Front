<script setup>
import { ref } from 'vue';

const id = ref('');
const clientToken = ref('');
const amount = ref('');

const output = ref('');

// On submit, make a post request to the server
const submit = async () => {
  console.log(`Authorization : Bearer ${id.value}:${clientToken.value}`);
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Bearer': `${id.value}:${clientToken.value}`,
      },
      body: JSON.stringify({
        id: id.value,
        merchantId: id.value,
        amount: amount.value,
        userId: 1,
        currency: 'USD',
      }),
    });
    console.log(response.status);
    const data = await response.json();
    console.log(data); 
    output.value = data;
  } catch (error) {
    output.value = error;
    console.error(error);
    console.log(id.value);
    console.log(clientToken.value);
    console.log(amount.value);
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
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkODA0N2I5LTljYzEtNDA3YS04NjFhLWJkMWI0ODU5NWI1ZCIsIm1lcmNoYW50SWQiOiI4NDE5NjkzMC03N2RjLTQ5MjYtYmM5NC0xMThhNzQ2MTI3OTAiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjkwNDk2MDAxLCJleHAiOjE3MjIwNTM2MDF9.6tA1UK7kfVzV5l8jxiRUTbj_IPeIQSuaFChu6sbC8lg"
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
    <p>{{ output }}</p>
  </main>
</template>
