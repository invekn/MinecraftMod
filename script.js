// Загрузочный экран
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    
    // Симуляция загрузки
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // Завершение загрузки
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    initAnimations();
                }, 500);
            }, 500);
        }
        loadingProgress.style.width = `${progress}%`;
    }, 100);
});

// Инициализация анимаций
function initAnimations() {
    // Анимация статистики
    animateStats();
    
    // Анимация карточек при скролле
    observeElements();
    
    // Инициализация навигации
    initNavigation();
    
    // Инициализация модальных окон
    initModals();
    
    // Кнопка "наверх"
    initBackToTop();
    
    // Эффекты при наведении
    initHoverEffects();
}

// Анимация статистики
function animateStats() {
    const statCounts = document.querySelectorAll('.stat-count');
    
    statCounts.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}

// Наблюдатель за элементами
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    document.querySelectorAll('.mod-card, .step').forEach(el => {
        observer.observe(el);
    });
}

// Навигация
function initNavigation() {
    const navItems = document.querySelectorAll('.hotbar-slot');
    const sections = document.querySelectorAll('.section');
    
    // Плавная прокрутка
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Удаляем активный класс у всех
                navItems.forEach(nav => nav.classList.remove('active'));
                // Добавляем активный класс текущему
                item.classList.add('active');
                
                // Прокрутка
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Активная навигация при скролле
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Модальные окна
function initModals() {
    const modal = document.getElementById('downloadModal');
    const downloadBtns = document.querySelectorAll('.download-btn');
    const closeModal = document.querySelector('.close-modal');
    const confirmDownload = document.querySelector('.confirm-download');
    const versionOptions = document.querySelectorAll('.version-option');
    
    let selectedMod = '';
    let selectedVersion = '';
    
    // Открытие модального окна
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedMod = btn.getAttribute('data-mod');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Выбор версии
    versionOptions.forEach(option => {
        option.addEventListener('click', () => {
            versionOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            selectedVersion = option.getAttribute('data-version');
        });
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Клик вне модального окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Подтверждение скачивания
    confirmDownload.addEventListener('click', () => {
        if (!selectedVersion) {
            alert('Пожалуйста, выберите версию Minecraft');
            return;
        }
        
        // Здесь будет логика скачивания
        alert(`Начинается скачивание мода "${selectedMod}" для Minecraft ${selectedVersion}`);
        
        // Закрываем модальное окно
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Сброс выбора
        versionOptions.forEach(opt => opt.classList.remove('active'));
        selectedVersion = '';
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Кнопка "наверх"
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Эффекты при наведении
function initHoverEffects() {
    // Эффект для карточек
    const modCards = document.querySelectorAll('.mod-card');
    
    modCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.mod-icon i');
            const icons = ['fa-dragon', 'fa-industry', 'fa-hat-wizard', 'fa-gem', 'fa-tools'];
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            
            // Временная смена иконки
            const originalIcon = icon.className;
            icon.className = `fas ${randomIcon}`;
            
            setTimeout(() => {
                icon.className = originalIcon;
            }, 300);
        });
    });
    
    // Эффект для кнопок
    const buttons = document.querySelectorAll('.minecraft-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Эффект клика
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Звуковой эффект (опционально)
            playClickSound();
        });
    });
}

// Звуковые эффекты (опционально)
function playClickSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Аудио не поддерживается');
    }
}

// Динамическое обновление статистики
function updateStats() {
    // Здесь можно добавить API запросы для получения реальной статистики
    setInterval(() => {
        const downloadCount = document.querySelector('.stat-count[data-count="1254"]');
        const current = parseInt(downloadCount.textContent.replace(/,/g, ''));
        const increment = Math.floor(Math.random() * 10);
        downloadCount.textContent = (current + increment).toLocaleString();
    }, 10000);
}

// Запуск обновления статистики
setTimeout(updateStats, 5000);

// Добавление CSS для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mod-card, .step {
        opacity: 0;
    }
    
    .mod-card.animate-in, .step.animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .mod-card:nth-child(1) { animation-delay: 0.1s; }
    .mod-card:nth-child(2) { animation-delay: 0.2s; }
    .mod-card:nth-child(3) { animation-delay: 0.3s; }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .hotbar-slot.active i {
        animation: pulse 2s infinite;
    }
    
    @keyframes blockRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .dirt-block:hover, .grass-block:hover {
        animation: blockRotate 2s linear infinite;
    }
`;
document.head.appendChild(style);
