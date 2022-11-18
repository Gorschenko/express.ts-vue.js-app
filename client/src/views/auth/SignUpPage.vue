<template>
  <section class="flex-row-centered">
    <div class="auth-page__inner">
      <header class="mb-16">
        <h1 class="text_xl text_weight_accent">Signup</h1>
      </header>
      <Form
        :validation-schema="validationSchema"
        @submit="submit"
      >
        <DefaultInput
          class="mb-16"
          id="email"
          placeholder="Email"
        />
        <DefaultInput
          class="mb-16"
          id="name"
          placeholder="Name"
        />
        <DefaultInput
          class="mb-16"
          id="password"
          placeholder="Password"
        />
        <DefaultButton
          class="margin-right"
          type="submit"
          title="Sign Up"
        />
      </Form>
    </div>
  </section>
</template>
<script>
import DefaultInput from '@/components/base/DefaultInput'
import DefaultButton from '@/components/base/DefaultButton'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import { signUp } from '@/api/auth.api/'

export default {
  name: 'SignUpPage',
  components: {
    DefaultInput,
    DefaultButton,
    Form,
  },
  setup () {
    const validationSchema = Yup.object().shape({
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      password: Yup.string().required(),
    })

    const submit = async $event => {
      try {
        const response = await signUp($event)
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
@import '@/views/auth/auth';
</style>