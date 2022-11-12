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
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>custom header</h3>
      </template>
    </modal>
  </Teleport>
  </div>
</template>
<script>
import Modal from './Modal.vue'
import { ref } from 'vue'

export default {
  name: 'CoursesCatalog',
  components: {
    Modal,
  },
  setup () {
    const showModal = ref(false)
    return {
      showModal,
    }
  },
}
</script>
