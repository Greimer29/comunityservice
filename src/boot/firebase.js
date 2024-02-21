import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { Notify } from 'quasar'

    const firebaseConfig = {
      apiKey: "AIzaSyASaQkUftrTTDp_5PfoQvBoH6SFJUlsgsM",
      authDomain: "homeplusnotify-f6088.firebaseapp.com",
      projectId: "homeplusnotify-f6088",
      storageBucket: "homeplusnotify-f6088.appspot.com",
      messagingSenderId: "566040100897",
      appId: "1:566040100897:web:0df17c3c685cd2884c6360",
      measurementId: "G-ZE97SL1PEE"
    };

    let app;
    if (!app) {
      // Inicializa Firebase si aún no se ha hecho
      app = initializeApp(firebaseConfig);
    }

    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      Notify.create({
        position:'top',
        message: `${payload.notification.title}: ${payload.notification.body}`
      })
      // ...
    });

export{onMessage }
