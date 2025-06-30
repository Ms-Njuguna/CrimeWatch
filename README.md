# CrimeWatch – FBI Most Wanted Tracker

## Description

**CrimeWatch** is a single-page JavaScript web app that connects to the FBI's Most Wanted API to display a real-time list of fugitives currently wanted by the FBI. Users can browse fugitive cards, read case details, and submit sightings through a secure form.

The app is built using **HTML**, **Tailwind CSS**, and **JavaScript**, and runs entirely on the client side using **asynchronous API calls** to load data in real time.

---

## Features

- Real-time, dynamic search filtering
- Expandable "See Full Details" modal per fugitive
- Anonymous sighting report submission form
- Fully responsive design with Tailwind CSS
- Graceful handling of missing images or data
- Powered by FBI's public API

---

## Folder Structure

```txt
crimewatch/
├── index.html
├── css/
│   └── styles.css
├── images/
│   └── placeholder.png
├── src/
│   └── index.js
└── README.md
```

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crimewatch.git
   cd crimewatch

2. Open index.html in your browser to run the app.
   ```bash
   explorer.exe index.html

   ```

## Technologies Used
- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- FBI Wanted API (REST)

---

## Future Improvements

- Add pagination or infinite scroll
- Allow filtering by sex, race, or reward status
- Add dark mode toggle
- Store reports in a backend service

---

## Live Demo

[Click here to try the app live!](https://ms-njuguna.github.io/CrimeWatch/)  

---

## Credits
- Data provided by the [FBI Wanted API](https://api.fbi.gov/wanted/v1/list)

---

## Author

- **Name:** Patricia Njuguna
- **GitHub:** [@Ms-Njuguna](https://github.com/Ms-Njuguna)

---


## License

This project is licensed under the [MIT License](LICENSE).

