function getTimestamp() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const yyyy = now.getFullYear();
    const mm = pad(now.getMonth() + 1);
    const dd = pad(now.getDate());
    const hh = pad(now.getHours());
    const min = pad(now.getMinutes());
    const ss = pad(now.getSeconds());
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

function info(message) {
    console.log(`[${getTimestamp()}] [INFO] ${message}`);
}

function success(message) {
    console.log(`[${getTimestamp()}] [SUCCESS] ${message}`);
}

function warn(message) {
    console.log(`[${getTimestamp()}] [WARN] ${message}`);
}

function error(message) {
    console.log(`[${getTimestamp()}] [ERROR] ${message}`);
}

module.exports = {
    info,
    success,
    warn,
    error,
    getTimestamp
};
