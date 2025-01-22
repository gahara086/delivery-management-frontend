<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-h5 text-center pa-4">
            ログイン
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="username"
                label="ユーザー名"
                prepend-icon="mdi-account"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="パスワード"
                prepend-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                required
              ></v-text-field>
              <v-btn
                color="primary"
                block
                class="mt-4"
                type="submit"
                :loading="loading"
              >
                ログイン
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import apiClient from "../plugins/axios";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const username = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const loading = ref(false);
    const router = useRouter();
    const authStore = useAuthStore();

    const handleLogin = async () => {
      try {
        loading.value = true;
        const response = await apiClient.post("/auth/login", {
          username: username.value,
          password: password.value,
        });

        authStore.setToken(response.data.token);
        router.push("/deliveries");
      } catch (error) {
        console.error("ログインエラー:", error);
        alert("ログインに失敗しました");
      } finally {
        loading.value = false;
      }
    };

    return {
      username,
      password,
      showPassword,
      loading,
      handleLogin,
    };
  },
});
</script>
