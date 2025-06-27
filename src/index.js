//to make sure the DOM loads first before any function is executed
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    fetchFugitiveData();
    searchForFugitive()
})


let allFugitives = []; // stores the original list of fugitives globally


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


//the idea is to create fugitive cards that show name, image, and details

function displayFugitives(fugitives) {
    const listSection = document.getElementById('fugitive-list');
    const detailSection = document.getElementById('fugitive-details');
    listSection.innerHTML = ''; // 💥 Clear previous fugitive cards

    if (fugitives.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No fugitives found ...';
        message.classList.add('text-center', 'text-gray-500', 'text-xl', 'py-6');
        listSection.appendChild(message);
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
            <button class="mt-4 text-blue-600 hover:underline see-details-btn">See Full Details</button>
            <button class="report-btn">Report Sighting</button>
        `

        listSection.appendChild(fugitiveCard)
        console.log(fugitiveCard);

        fugitiveCard.querySelector('.see-details-btn').addEventListener('click', () => showFugitiveDetails(fugitive))
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

function showFugitiveDetails(fugitive) {
    const listSection = document.getElementById('fugitive-list');
    const detailSection = document.getElementById('fugitive-details');

    detailSection.innerHTML = `
        <div class="bg-white p-6 rounded shadow">
            <button id="backBtn" class="mb-4 text-blue-600 hover:underline"> ← Back to List </button>
            <h1 class="text-2xl font-bold mb-4">${fugitive.title}</h1>
            <img src="${fugitive.images?.[0]?.original}" alt="${fugitive.title}" class="w-full max-h-[500px] object-contain mb-4 rounded mx-auto">
            <h2 class="text-2xl text-red-500 font-bold mb-4">WANTED</h2>
            <ul class="mb-4">
                <li><strong>Race:</strong> ${fugitive.race || 'N/A'}</li>
                <li><strong>Sex:</strong> ${fugitive.sex || 'N/A'}</li>
            </ul>
            <p class="mb-2">${fugitive.remarks || ''}</p>
            <p><strong>Reward:</strong> ${fugitive.reward_text || 'No reward info'}</p>
            <p><strong>Warning:</strong> ${fugitive.warning_message || 'N/A'}</p>
        </div>
    `;

    listSection.classList.add('hidden');
    detailSection.classList.remove('hidden');

    document.getElementById('backBtn').addEventListener('click', () => {
        detailSection.classList.add('hidden');
        listSection.classList.remove('hidden');
    });
}