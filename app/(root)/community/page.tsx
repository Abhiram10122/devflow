import UserCard from "@/components/community/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";

const CommunityPage = async () => {
  const result = await getAllUsers({});

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />
        {/* <Filters /> */}
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => {
            return <UserCard key={user.name} user={user} />;
          })
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No Users Yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default CommunityPage;
