<template>
  <section>
    <DefaultButton
      class="mb-16"
      title="Some text"
      icon="bxs-graduation"
    />
    <Form
      @submit="submit"
      :validation-schema="schema"
    >
      <DefaultInput
        input-classes="home-page__input"
        wrapper-type="row"
        icon="bx-search"
        id="email"
        placeholder="Hey"
        label="Some label"
      />
      <button type="submit">Submit</button>
    </Form>
  </section>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'
import DefaultInput from '@/components/base/DefaultInput'
import { Form } from 'vee-validate';
import * as Yup from 'yup';

export default {
  name: 'HomePage',
  components: {
    DefaultButton,
    DefaultInput,
    Form
  },
  setup () {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });
    const submit = () => {
      console.log(true)
    }
    return {
      schema,
      submit,
    }
  }
}
</script>
<style lang="scss">
.home-page {
  &__input {
    width: 70%;
  }
}
</style>