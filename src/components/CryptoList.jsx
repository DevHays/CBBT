import { useState, useEffect } from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Select, VStack } from '@chakra-ui/react'
import { getCryptoData } from '../services/cryptoService'
import PriceChart from './PriceChart'

function CryptoList() {
  const [cryptos, setCryptos] = useState([])
  const [selectedCrypto, setSelectedCrypto] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCryptoData()
      const filteredData = data
        .filter(crypto => 
          !['USDT', 'USDC', 'BUSD', 'DAI'].includes(crypto.symbol.toUpperCase())
        )
        .sort((a, b) => {
          const aScore = (a.total_volume * 0.7) + (Math.abs(a.price_change_percentage_24h) * 0.3)
          const bScore = (b.total_volume * 0.7) + (Math.abs(b.price_change_percentage_24h) * 0.3)
          return bScore - aScore
        })
        .slice(0, 20)
      
      setCryptos(filteredData)
    }
    
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <VStack spacing={6} align="stretch">
      <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Asset</Th>
              <Th>Price</Th>
              <Th>24h Change</Th>
              <Th>Volume (24h)</Th>
              <Th>Stability Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cryptos.map((crypto) => (
              <Tr 
                key={crypto.id}
                cursor="pointer"
                onClick={() => setSelectedCrypto(crypto)}
                _hover={{ bg: 'gray.50' }}
              >
                <Td>
                  <Text fontWeight="bold">{crypto.name}</Text>
                  <Text fontSize="sm" color="gray.500">{crypto.symbol.toUpperCase()}</Text>
                </Td>
                <Td>${crypto.current_price.toLocaleString()}</Td>
                <Td color={crypto.price_change_percentage_24h > 0 ? 'green.500' : 'red.500'}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </Td>
                <Td>${crypto.total_volume.toLocaleString()}</Td>
                <Td>
                  {calculateStabilityScore(crypto)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedCrypto && (
        <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
          <Text fontSize="xl" fontWeight="bold" mb={4}>{selectedCrypto.name} Price History</Text>
          <PriceChart cryptoId={selectedCrypto.id} />
        </Box>
      )}
    </VStack>
  )
}

function calculateStabilityScore(crypto) {
  const volatility = Math.abs(crypto.price_change_percentage_24h)
  const score = 100 - (volatility * 2)
  return (
    <Text color={score > 70 ? 'green.500' : score > 50 ? 'yellow.500' : 'red.500'}>
      {score.toFixed(1)}
    </Text>
  )
}

export default CryptoList
