import React from "react";
import Element from "./Metric";
import RenderTag from "../RenderTag";
import Link from "next/link";
import { getTimeStamp, formatNumberShort } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../EditDeleteAction";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  votes: number;
  answers: Array<object>;
  views: number;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  createdAt,
  votes,
  answers,
  views,
}: QuestionProps) => {
  const time = getTimeStamp(createdAt);
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {time}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => {
          return <RenderTag key={tag._id} _id={tag._id} name={tag.name} />;
        })}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Element
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={`- asked ${time}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="small-medium text-dark400_light800"
        />
        <Element
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatNumberShort(votes)}
          title="Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Element
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          value={formatNumberShort(answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Element
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumberShort(views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
