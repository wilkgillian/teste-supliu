import { Container, Heading, Image } from '@chakra-ui/react';

export function Header() {
  return (
    <Container
      position="fixed"
      mt={4}
      mb={-2}
      maxWidth="80%"
      bg="white"
      height="120px"
      padding="1.5rem"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Image h="120%" cursor="pointer" src="./assets/logo.png" />
      <Heading
        color="gray"
        as="h1"
        fontSize="50px"
        fontWeight="light"
        cursor="pointer"
      >
        Discografia
      </Heading>
    </Container>
  );
}
