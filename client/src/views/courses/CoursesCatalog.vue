<template>
  <div>
    <header class="mb-16">
      <DefaultButton
        class="margin-right"
        icon="bx-plus"
        title="Create new"
        @action="showModal = true"
      />
    </header>

    <div class="courses-catalog__list">
      <CoursesCard
        v-for="course in courses"
        :key="course._id"
        :course="course"
        @add="addCourse(course)"
        @edit="editCourse(course)"
        @delete="deleteCourseHandler(course._id)"
      />
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
import { getAllCourses, deleteCourse } from '@/api/courses.api'
import { ref } from 'vue'
import { useNotification } from "@kyvg/vue3-notification";

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
    const { notify}  = useNotification()


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
        notify({
          type: 'success',
          title: "Authorization",
          text: "You have been logged in!",
        });
      } catch (e) {
        console.log(e)
      }
    }
  
    const deleteCourseHandler = async id => {
      try {
        await deleteCourse(id)
      } catch (e) {
        console.log(e)
      }
    }
    // const createCourse = async () => {
    //   try {

    //   } catch (e) {
    //     console.log(e)
    //   }
    // }

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
      deleteCourseHandler,
      // createCourse,
    }
  },
}
</script>
