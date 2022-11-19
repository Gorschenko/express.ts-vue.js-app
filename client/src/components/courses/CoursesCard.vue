<template>
  <article class="card">
    <header class="flex-row-between mb-16">
      <h1 class="text_l text_weight_accent">{{ course.title }}</h1>
      <DefaultButton
        icon="bx-x"
        form="round"
        color="danger"
        size="xs"
        @action="$emit('delete')"
      />
    </header>
    <div class="mb-16">
      <img
        class="courses-catalog__item-image mb-8"
        :src="course.image"
      >
      <p class="text_s text_weight_head">{{ course.price }} руб.</p>
    </div>
    <footer class="flex-row flex-gap-8 flex-justify-content-end">
      <DefaultButton
        title="Add"
        @action="$emit('add')"
      />
      <DefaultButton
        title="Edit"
        @action="$emit('edit')"
      />
    </footer>
  </article>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'

export default {
  name: 'CoursesCard',
  emits: ['add', 'edit', 'delete'],
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