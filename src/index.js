let allFugitives = []; // store the original list globally


//fetch fugitive data from the FBI most wanted public API

function fetchFugitiveData() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block'; // Shows the loading spinner

    try {
        fetch('https://api.fbi.gov/wanted/v1/list')
        .then(res => res.json())
        .then(data => {

           const fugitives = data.items;
           console.log(fugitives);
           allFugitives = fugitives; // 💾 Store globally

           displayFugitives(fugitives);
        })
    } catch (error) {
        alert('There was an error fetching the fugitives')
        console.log("Failed to fetch fugitives:",error);
    }
}

fetchFugitiveData();


//the idea is to create fugitive cards that show name, image, and details

function displayFugitives(fugitives) {
    const mainSection = document.querySelector('main')
    mainSection.innerHTML = ''; // 💥 Clear previous fugitive cards

    if (fugitives.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No fugitives found ...';
        message.classList.add('text-center', 'text-gray-500', 'text-xl', 'py-6');
        mainSection.appendChild(message);
        return;
    }

    fugitives.forEach(fugitive => {
        const fugitiveCard = document.createElement('div')
        fugitiveCard.classList.add('fugitive-card');
        fugitiveCard.innerHTML = `
            <img src="${fugitive.images[0].original}" alt="${fugitive.title}">
            <div class="fugitive-info">
                <h2>${fugitive.title}</h2>
                <p>${fugitive.description}</p>
            </div>
            <div class="fugitive-details">
                <p>${fugitive.warning_message}</p>
                <p>${fugitive.reward_text}</p>
            </div>
            <button class="report-btn">Report Sighting</button>
        `

        mainSection.appendChild(fugitiveCard)
        console.log(fugitiveCard);
    });
}


function searchForFugitive() {
    const searchInput = document.querySelector('#searchInput')

    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase();
        const searchResult = allFugitives.filter(fugitive => fugitive.title.toLowerCase().includes(searchValue));

        displayFugitives(searchResult);
       
    })
}

searchForFugitive()