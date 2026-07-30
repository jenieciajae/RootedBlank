export function getWateringDays(water: string) {

  switch (water?.toLowerCase()) {

    case "frequent":
      return 3;

    case "average":
      return 7;

    case "rare":
      return 14;

    default:
      return 7;

  }

}
