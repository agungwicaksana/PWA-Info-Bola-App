var webPush = require('web-push');
 
const vapidKeys = {
    "publicKey": "BOMAy8Ecr-5g8ud64Bwl4rh89FuaQs34VLKpHMc2AJG31IWgoKOrcYBL8eL34h_VN_k5CPdbFQsdwxitpEl4naU",
    "privateKey": "MOEDS-v0FF6R00RW6Cjp02yJzjKYBJRlnUuU6xt-YwQ"
};
 
 
webPush.setVapidDetails(
    'mailto:agung.wicaksaana@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dH_ZZdekkIA:APA91bH1e9W6_ye0x62X1-x5_gxA8lv5IYhnOzqV8yWuU6tPhDb7uqQ07Evi3HvoXnPlByNuRoYtED26m9qJXv--A-N_bIWYoKeCtjESuB1l3HRQwB7vdKgudod_ZmzkDjWaho4kw_EV",
    "keys": {
        "p256dh": "BLqSdGuwLDFcSvvyf2FO41bsgbLSABk9kfrmvv1M6rp8XSj1c7N3mxluitafsBC7wmJNddDxsT0cncbiuMruquE=",
        "auth": "MhifQ90GNkX6mU8T+i6+Pg=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
    gcmAPIKey: '190164785437',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);