<template>
  <div id="app">
    <header class="header">
      <div style="grid-template-areas: corner"></div>
      <Stats />
      <SettingsDrawer />
    </header>
    <Deck />
    <Dialog />
  </div>
</template>

<script>
import SettingsDrawer from "./components/SettingsDrawer.vue";
import Stats from "./components/Stats.vue";
import Dialog from "./components/Dialog.vue";
import Deck from "./components/Deck.vue";
export default {
  components: {
    SettingsDrawer,
    Stats,
    Dialog,
    Deck,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.header {
  display: grid;
  grid-template-columns: 0.3fr 2.5fr 0.3fr;
  gap: 0px 1rem;
  grid-auto-flow: row;
  grid-template-areas: "corner stats drawer";
}
</style>
