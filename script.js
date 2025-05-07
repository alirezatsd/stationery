let isScanning = false;

let html5QrCode = new Html5Qrcode("reader");

document.getElementById("startButton").addEventListener("click", function() {
    if (!isScanning) {
        // شروع اسکن
        html5QrCode.start(
            { facingMode: "environment" }, // استفاده از دوربین عقب
            {
                fps: 10,  // فریم در ثانیه
                qrbox: 250,  // اندازه جعبه برای اسکن بارکد
            },
            (decodedText, decodedResult) => {
                console.log(`بارکد اسکن شده: ${decodedText}`);
                alert(`بارکد اسکن شده: ${decodedText}`); // نمایش متن اسکن شده
            },
            (errorMessage) => {
                console.log(`خطا در اسکن: ${errorMessage}`);
            }
        ).then(() => {
            isScanning = true; // تغییر وضعیت به اسکن در حال انجام
        }).catch(err => {
            console.error("خطا در شروع اسکن:", err);
        });
    } else {
        // توقف اسکن
        html5QrCode.stop().then(() => {
            isScanning = false; // تغییر وضعیت به اسکن متوقف شده
        }).catch((err) => {
            console.error("خطا در توقف اسکن:", err);
        });
    }
});
