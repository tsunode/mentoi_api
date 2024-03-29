import { getMongoRepository, MongoRepository } from 'typeorm';

import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(
      Notification,
      process.env.DEFAULT_MONGO_NAME,
    );
  }

  public async create({
    content,
    type,
    data,
    url,
    userId,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      data,
      type,
      url,
      userId,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
