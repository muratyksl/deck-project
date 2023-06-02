<template>
  <div class="stats-container">
    <div>{{ $t("stats.remainingChoice") }} : {{ remainingChoice }}</div>
    <div>{{ $t("stats.winningCard") }} : {{ winningCard }}</div>
    <div>
      {{ $t("stats.remainingTime") }} :
      <span v-if="settings.isTimer">
        {{ remainingTimeSeconds }}
      </span>
      <span v-else> - </span>
    </div>
  </div>
</template>

<script>
import { useStatsStore } from "../stores/stats";
import { mapStores, mapActions, mapState } from "pinia";
export default {
  data() {
    return {
      test: 12,
    };
  },
  computed: {
    ...mapStores(useStatsStore),
    ...mapState(useStatsStore, [
      "remainingChoice",
      "winningCard",
      "remainingTimeSeconds",
      "settings",
    ]),
  },
  methods: {
    ...mapActions(useStatsStore, ["startGame"]),
  },
};
</script>

<style scoped>
.stats-container {
  display: flex;
  gap: 1em;
}
</style>
