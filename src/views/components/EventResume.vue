<script setup>
defineProps({
  data: {
    required:true
  },
});
</script>
<template>
    <div style="display: flex;">
      <div class="card">
        <img class="card-img-top" :src="data.image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ data.name }}</h5>
          <p class="card-text"><i class="ni ni-pin-3"></i> {{data.location}}</p>
          <p class="card-text"><i class="ni ni-pin-3"></i> {{data.when}}</p>
          <p class="card-text" v-if="data.published"><i class="ni ni-send"></i> Publicado</p>
          <p class="card-text" v-else><i class="ni ni-send"></i> Não Publicado</p>
          <p class="card-text">----------------------------------------</p>
          <div v-html="data.info"></div>
        </div>
      </div>
    </div>
  
  </template>
  