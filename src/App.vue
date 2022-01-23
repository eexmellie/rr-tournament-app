<template>
  <div
    id="app"
    class="app"
  >
    <div class="app__sidebar">
      <div class="app__title title">
        Round Robin Tournament App
      </div>
      <RRTournamentList
        v-if="tournaments.length"
        v-model="selectedTournamentIndex"
        :tournaments="tournaments"
        @tournament-create="createTournament"
      />
    </div>
    <main class="app__body">
      <div class="app__content">
        <RRTournament
          v-if="selectedTournament"
          :key="selectedTournament.id"
          v-bind="selectedTournament"
          :tournament-index="selectedTournamentIndex"
          @tournament-end="endTournament"
          @tournament-delete="deleteTournament"
        />
        <RRTournamentCreate
          v-else
          @tournament-start="startTournament"
        />
      </div>
      <footer class="app__footer footer">
        Powered by Vue.js
      </footer>
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
	watch: {
		tournaments: {
			deep: true,
			handler () {
				localStorage.setItem("tournaments", JSON.stringify(this.tournaments));
			}
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
	}
}
</script>

<style src="dialog-polyfill/dist/dialog-polyfill.css"></style>
<style src="./assets/css/base.css"></style>
