<template>
	<!-- <div class="dialog-container">	 -->
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
					class="form__input"
					type="number"
					min="0"
					step="1"
					required
					v-model.number="playerAScore"
				>
				<label
					class="form__label"
					for="player-b-name"
				>
					{{ playerBName }}
				</label>
				<input
					id="player-b-name"
					class="form__input"
					type="number"
					min="0"
					step="1"
					required
					v-model.number="playerBScore"
				>
				<div class="form__row">
					<button
						class="button button--danger"
						type="button"
						@click="cancelModal"
					>
						Cancel
					</button>
					<button
						class="button"
						type="submit"
					>
						Add Scores
					</button>
				</div>
			</form>
		</dialog>
	<!-- </div> -->
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
.dialog {
	/*width: 300px;*/
    /*height: 300px;*/
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    border: none;
    border-radius: 5px;
}
.dialog::backdrop {
	background-color: rgba(0, 0, 0, .7);
}
</style>