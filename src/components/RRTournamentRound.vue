<template>
	<div class="round">
		<div>Round {{ roundNumber }}</div>
		<table>
			<thead>
				<tr>
					<th>VS</th>
					<th v-for="i in MAX_GAMES_PER_MATCH" :key="i">Game {{ i }}</th>
					<th title="Chicken Dinner">Winner</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="match in round.matches" :key="match.id">
					<td>{{ playerNames[match.playerIds[0]] }} vs {{ playerNames[match.playerIds[1]] }}</td>
					<td v-for="game in match.games" :key="game.id">
						{{ `${game.scores[0]} - ${game.scores[1]}` }}
					</td>
					<td v-if="!match.matchWinnerId">
						<button
							type="button"
							@click="setActiveMatch(match)"
						>
							add
						</button>
					</td>
					<td v-for="i in numberOfUnplayableGames[match.id]" :key="i">-</td>
					<td>{{  playerNames[match.matchWinnerId] }}</td>
				</tr>
			</tbody>
		</table>
		<RRTournamentAddScores
			v-if="activeMatch"
			ref="modal"
			:player-b-name="playerNames[activeMatch.playerIds[0]]"
			:player-a-name="playerNames[activeMatch.playerIds[0]]"
			@submit-match-scores="setGameScores"
			@cancel-match-scores="unsetActiveMatch"
		/>
	</div>
</template>

<script>
import {MAX_GAMES_PER_MATCH} from "../constants.js";
import RRTournamentAddScores from './RRTournamentAddScores.vue';

export default {
	name: 'RRTournamentRound',
	components: {
		RRTournamentAddScores
	},
	props: {
		round: {
			type: Object,
			required: true
		},
		roundNumber: {
			type: Number,
			required: true
		},
		playersOrder: {
			type: Array,
			required: true
		},
		playerNames: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			MAX_GAMES_PER_MATCH,
			activeMatch: null,
		}
	},
	computed: {
		numberOfUnplayableGames() {
			return this.round.matches.reduce((acc, match) => {
				acc[match.id] = MAX_GAMES_PER_MATCH - match.games.length
				
				if (!match.matchWinnerId) {
					acc[match.id]--;
				}

				return acc;
			}, {});
		}
	},
	methods: {
		setActiveMatch(match) {
			this.activeMatch = match;
			this.$nextTick(this.showScoresModal);
			
		},
		showScoresModal() {
			this.$refs.modal.$el.showModal();
		},
		setGameScores(scores) {
			this.activeMatch.games.push({
				id: crypto.randomUUID(),
				scores: [scores.playerAScore, scores.playerBScore],
				gameWinnerId: this.getGameWinnerId(scores)
			});

			this.maybeSetMatchWinner();

			this.unsetActiveMatch();
		},
		unsetActiveMatch() {
			this.activeMatch = null;
		},
		getGameWinnerId(scores) {
			const winnerIndex = scores.playerAScore > scores.playerBScore ? 0 : 1
			return this.activeMatch.playerIds[winnerIndex];
		},
		maybeSetMatchWinner() {
			const requiredNumberOfWins = Math.ceil(MAX_GAMES_PER_MATCH / 2);
			const playerWins = {
				[this.activeMatch.playerIds[0]]: 0,
				[this.activeMatch.playerIds[1]]: 0
			};
			for (const game of this.activeMatch.games) {
				const winnerId = game.gameWinnerId;
				playerWins[winnerId]++;
				if (playerWins[winnerId] === requiredNumberOfWins) {
					this.activeMatch.matchWinnerId = winnerId;
					return;
				}
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
