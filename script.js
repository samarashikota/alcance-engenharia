document.addEventListener('DOMContentLoaded', () => {

    // ====================
    // MENU HAMBURGER (MOBILE)
    // ====================
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animação do ícone do hamburger (opcional)
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Fecha o menu ao clicar em um link (para SPAs)
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // ====================
    // ANIMAÇÃO AO ROLAR (SCROLL)
    // ====================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Opcional: parar de observar após animar
                    // observer.unobserve(entry.target); 
                }
                // Opcional: remover a classe se sair da tela (para re-animar)
                // else {
                //     entry.target.classList.remove('is-visible');
                // }
            });
        }, {
            threshold: 0.1 // 10% do elemento visível
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // ====================
    // MANIPULAÇÃO DO FORMULÁRIO (FORM SPREE)
    // ====================
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const data = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = "Mensagem enviada com sucesso! Obrigado.";
                    formStatus.style.color = "var(--secondary-color)";
                    form.reset();
                } else {
                    // Trata erros do Formspree (ex: campo _replyto mal formatado)
                    const responseData = await response.json();
                    if (responseData.errors) {
                        formStatus.textContent = responseData.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.textContent = "Ocorreu um erro ao enviar a mensagem.";
                    }
                    formStatus.style.color = "red";
                }
            } catch (error) {
                formStatus.textContent = "Ocorreu um erro ao enviar a mensagem.";
                formStatus.style.color = "red";
            }
        });
    }

});