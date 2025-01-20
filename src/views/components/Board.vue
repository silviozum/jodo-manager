<script setup>
import boardService from "@/services/boardService";
import { ref, onBeforeMount } from "vue";
import ArgonButton from "@/components/ArgonButton.vue";

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const boardList = ref(null)
const messageCreated = ref('')
const componentKey = ref(0)

const getBoard = async () => {
    const list = await boardService.list()
    boardList.value = list.board
}

function handlePost(delta) {
    messageCreated.value = delta
}

async function saveMessage() {
    if (messageCreated.value) {
      const data = {
          content: messageCreated.value
      }
      const newMessage = await boardService.create(data)
      if (newMessage)
      boardList.value.unshift(newMessage)
      componentKey.value += 1 
      messageCreated.value = '' 
    }
}

onBeforeMount(() => {
    getBoard();
});

</script>
<template>
  <main>
    <div class="card p-3 mb-4">
        <h6 class="ms-2 mb-3">JWEETER!!!</h6>
        <div>
            <QuillEditor
            :key="componentKey"
            theme="snow"
            style="max-height:2000px; min-height: 100px;" 
            contentType="html" 
            @update:content="handlePost"
            />
            <argon-button color="secondary" size="sm" class="mt-3" @click="saveMessage">Postar</argon-button>
        </div>
    </div>
    <div class="board-container card p-2">
        <div class="card shadow-lg mt-3" v-for="(message, index) in boardList" :key="index">
        <div class="card-body p-3">
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar position-relative">
                <img
                  :src="message.user_photo"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                  style="border-radius: 50%;"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <span class="mb-1">{{message.user_name}}</span>
              </div>
            </div>
            <div v-html="message.content" class="board-message  mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="css" scoped>
.board-message {
    opacity: 0.6;
}
.board-container {
    max-height: 800px;
    overflow: auto;
    overflow-x: hidden;
}
</style>
