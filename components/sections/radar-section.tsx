"use client";
import React from "react";
import { Radar, IconContainer } from "./radar-effect";
import { HiDocumentText, HiDocumentReport } from "react-icons/hi";
import { HiMiniDocumentArrowUp } from "react-icons/hi2";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsClipboardDataFill } from "react-icons/bs";
import { BiSolidReport } from "react-icons/bi";
import { RiFilePaper2Fill } from "react-icons/ri";

export default function RadarSection() {
  return (
    <section className="flex min-h-[600px] w-full items-center justify-center bg-black py-20">
      <div className="relative flex h-96 w-full max-w-3xl flex-col items-center justify-center space-y-4 overflow-hidden px-4">
        {/* Row 1 */}
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
            <IconContainer
              text="Web Development"
              delay={5.5}
              icon={<HiDocumentText className="h-8 w-8 text-slate-600" />}
            />
            <IconContainer
              delay={7}
              text="Mobile apps"
              icon={<AiFillDollarCircle className="h-8 w-8 text-slate-600" />}
            />
            <IconContainer
              text="Designing"
              delay={8.5}
              icon={<BsClipboardDataFill className="h-8 w-8 text-slate-600" />}
            />
          </div>
        </div>
        {/* Row 2 */}
        <div className="mx-auto w-full max-w-md">
          <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
            <IconContainer
              text="Maintenence"
              delay={6}
              icon={<BiSolidReport className="h-8 w-8 text-slate-600" />}
            />
            <IconContainer
              text="Server management"
              delay={8}
              icon={<HiMiniDocumentArrowUp className="h-8 w-8 text-slate-600" />}
            />
          </div>
        </div>
        {/* Row 3 */}
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
            <IconContainer
              delay={6.5}
              text="GitHub Integration"
              icon={<HiDocumentReport className="h-8 w-8 text-slate-600" />}
            />
            <IconContainer
              delay={7.5}
              text="CMS Integration"
              icon={<RiFilePaper2Fill className="h-8 w-8 text-slate-600" />}
            />
          </div>
        </div>

        <Radar className="absolute -bottom-12" />
        <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>
    </section>
  );
}
