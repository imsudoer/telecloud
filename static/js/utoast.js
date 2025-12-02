/**
 * Отображает всплывающее уведомление (Toast).
 * @param {string} message - Текст сообщения.
 * @param {('info'|'success'|'error')} [type='info'] - Тип уведомления (влияет на цвет полосы).
 * @param {number} [duration=3000] - Длительность отображения в миллисекундах.
 */
function uShowToast(message, type = 'info', duration = 3000) {
    let container = document.getElementById('u-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'u-toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `u-toast-notification u-toast-${type}`; 
    
    let iconHTML = '';
    const iconStyle = "style='width:20px;height:20px;margin-right:10px;'";

    if (type === 'success') {
        iconHTML = `<svg ${iconStyle} fill='#34a853' viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`;
    } else if (type === 'error') {
        iconHTML = `<svg ${iconStyle} fill='var(--danger-color)' viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
    } else {
        iconHTML = `<svg ${iconStyle} fill='var(--primary-color)' viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
    }

    toast.innerHTML = `${iconHTML}<span>${message}</span>`;
    
    container.appendChild(toast);

    void toast.offsetWidth; 
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        
        toast.addEventListener('transitionend', () => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, { once: true });

    }, duration);
}