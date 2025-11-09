// Pricing configuration for credits

export const MVP_COST = 100; // credits

export const BASE_BY_TYPE = {
  feature: 30,
  bug: 15,
  content: 10,
  other: 20,
} as const;

export const MULT_BY_COMPLEXITY = {
  S: 1,
  M: 2,
  L: 3,
} as const;

export function calculateTaskCost(
  type: keyof typeof BASE_BY_TYPE,
  complexity: keyof typeof MULT_BY_COMPLEXITY
): number {
  return BASE_BY_TYPE[type] * MULT_BY_COMPLEXITY[complexity];
}
