import { Schema, models, model, Document } from "mongoose";

export interface IAnswer extends Document {
  content: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  question: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

const AnswerSchema = new Schema({
  content: { type: String, requried: true },
  upvote: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvote: [{ type: Schema.Types.ObjectId, ref: "User" }],
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
