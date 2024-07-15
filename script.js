var videoCamera = document.createElement("video");

function startScan() {
    elemControlDiv.style.display = 'none';
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function (stream) {
        videoCamera.srcObject = stream;
        videoCamera.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        videoCamera.play();
        requestAnimationFrame(tick);
    }).catch(function (e) {
        elemControlDiv.style.display = '';
        console.error("getUserMedia failed", e.message);
        elemScanResult.textContent = "打开摄像头失败:" + e.message;
    });
}

function scanImage() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function (event) {
        let file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function (event) {
            let base64Data = event.target.result;
            let image = new Image();
            image.src = base64Data;
            image.onload = function () {
                elemScanCamera.width = image.width;
                elemScanCamera.height = image.height;
                canvasScanCamera.drawImage(image, 0, 0, image.width, image.height);
                let imageData = canvasScanCamera.getImageData(0, 0, image.width, image.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });
                if (code) {
                    try {
                        const urlParams = parseUrl(code.data);
                        const ciphertextKey = CryptoJS.MD5(urlParams["_k"] + urlParams["_d"]).toString();
                        console.debug('aes decrypt:', ciphertextKey);
                        let decryptedPassword = CryptoJS.AES.decrypt(urlParams["_p"], ciphertextKey).toString(CryptoJS.enc.Utf8);
                        console.debug('new password:', decryptedPassword);
                        elemScanResult.innerText = "激活码: " + decryptedPassword;
                    } catch (e) {
                        console.error('scan error:', e);
                    }
                } else {
                    elemScanResult.innerText = "图片识别失败";
                }
            };
        }
    };
    input.click();
}

function parseUrl(url) {
    const params = {};
    const urlParts = url.split("?");
    if (urlParts.length > 1) {
        const queryString = urlParts[1];
        const pairs = queryString.split("&");
        pairs.forEach(pair => {
            const keyValue = pair.split("=");
            params[keyValue[0]] = decodeURIComponent(keyValue[1]);
        });
    }
    return params;
}

function tick() {
    if (videoCamera.readyState === videoCamera.HAVE_ENOUGH_DATA) {
        elemScanCameraDiv.style.display = '';
        elemScanCamera.height = videoCamera.videoHeight;
        elemScanCamera.width = videoCamera.videoWidth;
        canvasScanCamera.drawImage(videoCamera, 0, 0, elemScanCamera.width, elemScanCamera.height);
        let imageData = canvasScanCamera.getImageData(0, 0, elemScanCamera.width, elemScanCamera.height);
        let qrcode = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });
        if (qrcode) {
            try {
                const urlParams = parseUrl(qrcode.data);
                const ciphertextKey = CryptoJS.MD5(urlParams["_k"] + urlParams["_d"]).toString();
                console.debug('aes decrypt:', ciphertextKey);
                let decryptedPassword = CryptoJS.AES.decrypt(urlParams["_p"], ciphertextKey).toString(CryptoJS.enc.Utf8);
                console.debug('new password:', decryptedPassword);
                elemScanResult.innerText = "激活码: " + decryptedPassword;
                elemScanCameraDiv.style.display = 'none';
                elemControlDiv.style.display = '';
                return;
            } catch (e) {
                console.error('scan error:', e);
            }
        }
    }
    requestAnimationFrame(tick);
}