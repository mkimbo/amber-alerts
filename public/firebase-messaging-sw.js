importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDZLwPxX4gTaSzC9MZemvw90S4tVXCMs5k",
    authDomain: "gcp-playground-c1787.firebaseapp.com",
    projectId: "gcp-playground-c1787",
    storageBucket: "gcp-playground-c1787.appspot.com",
    messagingSenderId: "797691638139",
    appId: "1:797691638139:web:703fa0df5d80a6a74a8dde",
    // measurementId: "G-3LYJD197LR",
  });
}
firebase.messaging();

//background notifications will be received here
firebase.messaging().setBackgroundMessageHandler(async (message) => {
  if (Notification.permission === "granted") {
    if (navigator.serviceWorker)
      navigator.serviceWorker.getRegistration().then(async function (reg) {
        if (reg)
          await reg.showNotification(message.notification.title, {
            body: message.notification.body,
            icon: "/icons/launcher-icon-4x.png",
          });
      });
  }
});

/* firebase.messaging().onBackgroundMessage(async (message) => {
  if (Notification.permission === "granted") {
    if (navigator.serviceWorker)
      navigator.serviceWorker
        .getRegistration()
        .then(async function (reg) {
          if (reg)
            await reg.showNotification(message.notification.title, {
              body: message.notification.body,
              icon: "/icons/launcher-icon-4x.png",
            });
        });
  }
}); */
