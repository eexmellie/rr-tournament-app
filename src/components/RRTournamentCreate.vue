<template>
	<div>
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
				type="text"
				class="form__input"
				name="tournament-name"
				v-model="tournamentName"
				required
			>
			<div class="form__label">Participants:</div>
			<div v-for="(player, i) in players" :key="i">
				<div class="form__row">
					<input
						type="text"
						class="form__input"
						v-model="player.name"
						required
					>
					<button
						type="button"
						class="button button--round"
						@click="remove(i)"
						v-show="i || ( !i && players.length > 1)"
					>
						−
					</button>
				</div>
			</div>
			<div class="form__row">
				<button
					type="button"
					class="button button--round"
					@click="add()"
					:disabled="!canAddPlayers"
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
	</div>
</template>

<script>

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
			// TODO: check if there are at least 3 players. If not, show error message.
			// After that remove canTournamentBeStarted and disabled attribute on submit button
			this.$emit('tournament-start', {
				tournamentName,
				tournamentId: crypto.randomUUID(),
				players
			})
		}
	},
	computed: {
		canTournamentBeStarted() {
			return this.players.length >= 3
		},
		canAddPlayers() {
			return this.players.every(player => player.name);
		}
	}
}
</script>

<style>
.form {
	display: flex;
	flex-direction: column;

}
.form__row input:not(:last-child),
.form__row button:not(:last-child) {
	margin-right: 10px;
}
.form__label {
	display: block;
	margin-bottom: 5px;
}
.form__input {
	height: 40px;
	width: 250px;
	padding: 0 5px;
	border: 1px solid #4747A1;
}
.form__input:not(:last-child) {
	margin-bottom: 10px;
}
</style>
