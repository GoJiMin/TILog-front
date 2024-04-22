import { FormEvent, useState } from "react";
import { useDebounce } from "../utils/hooks/useDebounce";

export default function CommentForm({ id }: { id: string }) {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ id, comment: text }),
    });
  };
  return (
    <form
      className='flex items-center border-t border-neutral-300 pt-3'
      onSubmit={handleSubmit}
    >
      <input
        className='w-full border-none outline-none'
        type='text'
        value={text}
        onChange={handleChange}
        placeholder='댓글을 추가해보세요!'
      />
      <button className='whitespace-nowrap' disabled={text.length === 0}>
        게시
      </button>
    </form>
  );
}
