const CACHE_NAME = 'pwa-cache-v1'; // نام کش
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/assets/logo.png', // مسیر به لوگو یا تصاویر دیگر که ممکنه استفاده بشه
];

// نصب Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker نصب شد');
        return cache.addAll(urlsToCache);
      })
  );
});

// فعال‌سازی Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]; // کش‌هایی که باید باقی بمانند
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // حذف کش‌های قدیمی
          }
        })
      );
    })
  );
});

// دریافت درخواست‌ها و پاسخ به آنها از کش
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // اگر درخواست در کش موجود بود، پاسخ بده
      if (cachedResponse) {
        return cachedResponse;
      }
      // اگر در کش نبود، درخواست رو از شبکه ارسال کن
      return fetch(event.request).then((response) => {
        // پاسخ رو به کش اضافه کن (برای درخواست‌های آینده)
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

// مدیریت بروزرسانی کش
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
