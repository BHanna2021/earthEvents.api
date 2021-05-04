let baseURL = "https://eonet.sci.gsfc.nasa.gov/api/v3/categories";
let mine = "WPo98FRE865cu9vQDb326vbJp8jfCVwL49QNw5GH";
let catList = document.querySelector("select");
let searchEvents = document.querySelector("form");
let searchResults = document.querySelector(".searchResults");
let resetBtn = document.querySelector(".resetBtn");

async function fetchCategoryResults() {
    url = `${baseURL}?api_key=${mine}`;
    let response = await fetch(url);
    let data = await response.json();
    displayCategories(data);
}

fetchCategoryResults();

function displayCategories(data) {
    let categoryData = data.categories;
    for (c = 0; c < categoryData.length; c++) {

        let catOptions = document.createElement("option");
        let catValue = categoryData[c].id;
        let catTitle = categoryData[c].title;

        catOptions.setAttribute("value", catValue);
        catOptions.innerText = catTitle;

        catList.appendChild(catOptions);
    }

}

//need to hardcode status to 'all' - status=all
searchEvents.addEventListener("submit", (e) => {
    e.preventDefault();
    let category = document.querySelector("body > div.searchForm > form > fieldset > select").value;
    let startDate = document.querySelector("#startDate").value;
    let endDate = document.querySelector("#endDate").value;
    console.log(category);
    console.log(startDate);
    console.log(endDate);

    eventUrl = `${baseURL}/${category}?&status=all&limit=20&start=${startDate}&end=${endDate}api_key=${mine}`
    console.log(eventUrl);

    async function getEvents() {
        let eventList = await fetch(eventUrl);
        let eventsFound = await eventList.json();
        console.log(eventsFound);
        displayEvents(eventsFound);
    }

    getEvents();
})

function displayEvents(eventsFound) {
    while (searchResults.firstChild) {
        searchResults.removeChild(searchResults.firstChild);
    }
    if (eventsFound.length === 0) {
        alert("I'm sorry no events were found, please try a different search.")
    } else {
        let eventResult = eventsFound.events;
        console.log(eventResult);
        eventResult.forEach(er => {

            let article = document.createElement("article");
            let title = document.createElement("h3");
            let link = document.createElement("a");
            let description = document.createElement("p");

            title.innerText = er.title;
            link.href = er.sources[0].url;
            link.textContent = er.title;
            link.setAttribute("target", "blank");
            description.innerText = er.description;

            article.appendChild(title);
            article.appendChild(link);
            article.appendChild(description);
            searchResults.appendChild(article);

            article.style.border = "1px solid mediumslateblue";
            article.style.padding = "2%";
            link.style.padding = "1%";
            description.style.padding = "1%";
            description.style.letterSpacing = "1.5px";
        })
    }
}