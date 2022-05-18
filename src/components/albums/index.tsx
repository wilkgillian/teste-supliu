import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Text
} from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../../services/api';
import { NewTrack } from '../tracks';
import { useContext } from 'react';
import { DataContext } from '../../context';
import { NewAlbum } from '../album';

interface TrackProps {
  id: number;
  title: string;
  number: number;
  duration: number;
}

export function Albums() {
  const { data, getAlbums, deleteAlbum, deleteTrack, convertSecondsInMinutes } =
    useContext(DataContext);

  const [filter, setFilter] = useState('');
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState(0);
  const [duration, setDuration] = useState(0);

  function handleCreateNewTrack(album_id: number) {
    const track = {
      album_id,
      title,
      number,
      duration
    };
    api.post('/track', track).then(() => getAlbums());
  }

  return (
    <>
      <Box w="100%" mt="8.5rem">
        <Text mt={6} ml={7} fontSize="18px">
          Digite uma palavra chave
        </Text>
        <Box
          padding={5}
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Input
            type="text"
            placeholder="Min"
            bg="white"
            borderRadius="50px"
            h="50px"
            w="80%"
            onChange={event => {
              setFilter(event.target.value);
            }}
          />
          <Button
            ml={6}
            colorScheme="blue"
            h="50px"
            w="20%"
            borderRadius="50px"
            fontSize="20px"
            fontWeight="normal"
          >
            Procurar
          </Button>
        </Box>
      </Box>
      <Box position="-moz-initial" width="100%">
        <Box width="100%" display="inline-block" mt={2} justifyContent="center">
          <Box width="100%" display="inline" justifyContent="center">
            {data
              .filter(album => {
                if (filter === '') {
                  return album;
                } else if (
                  album.name.toLowerCase().includes(filter.toLocaleLowerCase())
                ) {
                  return album;
                }
              })
              .map(album => {
                return (
                  <>
                    <Container
                      maxWidth="95%"
                      display="flex"
                      justifyContent="space-between"
                      mt={4}
                      padding={2}
                      as="h1"
                      fontSize="23px"
                      fontWeight="bold"
                      key={album.id}
                      color="black"
                      bg="rgba(100,100,100,0.2)"
                    >
                      Álbum: {album.name}, {album.year}
                      <Box display="flex" width="22%">
                        <Button
                          _hover={{ bg: 'red', color: 'white' }}
                          colorScheme="none"
                          bg="none"
                          color="black"
                          onClick={() => deleteAlbum(album.id)}
                        >
                          <DeleteIcon />
                        </Button>
                        <NewTrack
                          number={number}
                          duration={duration}
                          title={title}
                          setTitle={setTitle}
                          setDuration={setDuration}
                          setNumber={setNumber}
                          handleCreateNewTrack={() =>
                            handleCreateNewTrack(album.id)
                          }
                        />
                      </Box>
                    </Container>
                    <TableContainer display="flex" justifyContent="center">
                      <Table variant="none" width="95%">
                        <Thead>
                          <Tr borderBottom="1px solid black">
                            <Th fontWeight="bold" fontSize="16px" width="10%">
                              N°
                            </Th>
                            <Th fontWeight="bold" fontSize="16px" width="70%">
                              Faixa
                            </Th>
                            <Th fontWeight="bold" fontSize="16px" width="20%">
                              Duração
                            </Th>
                          </Tr>
                        </Thead>
                        {album.tracks &&
                          album.tracks.map((track: TrackProps) => {
                            return (
                              <Tbody>
                                <Tr
                                  color="black"
                                  fontSize="19px"
                                  fontWeight="normal"
                                  _hover={{ bg: 'rgba(100,100,100,0.3)' }}
                                  key={track.id}
                                >
                                  <Td border={0}>{track.number}</Td>
                                  <Td border={0}>{track.title}</Td>
                                  <Td
                                    border={0}
                                    ml={2}
                                    mr={2}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                  >
                                    {convertSecondsInMinutes(track.duration)}
                                    <Button
                                      _hover={{ bg: 'red', color: 'white' }}
                                      colorScheme="none"
                                      bg="none"
                                      color="black"
                                      onClick={() => deleteTrack(track.id)}
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  </Td>
                                </Tr>
                              </Tbody>
                            );
                          })}
                      </Table>
                    </TableContainer>
                  </>
                );
              })}
          </Box>
          <NewAlbum />
        </Box>
      </Box>
    </>
  );
}
