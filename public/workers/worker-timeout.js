onmessage = (payload) => {
  if (payload.data.type === 'notification') {
    setTimeout(() => {
      new Notification(payload.data.message);
    }, payload.data.time);
  }
}