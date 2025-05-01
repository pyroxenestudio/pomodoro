import {consoleError} from './error-controller';

export default class NotificationsController {
  static canBeUsed: boolean = "Notification" in window;
  static hasPermissions: boolean = Notification.permission === 'granted';
  static canShowNotification: boolean = !!JSON.parse(localStorage.getItem('show-notification') ?? 'false');
  notification?: Notification;
  constructor() {}

  async requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      NotificationsController.hasPermissions = true;
      return Promise.resolve(true);
    } else {
      return Promise.reject(false);
    }
  }

  setCanShowNotification(checked: boolean) {
    NotificationsController.canShowNotification = checked;
    localStorage.setItem('show-notification', JSON.stringify(checked));
  }

  canShowNotification() {
    return NotificationsController.canBeUsed && NotificationsController.hasPermissions && NotificationsController.canShowNotification;
  }

  // hasPermission() {
  //   return NotificationsController.canBeUsed && NotificationsController.hasPermissions
  // }

  create(message: string, options?: NotificationOptions) {
    if (!this.canShowNotification()) return consoleError("You don't have permission", false)
    if (!message) return consoleError(`Message is: ${message}`, false);

    this.notification = new Notification(message, options);
  }

  createWithInteraction(message: string, options: NotificationOptions = {}) {
    this.create(message, {requireInteraction: true, ...options});
  }
}