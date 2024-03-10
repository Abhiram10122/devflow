import React from "react";
import Image from "next/image";
import Link from "next/link";

interface UserProps {
  user: {
    _id: string;
    clerkid: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: UserProps) => {
  // const interactedTags = await getTopInteractedTags({ userId: user._id });
  // const interactedTags = [
  //   { id: 1, name: "Html" },
  //   { id: 2, name: "css" },
  //   { id: 3, name: "java" },
  // ];

  return (
    <Link
      href={`/profile/${user.clerkid}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="User profile"
          height={100}
          width={100}
          className="rounded-full"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark300_light900 line-clamp-1">
            {user.name}
          </h3>

          <p className="text-dark500_light500 body-regular mt-2">
            @{user.username}
          </p>
        </div>

        {/* <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => {
                return (
                  <RenderTag
                    key={tag.id}
                    name={tag.name}
                    _id={String(tag.id)}
                  />
                );
              })}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div> */}
      </article>
    </Link>
  );
};

export default UserCard;
