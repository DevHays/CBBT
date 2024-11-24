import { useState, useEffect } from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, HStack, Badge, Progress } from '@chakra-ui/react'
import { getCryptoData } from '../services/cryptoService'
import { analyzeCryptoMetrics } from '../services/cryptoAnalytics'
import PriceChart from './PriceChart'

function CryptoList() {
  const [cryptos, setCryptos] = useState([])
  const [selectedCrypto, setSelectedCrypto] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCryptoData()
      const analyzedData = analyzeCryptoMetrics(
        data.filter(crypto => 
          !['USDT', 'USDC', 'BUSD', 'DAI', 'TUSD', 'USDD'].includes(crypto.symbol.toUpperCase())
        )
      )
      setCryptos(analyzedData)
    }
    
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const renderScore = (score, label) => (
    <Box>
      <Text fontSize="sm" color="gray.600" mb={1}>{label}</Text>
      <Progress 
        value={score} 
        size="sm" 
        colorScheme={score > 75 ? 'green' : score > 50 ? 'yellow' : 'red'}
        borderRadius="full"
      />
      <Text fontSize="sm" mt={1} fontWeight="bold">
        {score.toFixed(1)}
      </Text>
    </Box>
  )

  return (
    <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Top Performing Cryptocurrencies
      </Text>
      
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Asset</Th>
              <Th>Price</Th>
              <Th>24h Change</Th>
              <Th>Volume Score</Th>
              <Th>Stability Score</Th>
              <Th>Combined Rating</Th>
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
                  <HStack>
                    <Box>
                      <Text fontWeight="bold">{crypto.name}</Text>
                      <Text fontSize="sm" color="gray.500">{crypto.symbol.toUpperCase()}</Text>
                    </Box>
                    {crypto.combinedScore > 80 && (
                      <Badge colorScheme="green">Strong Buy</Badge>
                    )}
                  </HStack>
                </Td>
                <Td>${crypto.current_price.toLocaleString()}</Td>
                <Td color={crypto.price_change_percentage_24h > 0 ? 'green.500' : 'red.500'}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </Td>
                <Td>{renderScore(crypto.volumeScore, 'Volume')}</Td>
                <Td>{renderScore(crypto.stabilityScore, 'Stability')}</Td>
                <Td>
                  <Box>
                    {renderScore(crypto.combinedScore, 'Overall')}
                    {crypto.combinedScore > 85 && (
                      <Text fontSize="xs" color="green.500" mt={1}>
                        High Potential
                      </Text>
                    )}
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedCrypto && (
        <Box mt={6}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            {selectedCrypto.name} Analysis
          </Text>
          <PriceChart cryptoId={selectedCrypto.id} />
        </Box>
      )}
    </Box>
  )
}

export default CryptoList
