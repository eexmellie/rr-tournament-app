<template>
	<div class="tournament">	
		<h2>{{ name }}</h2>
		<RRTournamentResults v-bind="$props" />
		<div>Rounds:</div>
		<RRTournamentRound
			v-for="(round, index) in rounds"
			:key="round.id"
			:round="round"
			:round-number="index + 1"
			:players-order="playersOrder"
			:player-names="playerNames"
		/>
		<button
			v-if="canTournamentBeEnded"
			@click="endTournament"
		>
			End tournament
		</button>
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
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
