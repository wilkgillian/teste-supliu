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
  Input,
  Flex
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { DataContext } from '../../contexts/dataContext';
import { api } from '../../services/api';

export function NewAlbum() {
  const { getAlbums } = useContext(DataContext);
  const [name, setName] = useState('');
  const [year, setYear] = useState(0);

  function handleCreateNewAlbum() {
    const data = {
      name,
      year
    };
    api.post('/album', data).then(() => getAlbums());
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex mb={5} justifyContent="center">
      <Button
        bg="rgba(205,205,205, 0.7)"
        width="50%"
        height="50px"
        _hover={{ bg: 'green', color: 'white' }}
        colorScheme="none"
        color="black"
        onClick={onOpen}
      >
        <AddIcon />
        &nbsp;&nbsp;Add New Album
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>+ Add new album</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Album name</FormLabel>
              <Input
                value={name}
                onChange={event => setName(event.target.value)}
                type="text"
                placeholder="album name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Creation year</FormLabel>
              <Input
                value={year}
                onChange={event => setYear(parseInt(event.target.value))}
                type="number"
                placeholder="creation year"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="linkedin"
              mr={3}
              onClick={() => {
                handleCreateNewAlbum();
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
    </Flex>
  );
}
