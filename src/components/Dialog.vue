<template>
  <div>
    <dialog class="native-dialog" :open="status === gameStatuses.ready">
      <div class="dialog-container">
        <button @click.prevent="startGame()">
          {{ $t("dialog.startGame") }}
        </button>
      </div>
    </dialog>
    <dialog class="native-dialog" :open="status === gameStatuses.lose">
      <div class="dialog-container">
        <h3>{{ $t("dialog.bankWin") }}</h3>
        <button @click.prevent="startGame()">
          {{ $t("dialog.startAgain") }}
        </button>
      </div>
    </dialog>
    <dialog class="native-dialog" :open="status === gameStatuses.win">
      <div class="dialog-container">
        <h3>{{ $t("dialog.youWin") }}</h3>
        <button @click.prevent="startGame()">
          {{ $t("dialog.startAgain") }}
        </button>
      </div>
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
      gameStatuses: { ...gameStatuses },
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
.native-dialog {
  border: none;
  border-radius: 12px;
  top: 8rem;
  background-color: rgb(0 0 0 / 50%);
}
.dialog-container {
  color: #fff;
  padding: 2rem 3rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
