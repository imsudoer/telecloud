const FILENAME = window.location.pathname.split('/').at(-1);

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dlbutton').onclick = doDl;
    document.getElementById('repbutton').onclick = doReport;

    if (getCookie(FILENAME) === "reported") {
        document.getElementById('repbutton').remove()
    }
});

function doDl() {
    window.location = window.location.href+'?mode=dl'
}

async function doReport() {
    try {
        const res = await fetch(window.location.href+'?mode=report')
        const j = await res.json()
        if (j["ok"] === true) {
            uShowToast("Репорт отправлен");
            setCookie(FILENAME, "reported", 1)
            document.getElementById('repbutton').remove();
        }
    } catch (error) {
        uShowToast("Ошибка: "+error, "error")
    }
}