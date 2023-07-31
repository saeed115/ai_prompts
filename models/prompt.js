import { model, models, Schema } from 'mongoose';

const promptSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	prompt: {
		type: String,
		require: [true, 'Prompt is require '],
	},
	tag: {
		type: String,
		require: [true, 'Tag is require '],
	},
});

const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;
