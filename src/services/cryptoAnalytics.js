export function analyzeCryptoMetrics(cryptoData) {
  // Calculer les métriques pour chaque crypto
  const analyzedCryptos = cryptoData.map(crypto => {
    // Score de volume (normalisé de 0 à 100)
    const volumeScore = calculateVolumeScore(crypto, cryptoData)
    
    // Score de stabilité basé sur plusieurs facteurs
    const stabilityScore = calculateStabilityScore(crypto)
    
    // Score combiné (pondéré)
    const combinedScore = (volumeScore * 0.6) + (stabilityScore * 0.4)
    
    return {
      ...crypto,
      volumeScore,
      stabilityScore,
      combinedScore
    }
  })

  // Trier par score combiné et prendre le top 20
  return analyzedCryptos
    .sort((a, b) => b.combinedScore - a.combinedScore)
    .slice(0, 20)
}

function calculateVolumeScore(crypto, allCryptos) {
  const maxVolume = Math.max(...allCryptos.map(c => c.total_volume))
  const volumeRatio = crypto.total_volume / maxVolume
  
  // Bonus pour volume en augmentation
  const volumeIncrease = crypto.volume_change_24h || 0
  const volumeBonus = volumeIncrease > 0 ? (volumeIncrease / 100) * 20 : 0
  
  return (volumeRatio * 80) + volumeBonus
}

function calculateStabilityScore(crypto) {
  // Facteurs de stabilité
  const priceChange24h = Math.abs(crypto.price_change_percentage_24h || 0)
  const priceChange7d = Math.abs(crypto.price_change_percentage_7d || 0)
  
  // Pénalité pour volatilité excessive
  const volatilityPenalty = (priceChange24h > 20 || priceChange7d > 40) ? 30 : 0
  
  // Score de base (100 - volatilité)
  const baseScore = 100 - (priceChange24h * 2) - (priceChange7d * 0.5)
  
  // Bonus pour tendance positive
  const trendBonus = (crypto.price_change_percentage_24h > 0 && 
                     crypto.price_change_percentage_7d > 0) ? 10 : 0
  
  return Math.max(0, Math.min(100, baseScore + trendBonus - volatilityPenalty))
}
