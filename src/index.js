
//fetch fugitive data from the FBI most wanted public API

function fetchFugitiveData() {
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


//the idea is to create fugitive cards that show name, image, and details

function displayFugitives(fugitives) {
    const mainSection = document.querySelector('main')

    fugitives.forEach(fugitive => {
        const fugitiveCard = document.createElement('div')
        fugitiveCard.innerHTML = `
            <img src="${fugitive.images[0]}" alt="${fugitive.title}">
            <div>
                <h2>${fugitive.title}</h2>
                <p>${fugitive.description}</p>
            </div>
            <div>
                <p>${fugitive.warning_message}</p>
                <p>${fugitive.reward_text}</p>
            </div>
            <button>Report Sighting</button>
        `

        mainSection.appendChild(fugitiveCard)
        console.log(fugitiveCard);
    });
}