<template>
	<div id="app">
		<header>Round Robin Tournament App</header>
		<main>
			<div class="sidebar">
				<RRTournamentList
					:tournaments="tournaments"
					v-model="selectedTournamentIndex"
					@tournament-create="createTournament"

				/>
			</div>
			<div class="content">
				<RRTournament
					v-if="selectedTournament"
					v-bind="selectedTournament"
					:tournament-index="selectedTournamentIndex"
					:key="selectedTournament.id"
					@tournament-end="endTournament"
				/>
				<RRTournamentCreate
					v-else
					@tournament-start="startTournament"
				/>
			</div>
		</main>
		<footer>Powered by Vue.js</footer>
	</div>
</template>

<script>
import {generateTournamentBracket} from './utils/brackets.js';
import RRTournament from './components/RRTournament.vue';
import RRTournamentCreate from './components/RRTournamentCreate.vue';
import RRTournamentList from './components/RRTournamentList.vue';

export default {
	name: 'App',
	components: {
		RRTournament,
		RRTournamentCreate,
		RRTournamentList
	},
	data() {
		return {
			selectedTournamentIndex: null,
			tournaments: []
		}
	},
	computed: {
		selectedTournament() {
			return this.tournaments[this.selectedTournamentIndex];
		}
	},
	methods: {
		createTournament() {
			this.selectedTournamentIndex = null;
		},
		startTournament({tournamentName, tournamentId, players}) {
			const playerNames = players.reduce((acc, player) => {
				acc[player.id] = player.name;
				return acc;
			}, {});
			const playersOrder = players.map(player => player.id);
			const tournament = {
				name: tournamentName,
				id: tournamentId,
				playerNames,
				playersOrder,
				rounds: generateTournamentBracket(playersOrder),
				hasEnded: false
			};
			this.tournaments.push(tournament);
			this.selectedTournamentIndex = this.tournaments.length - 1;
		},
		endTournament(index) {
			this.tournaments[index].hasEnded = true;
		},
		showTournament(index) {
			this.selectedTournamentIndex = index;
		}
	},
	mounted() {
		if (localStorage.getItem("tournaments")) {
			try {
				this.tournaments = JSON.parse(localStorage.getItem("tournaments"));
			} catch(e) {
				localStorage.removeItem('tournaments');
			}
		}
	},
	watch: {
		tournaments: {
			deep: true,
			handler () {
				localStorage.setItem("tournaments", JSON.stringify(this.tournaments));
			}
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
main {
	display: flex;
}
.sidebar {
	background-color: darkgrey;
}
</style>
