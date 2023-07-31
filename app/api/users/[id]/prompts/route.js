import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (req, { params }) => {
	const creatorId = params.id;

	try {
		await connectToDB();

		const prompts = await Prompt.find({
			creator: creatorId,
		}).populate('creator');

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response('Failed to load prompts place try again later', { status: 500 });
	}
};
