<template>
  <div class="create-courses-modal">
    <Form
      :validation-schema="validationSchema"
      :initial-values="initialValues"
      @submit="isEditMode ? $emit('edit', $event) : $emit('create', $event)"
    >
      <DefaultInput
        class="mb-16"
        id="title"
        placeholder="Title"
      />
      <DefaultInput
        class="mb-16"
        id="image"
        placeholder="Image URL"
      />
      <DefaultInput
        class="mb-16"
        id="price"
        placeholder="Price"
      />
      <DefaultButton
        class="margin-right"
        type="submit"
        :title="isEditMode ? 'Edit' : 'Create'"
        :icon="isEditMode ? 'bx-edit-alt' : 'bx-plus'"
      />
    </Form>
  </div>
</template>
<script>
import DefaultInput from '@/components/base/DefaultInput'
import DefaultButton from '@/components/base/DefaultButton'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import { computed } from 'vue'

export default {
  name: 'CoursesCreate',
  components: {
    DefaultInput,
    DefaultButton,
    Form,
  },
  props: {
    course: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const isEditMode = computed(() => props.course._id)
    const initialValues = props.course
    const validationSchema = Yup.object().shape({
      title: Yup.string().required(),
      image: Yup.string().url().required(),
      price: Yup.number().required(),
    })

    return {
      isEditMode,
      initialValues,
      validationSchema,
    }
  }
}
</script>
<style lang="scss">
.create-courses-modal {
  width: 500px;
  padding: 16px;
}
</style>