function updateDateTime() {
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    const greetingElement = document.getElementById('greeting');
    const now = new Date();

    if (now.getHours() >= 0 && now.getHours() < 12) {
        greetingElement.innerHTML = 'Good morning!';
    }
    else if (now.getHours() >= 12 && now.getHours() < 18) {
        greetingElement.innerHTML = 'Good afternoon!';
    }
    else {
        greetingElement.innerHTML = 'Good evening!';
    }

    dateElement.innerHTML = `${now.getDate()} ${now.toLocaleDateString('en-US', { month: 'long' })} ${now.getFullYear()}`;
    timeElement.innerHTML = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

function switchToDarkMode(is_bottom_dark){
    div = document.getElementById("main");
    div.style.color = '#0f0f0f';
    links = document.getElementsByClassName("link");

    for(let i = 0; i < links.length; i++){
        links[i].style.color = '#0f0f0f';
    }

    if(is_bottom_dark){     // if light pages have a dark bottom section
        document.getElementById("hostname").style.color = '#f5deb3'
    } else {
        document.getElementById("hostname").style.color = '#0f0f0f'
    }
}

function setBackground(){
    const num_pngs = 12, num_jpgs = 14;     // set with personal number of pngs and jpgs
    let randomIndex = 0, image_path, dark_mode_indexes;
    const is_png = Math.floor(Math.random() * 2);   // 1 means png
    if(is_png){
        randomIndex = (Math.floor(Math.random() * num_pngs))+1;  // getting random index for image
        image_path = `${randomIndex}.png`
        dark_mode_indexes = [1,2,3]      // pngs that need dark mode
        if(dark_mode_indexes.includes(randomIndex)){
            switchToDarkMode(randomIndex == 9 ? true : false);  // example of png that has darker bottom section
        }
    } else {
        randomIndex = (Math.floor(Math.random() * num_jpgs))+1;
        image_path = `${randomIndex}.jpg`
        dark_mode_indexes = [1,2,3]      // jpgs that need dark mode
        if(dark_mode_indexes.includes(randomIndex)){
            switchToDarkMode(false);
        }
    }
    
    div = document.getElementById("main");
    div.style.backgroundImage = `url(assets/images/${image_path})`
}


setInterval(updateDateTime, 1000); // Update every second

// Initial call to display the time immediately on load
updateDateTime();

document.addEventListener('DOMContentLoaded', () => {
    const consoleInput = document.getElementById('console-input');

    consoleInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const query = consoleInput.value.trim();
            if (query) {
                const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
                window.open(searchUrl, '_blank');
                consoleInput.value = '';
            }
        }
    });
});


fetch("favourites.json")
    .then(response => response.json())
    .then(data => {
        const favourites = data.favourites;

        const favouritesWrapper = document.getElementById('favouritesWrapper');
        const favouriteTemplate = document.getElementsByClassName('favourite')[0].cloneNode(true);
        document.getElementsByClassName('favourite')[0].remove();
       
        favourites.forEach(fav => {
            const favouriteElement = favouriteTemplate.cloneNode(true);
            favouriteElement.getElementsByClassName('favouriteName')[0].innerHTML = `<i class="fab ${fav.icon}"></i> ${fav.name}`;
            favouriteElement.getElementsByClassName('favouriteName')[0].href = fav.link;
            favouritesWrapper.appendChild(favouriteElement);
        });

        const services = data.services;

        const servicesWrapper = document.getElementById('servicesWrapper');
        const serviceTemplate = document.getElementsByClassName('service')[0].cloneNode(true);
        document.getElementsByClassName('service')[0].remove();
       
        services.forEach(ser => {
            const serviceElement = serviceTemplate.cloneNode(true);
            serviceElement.getElementsByClassName('serviceName')[0].innerHTML = `<i class="${fav.icon}"></i> ${fav.name}`;
            serviceElement.getElementsByClassName('serviceName')[0].href = ser.link;
            servicesWrapper.appendChild(serviceElement);
        });
    })
    .catch(error => console.error(error));