import { TaskStatus } from "@/types/types";

export const options: TaskStatus[] = [
  "tobook",
  "tohandin",
  "handedin",
  "reimbursed",
];
export const optionsWords = [
  "To book",
  "To hand in",
  "Handed in",
  "Reimbursed",
];
export const optionsIcons = ["📘", "🫲", "💤", "💰"];

export const getErrorMessage = (errorCoce: string) => {
  switch (errorCoce) {
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/user-not-found":
      return "No account with that email was found";
    case "auth/wrong-password":
      return "Incorrect password";
    default:
      return "Email or password was incorrect";
  }
};
