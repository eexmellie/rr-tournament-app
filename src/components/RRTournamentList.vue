<template>
	<div>
		<ul v-if="tournaments.length">
			<li
				v-for="(tournament, index) in tournaments"
				:key="tournament.id"
			>
				<label
					:for="`tournament-list-${tournament.id}`"
				>
					{{ tournament.name }}
				</label>
				<input
					type="radio"
					name="tournament-list"
					:value="index"
					:id="`tournament-list-${tournament.id}`"
					v-model="selectedTournament"
				>
			</li>
		</ul>
		<div>-----</div>
		<button
			v-if="tournaments.length"
			@click="createTournament"
		>
			Create Tournament
		</button>
	</div>
</template>

<script>
export default {
	name: 'RRTournamentList',
	props: {
		tournaments: {
			type: Array,
			required: true
		},
		value: {
			type: Number,
			default: null
		}
	},
	computed: {
		selectedTournament: {
			get() {
				return this.value;
			},
			set(value) {
				this.$emit('input', value);
			}
		}
	},
	methods: {
		createTournament() {
			this.$emit("tournament-create");
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
