import {consoleError} from './error-controller';

export default class NotificationsController {
  canBeUsed: boolean = false;
  hasPermissions: boolean = false;
  notification?: Notification;
  canShowNotification: boolean = false;
  constructor() {
    this.canBeUsed = "Notification" in window;
    this.hasPermissions = Notification.permission === 'granted';
    const showNotification = localStorage.getItem('show-notification');
    if (showNotification) {
      this.canShowNotification = JSON.parse(showNotification);
    }
  }

  async requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      this.hasPermissions = true;
      return Promise.resolve(true);
    } else {
      return Promise.reject(false);
    }
  }

  setCanShowNotification(checked: boolean) {
    this.canShowNotification = checked;
    localStorage.setItem('show-notification', JSON.stringify(checked));
  }

  create(message: string, options?: NotificationOptions) {
    if (!this.hasPermissions && !this.canShowNotification) return consoleError("You don't have permission", false)
    if (!message) return consoleError(`Message is: ${message}`, false);

    this.notification = new Notification(message, options);
  }

  createWithInteraction(message: string, options: NotificationOptions = {}) {
    this.create(message, {requireInteraction: true, ...options});
  }
}