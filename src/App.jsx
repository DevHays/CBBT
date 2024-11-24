import { Box, Container, Grid, VStack } from '@chakra-ui/react'
import CBBIIndicator from './components/CBBIIndicator'
import CryptoList from './components/CryptoList'
import MarketAnalysis from './components/MarketAnalysis'

function App() {
  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Grid
          templateColumns={{ base: "1fr", lg: "350px 1fr" }}
          gap={6}
        >
          <VStack spacing={6}>
            <CBBIIndicator />
            <MarketAnalysis />
          </VStack>
          <CryptoList />
        </Grid>
      </Container>
    </Box>
  )
}

export default App
