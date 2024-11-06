// Sidebar
const menuItems = document.querySelectorAll('.menu-item');

// Messages
const messageNotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

// Theme
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
const root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');

// ================== Sidebar ==================

// Remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
};

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if (item.id !== 'notifications') {
            document.querySelector('.notifications-popup').style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    });
});

// ================== Messages ==================
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    localStorage.setItem('messageSearchValue', val);

    message.forEach(user => {
        let name = user.querySelector('h5').textContent.toLowerCase();
        user.style.display = name.indexOf(val) !== -1 ? 'flex' : 'none';
    });
};

window.addEventListener('load', () => {
    const savedSearchValue = localStorage.getItem('messageSearchValue');
    if (savedSearchValue) {
        messageSearch.value = savedSearchValue;
        searchMessage();
    }
});

messageSearch.addEventListener('keyup', searchMessage);

messageNotification.addEventListener('click', () => {
    messages.style.boxShadow = `0 0 1rem var(--color-primary)`;
    messageNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
});

// ================== Theme and Display Customization ==================

// Opens modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
};

// Closes modal
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
};

// Close modal
themeModal.addEventListener('click', closeThemeModal);
theme.addEventListener('click', openThemeModal);

// Remove active class from spans or font size selectors
const removeSizeSelectors = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    });
};

// ================== Fonts ==================
fontSizes.forEach(size => {
    size.addEventListener('click', () => {
        removeSizeSelectors();
        let fontSize;
        size.classList.toggle('active');

        if (size.classList.contains('font-size-1')) {
            fontSize = '10px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '5.4rem');
        } else if (size.classList.contains('font-size-2')) {
            fontSize = '13px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '-7rem');
        } else if (size.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('--sticky-top-left', '-2rem');
            root.style.setProperty('--sticky-top-right', '-17rem');
        } else if (size.classList.contains('font-size-4')) {
            fontSize = '19px';
            root.style.setProperty('--sticky-top-left', '-5rem');
            root.style.setProperty('--sticky-top-right', '-25rem');
        } else if (size.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('--sticky-top-left', '-12rem');
            root.style.setProperty('--sticky-top-right', '-35rem');
        }

        document.querySelector('html').style.fontSize = fontSize;
    });
});

// ================== Colors ==================
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    });
};

colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primaryHue;
        changeActiveColorClass();

        if (color.classList.contains('color-1')) {
            primaryHue = 197;
        } else if (color.classList.contains('color-2')) {
            primaryHue = 52;
        } else if (color.classList.contains('color-3')) {
            primaryHue = 352;
        } else if (color.classList.contains('color-4')) {
            primaryHue = 152;
        } else if (color.classList.contains('color-5')) {
            primaryHue = 202;
        }
        color.classList.add('active');

        root.style.setProperty('--primary-color-hue', primaryHue);
        localStorage.setItem('primaryHue', primaryHue);
    });
});

// ================== Theme Background ==================
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
    localStorage.setItem('lightColorLightness', lightColorLightness);
    localStorage.setItem('whiteColorLightness', whiteColorLightness);
    localStorage.setItem('darkColorLightness', darkColorLightness);
};

Bg1.addEventListener('click', () => {
    Bg1.classList.add('active');
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');

    lightColorLightness = '95%';
    whiteColorLightness = '100%';
    darkColorLightness = '17%';
    changeBG();
    window.location.reload();
});

Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    Bg2.classList.add('active');
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
});

Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    Bg3.classList.add('active');
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();
});

// Load background settings from local storage
const loadBackgroundSettings = () => {
    lightColorLightness = localStorage.getItem('lightColorLightness') || '95%';
    whiteColorLightness = localStorage.getItem('whiteColorLightness') || '100%';
    darkColorLightness = localStorage.getItem('darkColorLightness') || '17%';
    changeBG();
};

window.addEventListener('load', () => {
    loadBackgroundSettings();
    const savedPrimaryHue = localStorage.getItem('primaryHue') || 197;
    root.style.setProperty('--primary-color-hue', savedPrimaryHue);
});

// Post button
document.getElementById('postButton').addEventListener('click', function(event) {
    event.preventDefault();

    const sound = document.getElementById('sound');
    sound.play();

    const message = document.getElementById('post-message');
    message.style.display = 'block';

    setTimeout(function() {
        message.style.display = 'none';
    }, 3500);
});


// Save color selection to local storage
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primaryHue;
        // remove active class from colors
        changeActiveColorClass();

        if (color.classList.contains('color-1')) {
            primaryHue = 252;
        } else if (color.classList.contains('color-2')) {
            primaryHue = 52;
        } else if (color.classList.contains('color-3')) {
            primaryHue = 352;
        } else if (color.classList.contains('color-4')) {
            primaryHue = 152;
        } else if (color.classList.contains('color-5')) {
            primaryHue = 202;
        }
        color.classList.add('active');

        root.style.setProperty('--primary-color-hue', primaryHue);

        // Save to local storage
        localStorage.setItem('primaryHue', primaryHue);
    });
});

// Load settings on page load
window.addEventListener('load', () => {
    loadBackgroundSettings();
    loadColorSettings();
});

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            
            // Используем внешнее API, например, OpenStreetMap или Google Maps, чтобы получить город/страну по координатам
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                .then(response => response.json())
                .then(data => {
                    // Отображаем название города и страны
                    const locationElement = document.getElementById('location');
                    locationElement.textContent = `${data.address.city}, ${data.address.country}`;
                })
                .catch(error => {
                    console.error('Error getting location:', error);
                });
        },
        (error) => {
            console.error('Couldn not get the location:', error);
        }
    );
} else {
    console.error("Geolocation API не поддерживается в этом браузере.");
}
