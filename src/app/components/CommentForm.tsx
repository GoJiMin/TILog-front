export default function CommentForm() {
  return (
    <form className='flex items-center border-t border-neutral-300 pt-3'>
      <input
        className='w-full border-none outline-none'
        type='text'
        placeholder='댓글을 추가해보세요!'
      />
      <button className='whitespace-nowrap'>게시</button>
    </form>
  );
}
