import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'

function Header() {
  const bgColor = useColorModeValue('white', 'gray.800')

  return (
    <Box bg={bgColor} px={4} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading size="md">Crypto Analytics Dashboard</Heading>
        <Text fontSize="sm" color="gray.500">Live Market Data</Text>
      </Flex>
    </Box>
  )
}

export default Header
