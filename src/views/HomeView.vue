<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import SectionBannerStarOnGitHub from "@/components/SectionBannerStarOnGitHub.vue";
import BusinessService from "@/services/business-service";

const businesses = ref([]);

onMounted(() => {
  listAllBusiness();
});

const listAllBusiness = async () => {
  try {
    const response = await BusinessService.listAllBusiness();
    businesses.value = response;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Restaurantes"
        main
      >
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <div
          v-for="business in businesses"
          :key="business.id"
          class="bg-gray-800 p-4 shadow-lg rounded-lg"
        >
          <div v-if="business.photo" class="mb-4">
            <img
              :src="business.photo"
              alt="Foto do negócio"
              class="w-full h-auto rounded-lg"
            />
          </div>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-white">
              {{ business.name }}
            </h3>
            <div class="flex items-center">
              <template v-for="star in 5" :key="star">
                <svg
                  class="w-5 h-5 fill-current"
                  :class="{
                    'text-yellow-400': star <= business.averageRating,
                    'text-gray-400': star > business.averageRating,
                  }"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 0L12.2455 6.18498H19.0909L13.6364 10.0005L15.882 16.1855L10 12.4545L4.11794 16.1855L6.36353 10.0005L0.909058 6.18498H7.75448L10 0Z"
                  />
                </svg>
              </template>
            </div>
          </div>
          <p class="text-gray-400">
            {{ business.location.address }}, {{ business.location.city }},
            {{ business.location.state }}
          </p>
          <p class="text-gray-400">Telefone: {{ business.phone }}</p>
          <div>
            <p class="text-sm font-medium mt-2 text-gray-300">Categorias:</p>
            <ul class="list-disc list-inside">
              <li
                v-for="category in business.categories"
                :key="category.categoryId"
                class="text-gray-300"
              >
                {{ category.category.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
