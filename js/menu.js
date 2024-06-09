var swiper = new Swiper(".Slider-container", {
  effect: "cards",
  grabCursor: true,
  centerdSlides: true,
  loop: true,
});
// swiper.changeDirection('vertical');

async function fetchData() {
  let req = await fetch("./data/menuData.json");
  let res = await req.json();
  return res;
}

async function getData() {
  let allData = await fetchData();

  if (!Array.isArray(allData.Sheet1)) {
    console.error("Unexpected data structure in menuData.json");
    return;
  }

  const categories = [
    { group: "vip", name: "VIP" },
    { group: "اباطايزر", name: "Appetizers" },
    { group: "اضافات", name: "Additions" },
    { group: "اضافات - ADDITIONS", name: "Additions (Arabic)" },
    { group: "الركن الشارقي", name: "Sharky" },
    { group: "الشاي والاعشاب - TEA AND HERBS", name: "Drinks" },
  ];

  let htmlTagsContainer = "";

  for (const { group, name } of categories) {
    const items = allData.Sheet1.filter((element) => element.group === group);

    const itemRows = items.map(
      (element) =>
        `<tr> 
        <td>${element.name}</td>
        <td>${element.size}</td>
        <td>${element.price}</td>
      </tr>`
    );

    htmlTagsContainer += `
      <div class="swiper-slide">
        <div class="swipContainer">
          <div class="tableContainer">
            <div class="photoContainer">
              <h1>${name}</h1>
              <img
                src="./images/Blackberries milk splash floating -10.png"
                alt=""
              />
            </div>
            <table>
              <thead>
                <th>Name</th>
                <th>Size</th>
                <th>Price</th>
              </thead>
              <tbody>
                ${itemRows.join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  document.getElementById("test").innerHTML = htmlTagsContainer;
}

getData();
