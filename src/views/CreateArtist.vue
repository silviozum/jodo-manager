<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount, ref } from "vue";
import { useStore } from "vuex";
import eventBus from '@/utils/eventBus';
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ProfileArtist from "./components/ProfileArtist.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
//routes
import { useRouter } from 'vue-router';
const router = useRouter(); 
const route = router.currentRoute.value;

const body = document.getElementsByTagName("body")[0];

const store = useStore();

//services
import artistService from "@/services/artistService";

const artist = ref({});

async function getArtist(id) {
  const data = await artistService.artist(id)
  console.log(data.data[0])
  if (!data.success) router.push('/artists')
  artist.value = data.data[0] || []
}

function handlePost(delta) {
    artist.value.bio = delta
}

async function removeArtists(id) {
    await artistService.remove(id);
    router.push(`/artists/`)
}

async function handleArtist () {
  const update = await artistService.update(artist.value)
  if (update.success) {
    eventBus.emit('event', update.message.message);
    router.push('/artists')
  }
}
onMounted(() => {
  const artistsId = route.params.id
  getArtist(artistsId);
  store.state.isAbsolute = true;
  setNavPills();
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
        :style="{
            backgroundImage: `url(${artist.img_featured})`,
            backgroundPosition: 'center',
        }"
      >
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <h2 class="mb-0">{{ artist.name }}</h2>
                <argon-button color="warning" size="sm" class="ms-auto" @click="removeArtists(artist.id)">remover</argon-button>
                <argon-button color="success" size="sm" class="ms-3" @click="handleArtist">Salvar</argon-button>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Nome</label
                  >
                  <argon-input type="text" v-model="artist.name" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Player</label
                  >
                  <argon-input type="text" v-model="artist.embed_song" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Imagem Cover</label
                  >
                  <input class="form-control" type="text" v-model="artist.img_featured" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Foto de Perfil</label
                  >
                  <argon-input type="text" v-model="artist.profile_pic" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Logotipo</label
                  >
                  <argon-input type="text" v-model="artist.img_logo" />
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Bio</p>
              <div class="row">
                <div class="col-md-12">
                    <div>
                        <QuillEditor 
                        theme="snow" 
                        toolbar="full" 
                        style="height:400px" 
                        contentType="html" 
                        :content="artist.bio"
                        @update:content="handlePost"

                        />
                    </div>
                </div>
            </div>
              <hr class="horizontal dark" />
              <h5 class="text-uppercase text-sm">  <font-awesome-icon class="social-data" :icon="['fab', 'spotify']" /> spotify </h5>
                <div class="row">
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Link</label
                    >
                    <argon-input type="text" v-model="artist.spotify_link" />
                    </div>
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Data Number</label
                    >
                    <argon-input type="text" v-model="artist.spotify_data" />
                    </div>
                </div>
              <hr class="horizontal dark" />
              <h5 class="text-uppercase text-sm">  <font-awesome-icon class="social-data" :icon="['fab', 'soundcloud']" /> soundcloud </h5>
                <div class="row">
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Link</label
                    >
                    <argon-input type="text" v-model="artist.soundcloud_link" />
                    </div>
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Data Number</label
                    >
                    <argon-input type="text" v-model="artist.soundcloud_data" />
                    </div>
                </div>
                <hr class="horizontal dark" />
              <h5 class="text-uppercase text-sm">  <font-awesome-icon class="social-data" :icon="['fab', 'bandcamp']" /> bandcamp </h5>
                <div class="row">
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Link</label
                    >
                    <argon-input type="text" v-model="artist.bandcamp_link" />
                    </div>
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Data Number</label
                    >
                    <argon-input type="text" v-model="artist.bandcamp_data" />
                    </div>
                </div>
                <hr class="horizontal dark" />
              <h5 class="text-uppercase text-sm">  <font-awesome-icon class="social-data" :icon="['fab', 'youtube']" /> youtube </h5>
                <div class="row">
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Link</label
                    >
                    <argon-input type="text" v-model="artist.youtube_link" />
                    </div>
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Data Number</label
                    >
                    <argon-input type="text" v-model="artist.youtube_data" />
                    </div>
                </div>
                <hr class="horizontal dark" />
              <h5 class="text-uppercase text-sm">  <font-awesome-icon class="social-data" :icon="['fab', 'instagram']" /> instagram </h5>
                <div class="row">
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Link</label
                    >
                    <argon-input type="text" v-model="artist.instagram_link" />
                    </div>
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Data Number</label
                    >
                    <argon-input type="text" v-model="artist.instagram_data" />
                    </div>
                </div>
                <hr class="horizontal dark" />
              <h5 class="text-uppercase text-sm">  <font-awesome-icon class="social-data" :icon="['fab', 'twitter']" /> x </h5>
                <div class="row">
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Link</label
                    >
                    <argon-input type="text" v-model="artist.x_link" />
                    </div>
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Data Number</label
                    >
                    <argon-input type="text" v-model="artist.x_data" />
                    </div>
                </div>
                <hr class="horizontal dark" />
              <h5 class="text-uppercase text-sm">  <font-awesome-icon class="social-data" :icon="['fab', 'tiktok']" /> tiktok </h5>
                <div class="row">
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Link</label
                    >
                    <argon-input type="text" v-model="artist.tiktok_link" />
                    </div>
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Data Number</label
                    >
                    <argon-input type="text" v-model="artist.tiktok_data" />
                    </div>
                </div>
                <hr class="horizontal dark" />
                <h5 class="text-uppercase text-sm">  <font-awesome-icon class="social-data" :icon="['fab', 'threads']" /> threads </h5>
                <div class="row">
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Link</label
                    >
                    <argon-input type="text" v-model="artist.threads_link" />
                    </div>
                    <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                        >Data Number</label
                    >
                    <argon-input type="text" v-model="artist.threads_data" />
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <profile-artist :artist="artist" />
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="css" scoped>
.social-data {
    font-size: 22px;
    margin-right: 6px;
}
</style>
