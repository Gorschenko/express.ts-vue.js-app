<template>
  <div>
    <div class="courses-catalog__list">
      <article class="card flex-column-centered flex-gap-8 color_primary">
        <i class="bx bx-plus icon_24" />
        <p>Add new course</p>
      </article>
    </div>

  <button
    id="show-modal"
    @click="showModal = true"
  >
    Show Modal
  </button>
  <DefaultModal v-model="showModal">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, sunt!</p>
  </DefaultModal>
  </div>
</template>
<script>
import DefaultModal from '@/components/base/DefaultModal'
import { ref } from 'vue'

export default {
  name: 'CoursesCatalog',
  components: {
    DefaultModal,
  },
  setup () {
    const showModal = ref(false)
    return {
      showModal,
    }
  },
}
</script>
