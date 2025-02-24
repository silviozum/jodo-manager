<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount, ref } from "vue";
import eventBus from '@/utils/eventBus';
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
const router = useRouter(); 
const route = router.currentRoute.value; 

import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

//services
import articleService from "../services/articleService";
import categoriesService from "@/services/categoriesService";

const body = document.getElementsByTagName("body")[0];

const store = useStore();
const article = ref([])
const tagsSelected = ref([])

async function getArticle(id) {
  const data = await articleService.article(id)
  article.value = data[0] || []

  if (article.value.tags) {
    const tagsParsed = article.value.tags.split(",");
    tagsSelected.value = tagsParsed
  }
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

async function handleArticle() {
  article.value.tags = tagsSelected.value.join(",")
  const update = await articleService.update(article.value)

  if (update.success) {
    eventBus.emit('event', update.message);
    router.push('/articles')
  }
}

async function removeArticle (id) {
  const article = await articleService.remove(id);
  if (article.success) {
    router.push('/articles')
  }

}

function handlePost(delta) {
    article.value.content = delta
}

async function handlePreview (id) {
  try {
    await handleArticle();
    const url = `https://jodo.com.br/preview/${id}`
    window.open(url, '_blank');
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  store.state.isAbsolute = true;
  const articleId = route.params.id
  setNavPills();
  setTooltip();
  getArticle(articleId);
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
            backgroundImage: `url(${article.img_featured})`,
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
                  :src="article.photo"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">{{ article.name }}</h5>
                <p class="mb-0 font-weight-bold text-sm">author</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Editar Artigo</p>
                <argon-button color="warning" size="sm" class="ms-auto" @click="removeArticle(article.id)">remover</argon-button>
                <argon-button color="success" size="sm" class="ms-3" @click="handleArticle">Salvar</argon-button>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-8">
                  <label for="example-text-input" class="form-control-label"
                    >Titulo</label
                  >
                  <argon-input type="text" v-model="article.title" />
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Descrição</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" v-model="article.description"></textarea>
                    </div>
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Imagem Capa</label
                  >
                  <input class="form-control" type="text" v-model="article.img_featured" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Imagem Thumb</label
                  >
                  <argon-input type="text" v-model="article.img_thumb"  />
                </div>
              </div>
              <p class="text-uppercase text-sm">Tags</p>
              <div class="row">
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
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">COnteudo</p>
              <div class="row">
                <div class="col-md-12">
                  <div>
                        <QuillEditor 
                        theme="snow" 
                        toolbar="full" 
                        style="height:800px" 
                        contentType="html" 
                        :content="article.content"
                        @update:content="handlePost"

                        />
                    </div>
                </div>
              </div>
              <hr class="horizontal dark" />
              <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="article.published" :checked="article.published">
                  <label class="custom-control-label text-lg" for="customCheck1">Publicar</label>
                  <argon-button color="info" size="sm" class="ms-3" @click="handlePreview(article.id)">Preview</argon-button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="css" scoped>
.tags-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 3 colunas de tamanho igual */
  gap: 16px; /* Espaçamento entre as colunas e linhas */
}
</style>
