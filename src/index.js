
//to make sure the DOM loads first before any function is executed
document.addEventListener('DOMContentLoaded', () => {
    fetchFugitiveData();
    searchForFugitive();
    cancelReport();
    const reportForm = document.querySelector('#reportForm');
    reportForm.addEventListener('submit', submitReport);
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
           allFugitives = fugitives; // Stores fugitives globally

           displayFugitives(fugitives);
           spinner.classList.add('opacity-0');
           setTimeout(() => spinner.style.display = 'none', 40); // matches duration it takes to load data
        })
    } catch (error) {
        alert('There was an error fetching the fugitives')
        console.log("Failed to fetch fugitives:",error);
        spinner.classList.add('opacity-0');
        setTimeout(() => spinner.style.display = 'none', 40); // matches duration it takes to load data
    }
}


//the idea is to create fugitive cards that show name, image, and details

function displayFugitives(fugitives) {
    const listSection = document.getElementById('fugitive-list');
    listSection.innerHTML = ``; // Clears previous fugitive cards

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
            <img src="${fugitive.images?.[0]?.original || './images/placeholder.png'}"
            alt="${fugitive.title}"
            class="w-full max-h-[200px] object-cover rounded mb-3"/>
            <div class="fugitive-info">
                <h2>${fugitive.title}</h2>
                <p>${fugitive.description}</p>
            </div>
            <div class="fugitive-details">
                <p>${fugitive.warning_message}</p>
                <p>${fugitive.reward_text}</p>
            </div>
            <button class="mt-4 text-blue-600 hover:underline see-details-btn">See Full Details</button>
        `

        listSection.appendChild(fugitiveCard)
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

    if (!detailSection || !listSection) {
        console.error("Missing DOM elements: fugitive-details or fugitive-list");
        return;
    }

    detailSection.innerHTML = `
        <div class="bg-white p-6 rounded shadow">
            <button id="backBtn" class="mb-4 text-blue-600 hover:underline"> ← Back to List </button>
            <h1 class="text-2xl font-bold mb-4">${fugitive.title}</h1>
            <img src="${fugitive.images?.[0]?.original || './images/placeholder.png'}"
            alt="${fugitive.title}"
            class="w-full max-h-[200px] object-cover rounded mb-3"/>
            <h2 class="text-2xl text-red-500 font-bold mb-4">WANTED</h2>
            <ul class="mb-4">
                <li><strong>Race:</strong> ${fugitive.race || 'N/A'}</li>
                <li><strong>Sex:</strong> ${fugitive.sex || 'N/A'}</li>
            </ul>
            <p class="mb-2">${fugitive.remarks || ''}</p>
            <p><strong>Reward:</strong> ${fugitive.reward_text || 'No reward info'}</p>
            <p><strong>Warning:</strong> ${fugitive.warning_message || 'N/A'}</p>
            <button class="report-btn">Report Sighting</button>
        </div>
    `;

    listSection.innerHTML = ``;

    const backButton = document.getElementById('backBtn')
    backButton.addEventListener('click', () => {
        detailSection.innerHTML = ``;
        let fugitives = allFugitives;
        displayFugitives(fugitives);
    });

    const reportButton = document.querySelector('.report-btn');
    reportButton.addEventListener('click', showReportForm);
}

function showReportForm() {
    const reportFormSection = document.querySelector('#reportFormSection');
    reportFormSection.classList.remove('hidden');
}


function submitReport(e) {
    
    e.preventDefault();

    alert('Your report has been successfully submitted');

    const reportForm = e.target;
    reportForm.reset();

    const reportFormSection = document.querySelector('#reportFormSection');
    reportFormSection.classList.add('hidden');

    const detailSection = document.getElementById('fugitive-details');
    detailSection.innerHTML = ``;
    
    setTimeout(() => displayFugitives(allFugitives), 0);
}

function cancelReport() {
    const cancelReportButton = document.querySelector('#cancelReport')
    cancelReportButton.addEventListener('click', () => {
        const reportForm = document.querySelector('#reportForm');
        reportForm.reset();
        
        const reportFormSection = document.querySelector('#reportFormSection');
        reportFormSection.classList.add('hidden');
    })
}
