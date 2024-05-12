"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import { AuthUser } from "../model/user";
import Avatar from "./ui/Avatar";
import Button from "./ui/Button";
import { FilesIcon } from "./ui/icons";

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

    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  return (
    <section>
      <article className="flex gap-[10px] mb-[10px]">
        <Avatar image={profileimage} size="small" />
        <p className="text-lg font-semibold">{userid}</p>
      </article>
      <input
        id="input-upload"
        className="hidden"
        name="input"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      <label
        htmlFor="input-upload"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <FilesIcon />
        <p className="font-semibold text-lg text-nowrap">
          클릭 혹은 사진을 드래그하세요!
        </p>
      </label>
      <textarea
        name="text"
        id="input-text"
        required
        rows={10}
        placeholder="오늘의 공유를 시작해보세요!"
      />
      <Button text="게시" onClick={() => {}} />
    </section>
  );
}
