import { NOTIFICATION_TYPE } from '../constants/NotificationType';

export default interface ICreateNotificationDTO {
  content: string;
  type: NOTIFICATION_TYPE;
  data: unknown;
  url: string;
  userId: string;
}
