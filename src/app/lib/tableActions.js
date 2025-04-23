import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('/workspaces/wie-plantet-x/db/planetx.db');

export function getMapByRoom(room) {
  return new Promise((resolve, reject) => {
    db.get("SELECT map FROM games WHERE room = ?", [room], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function getTableByRoom(room) {
  return new Promise((resolve, reject) => {
    db.get("SELECT researches FROM games WHERE room = ?", [room], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function getPlayersByRoom(room) {
  return new Promise((resolve, reject) => {
    db.get("SELECT players FROM games WHERE room = ?", [room], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export async function getPlayer(room, id) {
  const row = await getPlayersByRoom(room);

  const players = JSON.parse(row.players);

  for (let season in players) {
    if (players[season].id === id) {
      return players[season];
    }
  }
  return null;
}

export async function getOtherPlayers(room, id) {
  try {
    const row = await getPlayersByRoom(room);

    const players = JSON.parse(row.players);

    for (let season in players) {
      if (players[season].id === id) {
        delete players[season];
      }
    }

    return players;

  } catch (error) {
    console.error('Error fetching other players:', error);
    return null;
  }
}

export async function updatePlayer(room, player) {
  const row = await getPlayersByRoom(room);

  const players = JSON.parse(row.players);

  for (let season in players) {
    if (players[season].id === player.id) {
      players[season] = player;
    }
  }

  db.run("UPDATE games SET players = ? WHERE room = ?", [JSON.stringify(players), room]);
}