<template>
	<div id="app" class="app">
		<div class="app__sidebar">
			<div class="app__title title">Round Robin Tournament App</div>
			<RRTournamentList
				v-if="tournaments.length"
				:tournaments="tournaments"
				v-model="selectedTournamentIndex"
				@tournament-create="createTournament"

			/>
		</div>
		<main class="app__body">
			<div class="app__content">
				<RRTournament
					v-if="selectedTournament"
					v-bind="selectedTournament"
					:tournament-index="selectedTournamentIndex"
					:key="selectedTournament.id"
					@tournament-end="endTournament"
					@tournament-delete="deleteTournament"
				/>
				<RRTournamentCreate
					v-else
					@tournament-start="startTournament"
				/>
			</div>
			<footer class="app__footer footer">Powered by Vue.js</footer>
		</main>
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
		deleteTournament(index) {
			this.tournaments.splice(index, 1);
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
:root {
  --primary-color: #4B49AC;
  --secondary-color: #7DA0FA;
  --primary-contrast-color: #fff;
  --secondary-contrast-color:  #F5F7FF;
  --table-border-color: #ced4da;
  --disabled-color:  rgba(0, 0, 0, 0.25);
  --text-color: #1f1f1f;
  --danger-color: #8C1C13;

  --small-spacing: 12px;
  --normal-spacing: calc(var(--small-spacing) * 2);
}
*,
*::before,
*::after {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}
body {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-size: 18px;
	background-color: var(--primary-contrast-color);
	color: var(--text-color);
}
table {
	border-collapse: collapse;
}
td, th {
	padding: 10px;
}
.app {
	min-height: 100vh;
	display: flex;
}
.app__title {
	margin-bottom: 30px;
}
.app__sidebar {
	width: 250px;
	padding: 15px;
	background-color: var(--secondary-contrast-color);
}
.app__body {
	width: calc(100% - 250px);
	display: flex;
	flex-direction: column;
}
.app__footer {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 60px;
}
.app__content {
	flex-grow: 1;
	min-height: calc(100vh - 60px);
	padding: 40px;
	padding-bottom: 0;
}
.title {
	color:  var(--primary-color);
	font-weight: 700;
	font-size: 25px;
}
.button {
	min-height: 40px;
	padding: 10px 15px;
	font-weight: 700;
	color: var(--primary-contrast-color);
	background-color: var(--primary-color);
	border: 1px solid transparent;
	border-radius: 5px;
}
.button--round {
	padding: 0;
	width: 20px;
	height: 20px;
	min-height: 20px;
	border-radius: 50%;
	display: inline-flex;
    justify-content: center;
    align-items: center;
}
.button:hover:enabled {
	color: inherit;
	background-color: inherit;
	border: 1px solid var(--primary-color);
}
.button--danger {
	background-color: var(--danger-color);
}
.button--danger:hover:enabled {
	border-color: var(--danger-color);
}
.button:disabled {
	background-color: var(--disabled-color);
}
</style>
