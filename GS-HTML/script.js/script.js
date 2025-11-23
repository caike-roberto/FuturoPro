// Menu Hambúrguer
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// FAQ Accordion
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fechar todos os itens abertos
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abrir o item clicado se não estava aberto
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Validação do Formulário de Contato
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCounter = document.getElementById('charCounter');

    // Contador de caracteres para mensagem
    if (messageInput && charCounter) {
        messageInput.addEventListener('input', function() {
            const count = this.value.length;
            charCounter.textContent = `${count} / 1000`;
            
            if (count > 1000) {
                charCounter.style.color = 'var(--color-error)';
            } else {
                charCounter.style.color = 'var(--color-text-light)';
            }
        });
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;

        // Validar nome
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'Por favor, insira seu nome completo (mínimo 3 caracteres).');
            isValid = false;
        } else {
            removeError(nameInput);
        }

        // Validar email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Por favor, insira um email válido.');
            isValid = false;
        } else {
            removeError(emailInput);
        }

        // Validar mensagem
        if (!validateMessage(messageInput.value)) {
            showError(messageInput, 'Por favor, insira uma mensagem (mínimo 10 caracteres).');
            isValid = false;
        } else {
            removeError(messageInput);
        }

        if (isValid) {
            // Simular envio do formulário
            contactForm.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            
            // Reset após 5 segundos
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                document.getElementById('successMessage').style.display = 'none';
                if (charCounter) {
                    charCounter.textContent = '0 / 1000';
                }
            }, 5000);
        }
    });
}

// Funções de validação
function validateName(name) {
    const trimmedName = name.trim();
    return trimmedName.length >= 3 && trimmedName.length <= 100;
}

function validateEmail(email) {
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(trimmedEmail) && trimmedEmail.length <= 255;
}

function validateMessage(message) {
    const trimmedMessage = message.trim();
    return trimmedMessage.length >= 10 && trimmedMessage.length <= 1000;
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function removeError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
}

// Validação em tempo real
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.id === 'name' && this.value) {
            if (!validateName(this.value)) {
                showError(this, 'Por favor, insira seu nome completo (mínimo 3 caracteres).');
            } else {
                removeError(this);
            }
        }
        
        if (this.id === 'email' && this.value) {
            if (!validateEmail(this.value)) {
                showError(this, 'Por favor, insira um email válido.');
            } else {
                removeError(this);
            }
        }
        
        if (this.id === 'message' && this.value) {
            if (!validateMessage(this.value)) {
                showError(this, 'Por favor, insira uma mensagem (mínimo 10 caracteres).');
            } else {
                removeError(this);
            }
        }
    });
});

// Demo Tabs (solucao.html)
function showDemo(demoNumber) {
    // Remover classe active de todos os tabs e conteúdos
    document.querySelectorAll('.demo-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.demo-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Adicionar classe active ao tab e conteúdo clicado
    event.target.classList.add('active');
    document.getElementById(`demo${demoNumber}`).classList.add('active');
}

// Quiz Interativo (experiencia.html)
let quizAnswers = {
    level: '',
    area: '',
    time: ''
};
let currentQuizStep = 1;

function selectAnswer(step, answer) {
    // Salvar resposta
    if (step === 1) quizAnswers.level = answer;
    if (step === 2) quizAnswers.area = answer;
    if (step === 3) quizAnswers.time = answer;
    
    // Esconder step atual
    document.getElementById(`step${step}`).classList.remove('active');
    
    if (step < 3) {
        // Mostrar próximo step
        currentQuizStep = step + 1;
        document.getElementById(`step${currentQuizStep}`).classList.add('active');
        
        // Atualizar barra de progresso
        const progress = (currentQuizStep / 3) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('currentStep').textContent = currentQuizStep;
    } else {
        // Mostrar resultados
        showQuizResults();
        document.getElementById('progressIndicator').style.display = 'none';
    }
}

function showQuizResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';
    
    // Gerar conteúdo dos resultados baseado nas respostas
    const levelText = {
        'beginner': 'Iniciante',
        'intermediate': 'Intermediário',
        'advanced': 'Avançado'
    };
    
    const areaText = {
        'dev': 'Desenvolvimento Web',
        'data': 'Ciência de Dados',
        'design': 'UX/UI Design',
        'mobile': 'Desenvolvimento Mobile'
    };
    
    const timeText = {
        '5h': '5 horas por semana',
        '10h': '10 horas por semana',
        '20h': '20+ horas por semana'
    };
    
    const duration = {
        '5h': '6 a 8 meses',
        '10h': '3 a 4 meses',
        '20h': '6 a 8 semanas'
    };
    
    const careers = {
        'dev': ['Desenvolvedor Front-end', 'Desenvolvedor Back-end', 'Desenvolvedor Full Stack'],
        'data': ['Analista de Dados', 'Cientista de Dados', 'Engenheiro de Machine Learning'],
        'design': ['Designer UX', 'Designer UI', 'Product Designer'],
        'mobile': ['Desenvolvedor iOS', 'Desenvolvedor Android', 'Desenvolvedor React Native']
    };
    
    // Preencher resultados
    document.getElementById('profileSummary').innerHTML = `
        <p><strong>Nível:</strong> ${levelText[quizAnswers.level]}</p>
        <p><strong>Área de interesse:</strong> ${areaText[quizAnswers.area]}</p>
        <p><strong>Dedicação:</strong> ${timeText[quizAnswers.time]}</p>
    `;
    
    document.getElementById('pathSummary').innerHTML = `
        <p>Trilha personalizada de <strong>${areaText[quizAnswers.area]}</strong> com ${quizAnswers.level === 'beginner' ? 'fundamentos completos' : quizAnswers.level === 'intermediate' ? 'conceitos avançados' : 'especialização profunda'}.</p>
        <p>Inclui projetos práticos, mentoria e certificação reconhecida.</p>
    `;
    
    document.getElementById('timeSummary').innerHTML = `
        <p><strong>${duration[quizAnswers.time]}</strong> para conclusão com dedicação de ${timeText[quizAnswers.time]}.</p>
        <p>Acesso vitalício ao conteúdo e atualizações.</p>
    `;
    
    document.getElementById('careerSummary').innerHTML = `
        <ul>
            ${careers[quizAnswers.area].map(career => `<li>${career}</li>`).join('')}
        </ul>
    `;
}

