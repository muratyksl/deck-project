// stores/counter.js
import { defineStore } from "pinia";

export const gameStatuses = {
  ready: "READY",
  running: "RUNNING",
  win: "WIN",
  lose: "LOSE",
};

export const fourCardDeck = [
  "queenOfHearts",
  "queenOfSpades",
  "queenOfClubs",
  "queenOfDiamonds",
];

export const sixCardDeck = [...fourCardDeck, "kingOfHearts", "kingOfSpades"];

export const eightCardDeck = [...sixCardDeck, "kingOfClubs", "kingOfDiamonds"];

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export const useStatsStore = defineStore("stats", {
  state: () => ({
    remainingChoice: 0,
    winningCard: "queenOfHearts",
    remainingTimeMs: 20000,
    interval: null,
    status: gameStatuses.ready,
    deck: [...fourCardDeck],
    openCards: [],
    settings: {
      remainingChoice: 1,
      deck: shuffleDeck([...fourCardDeck]),
      winningCard: "queenOfHearts",
      remainingTimeMs: 20000,
      status: gameStatuses.ready,
      isTimer: true,
      startAfterCount: false,
    },
  }),
  getters: {
    remainingTimeSeconds: (state) => {
      return Math.floor(state.remainingTimeMs / 1000);
    },
  },
  actions: {
    setSettings(
      winningCard,
      isTimer,
      remainingTimeMs,
      deckLenght,
      startAfterCount
    ) {
      if (deckLenght === 4) {
        this.settings.remainingChoice = 1;
        this.settings.deck = [...fourCardDeck];
      }
      if (deckLenght === 6) {
        this.settings.remainingChoice = 2;
        this.settings.deck = [...sixCardDeck];
      }
      if (deckLenght === 8) {
        this.settings.remainingChoice = 3;
        this.settings.deck = [...eightCardDeck];
      }
      this.settings.isTimer = isTimer;
      this.settings.startAfterCount = startAfterCount;
      this.settings.winningCard = winningCard;
      this.settings.remainingTimeMs = remainingTimeMs;
      this.status = gameStatuses.ready;
      this.setGameInfo();
    },
    startGame() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.setGameInfo();
      this.status = gameStatuses.running;
      if(this.settings.isTimer){
        this.startCounting();
      }
    },
    setGameInfo() {
      this.remainingChoice = this.settings.remainingChoice;
      this.deck = shuffleDeck([...this.settings.deck]);
      this.winningCard = this.settings.winningCard;
      this.remainingTimeMs = this.settings.remainingTimeMs;
      this.openCards = [];
    },
    startCounting() {
      this.interval = setInterval(() => {
        if (this.remainingTimeMs <= 0) {
          this.remainingTimeMs = 0;
          this.status = gameStatuses.lose;
        } else {
          this.remainingTimeMs -= 1000;
        }
      }, 1000);
    },
    handleChoice(choice) {
      this.remainingChoice = this.remainingChoice - 1;
      if (choice === this.winningCard) {
        clearInterval(this.interval);
        this.status = gameStatuses.win;
        return;
      }
      if (this.remainingChoice === 0) {
        clearInterval(this.interval);
        this.status = gameStatuses.lose;
        return;
      }
      this.openCards = [choice, ...this.openCards];
    },
  },
});
