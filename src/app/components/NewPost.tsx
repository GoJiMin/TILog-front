"use client";

import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from "react";
import { AuthUser } from "../model/user";
import Avatar from "./ui/Avatar";
import Button from "./ui/Button";
import { FilesIcon } from "./ui/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PulseSpinner from "./ui/PulseSpinner";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { profileimage, userid } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
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
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!file) return;

    setError("");
    setLoading(true);
    const formData = new FormData();

    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch("/api/posts/", { method: "POST", body: formData }) //
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }

        router.push("/");
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className="relative w-full max-w-xl mx-auto mt-[40px] flex flex-col">
      {loading && <PulseSpinner />}
      {loading && <div className="fixed inset-0 z-10 bg-black/20" />}
      {error && (
        <p className="w-full bg-red-200 text-red-600 text-center font-semibold p-4 mb-4 rounded-md">
          {error}
        </p>
      )}
      <article className="flex gap-[10px] mb-[10px]">
        <Avatar image={profileimage} size="small" />
        <p className="text-lg font-semibold">{userid}</p>
      </article>
      <form
        className="w-full flex flex-col gap-[10px] mt-2"
        onSubmit={handleSubmit}
      >
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
          ref={textRef}
        />
        <Button text="게시" onClick={() => {}} />
      </form>
    </section>
  );
}
