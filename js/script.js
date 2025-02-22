document.addEventListener('DOMContentLoaded', function () {
    const clockElement = document.getElementById('clock');
    const messageElement = document.getElementById('message');
    const fireworks = document.getElementById('fireworks');
    let fireworksTimeoutId = null;

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;

        // Verifica se é 23 de fevereiro
        if (now.getDate() === 23 && now.getMonth() === 1) { // Mês é indexado a partir de 0 (janeiro = 0)
            const today = now.toDateString();
            const lastShownDate = localStorage.getItem('fireworksShownDate');

            // Se os fogos ainda não foram exibidos hoje
            if (lastShownDate !== today) {
                startFireworks();
                localStorage.setItem('fireworksShownDate', today); // Armazena a data atual

                // Para os fogos após 30 segundos
                fireworksTimeoutId = setTimeout(() => {
                    stopFireworks();
                }, 30000); // 30 segundos
            }
        } else {
            messageElement.classList.add('hidden');
            stopFireworks();
            console.log("passou aqui 1")
        }
    }

    function startFireworks() {
        clockElement.classList.add('hidden');
        messageElement.classList.remove('hidden');
        fireworks.classList.remove('hidden');
    }


    function stopFireworks() {
        fireworks.classList.add('hidden');
        clockElement.classList.remove('hidden');
        messageElement.classList.add('hidden');
    }

    setInterval(updateClock, 1000);
    updateClock();

    localStorage.clear()
});