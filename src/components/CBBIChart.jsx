import { Box, Text } from '@chakra-ui/react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function CBBIChart() {
  const sellLevels = [
    { value: 85, color: 'rgba(255, 241, 118, 0.3)', text: 'Sell 0.5%/day SL 75' },
    { value: 90, color: 'rgba(255, 213, 79, 0.3)', text: 'Sell 1%/day SL 80' },
    { value: 95, color: 'rgba(255, 167, 38, 0.3)', text: 'Sell 1.5%/day SL 85' },
    { value: 98, color: 'rgba(255, 87, 34, 0.3)', text: 'Sell 2%/day SL 90' },
    { value: 100, color: 'rgba(213, 0, 0, 0.3)', text: 'Sell 3%/day SL 95' }
  ]

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'CBBI Index',
        data: [82, 87, 92, 96, 98, 94],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'BTC Price',
        data: [42000, 45000, 48000, 52000, 54000, 51000],
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.4,
        fill: false,
        yAxisID: 'btc'
      }
    ]
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        max: 100,
        grid: {
          drawOnChartArea: false
        }
      },
      btc: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'CBBI Index & BTC Price'
      }
    }
  }

  return (
    <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" mb={6}>
      <Line options={options} data={data} />
      <Box mt={4}>
        {sellLevels.map((level, index) => (
          <Text key={index} fontSize="sm" color="gray.600">
            CBBI {level.value}%: {level.text}
          </Text>
        ))}
      </Box>
    </Box>
  )
}

export default CBBIChart
