<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
const router = useRouter(); 
const route = router.currentRoute.value; 

import eventBus from '@/utils/eventBus';
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import EventResume from "./components/EventResume.vue";

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const body = document.getElementsByTagName("body")[0];
import eventsService from "@/services/eventsService"

const event = ref([])

async function getEvent(eventId) {
  const list = await eventsService.getEvent(eventId)
  event.value = list.data[0] || []
}



const store = useStore();

function handlePost(delta) {
    event.value.info = delta
}

async function updateEvent() {
    const update = await eventsService.update(event.value)
    if (update.success) {
        eventBus.emit('event', update.message.message);
        router.push('/events')
    }
}

async function removeEvent(id) {
    const update = await eventsService.remove(id)
    if (update.success) {
        eventBus.emit('event', update.message.message);
        router.push('/events')
    }
}


onMounted(() => {
  const eventId = route.params.id
  store.state.isAbsolute = true;
  setNavPills();
  getEvent(eventId);
  setTooltip();
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
        class="page-header min-height-300"
        style="
          background-image: url(&quot;https://ucarecdn.com/60fcc27c-c20d-4c1b-992f-a95e63c601fa/JODOLOGOBRANCO.pngquot;);
          background-position: center;
        "
      >
        <span class="mask bg-gradient-success opacity-6">
            <strong class="ms-4" style="font-size: 30px;">{{ event.name }}</strong>
        </span>
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">editar\criar Evento</p>
                <argon-button color="success" size="sm" class="ms-auto" @click="updateEvent"
                  >Salvar</argon-button
                >
                <argon-button color="danger" size="sm" class="ms-3" @click="removeEvent(event.id)"
                  >Remover</argon-button
                >
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">User Information</p>
              <div class="row">
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Nome do vento</label
                  >
                  <argon-input type="text" v-model="event.name"/>
                </div>
                <div class="col-md-6">
                    <i class="ni ni-pin-3"></i>
                  <label for="example-text-input" class="form-control-label"
                    >Local</label
                  >
                  <argon-input type="email" v-model="event.location" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Imagem</label
                  >
                  <input class="form-control" type="text" v-model="event.image" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >imagem thumb</label
                  >
                  <argon-input type="text" v-model="event.image_thumb" />
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Informaçoes</p>
              <div class="row">
                <div class="col-md-12">
                    <div>
                        <QuillEditor 
                        theme="snow" 
                        toolbar="full" 
                        style="height:600px" 
                        contentType="html" 
                        :content="event.info"
                        @update:content="handlePost"

                        />
                    </div>
                </div>
              </div>
                <div class="row mt-4">
                    <div class="col-md-12">
                        <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="event.published" :checked="event.published">
                        <label class="custom-control-label" for="customCheck1">Publicar</label>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="example-date-input" class="form-control-label">Data do Evento</label>
                            <input class="form-control" type="date"  id="example-date-input" v-model="event.when">
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <event-resume :data="event"/>
        </div>
      </div>
    </div>
  </main>
</template>
