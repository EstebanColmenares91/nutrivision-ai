export async function apiHandler(promise: Promise<any>) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

export const getHealthScoreColor = (score: number) => {
  if (score >= 8) return "text-green-500";
  if (score >= 6) return "text-yellow-500";
  return "text-red-500";
};

export const getHealthScoreBg = (score: number) => {
  if (score >= 8) return "bg-green-500";
  if (score >= 6) return "bg-yellow-500";
  return "bg-red-500";
};

export const getAlphaNumericValue = (score: number): string => {
  if (score >= 8) return "A";
  if (score >= 6) return "B";
  if (score >= 4) return "C";
  return "D";
};
