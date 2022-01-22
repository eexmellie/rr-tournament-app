<template>
	<div>
		<form @submit.prevent="startTournament">
			<label for="tournament-name">Tournament name:</label>
			<input type="text" name="tournament-name" v-model="tournamentName" required>
			<div>Participants:</div>
			<div v-for="(player, i) in players" :key="i">
				<input
					type="text"
					v-model="player.name"
					required
				>
				<button
					type="button"
					@click="remove(i)"
					v-show="i || ( !i && players.length > 1)"
				>
					-
				</button>
			</div>
			<button
				type="button"
				v-if="canAddPlayers"
				@click="add()"
			>
				+
			</button>
			<button type="submit" :disabled="!canTournamentBeStarted">Start tournament</button>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
