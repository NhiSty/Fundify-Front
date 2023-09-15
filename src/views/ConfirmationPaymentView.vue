<script setup>
</script>

<template>
  <main>
    <v-container class="d-flex justify-center align-center">
      <!-- Contenu centré ici -->
      <v-card>
        <v-card-title>
          <v-icon color="green" icon="mdi-check-circle"></v-icon>
          Votre paiement a été effectué avec succès.
        </v-card-title>
        <v-card-text>
          Nous vous remercions pour votre confiance. En cas de problème, n'hésitez pas à nous contacter.
          En vous souhaitant une bonne journée.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" href="/">
            <v-icon color="primary" icon="mdi-arrow-left-thin"></v-icon>
            Retour à l'accueil
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </main>
</template>
