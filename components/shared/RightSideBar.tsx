import React from "react";
import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

const RightSideBar = () => {
  const popularTags = [
    { _id: 1, name: "Javascript", totalQuestions: 44 },
    { _id: 2, name: "react", totalQuestions: 32 },
    { _id: 3, name: "prisma", totalQuestions: 12 },
    { _id: 4, name: "NextJs", totalQuestions: 55 },
    { _id: 5, name: "MongoDB", totalQuestions: 13 },
  ];
  const hotQuestions = [
    {
      _id: 1,
      title:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    },
    {
      _id: 2,
      title: "Is it only me or the font is bolder than necessary?",
    },
    {
      _id: 3,
      title: "Can I get the course for free?",
    },
    {
      _id: 4,
      title: "Redux Toolkit Not Updating State as Expected",
    },
    {
      _id: 5,
      title: "Async/Await Function Not Handling Errors Properly",
    },
  ];

  return (
    <section className="background-light900_dark200 text-dark500_light700 sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((item) => {
            return (
              <Link
                href={`/questions/${item._id}`}
                key={item._id}
                className="flex-between cursor-pointer gap-7"
              >
                <p className="body-medium">{item.title}</p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="arrow"
                  height={20}
                  width={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-[5.5rem]">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((item) => {
            return (
              <RenderTag
                key={item._id}
                _id={item._id}
                name={item.name}
                totalQuestions={item.totalQuestions}
                showCount
              />
            );
          })}
          <div className="flex-between  ">
            <p className="background-light900_dark300 text-light400_light500 subtle-regular rounded-lg px-[16px] py-[8px]">
              NEXTJS
            </p>
            <p className="small-regular">35</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
