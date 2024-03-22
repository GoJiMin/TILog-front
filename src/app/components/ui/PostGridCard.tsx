import { SimplePost } from "@/app/model/post";
import { useModal } from "@/app/utils/hooks/useModal";
import Image from "next/image";
import Modal from "./Modal";
import PostModal from "./PostModal";
import PostDetail from "../PostDetail";

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
  const { image, userid } = post;

  const { openModal, handleModalOpen, handleModalClose } = useModal();
  return (
    <div className='relative w-full aspect-square'>
      <Image
        className='object-cover'
        src={image}
        alt={`photo by ${userid}`}
        fill
        sizes='650px'
        priority={priority}
        onClick={handleModalOpen}
      />
      {openModal && (
        <Modal onClose={handleModalClose}>
          <PostModal>
            <PostDetail post={post} />
          </PostModal>
        </Modal>
      )}
    </div>
  );
}
