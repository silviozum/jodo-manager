<script setup>
// import AuthorsTable from "./components/AuthorsTable.vue";
import ProjectsTable from "./components/ProjectsTable.vue";
import { onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter(); 
import ArgonButton from "@/components/ArgonButton.vue";
//service
import eventsService from "@/services/eventsService"

const events = ref([])

async function getEvents() {
  const list = await eventsService.list()
  events.value = list.events.map(item => item)
} 

async function createEvent() {
  const data = await eventsService.create()
  if (data?.success) {
    router.push(`/event/${data.event.id}`)
  } 
} 
onMounted(() => {
    getEvents();
});


</script>
<template>
  <div class="py-4 container-fluid">
    <argon-button color="success" size="sm" class="ms-auto" @click="createEvent">Criar Evento</argon-button>
    <!-- <div class="row">
      <div class="col-12">
        <authors-table />
      </div>
    </div> -->
    <div class="mt-4 row">
      <div class="col-12">
        <projects-table  :list="events"/>
      </div>
    </div>
    <!-- <h3>Próximos Eventos</h3>
    <div style="display: flex;">
      <div v-for="(event, index) in events" :key="index" class="card col-4 p-3 m-1">
        <img class="card-img-top" :src="event.image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ event.name }}</h5>
          <p class="card-text"><i class="ni ni-pin-3"></i> {{event.location}}</p>
          <p class="card-text" v-if="event.published"><i class="ni ni-send"></i> Publicado</p>
          <p class="card-text" v-else><i class="ni ni-send"></i> Não Publicado</p>
          <a :href="`/event/${event.id}`" class="btn btn-primary">ver Infos</a>
        </div>
      </div>
    </div> -->
    
  </div>
</template>
