const apiKeyc = '802eee1659ed40ee9effbd128862af85';


const blogContainer = document.getElementById("blog-container");
const imgClass = document.getElementById("imgclass");

const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const fetchapi = async () => {
  

    try {
        const urlAPI = `https://newsapi.org/v2/everything?q=tesla&from=2024-06-23&sortBy=publishedAt&apiKey=${apiKeyc}`;
        const res = await fetch(urlAPI, {
            headers: {
                Accept: "application/json"
            }
        });
        const data = await res.json();
        return data.articles;

        console.log(data);

        // Assuming you want to set the image source
        // console.log(articles[0].description);

    } catch (error) {
        console.log("Error", error);

    }
}


searchButton.addEventListener("click",async()=>{
   const query = searchField.value.trim();
   if(query!==""){
    try{
        const articles = await fetchNewsQuery(query);
        displayBlog(articles);

        }

    
    catch(error){
        console.error("error getting by query",error);


    }
   }
})


async function fetchNewsQuery(query){
    
    try {
        const urlAPI = `https://newsapi.org/v2/everything?q=${query}&from=2024-06-22&sortBy=publishedAt&apiKey=${apiKeyc}`;
        const res = await fetch(urlAPI, {
            headers: {
                Accept: "application/json"
            }
        });
        const data = await res.json();
        return data.articles;

        console.log(data);

        // Assuming you want to set the image source
        // console.log(articles[0].description);

    } catch (error) {
        console.log("Error", error);

    }
    
}

function displayBlog(articles) {

    blogContainer.innerHTML = "";
    articles.forEach((articles) => {
        const blogCard = document.createElement("div");
        blogCard
            .classList
            .add("blog-card");
        const image = document.createElement("img");
        image.src = articles.urlToImage;
        image.alt = "Article Image";
        image.onerror = function () {
            image.src = "https://ipsf.net/wp-content/uploads/2021/12/dummy-image-square.webp";
            image.alt = "https://ipsf.net/wp-content/uploads/2021/12/dummy-image-square.webp";
        };
        document
            .body
            .appendChild(image);
        const h2title = document.createElement("h2");
        // Ensure articles.h2title is defined before accessing its length
if (articles.h2title) {
    const truncatedTitle = articles.h2title.length > 30
        ? articles.h2title.slice(0, 30) + "..." 
        : articles.h2title;
    h2title.textContent = truncatedTitle;
} else {
    console.error('articles.h2title is undefined');
    h2title.textContent = ''; // or provide a default value if needed
}

        h2title.textContent = articles.title;
        const description = document.createElement("p");
        description.innerHTML = articles.description;
        blogCard.appendChild(image);
        blogCard.appendChild(h2title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
        blogCard.addEventListener("click",()=>{
            window.open(articles.url,"_blank");


        })
    })

}(async () => {
    try {
        const articles = await fetchapi();
        displayBlog(articles);
        //console.log(articles);

    } catch (error) {
        console.error("eror", error);

    }
})();
