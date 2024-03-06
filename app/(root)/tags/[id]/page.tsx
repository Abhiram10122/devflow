import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/shared/question/Question";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
// import { QuestionFilters } from "@/constants/filters";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
// import { Filter } from "lucide-react";
import React from "react";

const TagDetailsPage = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });
  return (
    <main>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchBar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions..."
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => {
            return (
              <QuestionCard
                _id={question._id}
                key={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                createdAt={question.createdAt}
                votes={question.upvote.length}
                answers={question.answers}
                views={question.views}
              />
            );
          })
        ) : (
          <NoResult
            title="There's no saved questions to show"
            description="Be the first to break the silence! 🚀 Ask a question and kickstart the
        discussion. Your query could be the next big thing other learn from. Get
        involved! 💡"
            link="/ask-a-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </main>
  );
};

export default TagDetailsPage;
