
//fetch fugitive data from the FBI most wanted public API

fetch('https://api.fbi.gov/wanted/v1/list')
.then(res => res.json())
.then(data => {

    const fugitives = data.items;
    console.log(fugitives);
    
    const mainSection = document.querySelector('main')
    fugitives.forEach(fugitive => {
        const fugitiveTitle = document.createElement('p')
        fugitiveTitle.textContent = `${fugitive.title}`

        mainSection.appendChild(fugitiveTitle)
    });
})