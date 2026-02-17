import { zxcvbn } from '@zxcvbn-ts/core'

const sets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

export function generatePassword({
  length = 16,
  uppercase = true,
  lowercase = true,
  numbers = true,
  symbols = true,
} = {}) {
  function secureRandomInt(max) {
    const limit = Math.floor(256 / max) * max
    const arr = new Uint8Array(1)

    while (true) {
      crypto.getRandomValues(arr)
      if (arr[0] < limit) return arr[0] % max
    }
  }

  const coreSets = []
  const optionalSets = []

  if (lowercase) coreSets.push(sets.lowercase)
  if (uppercase) coreSets.push(sets.uppercase)
  if (numbers) optionalSets.push(sets.numbers)
  if (symbols) optionalSets.push(sets.symbols)

  const enabledSets = [...coreSets, ...optionalSets]

  if (enabledSets.length === 0) {
    return ''
  }

  // ---- choose which groups will be guaranteed ----
  const selectedSets = []

  // keep core groups first
  for (const group of coreSets) {
    if (selectedSets.length < length) {
      selectedSets.push(group)
    }
  }

  // fill remaining slots using optional groups (randomly)
  const optionalPool = [...optionalSets]

  while (selectedSets.length < length && optionalPool.length > 0) {
    const i = secureRandomInt(optionalPool.length)
    selectedSets.push(optionalPool[i])
    optionalPool.splice(i, 1)
  }

  // fallback: if length still larger, use all enabled chars
  const allChars = enabledSets.join('')
  const password = []

  // guarantee at least one char from selected groups
  for (const group of selectedSets) {
    password.push(group[secureRandomInt(group.length)])
  }

  // fill remaining chars
  while (password.length < length) {
    password.push(allChars[secureRandomInt(allChars.length)])
  }

  // Fisher–Yates shuffle
  for (let i = password.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1)

    // leading semicolon prevents ASI issues
    ;[password[i], password[j]] = [password[j], password[i]]
  }

  return password.join('')
}

export function getPasswordStrength(password) {
  if (!password) return 0
  const result = zxcvbn(password)
  return Math.max(1, result.score) // since score 0 and score 1 are both "very weak" anyway.
}
