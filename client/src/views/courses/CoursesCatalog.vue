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
          @update-labels="updateLabelsHandler(course._id)"
          @add-to-cart="addCourseToCartHandler(course._id)"
          @delete-from-cart="deleteCourseFromCartHandler(course._id)"
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
        @close="modal.show = false"
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
  getCourses,
  deleteCourse,
  createCourse,
} from '@/api/courses.api'
import {
  updateLabels,
} from '@/api/user.api'
import {
  addCourseToCart,
  deleteCourseToCart,
} from '@/api/cart.api'
import { ref, reactive, computed } from 'vue'
import { cloneDeep } from 'lodash'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
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
    const router = useRouter()
    const { notify}  = useNotification()
    const modal = reactive({
      show: false,
      component: 'courses-create',
    })
    const setModal = componentName => {
      modal.component = componentName
      modal.show = true
    }

    const courses = ref([])
    const user = computed(() => store.getters['user/user'])
    const init = async () => {
      try {
        courses.value = await getCourses()
      } catch (e) {
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }
    init()
    
    const addCourseToCartHandler = async courseId => {
      try {
        await addCourseToCart(user.value.cart._id._id, courseId)
        const updatedUser = cloneDeep(user.value)
        let updatedCartItems = updatedUser.cart._id.items
        const isAdded = updatedUser.cart._id.items.find(i => i._id === courseId)
        if (isAdded) {
          updatedCartItems = updatedCartItems.map(i => {
            if (i._id === courseId) {
            i.count = i.count + 1
            }
            return i
          })
        }
        updatedCartItems.push({
          _id: courseId,
          count: 1,
        })
        updatedUser.cart._id.items = updatedCartItems
        store.commit('user/SET_USER', updatedUser)
        notify({ type: 'success', title: 'Успешно', text: 'Курс был успешно добавлен в корзину'});
      } catch (e) {
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }
    const deleteCourseFromCartHandler = async courseId => {
      try {
        await deleteCourseToCart(user.value.cart._id._id, courseId)
        const updatedUser = cloneDeep(user.value)
        const updatedCartItems = updatedUser.cart._id.items
          .map(i => {
            if (i._id === courseId) {
              i.count = i.count - 1
            }
            return i
          })
          .filter(i => i.count)
        updatedUser.cart._id.items = updatedCartItems
        store.commit('user/SET_USER', updatedUser)
        notify({ type: 'success', title: 'Успешно', text: 'Курс был успешно удален из корзины'});
      } catch (e) {
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }


    const setEdition = async course => {
      try {
        router.push({
          name: 'courses-info',
          params: {
            id: course._id,
          }
        })
        
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

    const updateLabelsHandler = async courseId => {
      try {
        const updatedUser = await updateLabels('favorites', courseId)
        store.commit('user/SET_USER', updatedUser)
        notify({ type: 'success', title: 'Успешно', text: 'Избранное успешно обновлено'});
      } catch (e) {
        notify({ type: 'error', title: 'Ошибка', text: e.message});
      }
    }

    return {
      modal,
      setModal,
      courses,
      addCourseToCartHandler,
      deleteCourseFromCartHandler,
      setEdition,
      confirmDeleteCourse,
      deleteCourseHandler,
      createCourseHandler,
      updateLabelsHandler,
    }
  },
}
</script>
