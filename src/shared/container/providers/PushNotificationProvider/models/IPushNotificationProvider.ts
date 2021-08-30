import { ICreateNotificationDTO } from '../dtos/ICreateNotificationDTO';

export interface IPushNotificationProvider {
  createNotification(data: ICreateNotificationDTO): Promise<void>;
}
