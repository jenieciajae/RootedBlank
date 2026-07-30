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

    const notificationId =
      await Notifications.scheduleNotificationAsync({

        content: {
          title: "🌱 Plant Reminder",
          body: `${plantName} needs some care today!`,
        },


        trigger: {
          type: "timeInterval",
          seconds: 10,
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