

import { getListings } from "./firebase.js";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const container = document.getElementById("property");

async function loadProperty() {
    const listings = await getListings();
    const property = listings.find(p=>p.slug===slug);
    console.log(property.images);
    if(!property){
        container.innerHTML = "<h2>Property not Found</h2>";
        return;
    }
    const message = encodeURIComponent(
        `Hello, I'm interested in this property:
        ${property.title}
        Location: ${property.location}
        Price: ${property.price}
        Property ID: ${property.slug}
        Link: ${window.location.href}`
    );


    const emailLink = `mailto:eolawale33@gmail.com?subject=Property Inquiry&body=${message}`;
    const whatsappLink = `https://wa.me/9136396093?text=${message}`;

    container.innerHTML= `
    <div id="gallery"></div>
    <h1>${property.title}<h1>
    <p>$${property.price}</p>
    <p>${property.location}</p>
    <p>${property.description}</p>
    <a href="${emailLink}"><button>Mail Agent</button></a>
    <a href="${whatsappLink}"><button>WhatsApp</button></a>
    
    `;

const gallery = document.getElementById("gallery");
if (property.images && property.images.length > 0){
property.images.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    img.loading = "lazy";
    img.width = 300;
    
    gallery.appendChild(img);
  });
 }

}

loadProperty();