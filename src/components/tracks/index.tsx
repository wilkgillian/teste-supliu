import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';

interface NewTrackProps {
  handleCreateNewTrack: () => void;
  number: number;
  title: string;
  duration: number;

  setNumber: (value: number) => void;
  setTitle: (value: string) => void;
  setDuration: (value: number) => void;
}

export function NewTrack({
  handleCreateNewTrack,
  setNumber,
  setTitle,
  setDuration,
  title,
  duration,
  number
}: NewTrackProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        _hover={{ bg: 'green', color: 'white' }}
        colorScheme="none"
        color="black"
        onClick={onOpen}
      >
        <AddIcon />
        &nbsp;&nbsp;Add New Track
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>+ Add New Track</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Track Name</FormLabel>
              <Input
                value={title}
                onChange={event => setTitle(event.target.value)}
                type="text"
                placeholder="track name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Track Number</FormLabel>
              <Input
                value={number}
                onChange={event => setNumber(Number(event.target.value))}
                type="number"
                placeholder="track number"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Duration</FormLabel>
              <Input
                value={duration}
                onChange={event => setDuration(Number(event.target.value))}
                type="number"
                placeholder="duration"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleCreateNewTrack();
                onClose();
              }}
            >
              <AddIcon />
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
