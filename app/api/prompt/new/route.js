import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const POST = async (req) => {
	const { userId, tag, prompt } = await req.json();

	try {
		await connectToDB();

		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tag,
		});

		await newPrompt.save();

		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		return new Response('Failed to create new prompt place try again later', { status: 500 });
	}
};
