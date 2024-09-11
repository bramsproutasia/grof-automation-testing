/* eslint-disable @next/next/no-img-element */
import PinForm from "@/components/PinForm";
import { Fragment } from "react";

export default function EnterPinPage() {
  return (
    <Fragment>
        <div className="white text-sm flex flex-col lg:flex-row min-h-screen">
          <div className="bg-secondary text-white text-sm lg:pt-9 lg:pl-5 lg:text-base lg:max-w-[280px]">
              <div className="mb-3 w-[70px] h-[28px] lg:w-[149px] lg:h-[60px]">
                  <img src="../grof-logo.svg" width="auto" height="auto" alt="vector" className="pt-3 pl-3" />
              </div>
              <p className="bold pl-3 pt-2 text-base lg:text-2xl lg:p-5">Log-in</p>
              <p className="mt-1 mr-3 pl-3 lg:p-5">Welcome back!</p>
              <p className="mt-1 mr-3 pl-3 pb-4 lg:p-5">Please enter your credentials to use Grof!</p>
          </div>
          <div className="text-sm w-full grid-cols-6 md:grid lg:py-10 lg:text-base">
              <div className="p-3 md:col-start-2 md:col-span-4 h-full">
                  <PinForm />
              </div>
          </div>
      </div>
    </Fragment>
  );
};
