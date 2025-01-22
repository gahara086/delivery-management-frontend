<template>
  <v-app>
    <v-app-bar app>
      <v-container class="d-flex align-center">
        <v-app-bar-title>配送管理システム</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn to="/" text>ホーム</v-btn>
        <template v-if="authStore.token">
          <v-btn to="/deliveries" text>配送リスト</v-btn>
          <v-btn @click="toggleFavorite" text>
            <v-icon :color="isFavorite ? 'red' : undefined">
              {{ isFavorite ? "mdi-heart" : "mdi-heart-outline" }}
            </v-icon>
          </v-btn>
          <v-btn @click="logout" text>ログアウト</v-btn>
        </template>
        <template v-else>
          <v-btn to="/login" text>ログイン</v-btn>
        </template>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuthStore } from "./store/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const isFavorite = ref(false);

    const logout = () => {
      authStore.clearToken();
      router.push("/login");
    };

    const toggleFavorite = () => {
      isFavorite.value = !isFavorite.value;
    };

    return {
      authStore,
      logout,
      isFavorite,
      toggleFavorite,
    };
  },
});
</script>
