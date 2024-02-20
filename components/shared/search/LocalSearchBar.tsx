"use client";
import React from "react";
import { Input } from "../../ui/input";
import Image from "next/image";

interface LocalSearchBarProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: LocalSearchBarProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] w-full grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        className="paragraph-regular no-focus placeholder border-none bg-transparent shadow-none outline-none"
        value=""
        placeholder={placeholder}
        onChange={() => {}}
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
