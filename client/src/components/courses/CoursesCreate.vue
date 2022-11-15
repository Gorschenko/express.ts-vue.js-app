<template>
  <div class="create-courses-modal">
    <Form
      @submit="submit"
      :validation-schema="validationSchema"
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
        title="Create"
        icon="bx-plus"
      />
    </Form>
  </div>
</template>
<script>
import DefaultInput from '@/components/base/DefaultInput'
import DefaultButton from '@/components/base/DefaultButton'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import { createCourse } from '@/api/courses.api'

export default {
  name: 'CoursesCreate',
  components: {
    DefaultInput,
    DefaultButton,
    Form,
  },
  setup () {
    const validationSchema = Yup.object().shape({
      title: Yup.string().required(),
      image: Yup.string().url().required(),
      price: Yup.number().required(),
    })
    const submit = async $event => {
      try {
        const response = await createCourse($event)
        console.log(response)
      } catch (e) {
        console.log(e)
      }
    }
    return {
      validationSchema,
      submit,
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