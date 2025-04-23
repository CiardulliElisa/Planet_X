import sqlite3 from 'sqlite3';
import genMap from '@/app/lib/map';
import { getPlayersByRoom } from '@/app/lib/tableActions';
import genResearch from '@/app/lib/genResearch';

const db = new sqlite3.Database('/workspaces/wie-plantet-x/db/planetx.db')

export async function POST(req, res) {
	const data = await req.json()
	const room = data.code

	if (data.new) {
		const map = genMap()
		const researches = genResearch(map);
		const players = {
			spring: {id: data.id, moves: 0},
			summer: {},
			fall: {},
			winter: {}
		}

		const mapString = JSON.stringify(map)
		const researchesString = JSON.stringify(researches)

		db.run("INSERT INTO games (map, room, researches, players) VALUES (?, ?, ?, ?) ", [mapString, room, researchesString, JSON.stringify(players)], (err) => {
			if (err) {
				console.error(err);
				return;
			}
		})

	} else {
		const result = await getPlayersByRoom(room);
		if (!result.players) {
			new Response(JSON.stringify({ error: 'Room not found' }), { status: 404 });
		}
		let players = JSON.parse(result.players)
		for (let season in players) {
			if (Object.keys(players[season]).length === 0) {
				players[season] = {id: data.id, moves: 0}
				break
			}
		}

		db.run("UPDATE games SET players = ? WHERE room = ?", [JSON.stringify(players), room], (err) => {
			if (err) {
				console.error(err);
				return;
			}
		})
	}

	return new Response(JSON.stringify({ code: room }))
}