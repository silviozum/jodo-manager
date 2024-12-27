<!--
=========================================================
* Vue Argon Dashboard 2 - v4.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-argon-dashboard
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-->
<script setup>
import { computed, onBeforeMount, ref} from "vue";
import { useStore } from "vuex";
import Sidenav from "./examples/Sidenav";
import ArgonAlert from "@/components/ArgonAlert.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import { activateDarkMode } from "@/assets/js/dark-mode";
import eventBus from './utils/eventBus';


const store = useStore();
const isNavFixed = computed(() => store.state.isNavFixed);
const darkMode = computed(() => store.state.darkMode);
const isAbsolute = computed(() => store.state.isAbsolute);
const showSidenav = computed(() => store.state.showSidenav);
const layout = computed(() => store.state.layout);
const showNavbar = computed(() => store.state.showNavbar);
const showFooter = computed(() => store.state.showFooter);

const setSidebarType = (type) => store.commit("sidebarType", type);

const alert = ref(false)
const alertMessage = ref('')

const updateEvent = (payload) => {
    alert.value = true
    alertMessage.value = payload

    setTimeout(() => {
      alert.value = false
      alertMessage.value = ''
      }, 3000);
  };

onBeforeMount(() => {
  setSidebarType("bg-default");
  activateDarkMode();
  eventBus.on('event', updateEvent);
});

const navClasses = computed(() => {
  return {
    "position-sticky bg-white left-auto top-2 z-index-sticky":
      isNavFixed.value,
    "position-sticky bg-default left-auto top-2 z-index-sticky":
      isNavFixed.value && darkMode.value,
    "position-absolute px-4 mx-0 w-100 z-index-2": isAbsolute.value,
    "px-0 mx-4": !isAbsolute.value,
  };
});
</script>
<template>
  <div
    v-show="layout === 'landing'"
    class="landing-bg h-100 bg-gradient-primary position-fixed w-100"
  ></div>

  <sidenav v-if="showSidenav" />

  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <!-- nav -->

    <navbar :class="[navClasses]" v-if="showNavbar" />

    <router-view />

    <app-footer v-show="showFooter" />

    <argon-alert class="mt-10" color="warning" v-if="alert">{{alertMessage}}</argon-alert>
  </main>
</template>
