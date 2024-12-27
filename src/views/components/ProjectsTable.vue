<script setup>
import { useRouter } from 'vue-router';
 defineProps({
  list: {
    required: true
  },
});

const router = useRouter(); 

function eventPage(id) {
  router.push(`/event/${id}`)
}
</script>
<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Projects table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Evento
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Publicado
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Local
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                Data
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, index) in list" :key="index">
              <td>
                <div class="d-flex px-2">
                  <div>
                    <img
                      :src="event.image"
                      class="avatar avatar-sm  me-2 avatar-propagang"
                      alt="spotify"
                    />
                  </div>
                  <div class="my-auto">
                    <h6 class="mb-0 text-sm">{{ event.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0" v-if="event.published"><i class="ni ni-send"></i> Publicado</p>
                <p class="text-sm font-weight-bold mb-0" v-else><i class="ni ni-send"></i> Não Publicado</p>
              </td>
              <td>
                <span class="text-xs font-weight-bold"><i class="ni ni-pin-3"></i> {{event.location}}</span>
              </td>
              <td class="align-middle text-center">
                <p class="text-sm font-weight-bold mb-0">{{ event.when }}</p>
              </td>
              <td class="align-middle">
                <button class="btn btn-primary" @click="eventPage(event.id)">ver infos</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.avatar-propagang {
    width: 90px !important;
    height:90px !important;
    font-size: 0.875rem;
}
</style>