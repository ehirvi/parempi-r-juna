export const ETrainStation = {
  HELSINKI: "HKI",
  RIIHIMAKI: "RI",
} as const;

export type ETrainStation = (typeof ETrainStation)[keyof typeof ETrainStation];
