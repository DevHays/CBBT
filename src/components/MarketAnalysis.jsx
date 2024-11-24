import { useState } from 'react'
import { Box, Text, Button, Spinner, VStack } from '@chakra-ui/react'

function MarketAnalysis() {
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('summary')

  const getAnalysis = async () => {
    setLoading(true)
    try {
      // Simulated analysis based on market conditions
      const analyses = {
        summary: "Market showing strong momentum with increasing volume. BTC dominance decreasing, suggesting potential alt season.",
        detailed: `Current Market Analysis:
          - Bitcoin showing strength above key moving averages
          - Alt-coin volume increasing significantly
          - Market sentiment: Bullish
          - Key levels to watch: BTC $45k, ETH $2.8k
          
          Recommendation: Monitor high-volume alts showing price stability during dips.`
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay
      setAnalysis(analyses[viewMode])
    } catch (error) {
      console.error('Error getting analysis:', error)
      setAnalysis('Error fetching analysis. Please try again later.')
    }
    setLoading(false)
  }

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold">Market Analysis</Text>
        
        <Box>
          <Button
            size="sm"
            mr={2}
            colorScheme={viewMode === 'summary' ? 'blue' : 'gray'}
            onClick={() => setViewMode('summary')}
          >
            Summary
          </Button>
          <Button
            size="sm"
            colorScheme={viewMode === 'detailed' ? 'blue' : 'gray'}
            onClick={() => setViewMode('detailed')}
          >
            Detailed
          </Button>
        </Box>

        <Button 
          onClick={getAnalysis}
          isLoading={loading}
          loadingText="Analyzing..."
        >
          Get Analysis
        </Button>

        {loading ? (
          <Box textAlign="center" py={4}>
            <Spinner />
            <Text mt={2}>Analyzing market conditions...</Text>
          </Box>
        ) : (
          <Text whiteSpace="pre-wrap">{analysis}</Text>
        )}
      </VStack>
    </Box>
  )
}

export default MarketAnalysis
