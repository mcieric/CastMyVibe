import { Vibe, vibes } from './vibes';

// Simple hash function for deterministic randomness
export function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Get today's date as YYYY-MM-DD string
export function getTodayDate(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// Get vibe for user based on FID and date
export function getUserVibeForToday(fid: string): Vibe {
  const today = getTodayDate();
  const seedString = `${fid}-${today}`;
  const seed = simpleHash(seedString);
  
  // Use seed to select a vibe
  const index = seed % vibes.length;
  return vibes[index];
}

// Get vibe by ID
export function getVibeById(id: number): Vibe | undefined {
  return vibes.find(vibe => vibe.id === id);
}

// Get all vibes in a category
export function getVibesByCategory(category: Vibe['category']): Vibe[] {
  return vibes.filter(vibe => vibe.category === category);
}

// Get a random vibe (for rerolls)
export function getRandomVibe(excludeId?: number): Vibe {
  let filteredVibes = vibes;
  if (excludeId) {
    filteredVibes = vibes.filter(vibe => vibe.id !== excludeId);
  }
  
  const index = Math.floor(Math.random() * filteredVibes.length);
  return filteredVibes[index];
}