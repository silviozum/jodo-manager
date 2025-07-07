<script setup>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";
import { reactive, onMounted, onBeforeUnmount } from 'vue';

// services
import releasesService from "@/services/releasesService"

const releases = reactive({
  text: '',
  video: '',
  title: '',
  content_url: '',
  alertError: false,
  alertErrorMessage: '',
  alertSuccess: false,
  alertSuccessMessage: '',
  isLoading: false, // NOVO: controle do loading
});

let isMounted = true;

async function getReleases() {
  try {
    const list = await releasesService.list();
    if (isMounted && list) {
      const uniqueRelease = list.find(item => item.id === 2);
      if (uniqueRelease) {
        releases.text = uniqueRelease.text;
        releases.video = uniqueRelease.video;
        releases.title = uniqueRelease.title;
        releases.content_url = uniqueRelease.content_url;
      }
    }
  } catch (e) {
    console.error("Erro ao carregar releases:", e);
  }
}

async function saveReleases() {
    try {
        const data = {
            text: releases.text,
            video: releases.video,
            title: releases.title,
            content_url: releases.content_url,
            published: '1',
        }
        await releasesService.create(data);
        releases.alertSuccess = true;
        releases.alertSuccessMessage = 'Salvo com sucesso';
        releases.isLoading = true; // INICIO DO LOADING
        setTimeout(() => {
            releases.isLoading = false;
            releases.alertSuccess = false;
            releases.alertSuccessMessage = '';
        }, 1000);
  } catch (e) {
    console.error("Erro ao salvar releases:", e);
    releases.alertError = true;
    releases.alertErrorMessage = 'tem algum campo errado ai';
  }
}

onMounted(() => {
  getReleases();
});

onBeforeUnmount(() => {
  isMounted = false;
});
</script>

<template>
  <div class="row">
    <div class="col-md-12">
      <iframe 
        v-if="releases.video"
        :src="releases.video + '?autoplay=1'"
        width="100%"
        height="380"
        frameborder="0"
        allowtransparency="true"
        allow="autoplay; encrypted-media">
      </iframe>
    </div>

    <div class="col-md-12">
      <div>
        <label class="form-control-label">Video:</label>
        <argon-input type="text" v-model="releases.video" />
      </div>
      <div>
        <label class="form-control-label">Titulo:</label>
        <argon-input type="text" v-model="releases.title" />
      </div>
      <div>
        <label class="form-control-label">URL do Conteudo:</label>
        <argon-input type="text" v-model="releases.content_url" />
      </div>
      <div>
        <label class="form-control-label">Texto:</label>
        <textarea v-model="releases.text" style="height: 150px; width: 100%;"></textarea>
      </div>
      <div>
        <argon-button
          :disabled="releases.isLoading" 
          color="success"
          size="sm"
          class="ms-auto d-flex align-items-center"
          @click="saveReleases"
        >
          <!-- SVG de loading -->
          <svg v-if="releases.isLoading" class="me-2" width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
            <g fill="none" fill-rule="evenodd">
              <g transform="translate(1 1)" stroke-width="2">
                <circle stroke-opacity=".3" cx="18" cy="18" r="18"/>
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"/>
                </path>
              </g>
            </g>
          </svg>
          <span>Salvar</span>
        </argon-button>
      </div>

      <argon-alert class="mt-10" color="danger" v-if="releases.alertError">{{ releases.alertErrorMessage }}</argon-alert>
      <argon-alert class="mt-10" color="success" v-if="releases.alertSuccess">{{ releases.alertSuccessMessage }}</argon-alert>
    </div>
  </div>
</template>
