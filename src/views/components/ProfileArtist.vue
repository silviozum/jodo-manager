<script setup>
defineProps({
  artist: {
    type: String,
    default: () => {},
  },

});
</script>
<template>
    <div class="card card-profile">
      <img
        :src="artist.profile_pic"
        alt="Image placeholder"
        class="card-img-top"
      />
      <div class="row justify-content-center">
        <div class="col-4 col-lg-4 order-lg-2">
          <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
            <a href="javascript:;">
              <img
                :src="artist.img_logo"
                class="rounded-circle img-fluid border border-2 border-white"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
        <div class="d-flex justify-content-between">
          <a
            href="javascript:;"
            class="btn btn-sm btn-info mb-0 d-none d-lg-block"
            >Connect</a
          >
          <a
            href="javascript:;"
            class="btn btn-sm btn-info mb-0 d-block d-lg-none"
          >
            <i class="ni ni-collection"></i>
          </a>
          <a
            href="javascript:;"
            class="btn btn-sm btn-dark float-right mb-0 d-none d-lg-block"
            >Message</a
          >
          <a
            href="javascript:;"
            class="btn btn-sm btn-dark float-right mb-0 d-block d-lg-none"
          >
            <i class="ni ni-email-83"></i>
          </a>
        </div>
      </div>
      <div class="card-body pt-0">
        <div class="row">
          <div class="col">
            <div class="d-flex justify-content-center">
                
              <div class="d-grid text-center">
                <span class="text-lg font-weight-bolder"><font-awesome-icon class="social-data" :icon="['fab', 'spotify']" /> </span>
                <span class="text-sm opacity-8">{{artist.spotify_data}}</span>
              </div>
              <div class="d-grid text-center mx-4">
                <span class="text-lg font-weight-bolder"><font-awesome-icon class="social-data" :icon="['fab', 'soundcloud']" /></span>
                <span class="text-sm opacity-8">{{artist.soundcloud_data}}</span>
              </div>
              <div class="d-grid text-center">
                <span class="text-lg font-weight-bolder"><font-awesome-icon class="social-data" :icon="['fab', 'youtube']" /></span>
                <span class="text-sm opacity-8">{{artist.youtube_data}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <h5>
            {{ artist.name }}
          </h5>
          <div class="mt-5">
            <div v-html="artist.embed_song"></div>
          </div>
          <!-- <div class="h6 mt-4">
            <i class="ni business_briefcase-24 mr-2"></i>Solution Manager -
            Creative Tim Officer
          </div>
          <div>
            <i class="ni education_hat mr-2"></i>University of Computer Science
          </div> -->
        </div>
      </div>
    </div>
  </template>
  