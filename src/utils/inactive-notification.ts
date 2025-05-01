import { consoleError } from "./error-controller";
import NotificationsController from "./notifications-controller";
import ServiceWorkerController from "./service-worker-controller";
import WorkerController from "./worker-controller";

interface Ipayload {
  message: string;
  time?: number;
  options?: NotificationOptions;
}

export default class InactiveNotification {
  notificationController: NotificationsController = new NotificationsController();
  service: ServiceWorkerController | WorkerController | null = null;
  // isInit: boolean = false;
  constructor() {
    this.init();
  }

  async init() {
    const tempWorkerService = new ServiceWorkerController('/pomodoro/workers/service-worker-timeout.js');
    return tempWorkerService.init().then(() => {
      this.service = tempWorkerService;
      return Promise.resolve();
    }).catch(() => {
      return Promise.reject();
      // const tempWorker = new WorkerController('./../workers/worker.ts');
      // if (tempWorker.init()) {
      //   this.service = tempWorker;
      //   if (this.service) {
      //     this.isInit = true;
      //     return Promise.resolve();
      //   } else {
      //     return Promise.reject();
      //   }
      // }
    });
  }

  requestPermission() {
    return this.notificationController.requestPermission().then(() => {
      return this.init();
    }).catch(() => {
      return Promise.reject();
    });
  }

  canShowNotification() {
    return this.notificationController.canShowNotification();
  }

  canBeUse() {
    return ServiceWorkerController.canBeUsed && NotificationsController.canBeUsed;
  }

  hasPermission() {
    return NotificationsController.hasPermissions;
  }

  setCanShowNotification(checked: boolean) {
    return this.notificationController.setCanShowNotification(checked);
  }

  createNotification(type: string, payload?: Ipayload) {
    if (this.notificationController.canShowNotification()) {
      this.service?.sendMessage({type, payload});
    } else {
      consoleError("You don't have permission to use notifications", false);
    }
  }

  createInactiveNotification(payload: Ipayload) {
    this.createNotification('notification', {message: payload.message, options: {requireInteraction: true, ...payload.options}, time: payload.time})
  }

  stopNotification() {
    this.createNotification('remove');
  }
}