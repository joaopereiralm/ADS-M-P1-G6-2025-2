// Seleciona todos os cards de estatísticas
const statBoxes = document.querySelectorAll('.stat-box');

statBoxes.forEach(box => {
    const numberElement = box.querySelector('.stat-number');
    const target = parseInt(numberElement.getAttribute('data-target'));
    let interval; 

    // Quando o mouse ENTRA no card
    box.addEventListener('mouseenter', () => {
        let currentCount = 0;
        
        clearInterval(interval); // Limpa qualquer animação anterior
        
        let speed = Math.max(1000 / target, 30); 

        // Força o número a mostrar +0 no instante em que o mouse entra
        numberElement.textContent = `+0`;

        interval = setInterval(() => {
            currentCount++; // Incrementa o número
            numberElement.textContent = `+${currentCount}`; // Mostra na tela
            
            if (currentCount >= target) {
                clearInterval(interval); // Para a contagem no alvo
            }
        }, speed);
    });

    // Quando o mouse SAI do card
    box.addEventListener('mouseleave', () => {
        clearInterval(interval); // Interrompe a animação imediatamente
        
        // Retorna a exibir o número final fixo
        numberElement.textContent = `+${target}`; 
    });
});