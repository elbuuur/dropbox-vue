<template>
  <auth-layout v-if="isAuth"><router-view /></auth-layout>
  <div v-else>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import AuthLayout from "@/components/layout/AuthLayout.vue";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const userStore = useUserStore();

const isAuth = computed(() => userStore.isAuthenticated);
</script>
