<script setup>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue";
import CategoriesList from "./components/CategoriesList.vue";
import { ref, onMounted } from 'vue';


// services
import categoriesService from "@/services/categoriesService"
import eventsService from "@/services/eventsService"


// tags
const categories = ref([]);
const events = ref([])

const categoryObjkt = (data) => {
  return {
    icon: {
      component: 'ni ni-tag',
      background: 'dark',
    },
    id: data.id,
    label: data.title,
    description: typeof data.author!== 'number' ? `Criado por <strong>${data.author}</strong>` : `Criado por <strong> voce   u.u'</strong>`
  }
}

async function getCategories() {
  const list = await categoriesService.list();
  categories.value = list.map(category => { return categoryObjkt(category)});
}

const handleNewTag = async (value) => {
  const createTag = await categoriesService.create({ title: value})
  categories.value.push(categoryObjkt(createTag))
}

const handleDeleteTag = async (id) => {
  const deletedTag = await categoriesService.remove(id)
  if (deletedTag.tag?.message) {
    categories.value = categories.value.filter(category => category.id !== id)
  }
}

// events
async function getFeaturedEvents() {
  const list = await eventsService.list()
  console.log(list.events)
  events.value = list.events.map(item => item)
} 
onMounted(() => {
    getCategories();
    getFeaturedEvents();
});


import BR from "@/assets/img/icons/flags/BR.png";

const sales = {
  us: {
    country: "United States",
    sales: 2500,
    value: "$230,900",
    bounce: "29.9%",
    flag: BR,
  },
  germany: {
    country: "Germany",
    sales: "3.900",
    value: "$440,000",
    bounce: "40.22%",
    flag: BR,
  },
  britain: {
    country: "Great Britain",
    sales: "1.400",
    value: "$190,700",
    bounce: "23.44%",
    flag: BR,
  },
  brasil: {
    country: "Brasil",
    sales: "562",
    value: "$143,960",
    bounce: "32.14%",
    flag: BR,
  },
};
</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Today's Money"
              value="$53,000"
              description="<span
                class='text-sm font-weight-bolder text-success'
                >+55%</span> since yesterday"
              :icon="{
                component: 'ni ni-money-coins',
                background: 'bg-gradient-primary',
                shape: 'rounded-circle',
              }"
              backgroundImageUrl="https://pbs.twimg.com/media/GR_MmPbWYAAHgNZ?format=jpg&name=large"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Today's Users"
              value="2,300"
              description="<span
                class='text-sm font-weight-bolder text-success'
                >+3%</span> since last week"
              :icon="{
                component: 'ni ni-world',
                background: 'bg-gradient-danger',
                shape: 'rounded-circle',
              }"
              backgroundImageUrl="https://ucarecdn.com/82c28675-2a32-4d29-8c4d-2cfc624b4484/photo_20240919_210246.jpg"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="New Clients"
              value="+3,462"
              description="<span
                class='text-sm font-weight-bolder text-danger'
                >-2%</span> since last quarter"
              :icon="{
                component: 'ni ni-paper-diploma',
                background: 'bg-gradient-success',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Sales"
              value="$103,430"
              description="<span
                class='text-sm font-weight-bolder text-success'
                >+5%</span> than last month"
              :icon="{
                component: 'ni ni-cart',
                background: 'bg-gradient-warning',
                shape: 'rounded-circle',
              }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart
                id="chart-line"
                title="Mais Lidos"
                description="<i class='fa fa-arrow-up text-success'></i>
      <span class='font-weight-bold'>4% more</span> in 2021"
                :chart="{
                  labels: [
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  datasets: [
                    {
                      label: 'Mobile Apps',
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    },
                  ],
                }"
              />
            </div>
          </div>
          <div class="col-lg-5">
            <carousel :events="events"/>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-7 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Artigos</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(sale, index) in sales" :key="index">
                      <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="sale.flag" alt="Country flag" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">
                              Country:
                            </p>
                            <h6 class="mb-0 text-sm">{{ sale.country }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Sales:</p>
                          <h6 class="mb-0 text-sm">{{ sale.sales }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Value:</p>
                          <h6 class="mb-0 text-sm">{{ sale.value }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">Bounce:</p>
                          <h6 class="mb-0 text-sm">{{ sale.bounce }}</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <categories-list
              :categories="categories"
              @new-tag="handleNewTag"
              @delete-tag="handleDeleteTag"
              :title="'Tag'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
