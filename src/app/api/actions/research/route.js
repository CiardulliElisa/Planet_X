import { getTableByRoom, getPlayer, updatePlayer } from '@/app/lib/tableActions';

export async function POST(req, res) {
  try {
    const data = await req.json()
    const letter = (data.letter).toLowerCase();
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

    player.moves += 1;

    const result = await getTableByRoom(room);
    if (!result.researches) {
      return new Response(JSON.stringify({ error: 'Room not found' }), { status: 404 });
    }

    const researches = JSON.parse(result.researches);

    const index = letter.charCodeAt(0) - 97;

    const message = 'You found out that ' + researches[index];

    //add the new research to the player
    player.researches[letter] = message;
    player.actions.push('Research');
    player.action_results.push(letter.toUpperCase());

    await updatePlayer(room, player);

    return new Response(JSON.stringify({ message }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}