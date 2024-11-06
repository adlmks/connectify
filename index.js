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
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');

// ================== Sidebar ==================

// remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if (item.id != 'notifications') {
            document.querySelector('.notifications-popup').style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})

// ================== Messages ==================
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    localStorage.setItem('messageSearchValue', val);

    message.forEach(user => {
        let name = user.querySelector('h5').textContent.toLowerCase();
        user.style.display = name.indexOf(val) != -1 ? 'flex' : 'none';
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
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messageNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
});

// ================== Theme and Display Customization ==================

// opens modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

// closes modal
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
}

// close modal
themeModal.addEventListener('click', closeThemeModal);

theme.addEventListener('click', openThemeModal)

// remove active class from spans or font size selectors
const removeSizeSelectors = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    })
}

// ================== Fonts ==================
fontSizes.forEach(size => {
    size.addEventListener('click', () => {
        removeSizeSelectors();
        let fontSize;
        size.classList.toggle('active');

        if (size.classList.contains('font-size-1')) {
            fontSize = '10px';
            root.style.setProperty('--sticky-top-left', '5.4rem')
            root.style.setProperty('--sticky-top-right', '5.4rem')
        } else if (size.classList.contains('font-size-2')) {
            fontSize = '13px';
            root.style.setProperty('--sticky-top-left', '5.4rem')
            root.style.setProperty('--sticky-top-right', '-7rem')
        } else if (size.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('--sticky-top-left', '-2rem')
            root.style.setProperty('--sticky-top-right', '-17rem')
        } else if (size.classList.contains('font-size-4')) {
            fontSize = '19px';
            root.style.setProperty('--sticky-top-left', '-5rem')
            root.style.setProperty('--sticky-top-right', '-25rem')
        } else if (size.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('--sticky-top-left', '-12rem')
            root.style.setProperty('--sticky-top-right', '-35rem')
        }

        // change font size of the root html element
        document.querySelector('html').style.fontSize = fontSize;
    })
})

// remove active class from colors
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}

// change primary colors
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primary;
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
    })
})

// Theme background
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// Function to apply background colors from local storage
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
};

// Load background settings from local storage
const loadBackgroundSettings = () => {
    lightColorLightness = localStorage.getItem('lightColorLightness') || '95%'; // Default value
    whiteColorLightness = localStorage.getItem('whiteColorLightness') || '100%'; // Default value
    darkColorLightness = localStorage.getItem('darkColorLightness') || '17%'; // Default value
    changeBG();
};

Bg1.addEventListener('click', () => {
    // add active class
    Bg1.classList.add('active');
    // remove active class
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');

    // Reset background colors and save to local storage
    lightColorLightness = '100%';
    whiteColorLightness = '100%';
    darkColorLightness = '0%';
    changeBG();

    // Save to local storage
    localStorage.setItem('lightColorLightness', lightColorLightness);
    localStorage.setItem('whiteColorLightness', whiteColorLightness);
    localStorage.setItem('darkColorLightness', darkColorLightness);

    window.location.reload();
});

Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // add active class
    Bg2.classList.add('active');
    // remove active class
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();

    // Save to local storage
    localStorage.setItem('lightColorLightness', lightColorLightness);
    localStorage.setItem('whiteColorLightness', whiteColorLightness);
    localStorage.setItem('darkColorLightness', darkColorLightness);
});

Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // add active class
    Bg3.classList.add('active');
    // remove active class
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();

    // Save to local storage
    localStorage.setItem('lightColorLightness', lightColorLightness);
    localStorage.setItem('whiteColorLightness', whiteColorLightness);
    localStorage.setItem('darkColorLightness', darkColorLightness);
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

// Load color settings from local storage
const loadColorSettings = () => {
    const savedPrimaryHue = localStorage.getItem('primaryHue') || 252; // Default value
    root.style.setProperty('--primary-color-hue', savedPrimaryHue);
};

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
