import { getMapByRoom } from '@/app/lib/tableActions';
import { getPlayer, updatePlayer } from '@/app/lib/tableActions';

export async function POST(req, res) {
  try {
    const data = await req.json();
    const targetedSector = data.targetedSector;
    const room = data.room;
    const id = data.id;

    let player = await getPlayer(room, id);

    if (!player.actions) {
      player.actions = [];
    }
    if (!player.action_results) {
      player.action_results = [];
    }

    player.moves += 4;


    const result = await getMapByRoom(data.room);
    if (!result.map) {
      return new Response(JSON.stringify({ error: 'Room not found' }), { status: 404 });
    }

    const map = JSON.parse(result.map)

    let celestialBody = ''
    let message = ''

    celestialBody = map[targetedSector - 1];

    if (celestialBody === 'planetX') {
      celestialBody = 'void';
    }

    if (celestialBody === 'void') {
      message = 'Sector ' + targetedSector + ' appears to be empty.';
    } else if (celestialBody == 'asteroid') {
      message = 'Sector ' + targetedSector + ' contains an ' + celestialBody;
    } else {
      message = 'Sector ' + targetedSector + ' contains a ' + celestialBody;
    }


    //update player
    player.actions.push(`Targeted ${targetedSector}`);
    player.action_results.push(`${celestialBody}`);

    await updatePlayer(room, player);

    return new Response(JSON.stringify({ message }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}