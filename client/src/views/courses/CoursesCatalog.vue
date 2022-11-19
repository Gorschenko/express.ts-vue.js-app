<template>
  <div>
    <header class="mb-16">
      <DefaultButton
        class="margin-right"
        icon="bx-plus"
        title="Create new"
        @action="createCourse"
      />
    </header>

    <div class="courses-catalog__list">
      <CoursesCard
        v-for="course in courses"
        :key="course._id"
        :course="course"
        @add="addCourse(course)"
        @edit="editCourse(course)"
        @delete="deleteCourse(course)"
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
import DefaultButton from '@/components/base/DefaultButton'
import CoursesCard from '@/components/courses/CoursesCard'
import DefaultModal from '@/components/base/DefaultModal'
import CoursesCreate from '@/components/courses/CoursesCreate'
import { getAllCourses } from '@/api/courses.api'
import { ref } from 'vue'

export default {
  name: 'CoursesCatalog',
  components: {
    DefaultButton,
    CoursesCard,
    DefaultModal,
    CoursesCreate,
  },
  setup () {
    const showModal = ref(false)
    const courses = ref([])

    const addCourse = async course => {
      try {
        console.log(course)
      } catch (e) {
        console.log(e)
      }
    }
  
    const editCourse = async course => {
      try {
        console.log(course)
      } catch (e) {
        console.log(e)
      }
    }
  
    const deleteCourse = async course => {
      try {
        console.log(course)
      } catch (e) {
        console.log(e)
      }
    }
    const createCourse = async () => {
      try {

      } catch (e) {
        console.log(e)
      }
    }

    const init = async () => {
      try {
        courses.value = await getAllCourses()
      } catch (e) {
        console.log(e)
      }
    }
    init()
    return {
      courses,
      showModal,
      addCourse,
      editCourse,
      deleteCourse,
      createCourse,
    }
  },
}
</script>
