const BASE_URL = 'https://umapyoi.net/api/v1'

export const getCharacterList = async () => {
  const res = await fetch(`${BASE_URL}/character/list`)
  if (!res.ok) throw new Error('Failed to fetch character list')
  return res.json()
}

export const getCharacter = async (charaId: number) => {
  const res = await fetch(`${BASE_URL}/character/${charaId}`)
  if (!res.ok) throw new Error('Failed to fetch character')
  return res.json()
}

export const getCharacterImages = async (charaId: number) => {
  const res = await fetch(`${BASE_URL}/character/images/${charaId}`)
  if (!res.ok) throw new Error('Failed to fetch character images')
  return res.json()
}

export const getCharacterMovies = async (charaId: number) => {
  const res = await fetch(`${BASE_URL}/character/movies/${charaId}`)
  if (!res.ok) throw new Error('Failed to fetch character movies')
  return res.json()
}

export const getCurrentBirthdays = async () => {
  const res = await fetch(`${BASE_URL}/character/currentbirthdays`)
  if (!res.ok) throw new Error('Failed to fetch birthdays')
  return res.json()
}