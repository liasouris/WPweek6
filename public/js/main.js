const fetchOffersData = async () => {
    try {
      const response = await fetch("/offers");
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
  
      const offersData = await response.json();
      displayOffers(offersData);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };


  const displayOffers = (offersData) => {
    const offersContainer = document.getElementById("offersContainer");
    offersContainer.innerHTML = ""; 
  
    offersData.forEach((offer) => {
      const offerDiv = document.createElement("div");
      offerDiv.classList.add("offerDiv");
  
      if (offer.imagePath) {
        const img = document.createElement("img");
        img.src = `http://localhost:3000${offer.imagePath}`;
        img.alt = offer.title;
        offerDiv.appendChild(img);
      }
  
       
      const title = document.createElement("p");
      title.textContent = offer.title;
      offerDiv.appendChild(title);
  
      const description = document.createElement("p");
      description.textContent = offer.description;
      offerDiv.appendChild(description);
  
      const price = document.createElement("p");
      price.textContent = `Price: ${offer.price} €`;
      offerDiv.appendChild(price);
  
      offersContainer.appendChild(offerDiv);
    });
  };
  
  
  document.getElementById("offerForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const formData = new FormData(this);
    formData.set("description", document.getElementById("description").value);

  
    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Upload failed");
      }
  
      const responseData = await response.json();
      alert("Offer created successfully!");
      this.reset();
      fetchOffersData(); 
    } catch (error) {
      console.error("Error:", error);
      alert("Please try again.");
    }
  });
  
  fetchOffersData();
  