import { FormEvent, useState } from "react";

type Props = {
  onSubmitComment: (text: string) => void;
};

export default function CommentForm({ onSubmitComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitComment(comment);
    setComment("");
  };

  return (
    <form
      className='flex items-center border-t border-neutral-300 pt-3'
      onSubmit={handleSubmit}
    >
      <input
        className='w-full border-none outline-none'
        type='text'
        required
        value={comment}
        onChange={handleChange}
        placeholder='댓글을 추가해보세요!'
      />
      <button
        className={`whitespace-nowrap ${
          buttonDisabled ? "text-gray-400" : "text-black"
        }`}
        disabled={buttonDisabled}
      >
        게시
      </button>
    </form>
  );
}
