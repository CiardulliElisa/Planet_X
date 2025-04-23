import { getPlayersByRoom } from "@/app/lib/tableActions";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const room = searchParams.get('room');

    const otherPlayers = await getPlayersByRoom(room);

    return new Response(JSON.stringify(otherPlayers), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching other players:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}