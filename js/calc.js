const typeBuilding = document.getElementById("buildingTypes");
let activeType = null;
let activeMap = "";

typeBuilding.addEventListener("change", () => {
  if (!document.querySelector(".price-table-home").classList.contains("none")) {
    document.querySelector(".price-table-home").classList.add("none");
  }
  hiddenTooltipFn(document.querySelectorAll('.tooltip-container'),'visible')
  document.getElementById("submit-btn").classList.remove("none");
  if (typeBuilding.value === "Дом") {
    activeMap = "openMapButtonHome";
    activeType = typeBuilding.value;
    changeType("home");
  } else if (typeBuilding.value === "Баня") {
    activeMap = "openMapButtonHome";
    activeType = typeBuilding.value;
    changeType("bathroom");
  } else if (typeBuilding.value === "Забор") {
    activeType = typeBuilding.value;
    activeMap = "openMapButtonZabor";
    changeType(typeBuilding.value);
  } else {
    activeType = typeBuilding.value;
    activeType = "other";
    activeMap = "openMapButtonOther";
    changeType("other");
  }
});
document.getElementById("homeBuildType").addEventListener("change", () => {
  if (document.getElementById("homeBuildType").value != "") {
    document.getElementById("home-bathroom").classList.remove("none");
    if (!document.getElementById("zaborType").classList.contains("none")) {
      document.getElementById("zaborType").classList.add("none");
    }
    if (!document.getElementById("otherType").classList.contains("none")) {
      document.getElementById("otherType").classList.add("none");
    }
  }
});
function changeType(type) {
  if (type === "home") {
    document.getElementById("domType").classList.remove("none");
    if (!document.getElementById("zaborType").classList.contains("none")) {
      document.getElementById("zaborType").classList.add("none");
    }
    if (!document.getElementById("otherType").classList.contains("none")) {
      document.getElementById("otherType").classList.add("none");
    }
    if (!document.getElementById("home-bathroom").classList.contains("none")) {
      document.getElementById("home-bathroom").classList.add("none");
    }
  } else if (type === "bathroom") {
    document.getElementById("domType").classList.remove("none");
    if (!document.getElementById("zaborType").classList.contains("none")) {
      document.getElementById("zaborType").classList.add("none");
    }
    if (!document.getElementById("otherType").classList.contains("none")) {
      document.getElementById("otherType").classList.add("none");
    }
    if (!document.getElementById("home-bathroom").classList.contains("none")) {
      document.getElementById("home-bathroom").classList.add("none");
    }
  } else if (type === "Забор") {
    document.getElementById("zaborType").classList.remove("none");
    if (!document.getElementById("domType").classList.contains("none")) {
      document.getElementById("domType").classList.add("none");
    }
    if (!document.getElementById("otherType").classList.contains("none")) {
      document.getElementById("otherType").classList.add("none");
    }
    if (!document.getElementById("home-bathroom").classList.contains("none")) {
      document.getElementById("home-bathroom").classList.add("none");
    }
  } else if (type === "other") {
    document.getElementById("otherType").classList.remove("none");
    if (!document.getElementById("domType").classList.contains("none")) {
      document.getElementById("domType").classList.add("none");
    }
    if (!document.getElementById("zaborType").classList.contains("none")) {
      document.getElementById("zaborType").classList.add("none");
    }
    if (!document.getElementById("home-bathroom").classList.contains("none")) {
      document.getElementById("home-bathroom").classList.add("none");
    }
  }
}

