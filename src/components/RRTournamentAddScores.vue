<template>
  <dialog class="dialog">
    <form
      class="form"
      @submit.prevent="submitMatchScores"
    >
      <label
        class="form__label"
        for="player-a-name"
      >
        {{ playerAName }}
      </label>
      <input
        id="player-a-name"
        v-model.number="playerAScore"
        type="number"
        class="form__input"
        min="0"
        step="1"
        required
      >
      <label
        class="form__label"
        for="player-b-name"
      >
        {{ playerBName }}
      </label>
      <input
        id="player-b-name"
        v-model.number="playerBScore"
        type="number"
        class="form__input"
        min="0"
        step="1"
        required
      >
      <div class="form__row">
        <button
          type="button"
          class="button button--danger"
          @click="cancelModal"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="button"
        >
          Add Scores
        </button>
      </div>
    </form>
  </dialog>
</template>

<script>
import dialogPolyfill from "dialog-polyfill";

export default {
  name: 'RRTournamentAddScores',
  props: {
    playerAName: {
      type: String,
      required: true
    },
    playerBName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      playerAScore: null,
      playerBScore: null
    }
  },
  mounted() {
    dialogPolyfill.registerDialog(this.$el);
  },
  methods: {
    submitMatchScores() {
      // TODO: validate scores
      const { playerAScore, playerBScore } = this;
      this.$emit("submit-match-scores", {
        playerAScore,
        playerBScore
      })
    },
    cancelModal() {
      this.$emit('cancel-match-scores');
    }
  }
}
</script>


<style>
.dialog {
  padding: var(--spacing-big);
  border: none;
  border-radius: 5px;
}
.dialog::backdrop { /* native */
  background-color: rgba(0, 0, 0, .6);
}
.dialog + .backdrop { /* polyfill */
  background-color: rgba(0, 0, 0, .6);
}
</style>