import { useState } from 'react'
import { Box, Text, VStack, List, ListItem } from '@chakra-ui/react'

function AIAnalysis() {
  const recommendations = [
    {
      title: "Volume Analysis",
      content: "Recherchez les cryptos avec une augmentation significative du volume sur 24h"
    },
    {
      title: "Résistance à la Baisse",
      content: "Identifiez les altcoins qui maintiennent leur valeur pendant les corrections BTC"
    },
    {
      title: "Corrélation BTC",
      content: "Surveillez les altcoins qui se décorrèlent positivement du BTC"
    },
    {
      title: "Indicateurs Techniques",
      content: "RSI < 30 peut indiquer une opportunité d'achat"
    }
  ]

  return (
    <VStack spacing={4} align="stretch">
      <Box p={5} shadow="md" borderWidth="1px">
        <Text fontSize="xl" mb={4}>Recommandations d'Analyse</Text>
        <List spacing={3}>
          {recommendations.map((rec, index) => (
            <ListItem key={index} p={3} bg="gray.50" borderRadius="md">
              <Text fontWeight="bold">{rec.title}</Text>
              <Text>{rec.content}</Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  )
}

export default AIAnalysis
