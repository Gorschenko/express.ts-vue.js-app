<template>
  <section>
    <DefaultButton
      class="mb-16"
      title="Some text"
      icon="bxs-graduation"
    />
    <Form
      class="mb-16"
      :validation-schema="schema"
      @submit="submit"
      
    >
      <DefaultInput
        input-classes="home-page__input"
    
        icon="bx-search"
        id="email"
      />
      <button type="submit">Submit</button>
    </Form>
    <DefaultDropdown class="mb-16">
      <template #default>
        <DefaultButton
          title="Dropdown"
        />
      </template>
      <template #body>
        <li
          v-for="(item, i) in 3"
          :key="i"
        >
          {{ i + 1 }} Some text
        </li>
      </template>
    </DefaultDropdown>
    <DefaultButton
      title="Button"
    />
  </section>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'
import DefaultInput from '@/components/base/DefaultInput'
import DefaultDropdown from '@/components/base/DefaultDropdown'
import { Form } from 'vee-validate';
import * as Yup from 'yup';

export default {
  name: 'HomePage',
  components: {
    DefaultButton,
    DefaultInput,
    DefaultDropdown,
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