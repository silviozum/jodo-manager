<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import SidenavItem from "./SidenavItem.vue";


const store = useStore();
const isRTL = computed(() => store.state.isRTL);

const getRoute = () => {
  const route = useRoute();
  const routeArr = route.path.split("/");
  return routeArr[1];
};
</script>
<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          to="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="isRTL ? 'لوحة القيادة' : 'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/articles"
          :class="getRoute() === 'tables' ? 'active' : ''"
          :navText="isRTL ? 'الجداول' : 'Artigos'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/artists"
          :class="getRoute() === 'billing' ? 'active' : ''"
          :navText="isRTL ? 'الفواتیر' : 'Artistas'"
        >
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/events"
          :navText="'Events'"
        >
          <template v-slot:icon>
            <i class="ni ni-app text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/archives"
          :navText="'Arquivo JODO'"
        >
          <template v-slot:icon>
            <i class="ni ni-folder-17 text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>


      <li class="nav-item">
        <sidenav-item
          to="/admins"
          :navText="'Admins'"
        >
          <template v-slot:icon>
            <i class="ni ni-user-run text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

    </ul>
  </div>

</template>
