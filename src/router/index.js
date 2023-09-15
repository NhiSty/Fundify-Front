import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ConfirmationPaymentView from "@/views/ConfirmationPaymentView.vue";
import CancellationPaymentView from "@/views/CancellationPaymentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/confirmation-payment',
      name: 'confirmation-payment',
      component: ConfirmationPaymentView
    },
    {
      path: '/cancellation-payment',
      name: 'cancellation-payment',
      component: CancellationPaymentView
    },
  ]
})

export default router
