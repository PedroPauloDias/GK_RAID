import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,RadioGroup, Radio, useDisclosure} from "@nextui-org/react";

export default function ModalCustom({children, title, description}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  return (
    <>
      <Button onPress={onOpen} className='px-6  bg-zinc-800'  >{description}</Button>
  
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior} className='z-50'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-full text-center text-zinc-300">{title}</ModalHeader>
              <ModalBody>
               {children}
              </ModalBody>
           
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
