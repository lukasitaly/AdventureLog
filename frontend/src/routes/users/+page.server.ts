import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
const PUBLIC_SERVER_URL = process.env['PUBLIC_SERVER_URL'];
const serverEndpoint = PUBLIC_SERVER_URL || 'http://localhost:8000';

export const load = (async (event) => {
	if (!event.cookies.get('auth')) {
		return redirect(302, '/login');
	}

	const res = await fetch(`${serverEndpoint}/auth/users/`, {
		headers: {
			Cookie: `${event.cookies.get('auth')}`
		}
	});
	if (!res.ok) {
		return redirect(302, '/login');
	} else {
		const data = await res.json();
		return {
			props: {
				users: data
			}
		};
	}
}) satisfies PageServerLoad;