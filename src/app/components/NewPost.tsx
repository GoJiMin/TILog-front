"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import { AuthUser } from "../model/user";
import Avatar from "./ui/Avatar";
import Button from "./ui/Button";
import { FilesIcon } from "./ui/icons";
import Image from "next/image";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { profileimage, userid } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    }

    if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  return (
    <section className="w-full max-w-xl mx-auto mt-10 flex flex-col">
      <article className="flex gap-[10px] mb-[10px]">
        <Avatar image={profileimage} size="small" />
        <p className="text-lg font-semibold">{userid}</p>
      </article>
      <form className="w-full flex flex-col gap-[10px] mt-2">
        <input
          id="input-upload"
          className="hidden"
          name="input"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-72 flex flex-col items-center justify-center ${
            !file && "border-4 border-dashed border-neutral-300"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-50 bg-sky-500/20 pointer-events-none" />
          )}
          {!file && (
            <div className="flex flex-col items-center">
              <FilesIcon />
              <p className="font-semibold text-lg text-nowrap">
                클릭 혹은 사진을 드래그하세요!
              </p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover rounded-md"
                src={URL.createObjectURL(file)}
                alt="local image"
                sizes="650px"
                fill
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none resize-none text-lg p-3 shadow-xl rounded-md"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder="오늘의 공유를 시작해보세요!"
        />
        <Button text="게시" onClick={() => {}} />
      </form>
    </section>
  );
}
