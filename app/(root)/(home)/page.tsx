import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
// import Filters from "@/components/shared/search/Filters";
import { HomePageFilters } from "@/constants/filters";
import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/shared/question/Question";
import NoResult from "@/components/shared/NoResult";

export default function Home() {
  const questions = [
    {
      _id: "1",
      title: "Cascading deletes in SqlAlchemy",
      tags: [
        { _id: "1", name: "Python" },
        { _id: "2", name: "sql" },
      ],
      author: {
        _id: "john-doe-uuid", // Generated random _id
        name: "John Doe",
        picture: "https://example.com/profile-picture.jpg", // Example picture URL
      },
      votes: 200000000000,
      answers: [
        // Add Answer objects here, ensuring they adhere to the Answer interface definition
        { _id: "1", content: "Answer 1 for question 1", createdAt: new Date() },
        // ... more answers
      ],
      views: 100,
      createdAt: new Date("2023-09-01T12:00:00.000Z"),
    },
    {
      _id: "2",
      title: "How to center a div",
      tags: [
        { _id: "1", name: "Javascript" },
        { _id: "2", name: "CSS" },
      ],
      author: {
        _id: "jane-doe-uuid", // Generated random _id
        name: "Jane Doe",
        picture: "https://example.com/jane-doe-picture.jpg", // Example picture URL
      },
      votes: 101,
      answers: [
        // Add Answer objects here
        { _id: "2", content: "Answer 1 for question 2", createdAt: new Date() },
        // ... more answers
      ],
      views: 50000000,
      createdAt: new Date("2021-07-04T12:00:00.000Z"),
    },
  ];

  return (
    <main>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col md:flex-col">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
        {/* <Filters /> */}
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-56 sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 1 ? (
          questions.map((question) => {
            return (
              <QuestionCard
                _id={question._id}
                key={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                createdAt={question.createdAt}
                votes={question.votes}
                answers={question.answers}
                views={question.views}
              />
            );
          })
        ) : (
          <NoResult
            title="There's no questions to show"
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
