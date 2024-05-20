<script setup>
import { mdiTableOff, mdiAccountGroup } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { computed, ref, onMounted } from "vue";
import { mdiEye, mdiTrashCan, mdiPlusBox } from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserService from "@/services/user-service";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";

const items = ref([]);

const search = ref("");

const isModalDangerActive = ref(false);

const perPage = ref(10);

const currentPage = ref(0);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const filteredItems = computed(() => {
  return items.value.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});

onMounted(() => {
  listAll();
});

const listAll = () => {
  UserService.listAll().then(
    (response) => {
      items.value = response;
    },
    (error) => {
      console.log(error);
    }
  );
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountGroup"
        title="Usuários"
        main
        hasSlot="false"
      >
      </SectionTitleLineWithButton>

      <CardBox class="mb-6 last:mb-0" is-hoverable>
        <BaseLevel>
          <BaseLevel type="justify-start">
            <div class="text-center md:text-left space-y-2">
              <FormField>
                <FormControl
                  v-model="search"
                  type="text"
                  placeholder="Buscar ..."
                />
              </FormField>
            </div>
          </BaseLevel>
        </BaseLevel>
      </CardBox>

      <CardBox class="mb-6" has-table>        
        <CardBoxModal
          v-model="isModalDangerActive"
          title="Confirma"
          button="danger"
          has-cancel          
        >
          <p>Confirmar a exclusão do usuario</p>          
        </CardBoxModal>

        <table v-if="filteredItems.length > 0">
          <thead>
            <tr>
              <th />
              <th>Nome</th>
              <th>Usuário</th>
              <th>Acesso</th>
              <th>Ativo</th>
              <th>Dt. Registro</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in filteredItems" :key="client.id">
              <td class="border-b-0 lg:w-20">
                <div>
                  <img
                    :src="client.photoUrl"
                    :alt="username"
                    class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
                  />
                </div>
              </td>
              <td data-label="Nome">
                {{ client.firstName + " " + client.lastName }}
              </td>
              <td data-label="Usuário">
                {{ client.userName }}
              </td>
              <td data-label="Acesso">
                {{ client.role == "ADMIN" ? "Admin" : "Usuario" }}
              </td>
              <td data-label="Ativo">
                {{ client.active ? "Sim" : "Não" }}
              </td>
              <td data-label="Dt. Registro" class="lg:w-1 whitespace-nowrap">
                <small
                  class="text-gray-500 dark:text-slate-400"
                  :title="client.createdAt"
                  >{{
                    new Date(client.createdAt).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }}</small
                >
              </td>
              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>                  
                  <BaseButton
                    color="danger"
                    :icon="mdiTrashCan"
                    small
                    @click="isModalDangerActive = true"
                  />
                </BaseButtons>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"
          v-if="filteredItems.length > 0"
        >
          <BaseLevel>
            <BaseButtons>
              <BaseButton
                v-for="page in pagesList"
                :key="page"
                :active="page === currentPage"
                :label="page + 1"
                :color="page === currentPage ? 'lightDark' : 'whiteDark'"
                small
                @click="currentPage = page"
              />
            </BaseButtons>
            <small>Página {{ currentPageHuman }} de {{ numPages }}</small>
          </BaseLevel>
        </div>
      </CardBox>

      <NotificationBar
        color="danger"
        :icon="mdiTableOff"
        v-if="filteredItems.length == 0"
      >
        <b>Tabela vazia.</b> Nenhum registro encontrado
      </NotificationBar>

      <CardBox v-if="filteredItems.length == 0">
        <CardBoxComponentEmpty />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
