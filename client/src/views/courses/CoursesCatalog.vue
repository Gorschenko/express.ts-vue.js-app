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
          @update-favorite="updateFavoriteHandler(course._id)"
          @add-to-cart="addCourseToCartHandler(course._id)"
          @delete-to-cart="deleteCourseToCartHandler(course._id)"
          @edit="setEdition(course)"
          @delete="confirmDeleteCourse(course._id)"
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
import CoursesCard from '@/components/courses/card/CoursesCard'
import DefaultModal from '@/components/base/DefaultModal'
import ModalConfirmation from '@/components/modals/ModalConfirmation'
import CoursesCreate from '@/components/courses/CoursesCreate'
import {
  getAllCourses,
  deleteCourse,
  createCourse,
  editCourse,
} from '@/api/courses.api'
import {
  addCourseToCart,
  deleteCourseToCart,
  updateFavorite,
} from '@/api/user.api'
import { ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useNotification } from '@kyvg/vue3-notification';

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
    const store = useStore()
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
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }

    const addCourseToCartHandler = async courseId => {
      try {
        const updatedUser = await addCourseToCart(courseId)
        store.commit('user/SET_USER', updatedUser)
        notify({ type: 'success', title: 'Успешно', text: 'Курс был успешно добавлен в корзину'});
      } catch (e) {
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }

    const deleteCourseToCartHandler = async courseId => {
      try {
        const updatedUser = await deleteCourseToCart(courseId)
        store.commit('user/SET_USER', updatedUser)
        notify({ type: 'success', title: 'Успешно', text: 'Курс был успешно удален из корзины'});
      } catch (e) {
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }


    const editCourseObj = ref({})
    const setEdition = async course => {
      try {
        editCourseObj.value = course
        setModal('courses-create')
      } catch (e) {
        notify({ type: 'error', title: 'Ошибка', text: e.message});
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
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }

    const deleteId = ref('')
    const confirmDeleteCourse = async id => {
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
        notify({ type: 'error', title: 'Ошибка', text: e.message});
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
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }

    const updateFavoriteHandler = async courseId => {
      try {
        const updatedUser = await updateFavorite('courses', courseId)
        store.commit('user/SET_USER', updatedUser)
        notify({ type: 'success', title: 'Успешно', text: 'Избранное успешно обновлено'});
      } catch (e) {
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }

    init()
    return {
      modal,
      setModal,
      courses,
      addCourseToCartHandler,
      deleteCourseToCartHandler,
      editCourseObj,
      setEdition,
      editCourseHandler,
      confirmDeleteCourse,
      deleteCourseHandler,
      createCourseHandler,
      updateFavoriteHandler,
    }
  },
}
</script>
