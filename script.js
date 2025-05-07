// بررسی اینکه آیا مرورگر از دسترسی به دوربین پشتیبانی می‌کنه
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log("مرورگر شما از دسترسی به دوربین پشتیبانی می‌کند");

  // درخواست دسترسی به دوربین
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      // دوربین فعال شد، حالا می‌خواهیم ویدیو رو نمایش بدیم
      console.log("دوربین فعال شد");

      // شروع اسکن بارکد پس از فعال شدن دوربین
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector('#barcode-scanner'), // نمایش ویدیو داخل المنت
          constraints: {
            facingMode: "environment" // استفاده از دوربین پشت
          }
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"] // نوع بارکدهایی که می‌خواهیم شناسایی کنیم
        }
      }, function(err) {
        if (err) {
          console.log("خطا در راه‌اندازی اسکنر: ", err);
          return;
        }
        Quagga.start(); // شروع اسکن
      });

      // در هنگام اسکن بارکد، مقدار بارکد شناسایی شده رو در صفحه نمایش بده
      Quagga.onDetected(function(result) {
        const barcode = result.codeResult.code;
        document.getElementById('barcodeResult').innerText = barcode;
        console.log("بارکد شناسایی شده: ", barcode);
      });
    })
    .catch(function(err) {
      console.log('خطا در دسترسی به دوربین:', err);
    });
} else {
  console.log("مرورگر شما از دسترسی به دوربین پشتیبانی نمی‌کند.");
}

// شروع اسکن با دکمه
document.getElementById('startScanButton').addEventListener('click', function() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // درخواست دوباره برای استفاده از دوربین در صورت لزوم
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      Quagga.start();
    });
  }
});
