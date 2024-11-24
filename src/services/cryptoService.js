import axios from 'axios'

export const getCryptoData = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          sparkline: false,
          price_change_percentage: '24h'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching crypto data:', error)
    return []
  }
}
