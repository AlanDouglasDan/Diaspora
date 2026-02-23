export interface SuccessNotificationProps {
  visible: boolean;
  title: string;
  message: string;
  duration?: number;
  onHide?: () => void;
}
