import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface IProps {
  handleClose: () => void;
  children: ReactNode;
}

const DefaultModal = ({ handleClose, children }: IProps) => {
  let overlayRef = useRef();

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <Dialog.Overlay
        ref={overlayRef}
        as={motion.div}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <div className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center justify-center wide:h-full xl:taller-than-854:h-auto">
        <button onClick={() => handleClose()}>X</button>
        {children}
      </div>
    </Dialog>
  );
};

export default DefaultModal;
