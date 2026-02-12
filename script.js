const sheetURL = "https://docs.google.com/spreadsheets/d/1Wgnqq9353W6X4IXVyN_i3XSTyvpgfr3w5X5lkkkUAPc/gviz/tq?tqx=out:csv";
const swiggyLink = "https://www.swiggy.com/city/kochi/cafe-vibes-eroor-thripunithura-rest856039";

fetch(sheetURL)
  .then(res => res.text())
  .then(data => {

    const productGrid = document.getElementById("product-grid");
    const orderingMessage = document.getElementById("ordering-message");

    const rows = data.split("\n").slice(1); // skip header
    let orderingEnabled = false;

    rows.forEach((row, index) => {

      const cells = row.match(/(".*?"|[^",\n]+)(?=\s*,|\s*$)/g);
      if (!cells) return;

      const name = cells[0]?.replace(/"/g, "").trim();
      const price = cells[1]?.replace(/"/g, "").trim();
      const available = cells[2]?.replace(/"/g, "").trim();
      const img = cells[3]?.replace(/"/g, "").trim();
      const orderingStatus = cells[4]?.replace(/"/g, "").trim();

      // First row controls global ordering
      if (index === 0) {
        orderingEnabled = orderingStatus === "TRUE";
      }

      // Only show product if availability checkbox is TRUE
      if (name && available === "TRUE") {

        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
          ${img ? `<img src="${img}" alt="${name}">` : ""}
          <h3>${name}</h3>
          <p>₹${price}</p>
          ${orderingEnabled ? 
            `<a class="order-btn" href="${swiggyLink}" target="_blank">Order on swiggy</a>` 
            : ``}
        `;

        productGrid.appendChild(div);
      }

    });

    // If ordering disabled → show message
    if (!orderingEnabled) {
      orderingMessage.style.display = "block";
    }

  })
  .catch(err => console.error("ERROR:", err));
