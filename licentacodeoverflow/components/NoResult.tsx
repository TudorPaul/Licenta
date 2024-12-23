import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}
const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-medium text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>

      <Link href={link}>
        <Button className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
