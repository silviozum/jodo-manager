<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter(); 

import ArgonButton from "@/components/ArgonButton.vue";
import archivesService from "@/services/archivesService"
const archives = ref([])

async function getList () {
  const list = await archivesService.list()
  archives.value = list.archives
}

// function updateArticle (id) {
//   router.push(`/article/${id}`)
// }

async function createArchive() {
  const archive = await archivesService.create()
  router.push(`/archive/${archive.archiveId}`)
}

onBeforeMount(() => {
 getList()
});

</script>
<template>
  <div>
    <div class="p-3">
        <argon-button color="success" size="sm" class="ms-auto" @click="createArchive">Criar Arquivo</argon-button>
    </div>
    <div class="row p-3">
      <div v-for="(archive, index) in archives" :key="index" class="card col-3 p-3 m-2">
        <img class="card-img-top" :src="archive.img_featured" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ archive.name }}</h5>
          <p class="card-text" v-if="archive.published"><i class="ni ni-send"></i> Publicado</p>
          <p class="card-text" v-else><i class="ni ni-send"></i> Não Publicado</p>
          <a :href="`/archive/${archive.id}`" class="btn btn-primary">ver Infos</a>
        </div>
      </div>
  
    </div>
  </div>
</template>
<style lang="css" scoped>
</style>