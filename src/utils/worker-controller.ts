interface IMessage {
  type: string;
  payload?: object | string;
}

export default class WorkerController{
  canBeUsed: boolean;
  path: URL;
  service: Worker | null = null;
  constructor(path: string) {
    this.canBeUsed = !!window.Worker;
    this.path = new URL(path, import.meta.url);
    if (!this.canBeUsed) {
      throw Error('This browser can not use Workers');
    }
  }

  init() {
    if (this.canBeUsed) {
      this.service = new Worker(this.path);
      return !!this.service;
    }
    return false;
  }

  sendMessage(message: IMessage | string) {
    this.service?.postMessage(message);
  }

  remove() {
    this.service?.terminate();
  }
}