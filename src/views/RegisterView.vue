<script setup>
import {reactive, ref} from "vue";
import {Facade} from "@/api/facade";

const formData = reactive({
  firstname: 'Thomas',
  lastname: 'Jallu',
  society: 'Fundify',
  kbis: null,
  currency: 'euro',
  rejectUrl: 'test/ok',
  confirmationUrl: 'test/ko',
  phone: '0673977945',
  email: 'thomas.jallu@gmail.com',
  password: 'Test1234',
  passwordConfirmation: 'Test1234',
});
let validForm = false;
const formRules = reactive({
  firstnameRules: [
    v => !!v || 'Ce champ est obligatoire',
  ],
  lastnameRules: [
    v => !!v || 'Ce champ est obligatoire',
  ],
  companyNameRules: [
    v => !!v || 'Ce champ est obligatoire',
  ],
  kbisRules: [
    v => !!v || 'Ce champ est obligatoire',
  ],
  currencyRules: [
    v => !!v || 'Ce champ est obligatoire',
  ],
  successUrlRules: [
    v => !!v || 'Ce champ est obligatoire',
  ],
  cancelUrlRules: [
    v => !!v || 'Ce champ est obligatoire',
  ],
  phoneRules: [
    v => !!v || 'Ce champ est obligatoire',
  ],
  emailRules: [
    v => !!v || 'Ce champ est obligatoire',
    v => /.+@.+\..+/.test(v) || 'E-mail doit être valide',
  ],
  passwordRules: [
    v => !!v || 'Ce champ est obligatoire',
    v => v.length >= 8 || 'Le mot de passe doit comporter au moins 8 caractères',
  ],
  passwordConfirmationRules: [
    v => !!v || 'Ce champ est obligatoire',
    v => v === formData.password || 'La confirmation du mot de passe doit correspondre au mot de passe',
  ],
})

const errors = ref(null)

const submit = async (event) => {
  let hasError = false;
  const base64Image = await createBase64File(formData.kbis[0]);
  const { kbis, ...restFormData } = formData;

  Facade.getInstance().submitMerchant({
    kbis: base64Image,
    ...restFormData
  })
      .then((response) => {
        if (response.status === 422) {
          hasError = true
        }
        return response.json()
      })
      .then((data) => {
        if (hasError) {
          errors.value = data
        } else {
          console.log(data)
          event.target.reset()
        }
      });

  event.preventDefault()
}

const createBase64File = (fileObject) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileObject);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
}

</script>

<template>
  <v-card
      elevation="10"
      class="card"
  >
    <v-card-title class="card-title" >
      Créez votre compte Fundify
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submit">
        <v-text-field
            v-model="formData.firstname"
            density="compact"
            variant="outlined"
            label="Prénom *"
            required
            :rules="formRules.companyNameRules"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.lastname"
            density="compact"
            variant="outlined"
            label="Nom *"
            required
            :rules="formRules.companyNameRules"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.society"
            density="compact"
            variant="outlined"
            label="Nom de société *"
            required
            :rules="formRules.companyNameRules"
            class="textField"
        ></v-text-field>
        <v-file-input
            label="Kbis"
            variant="outlined"
            class="textField"
            v-model="formData.kbis"
            :rules="formRules.kbisRules"
            density="compact"
            accept="image/png, image/jpeg, application/pdf"
            prepend-icon="mdi-file-check-outline"
        ></v-file-input>
        <v-text-field
            v-model="formData.currency"
            density="compact"
            variant="outlined"
            label="Devise de reversement *"
            required
            :rules="formRules.currencyRules"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.rejectUrl"
            density="compact"
            variant="outlined"
            label="Url de redirection après paiement *"
            required
            :rules="formRules.successUrlRules"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.confirmationUrl"
            density="compact"
            variant="outlined"
            label="Url de redirection après échec/annulation de paiement *"
            required
            :rules="formRules.cancelUrlRules"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.phone"
            density="compact"
            variant="outlined"
            label="Numéro de téléphone"
            :rules="formRules.phoneRules"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.email"
            density="compact"
            variant="outlined"
            label="Email *"
            required
            :rules="formRules.emailRules"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.password"
            density="compact"
            variant="outlined"
            label="Mot de passe *"
            required
            :rules="formRules.passwordRules"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.passwordConfirmation"
            density="compact"
            variant="outlined"
            label="Confirmer le mot de passe *"
            required
            :rules="formRules.passwordConfirmationRules"
        ></v-text-field>
        <v-btn
            color="primary"
            type="submit"
            class="submitButton"
        >
          Créer mon compte
        </v-btn>
      </v-form>
    </v-card-text>
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
  margin-bottom: 5px;
}
.submitButton {
  margin-top: 16px;
}
</style>
