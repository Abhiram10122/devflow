"use client";

import { downVoteAnswer, upVoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downVoteQuestion,
  upVoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatNumberShort } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "../ui/use-toast";

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
  const pathname = usePathname();
  const router = useRouter();
  const handleSaved = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });

    return toast({
      title: `Saved ${!hasSaved ? "Successfully" : "Removed"}`,
      variant: !hasSaved ? "default" : "destructive",
    });
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({
        title: "Please login",
        description: "You must be logged in to vote.",
      });
    }

    if (type === "Question") {
      if (action === "upvote") {
        await upVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });

        return toast({
          title: `Upvote ${!hasupVoted ? "successful" : "removed"}`,
          variant: !hasupVoted ? "default" : "destructive",
        });
      } else {
        await downVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });

        return toast({
          title: `Downvote ${!hasdownVoted ? "successful" : "removed"}`,
          variant: hasdownVoted ? "default" : "destructive",
        });
      }
    } else if (type === "Answer") {
      if (action === "upvote") {
        await upVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });

        return toast({
          title: `Upvote ${!hasupVoted ? "successful" : "removed"}`,
          variant: !hasupVoted ? "default" : "destructive",
        });
      } else {
        await downVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });

        return toast({
          title: `Downvote ${!hasdownVoted ? "successful" : "removed"}`,
          variant: hasdownVoted ? "default" : "destructive",
        });
      }
    }
  };

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={`/assets/icons/${hasupVoted ? "upvoted.svg" : "upvote.svg"}`}
            alt="upvote"
            height={18}
            width={18}
            className="cursor-pointer "
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18pdx] rounded-sm p-1 ">
            <p className="subtle-medium text-dark400_light900">
              {formatNumberShort(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={`/assets/icons/${hasdownVoted ? "downvoted.svg" : "downvote.svg"}`}
            alt="downvote"
            height={18}
            width={18}
            className="cursor-pointer "
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18pdx] rounded-sm p-1 ">
            <p className="subtle-medium text-dark400_light900">
              {formatNumberShort(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "Question" && (
        <Image
          src={`/assets/icons/${hasSaved ? "star-filled.svg" : "star-red.svg"}`}
          alt="star"
          height={18}
          width={18}
          className="cursor-pointer "
          onClick={handleSaved}
        />
      )}
    </div>
  );
};

export default Votes;
