import { useState } from "react";

export function useModal() {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return { openModal, handleModalOpen, handleModalClose };
}
