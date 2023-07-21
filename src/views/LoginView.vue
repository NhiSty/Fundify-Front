<script setup>
import {onBeforeMount, reactive} from "vue";
import {Facade} from "@/api/facade";
import {useToast} from "vue-toastification";

onBeforeMount(() => {
  if (localStorage.getItem('fundify-token')) {

  }
}

const formData = reactive({
  email: '',
  password: '',
});

const formRules = reactive({
  email: [
    v => !!v || 'Ce champ est obligatoire',
    v => /.+@.+\..+/.test(v) || 'E-mail doit être valide',
  ],
  password: [
    v => !!v || 'Ce champ est obligatoire',
    v => v.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v) || 'Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule et un chiffre',
  ],
});

const checkForm = () => {
  const valid = Object.keys(formData).every((key) => {
    return formRules[key].every((rule) => rule(formData[key]) === true);
  });
  return valid;
};

const toast = useToast();

const submit = () => {
  let hasError = false;

  if (!checkForm()) {
    return;
  }

  Facade.getInstance().loginMerchant({
    email: formData.email,
    password: formData.password,
  })
      .then((response) => {
        if (![200, 201, 204].includes(response.status)) {
          hasError = true;
          if (response.status === 404 || response.status === 401) {
            toast.error('Email ou mot de passe incorrect');
          } else {
            toast.error('Une erreur est survenue');
          }
        }
        return response.json()
      })
      .then(data => {
        localStorage.setItem('fundify-token', data.token);
      })
      .catch((error) => {
        hasError = true;
      })
};


</script>

<template>
  <v-card
      elevation="10"
      class="card"
  >
    <v-form @submit.prevent="submit">
      <v-card-title class="card-title" >
        Connectez-vous à votre compte Fundify
      </v-card-title>

      <v-card-text>
        <v-text-field
            v-model="formData.email"
            density="compact"
            variant="outlined"
            label="Email *"
            required
            :rules="formRules.email"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.password"
            density="compact"
            variant="outlined"
            label="Mot de pass *"
            required
            type="password"
            :rules="formRules.password"
            class="textField"
        ></v-text-field>
      </v-card-text>

      <v-card-actions class="card-actions" >
        <v-btn
            type="submit"
            color="primary"
            class="submitButton"
            variant="elevated"
        >
          Se connecter
        </v-btn>

        <a href="/register">
          Créer un compte Fundify
        </a>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.card-title {
  text-align: center;
  padding-top: 24px;
  padding-bottom: 24px;
}

.textField {
  margin-bottom: 8px;
}
.submitButton {
  margin-top: 16px;
}

.card-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
a {
  margin-top: 16px;
  margin-bottom: 16px;
  color: #6e18f0;
}
</style>
