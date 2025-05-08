import { consoleError } from "./error-controller";

interface IMessage {
  type: string;
  payload?: object | string;
}

export default class ServiceWorkerController {
  path: URL;
  canBeUsed: boolean;
  service: ServiceWorkerRegistration | null = null;
  constructor(path: string) {
    this.path = new URL(path, import.meta.url);
    this.canBeUsed = 'serviceWorker' in navigator;
  }

  async init() {
    // Register the file
    if (this.canBeUsed) {
      return navigator.serviceWorker.register(this.path)
        .then((reg) => {
          this.service = reg;
          return Promise.resolve();
        }).catch(() => {
          return Promise.reject(consoleError('Service can not be loaded', false));
        });
    } else {
      return Promise.reject(consoleError('Service worker can not be used', false));
    }
  }

  async remove() {
    if (this.service) {
      return this.service.unregister();
    } else {
      const target = await this.findService();
      if (target) {
        return target.unregister();
      } else {
        return Promise.reject();
      }
    }
  }
  update() {
    this.service?.update();
  }

  sendMessage(message: IMessage | string) {
    this.service?.active?.postMessage(message);
  }

  showNotification(message: string, options: NotificationOptions) {
    this.service?.showNotification(message, options);
  }

  findService(): Promise<ServiceWorkerRegistration> {
    return new Promise((resolve, reject) => {
      navigator.serviceWorker.getRegistration(this.path).then((reg) => {
        if (reg) {
          resolve(reg);
        } else {
          reject();
        }
      })
    })
  }

}