function resetQuiz() {
    quizAnswers = { level: '', area: '', time: '' };
    currentQuizStep = 1;
    
    // Esconder resultados
    document.getElementById('results').style.display = 'none';
    
    // Mostrar primeiro step
    document.querySelectorAll('.quiz-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step1').classList.add('active');
    
    // Resetar progresso
    document.getElementById('progressIndicator').style.display = 'block';
    document.getElementById('progressFill').style.width = '33%';
    document.getElementById('currentStep').textContent = '1';
}

// Modal
function openModal() {
    const modal = document.getElementById('detailsModal');
    modal.classList.add('active');
    
    // Gerar módulos baseado na área escolhida
    const modules = {
        'dev': [
            { title: 'Fundamentos de HTML e CSS', duration: '3 semanas' },
            { title: 'JavaScript Moderno', duration: '4 semanas' },
            { title: 'React.js Avançado', duration: '4 semanas' },
            { title: 'Node.js e APIs', duration: '3 semanas' },
            { title: 'Banco de Dados', duration: '2 semanas' },
            { title: 'Projeto Final', duration: '2 semanas' }
        ],
        'data': [
            { title: 'Python para Análise de Dados', duration: '3 semanas' },
            { title: 'Estatística e Probabilidade', duration: '4 semanas' },
            { title: 'Machine Learning', duration: '5 semanas' },
            { title: 'Deep Learning', duration: '4 semanas' },
            { title: 'Visualização de Dados', duration: '2 semanas' },
            { title: 'Projeto Capstone', duration: '3 semanas' }
        ],
        'design': [
            { title: 'Princípios de Design', duration: '2 semanas' },
            { title: 'User Research', duration: '3 semanas' },
            { title: 'Wireframing e Prototyping', duration: '3 semanas' },
            { title: 'UI Design', duration: '4 semanas' },
            { title: 'Design Systems', duration: '3 semanas' },
            { title: 'Portfolio e Apresentação', duration: '2 semanas' }
        ],
        'mobile': [
            { title: 'Fundamentos de Mobile', duration: '2 semanas' },
            { title: 'React Native', duration: '5 semanas' },
            { title: 'APIs e Integrações', duration: '3 semanas' },
            { title: 'Publicação de Apps', duration: '2 semanas' },
            { title: 'Performance e Otimização', duration: '2 semanas' },
            { title: 'Projeto Final', duration: '3 semanas' }
        ]
    };
    
    const selectedModules = modules[quizAnswers.area] || modules['dev'];
    const modulesHTML = selectedModules.map((module, index) => `
        <div style="padding: 1rem; background-color: var(--color-bg-alt); margin-bottom: 1rem; border-radius: 8px; border-left: 4px solid var(--color-primary);">
            <strong>Módulo ${index + 1}: ${module.title}</strong>
            <p style="color: var(--color-text-light); margin-top: 0.5rem;">Duração: ${module.duration}</p>
        </div>
    `).join('');
    
    document.getElementById('modalModules').innerHTML = modulesHTML;
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('detailsModal');
    modal.classList.remove('active');
    
    // Restaurar scroll do body
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.addEventListener('click', function(event) {
    const modal = document.getElementById('detailsModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .team-card, .approach-card, .benefit-item, .value-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
