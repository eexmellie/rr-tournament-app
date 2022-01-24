function generateTournamentBracket(ids) {
  const players = [...ids];
  if (players.length % 2 !== 0) {
    players.push(null);
  }

  const rounds = getPlayersRotations(players);
  const bracket = rounds.map(round => ({
    id: crypto.randomUUID(),
    matches: matchPlayers(round).map(match => ({
      id: crypto.randomUUID(),
      playerIds: match,
      games: [],
      matchWinnerId: ''
    })),
  }));
  return bracket;
}

function matchPlayers(players) {
  const middle = players.length / 2;
  const firstHalf = players.slice(0, middle);
  const secondHalf = players.slice(middle).reverse();
  const pairs = firstHalf.map((player, i) => [player, secondHalf[i]]);
  return pairs.filter(pair => !pair.includes(null));
}

function getPlayersRotations(players) {
  const rotations = [[...players]];
  for (let i = 0; i < players.length - 2; i++) {
    rotations.push(rotatePlayers(rotations[i]));
  }
  return rotations;
}

function rotatePlayers(players) {
  return [players[0], ...players.slice(2), players[1]];
}

export {generateTournamentBracket}