document.getElementById("submit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  hiddenTooltipFn(document.querySelectorAll('.tooltip-container'),'hidden')
  let formData;
  if (activeType === "Дом" || activeType === "Баня") {
    formData = new FormData(document.getElementById("dom-bathroom-submit"));
  } else if (activeType === "Забор") {
    formData = new FormData(document.getElementById("zabor-submit"));
  } else if (activeType === "other") {
    formData = new FormData(document.getElementById("other-submit"));
  }

  if (formData && (activeType === "Дом" || activeType === "Баня")) {
    const widthBuilding = formData.get("widthBuilding");
    const homeBuildType = formData.get("homeBuildType");
    const lengthBuilding = formData.get("lengthBuilding");
    const lengthPiles = formData.get("lengthPiles");
    const diameterPiles = formData.get("diameterPiles");
    const harness = formData.get("harness");
    const montage = formData.get("montage");
    const dostavka = document
      .querySelector("#openMapButtonHome")
      .getAttribute("data-map");
    let data = {
      homeBuildType,
      lengthBuilding,
      widthBuilding,
      lengthPiles,
      diameterPiles,
      harness,
      montage,
      dostavka,
    };
    let buildingSvayCount = ((lengthBuilding / 2) +1) * ((widthBuilding /2) + 1)
    //svay
    let homeDiametr = document.getElementById('home-diametr')
    let homeLength = document.getElementById('home-length')
    let homeOneCost = document.getElementById('home-one-cost') // bu lengh x diametr ni qiymatini tekshirganda teng bolgan qiymatni oladi
    let svayCount = document.getElementById('svay-count')
    let totalSvaySum = document.getElementById('total-svay-sum')
    homeDiametr.textContent = diameterPiles
    homeLength.textContent = lengthPiles * 1000
    homeOneCost.textContent += `${'2690.00'} руб`
    svayCount.textContent = buildingSvayCount
    totalSvaySum.textContent = `${buildingSvayCount * 2690.00} руб`
    //ugolok
    harness === 'Швеллером по периметру' ? document.getElementById('ugolok').classList.remove('none') : document.getElementById('ugolok').classList.add('none') 
    let ugolokPrice = 290.00
    let ugolokCount = document.getElementById('ugolokCount')
    let ugolokTotal = document.getElementById('ugolokTotal')
    ugolokCount.textContent = buildingSvayCount
    ugolokTotal.textContent = `${buildingSvayCount * ugolokPrice} руб`
    //ruchnoyMontaj
    montage != 'Ручной' ? document.getElementById('ruchnoyMontaj').classList.add('none') : document.getElementById('ruchnoyMontaj').classList.remove('none')
    montage === 'Спецтехникой' ? document.getElementById('spetsMontaj').classList.remove('none') : document.getElementById('spetsMontaj').classList.add('none') 
    montage === 'Спецтехникой' ? document.getElementById('spetsMontaj2').classList.remove('none') : document.getElementById('spetsMontaj2').classList.add('none') 
    let ruchnoyMontajPrice =  `1190.00`
    let ruchnoyMontajPriceEl = document.getElementById('ruchnoyMontajPrice')
    let ruchnoyMontajCount = document.getElementById('ruchnoyMontajCount')
    let ruchnoyMontajTotal = document.getElementById('ruchnoyMontajTotal')
    ruchnoyMontajPriceEl.textContent = `${ruchnoyMontajPrice} руб`
    ruchnoyMontajCount.textContent = buildingSvayCount
    ruchnoyMontajTotal.textContent = `${buildingSvayCount * ruchnoyMontajPrice} руб`
    //obyazka
    document.getElementById('obyazkaName').textContent = 'Обвязка' +harness
    document.getElementById('obyazkaPrice').textContent = '1150.00 руб'
    document.getElementById('obyazkaLength').textContent = '60 m'
    document.getElementById('obyazkaTotal').textContent = `${1150.00 * 60} руб`
    //montajObyazka
    let montajObyazkaPrice = '290.00'
    document.getElementById('montajObyazkaPrice').textContent = montajObyazkaPrice + 'руб'
    document.getElementById('montajObyazkaLeng').textContent = '60 m'
    document.getElementById('montajObyazkaTotal').textContent = `${montajObyazkaPrice * 60} руб`
    

    


    console.log(data);
    document.querySelector(".price-table-home").classList.remove("none");
    document.getElementById("dom-bathroom-submit").reset();
  } else if (formData && activeType === "Забор") {
    const lengthZabor = formData.get("lengthZabor");
    const typePile = formData.get("typePile");
    const fenceFrame = formData.get("fenceFrame");
    const otherMaterial = formData.get("otherMaterial");
    const montage = formData.get("montage");
    const dostavka = document
      .querySelector("#openMapButtonZabor")
      .getAttribute("data-map");
    let data = {
      lengthZabor,
      typePile,
      fenceFrame,
      otherMaterial,
      montage,
      dostavka,
    };
    console.log(data);
    document.querySelector(".price-table").classList.remove("none");
    document.getElementById("zabor-submit").reset();
  } else if (formData && activeType === "other") {
    const lengthBuilding = formData.get("lengthBuilding");
    const widthBuilding = formData.get("widthBuilding");
    const lengthPiles = formData.get("lengthPiles");
    const diameterPiles = formData.get("diameterPiles");
    const harness = formData.get("harness");
    const montage = formData.get("montage");
    const dostavka = document
      .querySelector("#openMapButtonOther")
      .getAttribute("data-map");
    let data = {
      lengthBuilding,
      widthBuilding,
      lengthPiles,
      diameterPiles,
      harness,
      montage,
      dostavka,
    };
    console.log(data);
    document.querySelector(".price-table").classList.remove("none");
    document.getElementById("other-submit").reset();
  }
});

//! Map
let map;
let officeCoordinates = [55.7558, 37.6173]; // Ofis koordinatalari
let officeMarker;

