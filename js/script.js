// Menu Hambúrguer
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
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
    document.addEventListener('click', function (event) {
        const isClickInside =
            navMenu.contains(event.target) ||
            menuToggle.contains(event.target);

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

    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

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

    // Contador de caracteres
    if (messageInput && charCounter) {
        messageInput.addEventListener('input', function () {
            const count = this.value.length;
            charCounter.textContent = `${count} / 1000`;

            charCounter.style.color =
                count > 1000
                    ? 'var(--color-error)'
                    : 'var(--color-text-light)';
        });
    }

    contactForm.addEventListener('submit', function (event) {
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
            contactForm.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';

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
    input.addEventListener('blur', function () {
        if (this.id === 'name' && this.value) {
            !validateName(this.value)
                ? showError(this, 'Por favor, insira seu nome completo (mínimo 3 caracteres).')
                : removeError(this);
        }

        if (this.id === 'email' && this.value) {
            !validateEmail(this.value)
                ? showError(this, 'Por favor, insira um email válido.')
                : removeError(this);
        }

        if (this.id === 'message' && this.value) {
            !validateMessage(this.value)
                ? showError(this, 'Por favor, insira uma mensagem (mínimo 10 caracteres).')
                : removeError(this);
        }
    });
});

// Demo Tabs
function showDemo(demoNumber) {
    document.querySelectorAll('.demo-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.demo-content').forEach(content => {
        content.classList.remove('active');
    });

    event.target.classList.add('active');
    document.getElementById(`demo${demoNumber}`).classList.add('active');
}

// Quiz Interativo
let quizAnswers = [];
let quizScores = { DEV: 0, ANA: 0, DES: 0, SUP: 0, GP: 0 };
let currentQuizStep = 1;

const scoringSystem = {
    1: { A: { DEV: 2, ANA: 2 }, B: { SUP: 2, GP: 1 }, C: { DES: 2 } },
    2: { A: { ANA: 2 }, B: { DES: 2 }, C: { SUP: 2 } },
    3: { A: { GP: 2 }, B: { ANA: 1, GP: 1 }, C: { DES: 1, DEV: 1 } },
    4: { A: { DES: 2, DEV: 1 }, B: { SUP: 2 }, C: { GP: 2 }, D: { ANA: 2 } },
    5: { A: { DEV: 2, ANA: 1 }, B: { DES: 2 }, C: { ANA: 2 }, D: { SUP: 2 }, E: { GP: 2 } },
    6: { A: { DEV: 2 }, B: { DES: 2 }, C: { ANA: 2 }, D: { SUP: 2 }, E: { GP: 2 } },
    7: { A: { DEV: 2, ANA: 1 }, B: { DES: 2 }, C: { ANA: 2 }, D: { SUP: 2 }, E: { GP: 2 } },
    8: { A: { DEV: 1, ANA: 1 }, B: { DES: 2 }, C: { ANA: 2 }, D: { SUP: 2 }, E: { GP: 2 } },
    9: { A: { DEV: 2 }, B: { DES: 2 }, C: { ANA: 2 }, D: { SUP: 2 }, E: { GP: 2 } },
    10: { A: { DEV: 2 }, B: { DES: 2 }, C: { ANA: 2 }, D: { SUP: 2 }, E: { GP: 2 } },
    11: { A: { DEV: 2 }, B: { DES: 2 }, C: { ANA: 2 }, D: { SUP: 2 }, E: { GP: 2 } },
    12: { A: { DEV: 2 }, B: { DES: 2 }, C: { ANA: 2 }, D: { SUP: 2 }, E: { GP: 2 } }
};

function selectAnswer(step, answer) {
    if (quizAnswers[step - 1]) {
        return;
    }

    quizAnswers[step - 1] = answer;

    const points = scoringSystem[step][answer];

    if (points) {
        for (let profile in points) {
            quizScores[profile] += points[profile];
        }
    }

    const currentStepEl = document.getElementById(`step${step}`);
    const buttons = currentStepEl.querySelectorAll('.quiz-option');

    buttons.forEach(btn => {
        btn.disabled = true;

        if (btn.onclick.toString().includes(`'${answer}'`)) {
            btn.style.borderColor = 'var(--color-primary)';
            btn.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
        }
    });

    setTimeout(() => {
        currentStepEl.classList.remove('active');

        if (step < 12) {
            currentQuizStep = step + 1;
            document.getElementById(`step${currentQuizStep}`).classList.add('active');

            const progress = (currentQuizStep / 12) * 100;
            document.getElementById('progressFill').style.width = `${progress}%`;
            document.getElementById('currentStep').textContent = currentQuizStep;
        } else {
            showQuizResults();
            document.getElementById('progressIndicator').style.display = 'none';
        }
    }, 300);
}

function showQuizResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';

    let maxScore = 0;
    let winningProfile = '';

    for (let profile in quizScores) {
        if (quizScores[profile] > maxScore) {
            maxScore = quizScores[profile];
            winningProfile = profile;
        }
    }

    const profileData = {
        DEV: {
            title: '💻 Desenvolvedor (DEV)',
            description: 'Você tem um perfil técnico e lógico! Adora trabalhar com códigos, resolver problemas complexos e criar soluções através da programação. Sua mente analítica e gosto por desafios técnicos fazem de você um desenvolvedor em potencial.',
            path: 'Desenvolvimento Full Stack',
            careers: ['Desenvolvedor Front-end', 'Desenvolvedor Back-end', 'Desenvolvedor Full Stack', 'Engenheiro de Software'],
            skills: ['HTML, CSS e JavaScript', 'Frameworks modernos (React, Vue, Angular)', 'Node.js e APIs RESTful', 'Bancos de dados (SQL e NoSQL)', 'Versionamento com Git']
        },
        ANA: {
            title: '📊 Analista de Dados (ANA)',
            description: 'Você tem perfil analítico e orientado a dados! Gosta de encontrar padrões, trabalhar com números e transformar dados em insights valiosos. Sua capacidade de análise e pensamento estruturado são ideais para ciência de dados.',
            path: 'Ciência de Dados e Analytics',
            careers: ['Analista de Dados', 'Cientista de Dados', 'Analista de Business Intelligence', 'Engenheiro de Machine Learning'],
            skills: ['Python e R para análise de dados', 'SQL e bancos de dados', 'Estatística e probabilidade', 'Machine Learning e IA', 'Visualização de dados (Power BI, Tableau)']
        },
        DES: {
            title: '🎨 Designer (DES)',
            description: 'Você tem perfil criativo e visual! Adora criar experiências, trabalhar com design e pensar em soluções inovadoras. Sua criatividade e senso estético fazem de você um designer nato.',
            path: 'UX/UI Design',
            careers: ['Designer UX', 'Designer UI', 'Product Designer', 'Designer de Interfaces', 'Designer de Experiência'],
            skills: ['Princípios de design e tipografia', 'Ferramentas (Figma, Adobe XD, Sketch)', 'User Research e testes de usabilidade', 'Prototipagem e wireframing', 'Design Systems e acessibilidade']
        },
        SUP: {
            title: '🤝 Suporte/Atendimento (SUP)',
            description: 'Você tem perfil comunicativo e orientado a pessoas! Gosta de ajudar, resolver problemas rapidamente e manter contato direto com usuários. Sua empatia e habilidade de comunicação são perfeitas para suporte técnico.',
            path: 'Suporte Técnico e Customer Success',
            careers: ['Analista de Suporte', 'Customer Success', 'Technical Support Specialist', 'Help Desk Analyst'],
            skills: ['Comunicação efetiva', 'Resolução de problemas', 'Conhecimentos técnicos básicos', 'Ferramentas de helpdesk', 'Gestão de relacionamento com clientes']
        },
        GP: {
            title: '📋 Gerente de Projetos (GP)',
            description: 'Você tem perfil organizador e estratégico! Gosta de planejar, coordenar equipes e garantir que tudo funcione harmoniosamente. Sua capacidade de organização e liderança são ideais para gestão de projetos.',
            path: 'Gestão de Projetos em Tecnologia',
            careers: ['Gerente de Projetos', 'Scrum Master', 'Product Owner', 'Agile Coach', 'Project Manager'],
            skills: ['Metodologias ágeis (Scrum, Kanban)', 'Gestão de equipes', 'Ferramentas de projeto (Jira, Trello)', 'Comunicação e liderança', 'Planejamento estratégico']
        }
    };

    const profile = profileData[winningProfile];

    document.getElementById('profileTitle').textContent = profile.title;

    document.getElementById('profileDescription').innerHTML =
        `<p>${profile.description}</p>`;

    document.getElementById('pathSummary').innerHTML = `
        <p><strong>${profile.path}</strong></p>
        <p>Trilha completa desde fundamentos até especialização avançada.</p>
    `;

    document.getElementById('careerSummary').innerHTML = `
        <ul>
            ${profile.careers.map(career => `<li>${career}</li>`).join('')}
        </ul>
    `;

    document.getElementById('skillsSummary').innerHTML = `
        <ul>
            ${profile.skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;

    window.selectedProfile = winningProfile;
}

function resetQuiz() {
    quizAnswers = [];
    quizScores = { DEV: 0, ANA: 0, DES: 0, SUP: 0, GP: 0 };
    currentQuizStep = 1;

    document.getElementById('results').style.display = 'none';

    document.querySelectorAll('.quiz-step').forEach(step => {
        step.classList.remove('active');

        step.querySelectorAll('.quiz-option').forEach(btn => {
            btn.disabled = false;
            btn.style.borderColor = '';
            btn.style.backgroundColor = '';
        });
    });

    document.getElementById('step1').classList.add('active');

    document.getElementById('progressIndicator').style.display = 'block';
    document.getElementById('progressFill').style.width = '8.33%';
    document.getElementById('currentStep').textContent = '1';
}

// Modal
function openModal() {
    const modal = document.getElementById('detailsModal');
    modal.classList.add('active');

    const modules = {
        DEV: [
            { title: 'Fundamentos de HTML e CSS', duration: '3 semanas' },
            { title: 'JavaScript Moderno (ES6+)', duration: '4 semanas' },
            { title: 'React.js e Componentes', duration: '4 semanas' },
            { title: 'Node.js e Express', duration: '3 semanas' },
            { title: 'Bancos de Dados SQL e NoSQL', duration: '3 semanas' },
            { title: 'APIs RESTful e GraphQL', duration: '2 semanas' },
            { title: 'Testes e Deploy', duration: '2 semanas' },
            { title: 'Projeto Full Stack', duration: '3 semanas' }
        ],
        ANA: [
            { title: 'Python Fundamentals', duration: '3 semanas' },
            { title: 'Pandas e Análise de Dados', duration: '4 semanas' },
            { title: 'SQL e Bancos de Dados', duration: '3 semanas' },
            { title: 'Estatística e Probabilidade', duration: '4 semanas' },
            { title: 'Machine Learning com Scikit-learn', duration: '5 semanas' },
            { title: 'Data Visualization (Matplotlib, Seaborn)', duration: '2 semanas' },
            { title: 'Power BI e Tableau', duration: '3 semanas' },
            { title: 'Projeto de Análise Completo', duration: '3 semanas' }
        ],
        DES: [
            { title: 'Fundamentos de Design', duration: '2 semanas' },
            { title: 'Tipografia e Teoria das Cores', duration: '2 semanas' },
            { title: 'Figma Avançado', duration: '3 semanas' },
            { title: 'User Research e Personas', duration: '3 semanas' },
            { title: 'Wireframing e Prototipagem', duration: '3 semanas' },
            { title: 'UI Design e Microinterações', duration: '4 semanas' },
            { title: 'Design Systems', duration: '3 semanas' },
            { title: 'Portfolio Profissional', duration: '2 semanas' }
        ],
        SUP: [
            { title: 'Fundamentos de Tecnologia', duration: '2 semanas' },
            { title: 'Sistemas Operacionais', duration: '3 semanas' },
            { title: 'Redes e Conectividade', duration: '3 semanas' },
            { title: 'Técnicas de Atendimento', duration: '2 semanas' },
            { title: 'Ferramentas de Helpdesk', duration: '2 semanas' },
            { title: 'Troubleshooting Avançado', duration: '3 semanas' },
            { title: 'Customer Success', duration: '3 semanas' },
            { title: 'Certificações Técnicas', duration: '4 semanas' }
        ],
        GP: [
            { title: 'Fundamentos de Gestão', duration: '2 semanas' },
            { title: 'Metodologias Ágeis (Scrum, Kanban)', duration: '4 semanas' },
            { title: 'Ferramentas de Gestão (Jira, Trello)', duration: '2 semanas' },
            { title: 'Comunicação e Liderança', duration: '3 semanas' },
            { title: 'Gestão de Conflitos', duration: '2 semanas' },
            { title: 'Planejamento Estratégico', duration: '3 semanas' },
            { title: 'KPIs e Métricas', duration: '2 semanas' },
            { title: 'Certificação PMP/Scrum Master', duration: '4 semanas' }
        ]
    };

    const selectedProfile = window.selectedProfile || 'DEV';
    const selectedModules = modules[selectedProfile];

    const modulesHTML = selectedModules
        .map(
            (module, index) => `
        <div style="padding: 1rem; background-color: var(--color-bg-alt); margin-bottom: 1rem; border-radius: 8px; border-left: 4px solid var(--color-primary);">
            <strong>Módulo ${index + 1}: ${module.title}</strong>
            <p style="color: var(--color-text-light); margin-top: 0.5rem;">
                Duração: ${module.duration}
            </p>
        </div>
    `
        )
        .join('');

    document.getElementById('modalModules').innerHTML = modulesHTML;

    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('detailsModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.addEventListener('click', function (event) {
    const modal = document.getElementById('detailsModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Scroll suave
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

// Animação de entrada
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .team-card, .approach-card, .benefit-item, .value-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        observer.observe(el);
    });
});
