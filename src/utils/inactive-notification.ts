import { consoleError } from "./error-controller";
import NotificationsController from "./notifications-controller";
import ServiceWorkerController from "./service-worker-controller";
import WorkerController from "./worker-controller";

interface Ipayload {
  message: string;
  time: number;
  options?: NotificationOptions;
}

export default class InactiveNotification {
  notificationController: NotificationsController = new NotificationsController();
  service: ServiceWorkerController | WorkerController | null = null;
  isInit: boolean = false;
  constructor() {
    if (this.hasPermissions()) this.init();
  }

  async init() {
    console.log('Este es el INIT');
    if (this.isInit) return Promise.resolve();
    const tempWorkerService = new ServiceWorkerController('./../workers/service-worker-timeout.ts');
    return tempWorkerService.init().then(() => {
      this.service = tempWorkerService;
      this.isInit = true;
      return Promise.resolve();
    }).catch(() => {
      const tempWorker = new WorkerController('./../workers/worker.ts');
      if (tempWorker.init()) {
        this.service = tempWorker;
        if (this.service) {
          this.isInit = true;
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      }
    });
  }

  requestPermission() {
    return this.notificationController.requestPermission();
  }

  hasPermissions() {
    return this.notificationController.hasPermissions;
  }

  createNotification(type: string, payload?: Ipayload) {
    if (this.notificationController.canBeUsed && this.notificationController.hasPermissions && this.isInit) {
      this.service?.sendMessage({type, payload});
    } else {
      consoleError("You don't have permission to use notifications");
    }
  }

  createInactiveNotification(payload: Ipayload) {
    this.createNotification('notification', {message: payload.message, options: {requireInteraction: true, ...payload.options}, time: payload.time})
  }

  stopNotification() {
    this.createNotification('remove');
  }
}