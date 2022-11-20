<template>
  <div>
    <header class="mb-16">
      <DefaultButton
        class="margin-right"
        icon="bx-plus"
        title="Create new"
        @action="setModal('courses-create')"
      />
    </header>

    <div>
      <div
        v-if="courses.length"
        class="courses-catalog__list"
      >
        <CoursesCard
          v-for="course in courses"
          :key="course._id"
          :course="course"
          @add="addCourse(course)"
          @edit="setEdition(course)"
          @delete="confirmDeletion(course._id)"
        />
      </div>
      <p
        v-else
      >
        No courses
      </p>
    </div>

    <DefaultModal v-model="modal.show">
      <component
        :is="modal.component"
        :course="editCourseObj"
        @close="modal.show = false"
        @edit="editCourseHandler"
        @create="createCourseHandler"
        @confirm="deleteCourseHandler"
      />
    </DefaultModal>
  </div>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'
import CoursesCard from '@/components/courses/CoursesCard'
import DefaultModal from '@/components/base/DefaultModal'
import ModalConfirmation from '@/components/modals/ModalConfirmation'
import CoursesCreate from '@/components/courses/CoursesCreate'
import {
  getAllCourses,
  deleteCourse,
  createCourse,
  editCourse,
} from '@/api/courses.api'
import { ref, reactive, watch } from 'vue'
import { useNotification } from "@kyvg/vue3-notification";

export default {
  name: 'CoursesCatalog',
  components: {
    DefaultButton,
    CoursesCard,
    ModalConfirmation,
    DefaultModal,
    CoursesCreate,
  },
  setup () {
    const { notify}  = useNotification()
    const modal = reactive({
      show: false,
      component: 'courses-create',
    })
    watch(
      () => modal.show,
      value => value ? null : editCourseObj.value = {}
    )
    const setModal = componentName => {
      modal.component = componentName
      modal.show = true
    }

    const courses = ref([])
    const init = async () => {
      try {
        courses.value = await getAllCourses()
      } catch (e) {
        notify({ type: 'error', title: 'Error', text: e.message});
      }
    }

    const addCourse = async course => {
      try {
        console.log(course)
      } catch (e) {
        notify({ type: 'error', title: 'Error', text: e.message});
      }
    }

    const editCourseObj = ref({})
    const setEdition = async course => {
      try {
        editCourseObj.value = course
        setModal('courses-create')
      } catch (e) {
        notify({ type: 'error', title: 'Error', text: e.message});
      }
    }
    const editCourseHandler = async formData => {
      try {
        await editCourse(formData)
        courses.value = courses.value.map(c => {
          if (c._id === formData._id) {
            return formData
          }
          return c
        })
        notify({
          type: 'success',
          title: 'Successfully',
          text: 'The course has been successfully edited'
        });
        modal.show = false
      } catch (e) {
        notify({ type: 'error', title: 'Error', text: e.message});
      }
    }

    const deleteId = ref('')
    const confirmDeletion = async id => {
      deleteId.value = id
      setModal('modal-confirmation')
    }
    const deleteCourseHandler = async () => {
      try {
        await deleteCourse(deleteId.value)
        courses.value = courses.value.filter(c => c._id !== deleteId.value)
        deleteId.value = ''
        notify({
          type: 'success',
          title: 'Successfully',
          text: 'The course has been successfully deleted'
        });
        modal.show = false
      } catch (e) {
        notify({ type: 'error', title: 'Error', text: e.message});
      }
    }

    const createCourseHandler = async formData => {
      try {
        const course = await createCourse(formData)
        courses.value.push(course)
        notify({
          type: 'success',
          title: 'Successfully',
          text: 'The course has been successfully created'
        });
        modal.show = false
      } catch (e) {
        notify({ type: 'error', title: 'Error', text: e.message});
      }
    }

    init()
    return {
      modal,
      setModal,
      courses,
      addCourse,
      editCourseObj,
      setEdition,
      editCourseHandler,
      confirmDeletion,
      deleteCourseHandler,
      createCourseHandler,
    }
  },
}
</script>