function initMap() {
  if (!map) {
    // Xarita faqat bir marta yuklanishi kerak
    map = new ymaps.Map("map", {
      center: officeCoordinates,
      zoom: 10,
    });
    officeMarker = new ymaps.Placemark(officeCoordinates, {
      balloonContent: "Kompaniya Ofisi",
    });
    map.geoObjects.add(officeMarker);
    // Xaritada tanlangan nuqta uchun voqealar qo‘shish
    map.events.add("click", function (e) {
      let coords = e.get("coords");
      let distance = ymaps.coordSystem.geo
        .getDistance(officeCoordinates, coords)
        .toFixed(2);
      document.getElementById(
        "openMapButtonHome"
      ).value = `Расстояние доставки: ${(distance / 1000).toFixed(1)} km`;
      document.getElementById(
        "openMapButtonOther"
      ).value = `Расстояние доставки: ${(distance / 1000).toFixed(1)} km`;
      document.getElementById(
        "openMapButtonZabor"
      ).value = `Расстояние доставки: ${(distance / 1000).toFixed(1)} km`;
      document.getElementById("openMapButtonHome").dataset.map = (
        distance / 1000
      ).toFixed(1);
      document.getElementById("openMapButtonOther").dataset.map = (
        distance / 1000
      ).toFixed(1);
      document.getElementById("openMapButtonZabor").dataset.map = (
        distance / 1000
      ).toFixed(1);
      // Tanlangan nuqtani belgilash
      let selectedPoint = new ymaps.Placemark(coords, {
        balloonContent: `Tanlangan joy: ${coords[0].toFixed(
          5
        )}, ${coords[1].toFixed(5)}<br>Ofisdan masofa: ${(
          distance / 1000
        ).toFixed(1)} km`,
      });
      map.geoObjects.add(selectedPoint);
      selectedPoint.balloon.open();
    });
  }
}

document.querySelector("#openMapButtonHome").onclick = function () {
  document.getElementById("mapModal").style.display = "block";
  // Xarita mavjud bo‘lsa, ofis markeri qayta qo‘shiladi
  if (map) {
    map.geoObjects.remove(officeMarker); // Eskisini olib tashlaymiz
    officeMarker = new ymaps.Placemark(officeCoordinates, {
      balloonContent: "Kompaniya Ofisi",
    });
    map.geoObjects.add(officeMarker); // Yangi marker qo‘shiladi
    map.container.fitToViewport(); // Xarita o‘lchamlarini yangilash
  } else {
    initMap(); // Agar xarita hali yaratilmagan bo‘lsa, yaratamiz
  }
};

document.querySelector("#openMapButtonOther").onclick = function () {
  document.getElementById("mapModal").style.display = "block";
  // Xarita mavjud bo‘lsa, ofis markeri qayta qo‘shiladi
  if (map) {
    map.geoObjects.remove(officeMarker); // Eskisini olib tashlaymiz
    officeMarker = new ymaps.Placemark(officeCoordinates, {
      balloonContent: "Kompaniya Ofisi",
    });
    map.geoObjects.add(officeMarker); // Yangi marker qo‘shiladi
    map.container.fitToViewport(); // Xarita o‘lchamlarini yangilash
  } else {
    initMap(); // Agar xarita hali yaratilmagan bo‘lsa, yaratamiz
  }
};
document.querySelector("#openMapButtonZabor").onclick = function () {
  document.getElementById("mapModal").style.display = "block";
  // Xarita mavjud bo‘lsa, ofis markeri qayta qo‘shiladi
  if (map) {
    map.geoObjects.remove(officeMarker); // Eskisini olib tashlaymiz
    officeMarker = new ymaps.Placemark(officeCoordinates, {
      balloonContent: "Kompaniya Ofisi",
    });
    map.geoObjects.add(officeMarker); // Yangi marker qo‘shiladi
    map.container.fitToViewport(); // Xarita o‘lchamlarini yangilash
  } else {
    initMap(); // Agar xarita hali yaratilmagan bo‘lsa, yaratamiz
  }
};

document.getElementById("closeModal").onclick = function () {
  document.getElementById("mapModal").style.display = "none";
  map.geoObjects.removeAll(); // Xarita tozalash
};

window.onclick = function (event) {
  if (event.target == document.getElementById("mapModal")) {
    document.getElementById("mapModal").style.display = "none";
    map.geoObjects.removeAll(); // Xarita tozalash
  }
};

function hiddenTooltipFn(arr,condition){
    if(condition == 'visible'){
        arr.forEach(el => {
            el.style.display = 'flex'
        })
    }else if(condition === 'hidden'){
        arr.forEach(el => {
            el.style.display = 'none'
        })
    }
    
}