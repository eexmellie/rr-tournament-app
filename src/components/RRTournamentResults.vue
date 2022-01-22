<template>
	<div class="results">
		<template v-if="winners">
			<div>Winners: {{ winners }}</div>
		</template>
		<div>Rankings</div>
		<table>
			<thead>
				<tr>
					<th></th>
					<th
						v-for="playerId in playersOrder"
						:key="playerId"
					>
						{{ playerNames[playerId] }}
					</th>
					<th>Points</th>
					<th>Rank</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="playerAId in playersOrder"
					:key="playerAId"
				>
					<td>{{ playerNames[playerAId] }}</td>
					<td
						v-for="playerBId in playersOrder"
						:key="playerBId"
						:class="{ empty: playerAId === playerBId }"
					>
						{{ formatMatchResult(playerAId, playerBId) }}
					</td>
					<td>{{ totalPoints[playerAId] }}</td>
					<td>{{ rank[playerAId] || "-" }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>

export default {
	name: 'RRTournamentResults',
	props: {
		name: {
			type: String,
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
		hasEnded: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		matchResults() {
			return this.rounds.reduce((acc, round) => {
				round.matches.reduce((acc, match) => {
					if (!match.matchWinnerId) {
						return acc;
					}
					const [playerAId, playerBId] = match.playerIds;
					const hasPlayerAWon = match.matchWinnerId === playerAId;
					if (acc[playerAId]) {
						acc[playerAId][playerBId] = hasPlayerAWon;
					} else {
						acc[playerAId] = {
							[playerBId]: hasPlayerAWon
						};
					}

					if (acc[playerBId]) {
						acc[playerBId][playerAId] = !hasPlayerAWon;
					} else {
						acc[playerBId] = {
							[playerAId]: !hasPlayerAWon
						};
					}
					return acc;
				}, acc);
				return acc;
			}, {});
		},
		totalPoints() {
			return this.playersOrder.reduce((acc, playerId) => {
				if (!this.matchResults[playerId]) {
					acc[playerId] = 0;
				} else {
					acc[playerId] = Object.values(this.matchResults[playerId]).filter(Boolean).length;
				}
				return acc;
			}, {});
		},
		rank() {
			const playerPointsSorted = Object.entries(this.totalPoints)
				.sort(([, playerAPoints], [, playerBPoints]) => playerBPoints - playerAPoints);

			const playerAggregatedByPoints =  playerPointsSorted.reduce((acc, [playerId, playerPoints]) => {
				if (acc.length && acc[acc.length-1].points === playerPoints) {
					acc[acc.length-1].players.push(playerId);
				} else {
					acc.push({
						points: playerPoints,
						players: [playerId]
					});
				}
				return acc;
			}, []);

			if (playerAggregatedByPoints.length === 1 && playerAggregatedByPoints[0].points === 0) {
				return {};
			}

			const playerRanks = playerAggregatedByPoints.reduce((acc, {players}, i) => {
				const playerRanks = players.reduce((acc, playerId) => {
					acc[playerId] = i + 1;
					return acc;
				}, {})
				Object.assign(acc, playerRanks);
				return acc;
			}, {})
			
			return playerRanks;
		},
		winners() {
			if (!this.hasEnded) {
				return null;
			}

			return Object.entries(this.rank)
				.filter(([, playerRank]) => playerRank === 1)
				.map(([playerId]) => this.playerNames[playerId])
				.join(", ");
		}
	},
	methods: {
		formatMatchResult(playerAId, playerBId) {
			const isSamePlayer = playerAId === playerBId;
			if (isSamePlayer) {
				return "";
			}

			const hasPlayerAPlayed = this.matchResults[playerAId];
			if (!hasPlayerAPlayed) {
				return "";
			}

			const hasPlayersPlayed = this.matchResults[playerAId][playerBId] !== undefined;
			if (!hasPlayersPlayed) {
				return "";
			}

			return this.matchResults[playerAId][playerBId] ? "1" : "0";
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	table {
		border-collapse: collapse;
	}
	td, th {
		border: 1px solid black;
		padding: 10px;
	}
	.empty {
		background-color: darkgrey;
	}
</style>
