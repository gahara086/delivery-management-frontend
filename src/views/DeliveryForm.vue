<template>
  <v-container>
    <v-card>
      <v-card-title>新規配送登録</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm" ref="form">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.recipientName"
                label="受取人"
                :rules="[(v) => !!v || '受取人は必須です']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.address"
                label="住所"
                :rules="[(v) => !!v || '住所は必須です']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="form.status"
                :items="statuses"
                label="ステータス"
                :rules="[(v) => !!v || 'ステータスは必須です']"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              type="submit"
              :loading="loading"
              :disabled="loading"
            >
              保存
            </v-btn>
            <v-btn @click="$router.back()">キャンセル</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import apiClient from "../plugins/axios";

export default defineComponent({
  setup() {
    const router = useRouter();
    const form = ref({ recipientName: "", address: "", status: "Pending" });
    const loading = ref(false);
    const statuses = ["Pending", "Shipped", "Delivered"];

    const submitForm = async () => {
      try {
        loading.value = true;
        await apiClient.post("/deliveries", form.value);
        router.push("/deliveries");
      } catch (error) {
        console.error("保存エラー:", error);
        alert("保存に失敗しました");
      } finally {
        loading.value = false;
      }
    };

    return { form, statuses, loading, submitForm };
  },
});
</script>
