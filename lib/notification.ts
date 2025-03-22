import * as Notifications from "expo-notifications";

interface NotificationRes {
  title: string;
  body: string;
}

export const sendLocalNotification = async ({title, body}:NotificationRes) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: 'notify.wav',
      },
      
      trigger: null, // Send immediately
    });
  };