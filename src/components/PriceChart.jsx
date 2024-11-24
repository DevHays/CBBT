import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Box } from '@chakra-ui/react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function PriceChart({ cryptoId }) {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=180`
        )
        const data = await response.json()
        
        const formattedData = {
          labels: data.prices.map(price => {
            const date = new Date(price[0])
            return `${date.getMonth() + 1}/${date.getDate()}`
          }),
          datasets: [
            {
              label: 'Price USD',
              data: data.prices.map(price => price[1]),
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        }
        
        setChartData(formattedData)
      } catch (error) {
        console.error('Error fetching price history:', error)
      }
    }

    fetchPriceHistory()
  }, [cryptoId])

  if (!chartData) return null

  return (
    <Box>
      <Line 
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: '6 Month Price History'
            }
          }
        }}
      />
    </Box>
  )
}

export default PriceChart
