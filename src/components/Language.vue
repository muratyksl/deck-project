<template>
  <div class="language-container" style="">
    <button @click.prevent="handleLang">{{ $i18n.locale.toUpperCase() }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 12,
    };
  },
  methods: {
    handleLang() {
      if (this.$i18n.locale === "tr") {
        this.$i18n.locale = "en";
        return;
      }
      if (this.$i18n.locale === "en") {
        this.$i18n.locale = "tr";
        return;
      }
    },
  },
};
</script>

<style scoped>
.language-container {
  grid-template-areas: corner;
}
</style>
