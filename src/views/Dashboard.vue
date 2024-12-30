<script setup>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import Carousel from "./components/Carousel.vue";
import CategoriesList from "./components/CategoriesList.vue";
import Board from "./components/Board.vue";
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
              backgroundImageUrl="https://ucarecdn.com/1e2e8ca2-e618-4333-b57b-2be93847f7d4/Screenshotfrom20241229034050.png"
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
              backgroundImageUrl="https://pbs.twimg.com/media/GR_MmPbWYAAHgNZ?format=jpg&name=large"
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-5">
            <categories-list
              :categories="categories"
              @new-tag="handleNewTag"
              @delete-tag="handleDeleteTag"
              :title="'Tag'"
            />
          </div>
          <div class="col-lg-7">
            <carousel :events="events"/>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-5 mb-lg">
            <Board/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
