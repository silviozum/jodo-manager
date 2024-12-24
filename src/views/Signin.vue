<script setup>
import { onBeforeUnmount, onBeforeMount, ref } from "vue";
import { activateDarkMode } from "@/assets/js/dark-mode";
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";
import authService from "@/services/authService"
const body = document.getElementsByTagName("body")[0];
const setSidebarType = (type) => store.commit("sidebarType", type);

const store = useStore();
const router = useRouter(); 
onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  store.state.darkMode = true;
  body.classList.remove("bg-gray-100");
  setSidebarType("bg-default");
  activateDarkMode();
});
onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});

const emailUser = ref(null)
const passUser = ref(null)

const alertError = ref(false)

const handleSubmit = async () => {
  const data = {
	email: emailUser.value,
	pass: passUser.value
}
  const processLogin = await authService.login(data)
  if (!processLogin.success) {
    alertError.value = processLogin.message.message
    setTimeout(() => {
      alertError.value = false
    }, 3000);
    return false
  }
  sessionStorage.setItem('jodoSafePlace', processLogin.message.user.token);
  router.push('/dashboard-default');
};

</script>
<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Loga aqui</h4>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="handleSubmit">
                    <div class="mb-3">
                      <argon-input
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        size="lg"
                        v-model="emailUser"
                      />
                    </div>
                    <div class="mb-3">
                      <argon-input
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        size="lg"
                        v-model="passUser"
                      />
                    </div>
                    <argon-switch id="rememberMe" name="remember-me"
                      >Remember me</argon-switch
                    >

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        >Sign in</argon-button
                      >
                    </div>
                  </form>
                  <argon-alert class="mt-10" color="danger" v-if="alertError">{{alertError}}</argon-alert>
                </div>
                <!-- <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="javascript:;"
                      class="text-success text-gradient font-weight-bold"
                      >Sign up</a
                    >
                  </p>
                </div> -->
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url(&quot;https://ucarecdn.com/d8371f3e-7f8e-467a-ad24-3cc3beb6a060/photo_20241223_011854.jpg&quot;);
                  background-size: cover;
                "
              >
                <img src="https://ucarecdn.com/60fcc27c-c20d-4c1b-992f-a95e63c601fa/JODOLOGOBRANCO.png">
                <span class="mask bg-gradient-success opacity-6"></span>
                <h2
                  class="text-white font-weight-bolder position-relative"
                >
                  J O D O
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
