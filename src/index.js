
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