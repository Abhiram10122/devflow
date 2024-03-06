import React from "react";
import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tag.action";

const RightSideBar = async () => {
  const { popularTags } = await getPopularTags();
  const { questions } = await getHotQuestions({});

  return (
    <section className="background-light900_dark200 text-dark500_light700 sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {questions.map((item) => {
            return (
              <Link
                href={`/question/${item._id}`}
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
                totalQuestions={item.numberOfQuestions}
                showCount
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
