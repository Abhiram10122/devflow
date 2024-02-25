"use server";

import User from "@/database/user.model";
import Tag, { ITag } from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return ["tag1", "tag2", "tag3"];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags = await Tag.find({});

    if (!tags) throw new Error("No tags found");

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "name _id" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) throw new Error("No tag found");

    const tagQuestions = tag.questions;

    return { tagTitle: tag.name, questions: tagQuestions };

    // const tag = await Tag.find({ tags: tagId }).populate({
    //   path: "questions",
    //   options: { sort: { createdAt: -1 } },
    //   populate: [
    //     { path: "author", model: User, select: "_id clerkId name picture" },
    //     { path: "tags", model: Tag, select: "name _id" },
    //   ],
    // });

    // if (!tag) throw new Error("No tag found");

    // const questions = tag.questions;

    // return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
