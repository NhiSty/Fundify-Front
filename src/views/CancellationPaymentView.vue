<script setup>
</script>

<template>
  <main>
    <v-container class="d-flex justify-center align-center">
      <!-- Contenu centré ici -->
      <v-card>
        <v-card-title>
          <v-icon color="red" icon="mdi-close-octagon"></v-icon>
          Aïe Aïe Aïe, votre paiement a été annulé.
        </v-card-title>
        <v-card-text>
          C'est dommage de partir si vite, mais nous espérons vous revoir bientôt.
          <br>
          <br>
          Hasta la vista <v-icon icon="mdi-hand-wave"></v-icon>
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
