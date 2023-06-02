<template>
  <div id="app">
    <header class="header">
      <Stats />
      <SettingsDrawer />
    </header>
    <Deck/>
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
    Deck
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

.header{
  display: flex;
  gap:6em;
  justify-content: space-around;

}
</style>
