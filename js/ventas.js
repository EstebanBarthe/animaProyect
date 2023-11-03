// Funciones de carga de datos
function cargarAnios() {
  console.log("cargar anios");
  const anioSelect = document.getElementById("anio");
  for (let i = 2023; i >= 1900; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    anioSelect.appendChild(option);
  }
}

function cargarMarcas() {
  console.log("cargar marcas");
  fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
    .then((response) => response.json())
    .then((data) => {
      const marcaSelect = document.getElementById("marca");
      data.forEach((marca) => {
        const option = document.createElement("option");
        option.value = marca;
        option.textContent = marca;
        marcaSelect.appendChild(option);
      });
    });
}

function cargarModelos(marca) {
  console.log("cargar modelos");
  fetch(`https://ha-front-api-proyecto-final.vercel.app/models?brand=${marca}`)
    .then((response) => response.json())
    .then((data) => {
      const modeloSelect = document.getElementById("modelo");
      modeloSelect.innerHTML = "<option>Seleccionar...</option>";
      data.forEach((modelo) => {
        const option = document.createElement("option");
        option.value = modelo;
        option.textContent = modelo;
        modeloSelect.appendChild(option);
      });
    });
}

function cargarStatus() {
  console.log("cargar estados");
  const estadoSelect = document.getElementById("estado");
  const estados = [
    { id: 0, nombre: "Usado" },
    { id: 1, nombre: "Nuevo" },
  ];
  estados.forEach((estado) => {
    const option = document.createElement("option");
    option.value = estado.id;
    option.textContent = estado.nombre;
    estadoSelect.appendChild(option);
  });
}

function cargarRatings() {
  console.log("cargar ratings");
  const ratingSelect = document.getElementById("rating");
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Seleccionar...";
  ratingSelect.appendChild(defaultOption);

  for (let i = 1; i <= 5; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerHTML = getRatingStarts(i);
    ratingSelect.appendChild(option);
  }
}
function cargarAutosIniciales() {
  fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
    .then((response) => response.json())
    .then((data) => {
      mostrarAutos(data);
    });
}

// Funciones de utilidad
function getRatingStarts(rating) {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "⭐";
  }
  return stars;
}
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function mostrarAutos(autos) {
  const contenedorAutos = document.querySelector(".cards-list");
  contenedorAutos.innerHTML = "";

  autos.forEach((auto) => {
    const card = document.createElement("div");
    card.className = "card mycard mb-4";
    const stars = getRatingStarts(auto.rating);
    const statusColor = auto.status === 1 ? "orange" : "gray";
    const formattedPrice = formatPrice(auto.price_usd);
    const cardContent = `
          <div class="row">
            <div class="col-xl-4 col-md-12 position-relative">
              <img src="${auto.image}" class="card-img h-100 " alt="${
      auto.model
    }" style="background-size: cover" />
              <button class="btn position-absolute top-0 t-white start-0" style="background-color: ${statusColor}; color: white;">${
      auto.status === 1 ? "Nuevo" : "Usado"
    }</button>
            </div>
            <div class="col-xl-8">
              <div class="card-body fs-6 custom-padding">
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="card-title mb-2">${auto.brand} ${auto.model}</h5>
                  <small class="text-muted">${
                    auto.year
                  } | USD ${formattedPrice} | ${stars}</small>
                </div>
                <p class="card-text">${auto.description}</p>
                <button class="btn btn-success comprar"><i class="bi bi-cart-plus"></i> Comprar</button>
                <button class="btn btn-light border-dark info"><i class="bi bi-plus-square"></i> Más información</button>
                <button class="btn btn-light border-dark compartir"><i class="bi bi-share"></i> Compartir</button>
              </div>
            </div>
          </div>
        `;

    card.innerHTML = cardContent;
    contenedorAutos.appendChild(card);
  });
}

function filtrarAutos() {
  console.log("filtrar autos");
  const anio = document.getElementById("anio").value;
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const estado = document.getElementById("estado").value;
  const rating = document.getElementById("rating").value;

  let url = `https://ha-front-api-proyecto-final.vercel.app/cars?`;

  if (anio && anio !== "Seleccionar...") {
    url += `year=${anio}&`;
  }
  if (marca && marca !== "Seleccionar...") {
    url += `brand=${marca}&`;
  }
  if (modelo && modelo !== "Seleccionar...") {
    url += `model=${modelo}&`;
  }
  if (estado && estado !== "Seleccionar...") {
    url += `status=${estado}`;
  }

  if (url.endsWith("&")) {
    url = url.slice(0, -1);
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (rating && rating !== "Seleccionar...") {
        data = data.filter((auto) => auto.rating == rating);
      }
      const contenedorAutos = document.querySelector(".cards-list");

      if (data.length === 0) {
        contenedorAutos.innerHTML =
          "<p>No se encontraron resultados para los criterios seleccionados</p>";
        alert("No se encontraron resultados");
      } else {
        mostrarAutos(data);
      }
    });
}

// Event listeners
document.getElementById("marca").addEventListener("change", function () {
  console.log("cargar modelos");
  cargarModelos(this.value);
});

document
  .querySelector(".btn-primary")
  .addEventListener("click", function (event) {
    console.log("entra en el evento");
    event.preventDefault();
    filtrarAutos();
  });

// Llamadas iniciales
cargarAnios();
cargarMarcas();
cargarStatus();
cargarRatings();
cargarAutosIniciales();
