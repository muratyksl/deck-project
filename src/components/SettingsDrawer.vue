<template>
  <div>
    <button @click="drawer = true">open settings</button>

    <el-drawer
      title="I am the title"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="card-number">Card Number</label>
          <select id="card-number" v-model.number="cardNumber">
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
        </div>
        <div>
          <label for="selected-card">Winner Card</label>
          <select id="selected-card" v-model="winningCard">
            <option v-for="item in cardList" :value="item">{{ item }}</option>
          </select>
        </div>
        <div>
          <label for="is-timer">Sureli Oyun</label>
          <input id="is-timer" type="checkbox" v-model="isTimer"/>
        </div>
        <div v-if="isTimer">
          <label for="time-seconds">Oyun Suresi</label>
          <input id="time-seconds" type="text" v-model.number="selectedTime" />
        </div>
        <div>
          <label for="start-after">Sure Dolunca Bastan</label>
          <input id="start-after" type="checkbox" v-model="startAfterCount" />
        </div>
        <button type="submit">Save</button>
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
import { mapStores, mapActions, mapState } from "pinia";
export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      cardNumber: 4,
      winningCard: "queenOfHearts",
      cardList: [],
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
a {
  color: #42b983;
}
</style>
