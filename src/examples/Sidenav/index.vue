<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import SidenavList from "./SidenavList.vue";

const store = useStore();
const isRTL = computed(() => store.state.isRTL);
const layout = computed(() => store.state.layout);
const sidebarType = computed(() => store.state.sidebarType);
</script>
<template>
  <div
    v-show="layout === 'default'"
    class="min-height-300 position-absolute w-100"
  />

  <aside
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
    :class="`${isRTL ? 'me-3 rotate-caret fixed-end' : 'fixed-start ms-3'}    
      ${
        layout === 'landing' ? 'bg-transparent shadow-none' : ' '
      } ${sidebarType}`"
    id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>

      <router-link class="m-0 navbar-brand" to="/">
        <h4 style="text-align: center;">J O D O</h4>
      </router-link>
    </div>

    <hr class="mt-0 horizontal dark" />

    <sidenav-list />
  </aside>
</template>
