<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
//components
import ArgonInput from "@/components/ArgonInput.vue";

const store = useStore();
const isRTL = computed(() => store.state.isRTL);

const emit = defineEmits({
  'new-tag': (value) => typeof value === 'string',
  'delete-tag': (value) => typeof value === 'number'
});

defineProps({
  title: {
    type: String,
    default: "Categories",
  },
  categories: {
    type: Array,
    required: true,
    icon: {
      component: String,
      background: String,
    },
    label: String,
    description: String,
  },
});
const categoryTitle = ref('')

const handleSubmitCategory = () => {
  if (categoryTitle.value) {
    emit('new-tag', categoryTitle.value)
    categoryTitle.value = ''
  }
  return false
}

const handleDeleteCategory = (id) => {
  emit('delete-tag', id)
}
</script>
<template>
  <div class="card">
    <div class="p-3 pb-0 card-header">
      <h6 class="mb-0">{{ title }}</h6>
    </div>
    <div class="p-3 card-body">
      <ul class="list-group list-tags-container">
        <li
          v-for="(
            { icon: { component, background }, label, description, id }, index
          ) of categories"
          :key="index"
          :class="`mb-2 border-0 list-group-item d-flex justify-content-between border-radius-lg
          ${isRTL ? 'pe-0' : 'ps-0'}`"
        >
          <div class="d-flex align-items-center">
            <div
              :class="`text-center shadow icon icon-shape icon-sm bg-gradient-${background} ${
                isRTL ? 'ms-3' : 'me-3'
              }`"
            >
              <i :class="`${component} text-white opacity-10`"></i>
            </div>
            <div class="d-flex flex-column">
              <h6 class="mb-1 text-sm text-dark">{{ label }}</h6>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span class="text-xs" v-html="description"> </span>
            </div>
          </div>
          <div class="d-flex">
            <button 
            class="my-auto btn btn-link btn-icon-only btn-rounded text-dark icon-move-right"
            @click="handleDeleteCategory(id)"
            >
              <i
              style="font-size: 34px;"
                class="ni ni-fat-remove"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="mt-3 p-3">
      <form role="form" @submit.prevent="handleSubmitCategory" style="display: flex;">
          <argon-input
            id="categoryTitle"
            type="text"
            placeholder="bota a aqui a tag"
            name="categoryTitle"
            size="sm"
            v-model="categoryTitle"
            required
          />
          <button class="my-auto btn btn-link btn-rounded">
            <i class="fas fa-plus me-2"></i>
            Criar Tag
          </button>
      </form>
    </div>
  </div>
</template>
<style lang="css" scoped>
.list-tags-container {
  height: 400px;
  overflow: auto;
}
</style>