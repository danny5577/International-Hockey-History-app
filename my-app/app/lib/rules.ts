export interface PointSystem {
  regulationWin: number;
  otWin: number;
  otLoss: number;
  regulationLoss: number;
  draw: number;
}

export function getPointSystem(year: number): PointSystem {
  if (year >= 2007) {
    return { regulationWin: 3, otWin: 2, otLoss: 1, regulationLoss: 0, draw: 0 };
  }
  return { regulationWin: 2, otWin: 2, otLoss: 0, regulationLoss: 0, draw: 1 };
}

export function usesDrawFormat(year: number): boolean {
  return year < 2007;
}