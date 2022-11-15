<template>
  <div>
    <div class="courses-catalog__list">
      <article
        class="card flex-column-centered flex-gap-8 color_primary"
        @click="showModal = true"
      >
        <i class="bx bx-plus icon_24" />
        <p>Add new course</p>
      </article>
    </div>

    <DefaultModal v-model="showModal">
      <CoursesCreate />
    </DefaultModal>
  </div>
</template>
<script>
import DefaultModal from '@/components/base/DefaultModal'
import CoursesCreate from '@/components/courses/CoursesCreate'
import { ref } from 'vue'

export default {
  name: 'CoursesCatalog',
  components: {
    DefaultModal,
    CoursesCreate,
  },
  setup () {
    const showModal = ref(false)
    return {
      showModal,
    }
  },
}
</script>
