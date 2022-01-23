<template>
  <div class="sidebar">
    <button
      class="sidebar__item sidebar__button button"
      @click="createTournament"
    >
      Create Tournament
    </button>
    <ul class="sidebar__list">
      <li
        v-for="(tournament, index) in tournaments"
        :key="tournament.id"
        class="sidebar__item"
      >
        <input
          :id="`tournament-list-${tournament.id}`"
          v-model="selectedTournament"
          type="radio"
          name="tournament-list"
          :value="index"
          class="sidebar__radio"
        >
        <label
          :for="`tournament-list-${tournament.id}`"
          class="sidebar__label"
        >
          {{ tournament.name }}
        </label>
      </li>
    </ul>
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

<style scoped>
.sidebar__list {
	list-style: none;
	text-align: left;
}
.sidebar__item {
	display: flex;
	align-items: center;
	margin-bottom: var(--spacing-small);
	font-size: 16px;
	cursor: pointer;
}
.sidebar__radio {
	position: absolute;
	opacity: 0; 
	width: 1em;
	height: 1em;
	z-index: -1;
}
.sidebar__label {
	padding: calc(var(--spacing-small) * 2) var(--spacing);
	width: 100%;
	border: 1px solid transparent;
	border-radius: var(--spacing-small);
}
.sidebar__radio:checked + .sidebar__label {
	color: var(--primary-contrast-color);
	background-color: var(--secondary-color);
}
.sidebar__label:hover {
	border-color: var(--secondary-color);
}
.sidebar__button {
	margin-bottom: var(--spacing-big);
	width: 100%;
}
</style>
