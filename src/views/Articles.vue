<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter(); 

import ArgonButton from "@/components/ArgonButton.vue";
import articleService from "@/services/articleService"
const articles = ref([])

async function getList () {
  const list = await articleService.list()
  articles.value = list
}

function updateArticle (id) {
  router.push(`/article/${id}`)
}

async function createArticle() {
  const article = await articleService.create()
  console.log(article)
  router.push(`/article/${article.articleId}`)
}

onBeforeMount(() => {
 getList()
});

</script>
<template>
  <div class="card">
    <div class="card-header pb-0 mb-4">
      <argon-button color="success" size="sm" class="ms-auto" @click="createArticle">Criar Artigo</argon-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Artigo
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Autor
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Status
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(article, index) in articles" :key="index">
              <td style="white-space: inherit;">
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      :src="article.img_featured"
                      class="avatar avatar-sm me-3 avatar-article"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center" style="width: 33%;">
                    <h6 class="mb-0">{{ article.title }}</h6>
                    <p class="text-xs text-secondary mb-0 description-article">
                      {{ article.description }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{article.name}}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success" v-if="article.published">Publicado</span>
                <span class="badge badge-sm bg-gradient-warning" v-else>Não Publicado</span>
              </td>
              <td class="align-middle">
                <argon-button color="success" size="sm" class="ms-auto" @click="updateArticle(article.id)">Editar</argon-button>
              </td>
            </tr>




          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.avatar-article {
  width: 250px !important;
  height: 150px !important;
}
</style>