<template>
  <div>
    <dialog :open="status === gameStatuses.ready">
      <button @click.prevent="startGame()">Start Game</button>
    </dialog>
    <dialog :open="status === gameStatuses.lose">
      <h3>Bank Win</h3>
      <button @click.prevent="startGame()">Start Again</button>
    </dialog>
    <dialog :open="status === gameStatuses.win">
      <h3>You Win!</h3>
      <button @click.prevent="startGame()">Start Again</button>
    </dialog>
  </div>
</template>

<script>
import { useStatsStore, gameStatuses } from "../stores/stats";
import { mapStores, mapActions, mapState } from "pinia";
export default {
  data() {
    return {
      test: 12,
      gameStatuses: {...gameStatuses},
    };
  },
  computed: {
    ...mapStores(useStatsStore),
    ...mapState(useStatsStore, ["status"]),
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
