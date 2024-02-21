import Image from "next/image";
import React from "react";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: Props) => {
  return (
    <div className="flex gap-1">
      <Image
        src={`/assets/icons/${upvoted ? "upvoted.svg" : "upvote.svg"}`}
        alt="upvote"
        height={18}
        width={18}
      />
      <p className="subtle-medium background-light700_dark400 text-dark400_light900 rounded-sm p-1">
        {upNumber}
      </p>
      <Image
        src={`/assets/icons/${downvoted ? "downvoted.svg" : "downvote.svg"}`}
        alt="downvote"
        height={18}
        width={18}
      />
      <p className="subtle-medium background-light700_dark400 text-dark400_light900 rounded-sm p-1">
        {downNumber}
      </p>
    </div>
  );
};

export default Votes;
