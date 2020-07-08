import urlBase64ToUint8Array from "./src/script/uint8AConverter.js";

if (!("serviceWorker" in navigator)) {
    console.error("ServiceWorker: Browser tidak mendukung")
} else {
    registerServiceWorker();
    requestNotifPermission();
}

function registerServiceWorker() {
    return navigator.serviceWorker
        .register("/service-worker.js")
        .then(function(registration) {
            console.log("ServiceWorker: Pendaftaran berhasil. Scope: ", registration.scope);
        })
        .catch(function(error) {
            console.log("ServiceWorker: Pendaftaran Gagal. Error: ", error);
        })
}

function requestNotifPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "granted") {
                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(function(registration) {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BOMAy8Ecr-5g8ud64Bwl4rh89FuaQs34VLKpHMc2AJG31IWgoKOrcYBL8eL34h_VN_k5CPdbFQsdwxitpEl4naU")
                        }).then(function(subscribe) {
                            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh')))));
                            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth')))));
                        }).catch(function(e) {
                            console.error('Tidak dapat melakukan subscribe ', e.message);
                        });
                    });
                }
            }
        });
    }
}