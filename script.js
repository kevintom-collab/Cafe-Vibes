const sheetURL = "https://docs.google.com/spreadsheets/d/1Wgnqq9353W6X4IXVyN_i3XSTyvpgfr3w5X5lkkkUAPc/gviz/tq?tqx=out:csv";
const zomatoLink = "https://www.zomato.com/kochi/cafe-vibes-vyttila/order"; // change this to your actual Zomato page

fetch(sheetURL)
  .then(res => res.text())
  .then(data => {
    const productGrid = document.getElementById("product-grid");

    const rows = data.split("\n").slice(1); // skip header

    rows.forEach(row => {
      const cells = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (!cells) return;

      const name = cells[0].replace(/"/g, "").trim();
      const price = cells[1].replace(/"/g, "").trim();
      const available = cells[2].replace(/"/g, "").trim();
      const img = cells[3] ? cells[3].replace(/"/g, "").trim() : "";

      if (available.toLowerCase() === "yes") {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          ${img ? `<img src="${img}" alt="${name}">` : ""}
          <h3>${name}</h3>
          <p>₹${price}</p>
          <a class="order-btn" href="${zomatoLink}" target="_blank">Order on Zomato</a>
        `;
        productGrid.appendChild(div);
      }
    });
  })
  .catch(err => console.error("ERROR:", err));
