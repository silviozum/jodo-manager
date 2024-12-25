<script setup>
import { onBeforeMount } from 'vue';

const props = defineProps({
  events: {
    required: true
  },
});

onBeforeMount(() => {
  console.log(props.events)
})


</script>
<template>
  <div class="card card-carousel overflow-hidden h-100 p-0">
    <div
      id="carouselExampleCaptions"
      class="carousel slide h-100"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner border-radius-lg h-100" >
        <div
            v-for="(event,index) in events"
            :key="index"
            class="carousel-item h-100 active"
            :style="{
              backgroundImage: `url(${event.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }"
        >
        <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
          <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
              <i class="ni ni-camera-compact text-dark opacity-10"></i>
          </div>
            <h5 class="text-white mb-1">{{ event.name }}</h5>
            <p>
              <i class="ni ni-square-pin"></i>
              {{ event.location }}
            </p>
          </div>
        </div>

      </div>
      <button
        class="carousel-control-prev w-5 me-3"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next w-5 me-3"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>
<style lang="css" scoped>
.custom-bg-opc {
  position: relative;
}
.custom-bg-opc:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color:rgba(255, 255, 255, 0.4);
  backdrop-filter: brightness(0.19) contrast(104%);
}
</style>
