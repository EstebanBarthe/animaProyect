// Función para cargar años en el select
function cargarAnios() {
  console.log("cargar anios")
  const anioSelect = document.getElementById("anio");
  for (let i = 1900; i <= 2023; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    anioSelect.appendChild(option);
    
  }
}

cargarAnios();

function cargarMarcas() {
  console.log("cargar marcas")
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

// Función para filtrar autos basados en los criterios seleccionados
function filtrarAutos() {
  console.log("filtrar autos");
  const anio = document.getElementById("anio").value;
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  //const estado = document.getElementById("estado").value; // Capturar el estado

  fetch(
    `https://ha-front-api-proyecto-final.vercel.app/cars?year=${anio}&brand=${marca}&model=${modelo}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        alert("No hay autos que cumplan con las condiciones de filtrado.");
      } else {
        mostrarAutos(data);
      }
    });
}

function mostrarAutos(autos) {
  const contenedorAutos = document.querySelector(".cards-list");
  contenedorAutos.innerHTML = "";

  console.log("mostrar autos");
  autos.forEach((auto) => {
    const card = document.createElement("div");
    card.className = "card mycard mb-4";

    const cardContent = `
          <div class="row no-gutters">
            <div class="col-xl-4 col-md-12">
              <img src="${auto.image}" class="card-img h-100" alt="${auto.model}" />
            </div>
            <div class="col-xl-8">
              <div class="card-body fs-6 custom-padding">
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="card-title mb-2">${auto.brand} ${auto.model}</h5>
                  <small class="text-muted">${auto.year} | USD ${auto.price}</small>
                </div>
                <p class="card-text">${auto.description}</p>
                <button class="btn btn-success comprar">Comprar</button>
                <button class="btn btn-light border-dark info">Más información</button>
                <button class="btn btn-light border-dark compartir">Compartir</button>
              </div>
            </div>
          </div>
        `;

    card.innerHTML = cardContent;
    contenedorAutos.appendChild(card);
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
