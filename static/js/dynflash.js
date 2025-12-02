document.addEventListener('DOMContentLoaded', function() {
    const DF_VER = "1.0.2"
    const INTERV = 5000;

    const timerBar = document.createElement('div');
    timerBar.id = 'dynflash-timer-bar';
    timerBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #1a73e8;
        transition: width ${INTERV-300}ms linear;
        z-index: 9999;
        border-bottom: 1px solid rgb(11, 81, 172);
    `;
    document.body.appendChild(timerBar);

    function startTimerAnimation() {
        timerBar.style.transition = 'none';
        timerBar.style.width = '100%';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                timerBar.style.transition = `width ${INTERV-300}ms linear`;
                timerBar.style.width = '0%';
            });
        });
    }

    async function fetchFlashes() {
        try {
            const response = await fetch('/api/flashes');
            
            if (!response.ok) {
                throw new Error(`HTTP ERR: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const message = item.message || item[0];
                    const type = item.category || item[1] || 'info';
                    if (type != "system") {
                        if (typeof uShowToast === 'function') {
                            uShowToast(message, type);
                        }
                    } else {
                        loadFiles();
                    }
                });
            }

        } catch (error) {
            uShowToast('Ошибка Flashes:'+error, "error");
            uShowToast('Перезагрузите страницу', "error");
            clearInterval(loopID);

            timerBar.style.transition = 'none';
            timerBar.style.backgroundColor = 'red';
            timerBar.style.width = '100%';
        }

        startTimerAnimation();
    }

    startTimerAnimation();

    const loopID = setInterval(fetchFlashes, INTERV); 

    console.log(`DynFlash ${DF_VER} active`);
});