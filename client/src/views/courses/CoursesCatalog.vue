<template>
  <div>
    <div class="courses-catalog__list">
      <CoursesCard
        v-for="course in courses"
        :key="course.name"
        :course="course"
        @add="addCourse"
        @edit="editCourse"
      />
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
import CoursesCard from '@/components/courses/CoursesCard'
import DefaultModal from '@/components/base/DefaultModal'
import CoursesCreate from '@/components/courses/CoursesCreate'
import { getAllCourses } from '@/api/courses.api'
import { ref } from 'vue'

export default {
  name: 'CoursesCatalog',
  components: {
    CoursesCard,
    DefaultModal,
    CoursesCreate,
  },
  setup () {
    const showModal = ref(false)
    const courses = ref([
      {},
      {},
      {},
      {},
      {},
      {},
    ])
    const addCourse = async () => {
      try {
        console.log('Add')
      } catch (e) {
        console.log(e)
      }
    }
    const editCourse = async () => {
      try {
        console.log('Edit')
      } catch (e) {
        console.log(e)
      }
    }
    // const init = async () => {
    //   try {
    //     courses.value = await getAllCourses()
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
    // init()
    return {
      courses,
      showModal,
      addCourse,
      editCourse,
    }
  },
}
</script>
