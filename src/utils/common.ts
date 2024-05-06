import Toast from "react-native-root-toast";
import Clipboard from "@react-native-clipboard/clipboard";

type FeedbackToastParams = {
  msg?: string | null;
  error?: unknown;
  onClose?: () => void;
};

interface FeedbackError extends Error {
  errMsg?: string;
  errDlt?: string;
}

export const feedbackToast = (config?: FeedbackToastParams) => {
  const { msg, error, onClose } = config ?? {};
  let content = "";
  if (error) {
    content = (error as FeedbackError)?.message ?? (error as FeedbackError)?.errDlt;
  }
  Toast.show(msg ?? content, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onHidden: () => {
      onClose?.();
    },
  });
  if (error) {
    console.error(msg, error);
  }
};

export const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
};
