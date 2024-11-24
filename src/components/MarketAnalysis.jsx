import { useState } from 'react'
import { Box, Text, Button, Spinner, VStack } from '@chakra-ui/react'

function MarketAnalysis() {
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('summary')

  const getAnalysis = async () => {
    setLoading(true)
    try {
      // Simulation d'une analyse experte basée sur les données actuelles
      const currentBTCPrice = 65000 // À remplacer par le prix réel via API
      const analyses = {
        summary: `Market Analysis (${new Date().toLocaleDateString()}):
          - BTC Price: $${currentBTCPrice.toLocaleString()}
          - Key Focus: High volume coins maintaining stability
          - Current Opportunity: Coins showing >80 combined score
          - Market Phase: Accumulation with increasing volume`,
        
        detailed: `Detailed Market Analysis (${new Date().toLocaleDateString()}):
          
          Current Market Conditions:
          - BTC Price: $${currentBTCPrice.toLocaleString()}
          - Market Structure: Strong support levels established
          - Volume Profile: Increasing across major altcoins
          
          Key Indicators:
          - Volume/Stability Ratio: Positive divergence
          - Market Depth: Improving for high-rated assets
          - Volatility: Decreasing in selected assets
          
          Strategy Recommendations:
          1. Focus on coins with >85 combined score
          2. Monitor volume increases during dips
          3. Track stability scores for early trend identification
          
          Risk Management:
          - Set stops below key support levels
          - Size positions based on stability score
          - Monitor BTC correlation for risk assessment`
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500))
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
        <Text fontSize="xl" fontWeight="bold">Expert Market Analysis</Text>
        
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
          loadingText="Analyzing Market Data..."
          colorScheme="blue"
        >
          Generate Analysis
        </Button>

        {loading ? (
          <Box textAlign="center" py={4}>
            <Spinner />
            <Text mt={2}>Processing market data...</Text>
          </Box>
        ) : (
          <Text whiteSpace="pre-wrap" fontSize="sm">{analysis}</Text>
        )}
      </VStack>
    </Box>
  )
}

export default MarketAnalysis
