import { getMapByRoom, getPlayer, updatePlayer } from '@/app/lib/tableActions';

export async function POST(req, res) {
  try {
    const data = await req.json()
    const sectorXObj = data.Xobj;
    const sectorYObj = data.Yobj;
    const sectorY = data.sectorY;
    const sectorX = data.sectorX;
    const planetSector = data.planetSector;
    const room = data.room;
    const id = data.id;

    let message = 'That is incorrect. Don\'t give up! '
    let player = await getPlayer(room, id);
    player.moves += 5;

    if (!player.actions) {
      player.actions = [];
    }
    if (!player.action_results) {
      player.action_results = [];
    }

    const result = await getMapByRoom(data.room);
    if (!result.map) {
      return new Response(JSON.stringify({ error: 'Room not found' }), { status: 404 });
    }

    const map = JSON.parse(result.map)


    if (map[planetSector - 1] == 'planetX' && map[sectorX - 1] == sectorXObj && sectorYObj == map[sectorY - 1]) {
      message = 'You found Planet X!';
    }

    //add the new research to the player
    player.actions.push(`Planet X in sector ${planetSector}`);
    if (map[planetSector - 1] == 'planetX') {
      player.action_results.push('You found Planet X!');
    } else {
      player.action_results.push('Try again!');
    }

    await updatePlayer(room, player);

    return new Response(JSON.stringify({ message }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}