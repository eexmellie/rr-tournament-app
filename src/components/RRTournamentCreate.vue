<template>
  <form
    class="form"
    @submit.prevent="startTournament"
  >
    <label
      for="tournament-name"
      class="form__label"
    >
      Tournament name:
    </label>
    <input
      v-model="tournamentName"
      type="text"
      class="form__input"
      name="tournament-name"
      required
    >
    <div class="form__label">
      Participants:
    </div>
    <div
      v-for="(player, i) in players"
      :key="i"
    >
      <div class="form__row">
        <input
          v-model="player.name"
          type="text"
          class="form__input"
          required
        >
        <button
          v-show="i || ( !i && players.length > 1)"
          type="button"
          class="button button--round"
          @click="remove(i)"
        >
          −
        </button>
      </div>
    </div>
    <div class="form__row">
      <button
        type="button"
        class="button button--round"
        :disabled="!canAddPlayers"
        @click="add()"
      >
        +
      </button>
      <button
        type="submit"
        class="button"
        :disabled="!canTournamentBeStarted"
      >
        Start tournament
      </button>
    </div>
  </form>
</template>

<script>

// TODO: Set focus to the input when new participant is added
// TODO: Add icons so that players & tournaments with same names can be distinguished
// TODO: Add tournament name generator
// TODO: Add option to select type of tournament (BO3, BO5, etc..)

export default {
  name: 'RRTournamentCreate',
  data() {
    return {
      tournamentName: '',
      players: [
        {
          name: '',
          id:  crypto.randomUUID()
        }
      ]
    }
  },
  computed: {
    canTournamentBeStarted() {
      return this.players.length >= 3
    },
    canAddPlayers() {
      return this.players.every(player => player.name);
    }
  },
  methods: {
    add() {
      this.players.push({
        name: '',
        id:  crypto.randomUUID()
      });
    },
    remove(index) {
      this.players.splice(index, 1);
    },
    startTournament() {
      const {tournamentName, players} = this;
      this.$emit('tournament-start', {
        tournamentName,
        tournamentId: crypto.randomUUID(),
        players
      })
    }
  }
}
</script>
