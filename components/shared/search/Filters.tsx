import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import { HomePageFilters } from "@/constants/filters";

const Filters = () => {
  return (
    <div>
      <div className="max-sm:w-full md:hidden">
        <Select>
          <SelectTrigger className="min-h-[56px] w-full min-w-[170px] px-5 py-[10px]">
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            {HomePageFilters.map((item) => {
              return (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 flex justify-start gap-3 max-md:hidden">
        {HomePageFilters.map((item) => {
          return (
            <Link key={item.value} href={`/tags/${1}`}>
              <Badge className="background-light800_dark300 rounded-md border-none px-6 py-2 text-[14px] font-medium text-light-500">
                {item.name}
              </Badge>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
