"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FormFields } from "@/types/formType";

type Props = {
  reset: any;
};

const Header = (props: Props) => {
  const { reset } = props;

  const handleClearForm = (e: any) => {
    e.preventDefault();
    reset(); // This will reset all form inputs to their default values
  };
  return (
    <div className="w-full flex flex-col px-2 text-black">
      <div className="flex w-full h-100 items-center bg-white justify-between py-4">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg">فرم درخواست</span>
          <span className="text-sm">ارسال رزومه برا شغل : </span>
        </div>
        <button
          onClick={handleClearForm}
          className="border text-sm border-secondary text-secondary rounded-md flex items-center text-center px-3 py-2 hover:bg-secondary hover:text-white transition-all ease-linear duration-100"
        >
          لغو درخواست
        </button>
      </div>
      {/* under dvider  */}
      <div className="w-full h-[1px] bg-primary"></div>
    </div>
  );
};

export default Header;
