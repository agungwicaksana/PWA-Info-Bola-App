const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BOMAy8Ecr-5g8ud64Bwl4rh89FuaQs34VLKpHMc2AJG31IWgoKOrcYBL8eL34h_VN_k5CPdbFQsdwxitpEl4naU",
    "privateKey": "MOEDS-v0FF6R00RW6Cjp02yJzjKYBJRlnUuU6xt-YwQ"
};

webPush.setVapidDetails(
    'mailto:agung.wicaksaana@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "endpoint (ambil dari console log pada aplikasi)",
    "keys": {
        "p256dh": "p256dh (ambil dari console log pada aplikasi)",
        "auth": "authKey (ambil dari console log pada aplikasi)"
    }
};
const payload = 'Ini Notifikasi dari FCM!';
 
const options = {
    gcmAPIKey: '190164785437',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);