import { Box, Progress, Text, VStack, HStack } from '@chakra-ui/react'

function CBBIIndicator({ currentValue = 80 }) {
  const levels = [
    { value: 85, color: 'yellow.400', label: 'Next Target' },
    { value: 98, color: 'red.500', label: 'Historical Max' }
  ]

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold">CBBI Index</Text>
        
        <Box position="relative" pt={6}>
          <Progress 
            value={currentValue} 
            max={100}
            size="lg"
            colorScheme="green"
            borderRadius="full"
          />
          
          {levels.map((level, index) => (
            <Box
              key={index}
              position="absolute"
              left={`${level.value}%`}
              top={0}
              bottom={0}
              width="2px"
              bg={level.color}
            >
              <Text
                position="absolute"
                top="-25px"
                left="50%"
                transform="translateX(-50%)"
                fontSize="sm"
                color={level.color}
                fontWeight="bold"
              >
                {level.value}%
              </Text>
            </Box>
          ))}
        </Box>

        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="2xl">
            {currentValue}%
          </Text>
          <Text color="gray.500">
            Current Level
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}

export default CBBIIndicator
