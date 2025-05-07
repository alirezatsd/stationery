let isScanning = false;

let html5QrCode = new Html5Qrcode("reader");

document.getElementById("startButton").addEventListener("click", function() {
    if (!isScanning) {
        html5QrCode.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: 250,
            },
            (decodedText, decodedResult) => {
                console.log(`بارکد اسکن شده: ${decodedText}`);
            },
            (errorMessage) => {
                console.log(`خطا در اسکن: ${errorMessage}`);
            }
        ).then(() => {
            isScanning = true;
        }).catch(err => {
            console.error("خطا در شروع اسکن:", err);
        });
    } else {
        html5QrCode.stop().then(() => {
            isScanning = false;
        }).catch((err) => {
            console.error("خطا در توقف اسکن:", err);
        });
    }
});
