import { ChakraProvider, Box, theme, Image, Flex } from '@chakra-ui/react';
import { Albums } from './components/albums';
import { Header } from './components/header';
import { DataProvider } from './contexts/dataContext';

export const App = () => (
  <DataProvider>
    <ChakraProvider theme={theme}>
      <Flex
        alignItems="center"
        justifyContent="center"
        align="center"
        position="fixed"
        width="100%"
        height="100vh"
      >
        <Image width="100%" height="100%" src="./assets/background.png" />
      </Flex>
      <Box
        display="flex"
        justifyContent="center"
        position="relative"
        width="100%"
        height="100vh"
      >
        <Box
          display="inline-block"
          bg="rgba(250, 250, 250, 0.5)"
          width="80%"
          maxHeight="auto"
          my={5}
          position="absolute"
        >
          <Albums />
        </Box>
        <Header />
      </Box>
    </ChakraProvider>
  </DataProvider>
);
