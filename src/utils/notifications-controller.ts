import {consoleError} from './error-controller';

export default class NotificationsController {
  canBeUsed: boolean = false;
  hasPermissions: boolean = false;
  notification?: Notification;
  constructor() {
    this.canBeUsed = "Notification" in window;
    this.hasPermissions = Notification.permission === 'granted';
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

  create(message: string, options?: NotificationOptions) {
    if (!this.hasPermissions) return consoleError("You don't have permission")
    if (!message) return consoleError(`Message is: ${message}`);
    
    this.notification = new Notification(message, options);
  }

  createWithInteraction(message: string, options: NotificationOptions = {}) {
    this.create(message, {requireInteraction: true, ...options});
  }
}