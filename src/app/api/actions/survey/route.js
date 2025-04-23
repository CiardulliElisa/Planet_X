import { getMapByRoom } from '@/app/lib/tableActions';
import { getPlayer, updatePlayer } from '@/app/lib/tableActions';

export async function POST(req) {
  try {
    const data = await req.json();
    const startSector = data.startSector;
    const endSector = data.endSector;
    const celestialBody = data.celestialBody;
    const room = data.room;
    const id = data.id;

    //add researches, actions and action_results to player, if they do not have them already
    let player = await getPlayer(room, id);

    if (!player.researches) {
      player.researches = {};
    }
    if (!player.actions) {
      player.actions = [];
    }
    if (!player.action_results) {
      player.action_results = [];
    }

    let distance = 3;
    if (startSector < endSector) {
      distance = endSector - startSector;
    } else {
      distance = 12 - startSector + endSector;
    }

    if (distance >= 8) {
      player.moves += 1;
    }
    else if (distance > 4 && distance < 8) {
      player.moves += 2;
    }
    else if (distance <= 4) {
      player.moves += 3;
    }

    const result = await getMapByRoom(data.room);
    if (!result.map) {
      return new Response(JSON.stringify({ error: 'Room not found' }), { status: 404 });
    }

    const map = JSON.parse(result.map);

    const startIndex = startSector - 1;
    const endIndex = endSector - 1;

    // Extract the relevant subsector
    const sectorsToCheck = map.slice(startIndex, endIndex + 1);

    // Count occurrences of the specified celestial body
    const count = sectorsToCheck.filter(sector => sector === celestialBody).length;

    let message = '';

    if (count === 0) {
      message = 'You found no ' + celestialBody + 's';
    } else if (count === 1) {
      message = 'You found ' + count + ' ' + celestialBody;
    } else {
      message = 'You found ' + count + ' ' + celestialBody + 's';
    }

    //update player
    player.actions.push(`Surveyed (${startSector}-${endSector})`);
    player.action_results.push(`${count} ${celestialBody}${count === 1 ? '' : 's'}`);

    await updatePlayer(room, player);

    return new Response(JSON.stringify({ count, message }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}