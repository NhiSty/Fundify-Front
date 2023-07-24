<script setup>
import {reactive, ref} from "vue";
import { useToast } from "vue-toastification";
import {Facade} from "@/api/facade";

const formData = reactive({
  contactFirstName: 'Thomas',
  contactLastName: 'Jallu',
  companyName: 'Fundify',
  kbis: null,
  currency: 'EUR',
  cancellationRedirectUrl: 'https://test/ko',
  confirmationRedirectUrl: 'https://test/ok',
  contactPhone: '0673977945',
  contactEmail: 'thomas.jallu@gmail.com',
  password: 'Test1234',
  passwordConfirmation: 'Test1234',
});

const formRules = reactive({
  contactFirstName: [
    v => !!v || 'Ce champ est obligatoire',
  ],
  contactLastName: [
    v => !!v || 'Ce champ est obligatoire',
  ],
  companyName: [
    v => !!v || 'Ce champ est obligatoire',
  ],
  kbis: [
    v =>  !v ? 'Ce champ est obligatoire': (!!v && v[0]?.size < 2000000) || 'Le fichier ne doit pas dépasser 2Mo',
  ],
  currency: [
    v => !!v || 'Ce champ est obligatoire',
  ],
  confirmationRedirectUrl: [
    v => !!v || 'Ce champ est obligatoire',
    v => v.startsWith('http') || 'L\'url doit commencer par http ou https',
  ],
  cancellationRedirectUrl: [
    v => !!v || 'Ce champ est obligatoire',
    v => v.startsWith('http') || 'L\'url doit commencer par http ou https',
  ],
  contactPhone: [
    v => !!v || 'Ce champ est obligatoire',
    v => v.length === 10 || 'Le numéro de téléphone doit comporter 10 chiffres',
  ],
  contactEmail: [
    v => !!v || 'Ce champ est obligatoire',
    v => /.+@.+\..+/.test(v) || 'E-mail doit être valide',
  ],
  password: [
    v => !!v || 'Ce champ est obligatoire',
    v => v.length >= 8 || 'Le mot de passe doit comporter au moins 8 caractères',
  ],
  passwordConfirmation: [
    (v) => !!v || 'Ce champ est obligatoire',
    (v) => v === formData.password || 'La confirmation du mot de passe doit correspondre au mot de passe',
  ],
});

const errors = ref(null);

const checkForm = () => {
  const hasError = Object.keys(formRules).some((key) => {
    const rules = formRules[key];
    const value = formData[key];

    return !rules.every((rule) => {
      const result = rule(value);

      if (typeof result === 'boolean') {
        return result;
      }

      return false;

    });
  });

  if (hasError) {
    errors.value = 'Veuillez corriger les erreurs dans le formulaire';
  }
  return !hasError;
};
const toast = useToast();

const submit = async (event) => {
  let hasError = false;

  if (!checkForm()) {
    return;
  }

  const base64Image = await createBase64File(formData.kbis[0]);
  const { kbis, passwordConfirmation, ...restFormData } = formData;

  event.preventDefault();
  event.stopPropagation();

  Facade.getInstance().submitMerchant({
    kbis: base64Image,
    ...restFormData
  })
      .then((response) => {
        if (![200, 201, 204].includes(response.status)) {
          hasError = true;
        }
        return response
      })
      .then((data) => {
        if (hasError) {
          errors.value = data;
          if (data.status === 409) {
            toast.error('L\'adresse email et/ou le nom de société sont déjà utilisées');
          }
        } else {
          console.log(data);
          toast.success('Votre demande a bien été prise en compte, un administrateur doitf examine votre demande. Merci de bien vouloir patienter');
          event.target.reset();
        }
      })
  ;
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
    <v-form @submit.prevent="submit">
      <v-card-text>
        <v-text-field
            v-model="formData.contactFirstName"
            density="compact"
            variant="outlined"
            label="Prénom *"
            required
            :rules="formRules.contactFirstName"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.contactLastName"
            density="compact"
            variant="outlined"
            label="Nom *"
            required
            :rules="formRules.contactLastName"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.companyName"
            density="compact"
            variant="outlined"
            label="Nom de société *"
            required
            :rules="formRules.companyName"
            class="textField"
        ></v-text-field>
        <v-file-input
            label="Kbis"
            variant="outlined"
            class="textField"
            v-model="formData.kbis"
            :rules="formRules.kbis"
            density="compact"
            accept="image/png, image/jpeg, application/pdf"
            show-size
            prepend-icon="mdi-file-check-outline"
        ></v-file-input>
        <v-select
            label="Devise de reversement *"
            :items="['AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BHD','BIF','BMD','BND','BOB','BRL','BSD','BTN','BWP','BYN','BZD','CAD','CDF','CHF','CLP','CNY','COP','CRC','CUC','CUP','CVE','CZK','DJF','DKK','DOP','DZD','EGP','ERN','ETB','EUR','FJD','FKP','GBP','GEL','GHS','GIP','GMD','GNF','GTQ','GYD','HKD','HNL','HRK','HTG','HUF','IDR','ILS','INR','IQD','IRR','ISK','JMD','JOD','JPY','KES','KGS','KHR','KMF','KPW','KRW','KWD','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LYD','MAD','MDL','MGA','MKD','MMK','MNT','MOP','MRU','MUR','MVR','MWK','MXN','MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','OMR','PAB','PEN','PGK','PHP','PKR','PLN','PYG','QAR','RON','RSD','RUB','RWF','SAR','SBD','SCR','SDG','SEK','SGD','SHP','SLL','SOS','SRD','SSP','STN','SYP','SZL','THB','TJS','TMT','TND','TOP','TRY']"
            variant="outlined"
            class="textField"
            v-model="formData.currency"
            :rules="formRules.currency"
            required
            density="compact"
        ></v-select>
        <v-text-field
            v-model="formData.confirmationRedirectUrl"
            density="compact"
            variant="outlined"
            label="Url de redirection après paiement *"
            required
            :rules="formRules.confirmationRedirectUrl"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.cancellationRedirectUrl"
            density="compact"
            variant="outlined"
            label="Url de redirection après échec/annulation de paiement *"
            required
            :rules="formRules.cancellationRedirectUrl"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.contactPhone"
            density="compact"
            variant="outlined"
            label="Numéro de téléphone"
            :rules="formRules.contactPhone"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.contactEmail"
            density="compact"
            variant="outlined"
            label="Email *"
            required
            :rules="formRules.contactEmail"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.password"
            density="compact"
            variant="outlined"
            label="Mot de passe *"
            required
            type="password"
            :rules="formRules.password"
            class="textField"
        ></v-text-field>
        <v-text-field
            v-model="formData.passwordConfirmation"
            density="compact"
            variant="outlined"
            type="password"
            label="Confirmer le mot de passe *"
            required
            :rules="formRules.passwordConfirmation"
        ></v-text-field>
      </v-card-text>

      <v-card-actions class="card-actions">
        <v-btn
            color="primary"
            type="submit"
            class="submitButton"
            variant="elevated"
        >
          Créer mon compte
        </v-btn>
        <a href="/login">
          Me connecter à mon compte Fundify
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
