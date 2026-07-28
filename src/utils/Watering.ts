export function getNextWateringDate(
  lastWatered: string | undefined,
  wateringSchedule: string
) {
  if (!lastWatered) {
    return "Water this plant";
  }

  let days = 0;

  const numbers = wateringSchedule.match(/\d+/);

  if (numbers) {
    const amount = Number(numbers[0]);

    if (wateringSchedule.toLowerCase().includes("week")) {
      days = amount * 7;
    } else {
      days = amount;
    }
  } else {
    // Handle API watering descriptions
    switch (wateringSchedule.toLowerCase()) {
      case "frequent":
        days = 3;
        break;

      case "average":
        days = 7;
        break;

      case "minimum":
      case "rarely":
        days = 14;
        break;

      default:
        return "Unknown";
    }
  }

  const nextDate = new Date(lastWatered);

  nextDate.setDate(nextDate.getDate() + days);

  return nextDate.toLocaleDateString();
}
