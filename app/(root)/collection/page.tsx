import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { QuestionFilters } from "@/constants/filters";
import Filter from "@/components/shared/Filter";
import QuestionCard from "@/components/shared/question/Question";
import NoResult from "@/components/shared/NoResult";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { SearchParamsProps } from "@/types";

export default async function Collections({ searchParams }: SearchParamsProps) {
  const { userId } = auth();

  if (!userId) return null;

  const result = await getSavedQuestions({
    searchQuery: searchParams.q,
    clerkId: userId,
  });

  return (
    <main>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col">
        <LocalSearchBar
          route={"/collection"}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
        {/* <Filters /> */}
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
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
}
