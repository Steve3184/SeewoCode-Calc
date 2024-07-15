function calcPasswordLauncher() {
    let input_passwd = document.getElementById('input_passwd').value;
    if (input_passwd != undefined && input_passwd.length == 16) {
        setTimeout(calcPassword, 1);
        document.getElementById('calcResult').innerText = '计算中,速度取决于你的设备...'
    } else {
        document.getElementById('calcResult').innerText = '输入格式不正确'
    }
}

function calcPassword() {
    let passwd = document.getElementById('input_passwd').value;
    console.debug('async calcPassword start,target:', passwd);
    for(let i = 0; i < 1000000; i++) {
        let hash_value = encodePassword(i.toString());
        if(hash_value == passwd) {
            console.debug('async calcPassword end, found:', i);
            document.getElementById('calcResult').innerText = '密码:'+ i.toString();
            return;
        }
    }
    console.debug('async calcPassword end, not found');
}

function md5(str) { 
    return CryptoJS.MD5(str).toString();
}

function encodePassword(pwd) {
    return md5(md5(pwd) + md5('hugo')).substr(8, 16);
}
