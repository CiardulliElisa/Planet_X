import { getPlayer } from "@/app/lib/tableActions";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const room = searchParams.get('room');
    const actions = searchParams.get('actions');
    const action_results = searchParams.get('action_results');

    const player = await getPlayer(room, id, actions, action_results);

    return new Response(JSON.stringify(player), {
        headers: { 'Content-Type': 'application/json' },
    });
}