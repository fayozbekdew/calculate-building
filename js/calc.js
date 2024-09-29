const typeBuilding = document.getElementById("buildingTypes");
let activeType = null;
let activeMap = "";

typeBuilding.addEventListener("change", () => {
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
    const dostavka = document.querySelector("#openMapButtonHome").getAttribute('data-map')
    let data = {
      homeBuildType,
      lengthBuilding,
      widthBuilding,
      lengthPiles,
      diameterPiles,
      harness,
      montage,
        dostavka
    };
    console.log(data);
    document.getElementById("dom-bathroom-submit").reset();
  } else if (formData && activeType === "Забор") {
    const lengthZabor = formData.get("lengthZabor");
    const typePile = formData.get("typePile");
    const fenceFrame = formData.get("fenceFrame");
    const otherMaterial = formData.get("otherMaterial");
    const montage = formData.get("montage");
    const dostavka = document.querySelector("#openMapButtonZabor").getAttribute('data-map')
    let data = {
      lengthZabor,
      typePile,
      fenceFrame,
      otherMaterial,
      montage,
        dostavka
    };
    console.log(data);
    document.getElementById("zabor-submit").reset();
  } else if (formData && activeType === "other") {
    const lengthBuilding = formData.get("lengthBuilding");
    const widthBuilding = formData.get("widthBuilding");
    const lengthPiles = formData.get("lengthPiles");
    const diameterPiles = formData.get("diameterPiles");
    const harness = formData.get("harness");
    const montage = formData.get("montage");
    const dostavka = document.querySelector("#openMapButtonOther").getAttribute('data-map')
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
      document.getElementById("openMapButtonHome").value = `Расстояние доставки: ${(
        distance / 1000
      ).toFixed(1)} km`;
      document.getElementById("openMapButtonOther").value = `Расстояние доставки: ${(
        distance / 1000
      ).toFixed(1)} km`;
      document.getElementById("openMapButtonZabor").value = `Расстояние доставки: ${(
        distance / 1000
      ).toFixed(1)} km`;
      document.getElementById("openMapButtonHome").dataset.map = (distance /1000).toFixed(1)
      document.getElementById("openMapButtonOther").dataset.map = (distance /1000).toFixed(1)
      document.getElementById("openMapButtonZabor").dataset.map = (distance /1000).toFixed(1)
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
