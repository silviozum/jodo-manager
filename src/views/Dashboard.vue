<script setup>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import Releases from "./components/Releases.vue";
import Carousel from "./components/Carousel.vue";
import CategoriesList from "./components/CategoriesList.vue";
import Board from "./components/Board.vue";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter(); 


// services
import categoriesService from "@/services/categoriesService"
import eventsService from "@/services/eventsService"
import artistService from "@/services/artistService";


// tags
const categories = ref([]);
const events = ref([]);
const artists = ref([]);

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
  events.value = list.events.map(item => item)
}

// artists
async function getArtists () {
  const list = await artistService.list()
  if (list) artists.value = list.artists
}

function handleArtist (id) {
  router.push(`/artist/${id}`)
}
onMounted(() => {
    getCategories();
    getFeaturedEvents();
    getArtists()
});


</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div v-for="(artist, index) in artists" class="col-lg-3 col-md-6 col-12" :key="index">
            <mini-statistics-card
              :title="artist.name"
              :value="artist.spotify_data"
              :backgroundImageUrl="artist.img_featured"
              @click="handleArtist(artist.id)"
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
            <div class="row mt-4">
              <releases/>
            </div>
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
