import {memo} from "react";
import {Modal} from "antd";
import {DeletePostForm} from "../DeletePostForm/DeletePostForm";

interface Props {
   id: number;
   isOpen: boolean;
   onClose: () => void;
}

export const DeletePostModal = memo(({id, isOpen, onClose}: Props) => {
   return (
      <Modal title="Create post" open={isOpen} onCancel={onClose} footer={[""]}>
         <DeletePostForm id={id} onClose={onClose} />
      </Modal>
   );
});
