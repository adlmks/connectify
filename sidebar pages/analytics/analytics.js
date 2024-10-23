const faqs = document.querySelectorAll(".faq");

// Функция для обновления состояния FAQ в localStorage
const updateLocalStorage = () => {
    const activeFaqs = Array.from(faqs).map((faq, index) => {
        return faq.classList.contains("active") ? index : null;
    }).filter(index => index !== null);

    localStorage.setItem('activeFaqs', JSON.stringify(activeFaqs));
};

// Функция для загрузки состояния FAQ из localStorage
const loadActiveFaqs = () => {
    const savedActiveFaqs = JSON.parse(localStorage.getItem('activeFaqs')) || [];
    savedActiveFaqs.forEach(index => {
        faqs[index].classList.add("active");
    });
};

// Добавление обработчиков событий для каждого FAQ
faqs.forEach((faq, index) => {
    faq.addEventListener("click", () => {
        faq.classList.toggle("active");
        updateLocalStorage(); 
    });
});

// Загружаем активные FAQ при загрузке страницы
window.addEventListener("load", loadActiveFaqs);
