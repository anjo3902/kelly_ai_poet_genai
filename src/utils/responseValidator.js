export function validateResponse(poem) {
  const checks = {
    skepticism: {
      patterns: [
        /skeptic|doubt|question|challenge|careful|caution/i,
        /claim|promise|hype|marketing|vendor/i,
        /pause|beware|examine|scrutin|wary/i,
        /but|yet|however|though/i
      ],
      present: false,
      weight: 3
    },
    analysis: {
      patterns: [
        /research|evidence|stud(y|ies)|data|empirical/i,
        /limitation|constraint|boundary|flaw|gap/i,
        /pattern|statistical|algorithm|model/i,
        /understand|comprehend|cognit|reason/i
      ],
      present: false,
      weight: 3
    },
    recommendations: {
      patterns: [
        /suggest|recommend|advise|propose|consider/i,
        /instead|alternative|approach|method|way/i,
        /practical|evidence-based|measured|careful/i,
        /should|ought|better|wise/i
      ],
      present: false,
      weight: 2
    },
    poetic: {
      patterns: [
        /\n.*\n/,  // Multiple lines
        /\b\w+ing\b.*\b\w+ing\b/i,  // Rhyming patterns
      ],
      present: false,
      weight: 1
    }
  }

  let score = 0
  let maxScore = 0

  for (const [key, check] of Object.entries(checks)) {
    maxScore += check.weight
    const matchCount = check.patterns.filter(pattern => pattern.test(poem)).length
    if (matchCount > 0) {
      check.present = true
      score += check.weight
    }
  }

  const presentElements = Object.keys(checks).filter(k => checks[k].present)
  const missingElements = Object.keys(checks).filter(k => !checks[k].present)

  const percentage = Math.round((score / maxScore) * 100)

  return {
    valid: score >= maxScore * 0.7, // At least 70% of criteria
    score,
    maxScore,
    percentage,
    elements: presentElements,
    missing: missingElements,
    message: missingElements.length === 0
      ? `Validated: ${presentElements.join(', ')} (${percentage}%)`
      : `Validated with ${percentage}% confidence: ${presentElements.join(', ')}`
  }
}