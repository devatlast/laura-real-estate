


import { db, addListing, getListings,deleteListing } from "./firebase.js";




function createSlug(title) {
    return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

const uploadBtn = document.getElementById("submit-btn");

uploadBtn.addEventListener("click", async(e) => {
    e.preventDefault();
    
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;


    /* ======== Image upload control ===== */
    const files = document.getElementById("image").files;
    if (files.length < 3){
        alert("Minimum of 3 imgaes Required!");
        return;
    }
    if (files.length > 10){
        alert("Maximun of 10 images Allowed!");
        return;
    }


    /* ======= Upload images to cloudinary */
    let mediaUrls = [];
    for (let i = 0; i < files.length; i++){
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("upload_preset", "olawale");

        const res = await fetch("https://api.cloudinary.com/v1_1/dkocbxunk/image/upload", {
            method:"POST",
            body: formData
        });

        const data = await res.json();
        mediaUrls.push(data.secure_url);
    }



    const slug = createSlug(title);
    const listing = {
        title,
        slug,
        price,
        location,
        description,
        images:mediaUrls
    };
    await addListing(listing);
    alert("Listing Uploaded");
    loadAdminListings();
});



async function loadAdminListings() {
    const listings = await getListings();
    const container = document.getElementById("adminListings");

    container.innerHTML="";
    listings.forEach(property=> {
        container.innerHTML+=`
        <div class="delete-listing">
        <img src="${property.images?.[0]}" width="120">
        <h3>${property.title}</h3>
        <p>${property.location}<p>
        <button onclick="removeListing('${property.id}')">Delete Property</button>
        </div>
        `;

    });
}

window.removeListing = async function(id) {
    if(!confirm("Delete this property?")) return;
    await deleteListing(id);

    loadAdminListings();
};
loadAdminListings();