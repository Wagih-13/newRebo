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
    {
      group: "vip",
      name: "VIP",
      imgUrl: "./images/Vip.png",
      pageNum: 1,
    },
    {
      group: "اباطايزر",
      name: "Appetizers",
      imgUrl: "./images/Appetizers.png",
      pageNum: 2,
    },
    {
      group: "اضافات",
      name: "Additions",
      imgUrl: "./images/Additions.png",
      pageNum: 3,
    },
    {
      group: "الركن الشارقي",
      name: "Sharky",
      imgUrl: "./images/eastFood.png",
      pageNum: 4,
    },
  ];

  let htmlTagsContainer = "";

  for (const { group, name, imgUrl, pageNum } of categories) {
    const items = allData.Sheet1.filter((element) => element.group === group);

    const itemRows = items.map(
      (element) => `
        <div class="rowContainer">
          <div class="infoContainer">
            <span>${element.name}</span>
            <span>${element.price}</span>
            <span>${element.englishName}</span>
          </div>
          <div class="components">
            ${element.components !== undefined ? element.components : ""}
          </div>
        </div>
      `
    );

    htmlTagsContainer += `
        <div class="swiper-slide">
            <div class="swipContainer">
              <div class="tableContainer">
                <div class="photoContainer">
                  <h1>${name}</h1>
                  <img
                    src="${imgUrl}"
                    alt=""
                  />
                </div>
                <div class="cardContainer">
                ${itemRows.join("")}
                </div>
                <div class="pageNumber"><span>${pageNum}</span></div>
              </div>
              
            </div>
          </div>
    `;
  }

  document.getElementById("test").innerHTML = htmlTagsContainer;
  let swiper = new Swiper(".Slider-container", {
    effect: "flip",
    grabCursor: true,
    centerdSlides: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  // swiper.changeDirection('vertical');
}

getData();
