export function getWateringDays(water: string) {
  const schedule = water?.toLowerCase().trim();

  // Frequency labels
  if (schedule === "frequent") {
    return 3;
  }

  if (schedule === "average") {
    return 7;
  }

  if (schedule === "rare") {
    return 14;
  }

  // "Every X days"
  const daysMatch = schedule.match(/every\s+(\d+)\s+days?/);

  if (daysMatch) {
    return Number(daysMatch[1]);
  }

  // "Every X weeks"
  const weeksMatch = schedule.match(/every\s+(\d+)\s+weeks?/);

  if (weeksMatch) {
    return Number(weeksMatch[1]) * 7;
  }

  // Common wording
  if (schedule.includes("2 weeks")) {
    return 14;
  }

  if (schedule.includes("week")) {
    return 7;
  }

  // Default
  return 7;
}
