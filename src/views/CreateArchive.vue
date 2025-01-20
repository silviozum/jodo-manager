<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount, ref } from "vue";
import eventBus from '@/utils/eventBus';
import { useStore } from "vuex";

const store = useStore();
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

//routes
import { useRouter } from 'vue-router';
const router = useRouter(); 
const route = router.currentRoute.value;

//service
import archivesService from "@/services/archivesService"
import categoriesService from "@/services/categoriesService";

const body = document.getElementsByTagName("body")[0];
const archive = ref([])
const tagsSelected = ref([])
const videoLink = ref( '' )
// const originDate = ref( '' )

async function getArchive(id) {
  const data = await archivesService.archive(id)
  if (!data.success) router.push('/archives')
  archive.value = data.data[0] || []

  if (archive.value.tags) {
    const tagsParsed = archive.value.tags.split(",");
    tagsSelected.value = tagsParsed
  }

  if (archive.value.video) {
    const url = archive.value.video
    getVideoLink(url)
  }

  // if (archive.value.originDate) {
  //   const origin = new Date(archive.value.originDate)
  //   originDate.value = origin.toISOString().slice(0, 16);
  // }
}

const getVideoLink = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    const videoId =  match ? match[1] : null;
    videoLink.value = 'https://www.youtube.com/embed/' + videoId
}

const tags = ref([])

async function getTags() {
  const list = await categoriesService.list();
  tags.value = list.map(item => {
    return {
      ...item,
      value: item.title
    }
  })
}

async function handleArchive() {
  archive.value.tags = tagsSelected.value.join(",")
  delete  archive.value.userId
  delete  archive.value.userName
  delete  archive.value.userPhoto
  delete  archive.value.originDate
  delete  archive.value.created_at
  const update = await archivesService.update(archive.value)
  if (update.success) {
    eventBus.emit('event', update.message.message);
    router.push('/archives')
  }
}

async function removeArchive (id) {
  const archive = await archivesService.remove(id);
  if (archive.success) {
    router.push('/archives')
    eventBus.emit('event', archive.message.message);
  }

}


onMounted(() => {
  const archiveId = route.params.id
  getArchive(archiveId);
  store.state.isAbsolute = true;
  setNavPills();
  setTooltip();
  getTags();
});
onBeforeMount(() => {
  store.state.imageLayout = "profile-overview";
  store.state.showNavbar = false;
  store.state.showFooter = true;
  store.state.hideConfigButton = true;
  body.classList.add("profile-overview");
});
onBeforeUnmount(() => {
  store.state.isAbsolute = false;
  store.state.imageLayout = "default";
  store.state.showNavbar = true;
  store.state.showFooter = true;
  store.state.hideConfigButton = false;
  body.classList.remove("profile-overview");
});
</script>
<template>
  <main>
    <div class="container-fluid">
      <div
        class="page-header min-height-500"
        :style="{
            backgroundImage: `url(${archive.img_featured})`,
            backgroundPosition: 'center',
        }"
      >
      </div>
      <div class="card shadow-lg mt-n6">
        <div class="card-body p-3">
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  :src="archive.userPhoto"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">{{ archive.userName }}</h5>
                <!-- <p class="mb-0 font-weight-bold text-sm">Public Relations</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Editar Arquivo</p>
                <argon-button color="warning" size="sm" class="ms-auto" @click="removeArchive(archive.id)">remover</argon-button>
                <argon-button color="success" size="sm" class="ms-3" @click="handleArchive">Salvar</argon-button>
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">Arquivo jodo</p>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >name</label
                  >
                  <argon-input type="text" v-model="archive.name"/>
                </div>
                <!-- <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Data de Origem</label
                  >
                  <input 
                    id="date-input" 
                    type="datetime-local" 
                    v-model="originDate" 
                    class="datePicker"
                  />
                </div> -->
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Imagem</label
                  >
                  <input class="form-control" type="text" v-model="archive.img_featured" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Imagem Thumb</label
                  >
                  <argon-input type="text" v-model="archive.img_thumb" />
                  <img :src="archive.img_thumb" width="200">
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">tags</p>
              <div class="row">
                <div class="col-md-12">
                  <div v-for="(tag, index) in tags" :key="index" class="col-md-3">
                  <div class="custom-control custom-checkbox">
                    <input 
                    type="checkbox" 
                    class="custom-control-input" 
                    :id="tag.id"
                    :value="tag.value" 
                    v-model="tagsSelected"
                    >
                    <label class="custom-control-label text-lg ms-2" :for="tag.id">{{ tag.title }}</label>
                  </div>
                </div>
                </div>
              </div>
              <div class="row" style="margin-top: 60px;">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >URL do Video</label
                  >
                  <argon-input type="text" v-model="archive.video" @change="getVideoLink(archive.video)"/>
                </div>
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >Descrição</label
                  >
                  <textarea class="form-control" v-model="archive.description" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
              </div>
              <div class="col-md-12" style="margin-top: 60px;">
                  <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="archive.published" :checked="archive.published">
                  <label class="custom-control-label text-lg" for="customCheck1">Publicar</label>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <iframe
            :src="videoLink"
            class="responsive-iframe"
          ></iframe>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="css" scoped>
.responsive-iframe {
  width: 100%; /* Ocupa toda a largura da célula */
  height: 50%; /* Ocupa toda a altura da célula */
  border: none; /* Remove a borda padrão */
}
.datePicker {
  display: block;
  border-radius: 6px;
  padding: 8px;
}
</style>
