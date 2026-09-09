const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');
 
contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
 
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);
    const formEndpoint = contactForm.action.replace(
        'https://formsubmit.co/',
        'https://formsubmit.co/ajax/'
    );
 
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';
 
    try {
        const response = await fetch(formEndpoint, {
            method: contactForm.method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        });
 
        if (!response.ok) {
            throw new Error('Não foi possível enviar o formulário.');
        }
 
        contactForm.reset();
        formStatus.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
        formStatus.classList.add('success');
    } catch (error) {
        formStatus.textContent = 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.';
        formStatus.classList.add('error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar formulário';
    }
});
 
// Botão "Copiar chave" do card de doação via Pix
const pixCopyButton = document.querySelector('.pix-copy-btn');
 
if (pixCopyButton) {
    pixCopyButton.addEventListener('click', async () => {
        const targetId = pixCopyButton.getAttribute('data-copy-target');
        const pixKeyElement = document.getElementById(targetId);
        const originalLabel = pixCopyButton.textContent;
 
        try {
            await navigator.clipboard.writeText(pixKeyElement.textContent.trim());
            pixCopyButton.textContent = 'Chave copiada!';
        } catch (error) {
            pixCopyButton.textContent = 'Não foi possível copiar';
        } finally {
            setTimeout(() => {
                pixCopyButton.textContent = originalLabel;
            }, 2000);
        }
    });
}