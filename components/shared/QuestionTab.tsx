import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "./question/Question";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionsTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({ userId, page: 1 });
  return (
    <div className="flex flex-col gap-5 ">
      {result.questions.map((question) => (
        <QuestionCard
          _id={question._id}
          key={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          createdAt={question.createdAt}
          votes={question.upvote.length}
          answers={question.answers}
          views={question.views}
        />
      ))}
    </div>
  );
};

export default QuestionsTab;
