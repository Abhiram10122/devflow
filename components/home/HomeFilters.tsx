"use client";

import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const active = "newest";

  return (
    <div className="mt-10 flex justify-start gap-3 max-md:hidden">
      {HomePageFilters.map((item) => {
        return (
          <Link key={item.value} href={`/tags/${1}`}>
            <Button
              onClick={() => {}}
              className={`body-medium rounded-lg border-none px-6 py-3 capitalize shadow-none ${
                active === item.value
                  ? "bg-primary-100 text-primary-500"
                  : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-500"
              } `}
            >
              {item.name}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default HomeFilters;
