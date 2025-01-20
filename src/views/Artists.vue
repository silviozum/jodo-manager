<script setup>
import { ref, onMounted } from 'vue';
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import { useRouter } from 'vue-router';
import ArgonButton from "@/components/ArgonButton.vue";
const router = useRouter(); 

//services 
import artistService from "@/services/artistService";

const artists = ref([]);

async function getArtists () {
  const list = await artistService.list()
  if (list) artists.value = list.artists
}

function handleArtist (id) {
  router.push(`/artist/${id}`)
}

async function create () {
 const createArtist = await artistService.create()
 const artistsId = createArtist.artist[0]
 router.push(`/artist/${artistsId}`)
}
onMounted(() => {
    getArtists()
});
</script>
<template>
  <div class="container-fluid">
    <div class="row">
        <div class="d-flex align-items-center mb-5">
                <argon-button color="success" size="sm" class="ms-3" @click="create">Criar</argon-button>
              </div>
        <div v-for="(artist, index) in artists" class="col-lg-3 col-md-6 col-12" :key="index">
            <mini-statistics-card
              :title="artist.name"
              :value="artist.spotify_data"
              :backgroundImageUrl="artist.img_featured"
              @click="handleArtist(artist.id)"
            />
          </div>        
        </div>
  </div>
</template>
