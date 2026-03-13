

import { getListings } from "./firebase.js";

let listings=[];
let visible = 8;

const container = document.getElementById("listings");
const searchInput = document.getElementById("search-input");
const locationFilter = document.getElementById("locations");

async function loadListings() {
    listings=await getListings();
    displayListings(listings);

}

function displayListings(data) {
    container.innerHTML="";
    data.slice(0, visible).forEach(property=>{
        container.innerHTML+= `
        <div class="card">
        <img loading="lazy" src="${property.images?.[0] || 'placeholder.jpg'}" width="200">
        <h3>${property.title}</h3>
        <p>$${property.price}</p>
        <p>${property.location}</p>
        <a href="property.html?slug=${property.slug}"><button>View Property</button></a>

        </div>
        `;
    });
}


searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = listings.filter(property =>
         property.title.toLowerCase().includes(value));
     displayListings(filtered);
});

locationFilter.addEventListener("change", () => {
    const value = locationFilter.value;
    const filtered = listings.filter(property=> 
        property.location===value
    );
    displayListings(filtered);
});




const loadMore = document.getElementById("load-more");
loadMore.addEventListener('click', () =>{
    visible += 6;
    displayListings(listings);
});


loadListings();