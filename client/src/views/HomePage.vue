<template>
  <section>
    <DefaultButton
      title="Some text"
      icon="bxs-graduation"
    />
    <DefaultInput />
  </section>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'
import DefaultInput from '@/components/base/DefaultInput'

export default {
  name: 'HomePage',
  components: {
    DefaultButton,
    DefaultInput,
  },
}
</script>