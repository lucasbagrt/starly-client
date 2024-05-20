<script setup>
import { useAuthStore } from "@/stores/auth-module";
import { getCurrentInstance, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiLock } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { mdiAlertCircle } from "@mdi/js";
import NotificationBar from "@/components/NotificationBar.vue";

const form = reactive({
  username: "",
  password: "",
});

const message = reactive({
  data: "",
});

const notification = reactive({
  visible: false,
});

const authStore = useAuthStore();
authStore.setState();

const router = useRouter();

const showNotification = () => {
  notification.visible = true;
};

const dismissNotification = () => {
  notification.visible = false;
};

onMounted(() => {
  authStore.logout();
});

const submit = () => {
  authStore.login(form).then(
    () => {
      router.push("/");
    },
    (error) => {
      message.data =
        (error.response && error.response.data) || error.toString();
      showNotification();
    }
  );
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="dark">
      <CardBox
        class="w-11/12 md:w-7/12 lg:w-6/12 xl:w-3/12 shadow-2xl"
        is-form
        @submit.prevent="submit"
      >
        <FormField label="Usuário">
          <FormControl
            v-model="form.username"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
            placeholder="Usuário"            
          />
        </FormField>

        <FormField label="Senha">
          <FormControl
            v-model="form.password"
            :icon="mdiLock"
            type="password"
            name="password"
            autocomplete="current-password"
            placeholder="***********"            
          />
        </FormField>
        <NotificationBar
          v-if="message && message.data"
          color="danger"
          :icon="mdiAlertCircle"
          :outline="false"
          :isNewNotification="notification.visible"
          @dismiss-notification="dismissNotification"
        >
          <template v-for="item in message.data">
            <p>{{ item.Message }}</p>
          </template>
        </NotificationBar>
        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Login"
              class="w-full h-12"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
