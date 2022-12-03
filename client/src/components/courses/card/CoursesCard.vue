<template>
  <article class="card">
    <header class="flex-row-between flex-wrap flex-gap-8 mb-16">
      <h1 class="text_l text_weight_accent">{{ course.title }}</h1>
      <div class="flex-row flex-gap-8">
        <DefaultButton
          title="Редактировать"
          color="transparent"
          :without-paddings="true"
          @action="$emit('edit')"
        />
        <DefaultButton
          icon="bx-x"
          form="round"
          color="danger"
          size="xs"
          @action="$emit('delete')"
        />
      </div>
    </header>
    <div class="mb-16">
      <img
        class="courses-catalog__item-image mb-8"
        :src="course.image"
      >
      <p class="text_s text_weight_head">{{ course.price }} руб.</p>
    </div>
    <FooterCard
      :course-id="course._id"
      @add-to-cart="$emit('add-to-cart')"
      @delete-to-cart="$emit('delete-to-cart')"
    />
  </article>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'
import FooterCard from '@/components/courses/card/FooterCard'

export default {
  name: 'CoursesCard',
  emits: ['edit', 'delete', 'delete-to-cart', 'add-to-cart'],
  components: {
    DefaultButton,
    FooterCard,
  },
  props: {
    course: {
      type: Object,
      required: true,
    }
  },
}
</script>