<template>
	<dialog>
		<form @submit.prevent="submitMatchScores">
			<label for="player-a-name">{{ playerAName }}</label>
			<input
				v-model.number="playerAScore"
				id="player-a-name"
				type="number"
				min="0"
				step="1"
				required
			>
			<label for="player-b-name">{{ playerBName }}</label>
			<input
				v-model.number="playerBScore"
				id="player-b-name"
				type="number"
				min="0"
				step="1"
				required
			>
			<button type="submit">Add Scores</button>
			<button type="button" @click="cancelModal">Cancel</button>
		</form>
	</dialog>
</template>

<script>
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


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>