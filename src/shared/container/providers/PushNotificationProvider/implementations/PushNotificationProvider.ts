import { pushNotificationConfig } from '@config/pushNotification';
import { ICreateNotificationDTO } from '../dtos/ICreateNotificationDTO';
import { IPushNotificationProvider } from '../models/IPushNotificationProvider';
import { HttpServiceProvider } from '../../RequestProvider/implementations/HttpServiceProvider';

export class PushNotificationProvider
  extends HttpServiceProvider
  implements IPushNotificationProvider {
  private appId;

  constructor() {
    super(pushNotificationConfig.basepath, pushNotificationConfig.token);

    this.appId = pushNotificationConfig.appId;
  }

  public async createNotification({
    text,
    userIds,
    url,
  }: ICreateNotificationDTO): Promise<void> {
    const payload = {
      app_id: this.appId,
      contents: { en: text },
      channel_for_external_user_ids: 'push',
      include_external_user_ids: userIds,
      url,
    };

    await this.call({
      path: 'notifications',
      method: HttpServiceProvider.POST,
      requestConfig: {
        data: payload,
      },
    });
  }
}
