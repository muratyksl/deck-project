<template>
  <div class="game-cards">
    <div class="card-frame" :key="card" v-for="card in deck">
      <button
        :style="{ 'background-image': 'url(' + card + '.png' + ')' }"
        class="card-element"
        v-if="status === gameStatuses.lose"
      >
        {{ card }}
      </button>
      <button
        :style="{ 'background-image': 'url(' + card + '.png' + ')' }"
        class="card-element"
        v-else-if="status === gameStatuses.win && winningCard === card"
      >
        {{ card }}
      </button>
      <button
        :style="{ 'background-image': 'url(' + card + '.png' + ')' }"
        class="card-element"
        v-else-if="status === gameStatuses.running && openCards.includes(card)"
      >
        {{ card }}
      </button>
      <button
        :disabled="status !== gameStatuses.running"
        class="card-element"
        v-else
        @click.prevent="handleChoice(card)"
      >
        closed
      </button>
    </div>
  </div>
</template>

<script>
import { gameStatuses } from "../stores/stats";
import { useStatsStore } from "../stores/stats";
import { mapStores, mapActions, mapState } from "pinia";
export default {
  data() {
    return {
      gameStatuses: { ...gameStatuses },
    };
  },
  computed: {
    ...mapStores(useStatsStore),
    ...mapState(useStatsStore, ["deck", "winningCard", "status", "openCards"]),
  },
  methods: {
    ...mapActions(useStatsStore, ["handleChoice"]),
  },
};
</script>

<style scoped>
.game-cards {
  display: flex;
  gap: 1em;
  justify-content: center;
}

.card-frame {
  width: 200px;
  height: 288px;
}

.card-element {
  height: 100%;
  width: 100%;
  border: 2px solid black;
  border-radius: 8px;
  background-image: url(../assets/playing-cards-back-2.jpg);
  background-size: contain;
  color:transparent;
}
</style>
