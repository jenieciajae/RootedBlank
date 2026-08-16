import * as Notifications from "expo-notifications";
import { getWateringDays } from "./WateringSchedule";

export async function requestNotificationPermissions() {
  const { status } =
    await Notifications.requestPermissionsAsync();

  console.log(
    "NOTIFICATION PERMISSION:",
    status
  );

  return status === "granted";
}

export async function schedulePlantReminder(
  plantName: string,
  water: string
) {
  console.log(
    "SCHEDULING NOTIFICATION FOR:",
    plantName
  );

  try {
    const days = getWateringDays(water);

    const seconds = days * 24 * 60 * 60;

    const notificationId =
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🌱 Plant Reminder",
          body: `${plantName} needs some care today!`,
        },

        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
         seconds,
         repeats: false,
        },
      });

    console.log(
      "NOTIFICATION CREATED:",
      notificationId
    );

  } catch (error) {
    console.log(
      "NOTIFICATION ERROR:",
      error
    );
  }
}