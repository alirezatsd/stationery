// متغیر برای چک کردن وضعیت اسکن
let isScanning = false;

// ایجاد نمونه Html5Qrcode برای استفاده در اسکن
let html5QrCode = new Html5Qrcode("reader");

// وقتی دکمه "شروع/توقف اسکن" کلیک می‌شود
document.getElementById("startButton").addEventListener("click", function() {
    if (!isScanning) {
        // شروع اسکن
        html5QrCode.start(
            { facingMode: "environment" }, // استفاده از دوربین پشت گوشی
            {
                fps: 10,  // سرعت فریم (Frame per Second)
                qrbox: 250,  // اندازه جعبه اسکن
            },
            (decodedText, decodedResult) => {
                // وقتی بارکد اسکن شد
                console.log(`بارکد اسکن شده: ${decodedText}`);
                // اینجا می‌توانید هر عملیاتی که لازم دارید انجام دهید.
                // مثلا ذخیره کردن بارکد اسکن شده یا انجام عملیات خاص
            },
            (errorMessage) => {
                // نمایش خطای احتمالی در اسکن
                console.log(`خطا در اسکن: ${errorMessage}`);
            }
        ).then(() => {
            isScanning = true; // تغییر وضعیت به اسکن فعال
        }).catch(err => {
            console.error("خطا در شروع اسکن:", err);
        });
    } else {
        // توقف اسکن
        html5QrCode.stop().then(() => {
            isScanning = false; // تغییر وضعیت به اسکن غیرفعال
        }).catch((err) => {
            console.error("خطا در توقف اسکن:", err);
        });
    }
});
