<template>
  <article class="card">
    <h1 class="text_l text_weight_accent mb-16">Name of course</h1>
    <img
      class="courses-catalog__item-image mb-16"
      src=""
    >
    <div class="flex-row flex-gap-8 flex-justify-content-end">
      <DefaultButton
        title="Add"
        @action="$emit('add')"
      />
      <DefaultButton
        title="Edit"
        @action="$emit('edit')"
      />
    </div>
  </article>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'

export default {
  name: 'CoursesCard',
  emits: ['add', 'edit'],
  components: {
    DefaultButton,
  },
  props: {
    course: {
      type: Object,
      required: true,
    }
  },
  setup () {
    return {}
  },
}
</script>