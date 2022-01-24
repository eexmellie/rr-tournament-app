<template>
  <div class="tournament">
    <div class="tournament__header">
      <h2 class="tournament__header-item title">
        {{ name }}
      </h2>
      <button
        v-if="canTournamentBeEnded"
        class="tournament__header-item button"
        @click="endTournament"
      >
        End tournament
      </button>
      <button
        class="tournament__header-item button button--danger"
        @click="deleteTournament"
      >
        Delete tournament
      </button>
    </div>
    <RRTournamentResults v-bind="$props" />
    <RRTournamentRound
      v-for="(round, index) in rounds"
      :key="round.id"
      class="tournament__round"
      :round="round"
      :round-number="index + 1"
      :players-order="playersOrder"
      :player-names="playerNames"
    />
  </div>
</template>

<script>
import RRTournamentRound from './RRTournamentRound.vue';
import RRTournamentResults from './RRTournamentResults.vue';


export default {
  name: 'RRTournament',
  components: {
    RRTournamentRound,
    RRTournamentResults
  },
  props: {
    name: {
      type: String,
      required: true
    },
    hasEnded: {
      type: Boolean,
      required: true
    },
    playersOrder: {
      type: Array,
      required: true
    },
    playerNames: {
      type: Object,
      required: true
    },
    rounds: {
      type: Array,
      required: true
    },
    tournamentIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    canTournamentBeEnded() {
      const hasEveryMatchWinner = this.rounds.every(round => round.matches.every(match => match.matchWinnerId));
      return  hasEveryMatchWinner && !this.hasEnded;
    }
  },
  methods: {
    endTournament() {
      this.$emit('tournament-end', this.tournamentIndex);
    },
    deleteTournament() {
      this.$emit('tournament-delete', this.tournamentIndex);
    }
  }
}
</script>

<style scoped>
.tournament__header {
  display: flex;
  margin-bottom: var(--spacing-big);
}
.tournament__header-item {
  align-self: flex-start;
}
.tournament__header-item:not(:last-child) {
  margin-right: var(--spacing);
}
.tournament__header-item:first-child {
  margin-right: auto;
}
</style>
