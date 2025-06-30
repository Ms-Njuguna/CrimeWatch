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
    spinner.style.display = 'block'; // Shows a loading spinner before the fugitive cards are all loaded

    try {
        fetch('https://api.fbi.gov/wanted/v1/list')
        .then(res => res.json())
        .then(data => {

           const fugitives = data.items;
           allFugitives = fugitives; // Stores fugitives globally

           displayFugitives(fugitives);
           spinner.classList.add('opacity-0'); //fades the spinner
           setTimeout(() => spinner.style.display = 'none', 40); // matches duration it takes to load data
        })
    } catch (error) {
        //let's the user know there's an error if there was an issue fetching the data
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

    //displays a no fugitives found message if there are no more fugitives to display
    if (fugitives.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No fugitives found ...';
        message.classList.add('text-center', 'text-gray-500', 'text-xl', 'py-6');
        listSection.appendChild(message);
        return;
    }

    //for each fugitive, displays according to the innerHTML
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

//function logic for the search bar
function searchForFugitive() {
    const searchInput = document.querySelector('#searchInput')

    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase();
        const searchResult = allFugitives.filter(fugitive => fugitive.title.toLowerCase().includes(searchValue));

        //displays the specific fugitive card that matches the input in the search bar
        displayFugitives(searchResult);
    })
}

//shows a detailed version of a selected fugitive 
function showFugitiveDetails(fugitive) {
    const listSection = document.getElementById('fugitive-list');
    const detailSection = document.getElementById('fugitive-details');

    //checks if the detail section or list sections exist to avoid breaking the app
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

    //clears the section that displays the fugitive cards
    listSection.innerHTML = ``;

    //clears the detailed display and renders the fugitive cards without refreshing the page
    const backButton = document.getElementById('backBtn')
    backButton.addEventListener('click', () => {
        detailSection.innerHTML = ``;
        let fugitives = allFugitives;
        displayFugitives(fugitives);
    });

    const reportButton = document.querySelector('.report-btn');
    reportButton.addEventListener('click', showReportForm);
}

//shows a report form where a user can report a sighting or give information
function showReportForm() {
    const reportFormSection = document.querySelector('#reportFormSection');
    reportFormSection.classList.remove('hidden');
}

//handles the submission of the report sighting form
function submitReport(e) {
    //prevents default behaviour of the form
    e.preventDefault();

    alert('Your report has been successfully submitted');

    //resets form fields
    const reportForm = e.target;
    reportForm.reset();

    //hides the form
    const reportFormSection = document.querySelector('#reportFormSection');
    reportFormSection.classList.add('hidden');

    //hides the detailed fugitive display and renders the fugitive cards display without refreshing the page
    const detailSection = document.getElementById('fugitive-details');
    detailSection.innerHTML = ``;
    
    setTimeout(() => displayFugitives(allFugitives), 0);
}


//handles the cancel button that belongs to the report sighting form
function cancelReport() {
    const cancelReportButton = document.querySelector('#cancelReport')
    cancelReportButton.addEventListener('click', () => {
        //resets the form's input fields
        const reportForm = document.querySelector('#reportForm');
        reportForm.reset();

        //hides the form
        const reportFormSection = document.querySelector('#reportFormSection');
        reportFormSection.classList.add('hidden');
    })
}
