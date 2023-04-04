const localBtn = document.getElementById("local");
const busBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const techBtn = document.getElementById("technology");
const entBtn = document.getElementById("entertainment");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsDetails = document.getElementById("newsDetails");

let newsDataArr = [];

// APIs
const API_KEY = "d22dd380816a4eefbe74a79eecf43410";
const HEADLINE_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const LOCAL_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function() {
    newsType.innerHTML = "<h4>Top Headlines</h4>";
    fetchHeadlines();
};

localBtn.addEventListener("click", function(){
    newsType.innerHTML = "<h4>Local News<h4>";
    fetchLocalNews();
});

busBtn.addEventListener("click", function(){
    newsType.innerHTML = "<h4>Business News<h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click", function(){
    newsType.innerHTML = "<h4>Sports News<h4>";
    fetchSportsNews();
});
techBtn.addEventListener("click", function(){
    newsType.innerHTML = "<h4>Technology News<h4>";
    fetchTechnologyNews();
});

entBtn.addEventListener("click", function(){
    newsType.innerHTML = "<h4>Entertainment News<h4>";
    fetchEntertainmentNews();
});
searchBtn.addEventListener("click", function(){
    newsType.innerHTML = "<h4>Search : "+newsQuery.value+"<h4>";
    fetchQuery();
});

const fetchHeadlines = async () => {
    const response = await fetch(HEADLINE_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchLocalNews = async() => {
    const response = await fetch(LOCAL_NEWS + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status <= 300){
        const myJson = await response.json();
        //console.log(myJson);
        newsDataArr = myJson.articles;
        
    }
    else{
        //error handling
        console.log(response.status, response.statusText);
    }
    displayNews();
}

const fetchBusinessNews = async() => {
    const response = await fetch(BUSINESS_NEWS + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status <= 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else{
        //error handling
        console.log(response.status, response.statusText);
    }
    displayNews();
}

const fetchSportsNews = async() => {
    const response = await fetch(SPORTS_NEWS + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status <= 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else{
        //error handling
        console.log(response.status, response.statusText);
    }
    displayNews();
}

const fetchTechnologyNews = async() => {
    const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status <= 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else{
        //error handling
        console.log(response.status, response.statusText);
    }
    displayNews();
}

const fetchEntertainmentNews = async() => {
    const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status <= 300){
        const myJson = await response.json();
        //console.log(myJson);
        newsDataArr = myJson.articles;
    }
    else{
        //error handling
        console.log(response.status, response.statusText);
    }
    displayNews();
}

const fetchQuery = async() => {
    if(newsQuery.value == null)
        return;
    const response = await fetch(SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apikey=" + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status <= 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else{
        console.log(response.status, response.statusText);
    }
    displayNews();
}

function displayNews(){

    newsDetails.innerHTML = "";
    if(newsDataArr.length == 0){
        newsDetails.innerHTML = "<h4>No Data Found</h4>";
        return;
    }

    //let date = news.publishedAt.split("T");

    newsDataArr.forEach(news => {

        let col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";
        
        let card = document.createElement('div');
        card.className = "p-2";

        let date = news.publishedAt.split("T");

        let image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;

        let cardBody = document.createElement('div');
        
        let newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        let dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        let description= document.createElement('p');
        description.className = "text=muted";
        description.innerHTML = news.description;

        let link = document.createElement("a");
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read...";


        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsDetails.appendChild(col);

    });
}

window.addEventListener('mouseup', function(e){
    let menu = this.document.getElementById("menu");
    let bars = this.document.getElementById("bars");
    let times = this.document.getElementById("times");
    let check = this.document.getElementById("check");

    if(e.target != menu && e.target != bars && e.target != times)
    {
        check.checked = false;
        if(check.checked){
            check.checked = false;
            menu.style.visibility = 'hidden';
            menu.style.height = '0';
            
            bars.style.display = 'block';
            times.style.display = 'none';
        }  
    }
});