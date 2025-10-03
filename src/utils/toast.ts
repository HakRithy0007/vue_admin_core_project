import { toast } from "vuetify-sonner";

export const sonnerToast = (
  title: string = "",
  message: string,
  type:
    | "success"
    | "error"
    | "info"
    | "warning"
    | "expired"
    | "login"
    | "logout"
) => {
  let color = "";
  let icon = "";
  let textColor = "";

  switch (type) {
    case "success":
      color = "#3CB371";
      icon = "mdi-check-circle";
      textColor = "!text-white";
      break;
    case "error":
      color = "#D32F2F";
      icon = "mdi-cancel";
      textColor = "!text-white";
      break;
    case "info":
      color = "#1E88E5";
      icon = "mdi-information";
      textColor = "!text-white";
      break;
    case "warning":
      color = "#FFC107";
      icon = "mdi-alert-circle";
      textColor = "!text-white";
      break;
    case "expired":
      color = "#FFA500";
      icon = "mdi-timer-sand";
      textColor = "!text-white";
      break;
    case "login":
      color = "#4CAF50";
      icon = "mdi-login";
      textColor = "!text-white";
      break;
    case "logout":
      color = "#FF4C4C";
      icon = "mdi-logout";
      textColor = "!text-white";
      break;
    default:
      color = "#FFFF";
      icon = "mdi-note-check";
      textColor = "!text-white";
  }

  const toastClass = `text-xs rounded-lg text-blue-500 shadow-lg w-[350px] ${textColor} !text-xs`;

  if (title !== "") {
    toast(title, {
      description: message,
      cardProps: { color: color, class: toastClass },
      prependIcon: icon,
      action: {
        label: "", // Label for the close button
        onClick: () => toast.dismiss(),
        buttonProps: {
          icon: true, // This makes the action button an icon button
          class: "mdi mdi-close", // Close icon, using Vuetify's close icon (mdi-close)
        }, // Dismiss the toast when clicked
      },
    });
  } else {
    // Show toast with only the message
    toast(message, {
      cardProps: { color: color, class: toastClass },
      prependIcon: icon,
      action: {
        label: "", // Label for the close button
        onClick: () => toast.dismiss(),
        buttonProps: {
          icon: true, // This makes the action button an icon button
          class: "mdi mdi-close", // Close icon, using Vuetify's close icon (mdi-close)
        }, // Dismiss the toast when clicked
      },
    });
  }
};
