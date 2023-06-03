<template>
  <div style="grid-area: drawer">
    <button @click="drawer = true">{{ $t("drawer.openSettings") }}</button>

    <el-drawer
      :title="$t('drawer.gameSettings')"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <form @submit.prevent="handleSubmit">
        <div class="form-item-container">
          <label for="card-number">{{ $t("drawer.cardNumber") }}</label>
          <select id="card-number" v-model.number="cardNumber">
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
        </div>
        <div class="form-item-container">
          <label for="selected-card">{{ $t("drawer.winnerCard") }}:</label>
          <select id="selected-card" v-model="winningCard">
            <option v-for="item in cardList" :value="item">
              {{ $t(`deck.${item}`) }}
            </option>
          </select>
        </div>
        <div class="form-item-container">
          <label for="is-timer">{{ $t("drawer.sureliOyun") }}:</label>
          <input id="is-timer" type="checkbox" v-model="isTimer" />
        </div>
        <div class="form-item-container" v-if="isTimer">
          <label for="time-seconds">{{ $t("drawer.gameTime") }}:</label>
          <input id="time-seconds" type="text" v-model.number="selectedTime" />
        </div>
        <div class="form-item-container">
          <label for="start-after"
            >{{ $t("drawer.startAfterWhenFinish") }}:</label
          >
          <input id="start-after" type="checkbox" v-model="startAfterCount" />
        </div>
        <div class="form-item-container">
          <button type="submit">{{ $t("drawer.save") }}</button>
        </div>
      </form>
    </el-drawer>
  </div>
</template>

<script>
import {
  fourCardDeck,
  sixCardDeck,
  eightCardDeck,
  useStatsStore,
} from "../stores/stats";
import { mapActions } from "pinia";
export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      cardNumber: 4,
      winningCard: "queenOfHearts",
      cardList: [...fourCardDeck],
      isTimer: true,
      selectedTime: 20,
      startAfterCount: false,
    };
  },
  methods: {
    ...mapActions(useStatsStore, ["setSettings"]),
    handleClose(done) {
      done();
    },
    handleSubmit() {
      const remain = this.selectedTime * 1000;
      this.setSettings(
        this.winningCard,
        this.isTimer,
        remain,
        this.cardNumber,
        this.startAfterCount
      );
      this.drawer = false;
    },
  },
  watch: {
    cardNumber(newVal, oldVal) {
      if (newVal === 4) {
        this.cardList = [...fourCardDeck];
      }
      if (newVal === 6) {
        this.cardList = [...sixCardDeck];
      }
      if (newVal === 8) {
        this.cardList = [...eightCardDeck];
      }
    },
  },
};
</script>

<style scoped>
.form-item-container {
  margin: 1em;
  padding: 1.2em 0.5em;
  display: flex;
  gap: 1.5rem;
}

label {
  width: 160px;
}
</style>
