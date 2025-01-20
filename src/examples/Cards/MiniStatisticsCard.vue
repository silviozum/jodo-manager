<script setup>
defineProps({
  rowReverse: {
    type: Boolean,
    default: false,
  },
  title: {
    type: [Object, String],
    text: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  description: {
    type: String,
    default: "",
  },
  value: {
    type: [Object, String, Number],
    text: {
      type: [String, Number],
    },
    color: {
      type: String,
    },
  },
  percentage: {
    type: [Object, String],
    value: {
      type: String,
    },
    color: {
      type: String,
    },
    default: () => ({
      color: "success",
    }),
  },
  icon: {
    type: [String, Object],
    component: {
      type: String,
    },
    background: {
      type: String,
    },
    shape: {
      type: String,
    },
    default: () => ({
      background: "bg-white",
      shape: " border-radius-md",
    }),
  },
  classContent: {
    type: String,
    default: "",
  },
  backgroundImageUrl: {
    type: String,
    default: 'https://ucarecdn.com/6de2c351-f579-4759-9a6e-01586c33062d/logo.png'
  }
});
 // URL da imagem de fundo
</script>
<template>
  <div class="mb-3 card filter-on-image artist-shadow"     
    v-bind:style="{
      backgroundImage: 'url(' + backgroundImageUrl + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100px',
      cursor: 'pointer'
    }">
    <div class="p-3 card-body artist-card-info">
      <div
        class="d-flex"
        :class="rowReverse ? '' : 'flex-row-reverse justify-content-between'"
      >
        <div :class="classContent">
          <div class="numbers">
            <h5>
              {{ typeof title === "string" ? title : title.text }}
            </h5>
            <p class="mb-0 text-sm font-weight-bold">
                {{ value }} plays no Spotify
            </p>
            <!--  eslint-disable-next-line vue/no-v-html -->
            <p v-if="description" class="mt-2 mb-0" v-html="description"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.filter-on-image {
  background-color:rgba(78, 45, 105, 0.4);
  backdrop-filter: blur(4px) contrast(111%) saturate(101%);
}
.artist-shadow {
  position: relative;
}
.artist-shadow:hover:after {
  height: 100%;
  width: 100%;
  content: '';
  background-color: rgba(0, 0, 0, 0.7); 
  position: absolute;
  border-radius: 1rem;
}
.artist-card-info {
  position: absolute;
  z-index: 999;
}
</style>