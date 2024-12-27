<script setup>
import authService from "@/services/authService";
import { ref, onBeforeMount } from "vue";

const userList = ref(null)

const getUsers = async () => {
    const list = await authService.getUsers()
    userList.value = list
}

onBeforeMount(() => {
    getUsers();
});

</script>
<template>
  <main>

      <div class="card shadow-lg mt-3" v-for="(user, index) in userList" :key="index">
        <div class="card-body p-3">
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  :src="user.photo"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                  style="border-radius: 50%;"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">{{user.name}}</h5>
                <p class="mb-0 font-weight-bold text-sm">{{user.email}}</p>
              </div>
            </div>
            <div
              class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0"
            >
              <div class="nav-wrapper position-relative end-0">
                <ul
                  class="p-1 bg-transparent nav nav-pills nav-fill"
                  role="tablist"
                >
                  <li class="nav-item">
                    <a
                      class="px-0 py-1 mb-0"
                      target="_blank"
                      :href="user.social_network"
                      aria-selected="true"
                    >
                    <i class="ni ni-world-2"></i>
                      <span class="ms-1"> Social</span>
                    </a>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  </main>
</template>
