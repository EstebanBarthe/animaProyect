// ventas.js
document.addEventListener("DOMContentLoaded", function() {
    const yearSelect = document.getElementById("anio");
    for (let i = 2023; i >= 1900; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
});
// ventas.js
function fetchCars() {
    fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
        .then(response => response.json())
        .then(data => {
            // Aquí puedes procesar y mostrar los datos de los autos
            console.log(data);
        });
}
// ventas.js
function fetchBrands() {
    fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
        .then(response => response.json())
        .then(data => {
            const brandSelect = document.getElementById("marca");
            data.forEach(brand => {
                const option = document.createElement("option");
                option.value = brand;
                option.textContent = brand;
                brandSelect.appendChild(option);
            });
        });
}
// ventas.js
function fetchBrands() {
    fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
        .then(response => response.json())
        .then(data => {
            const brandSelect = document.getElementById("marca");
            data.forEach(brand => {
                const option = document.createElement("option");
                option.value = brand;
                option.textContent = brand;
                brandSelect.appendChild(option);
            });
        });
}
// ventas.js
document.getElementById("marca").addEventListener("change", function() {
    const brand = this.value;
    fetch(`https://ha-front-api-proyecto-final.vercel.app/models?brand=${brand}`)
        .then(response => response.json())
        .then(data => {
            const modelSelect = document.getElementById("modelo");
            modelSelect.innerHTML = ""; // Limpiar opciones anteriores
            data.forEach(model => {
                const option = document.createElement("option");
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        });
});
// ventas.js
document.querySelector(".btn-primary").addEventListener("click", function() {
    const year = document.getElementById("anio").value;
    const brand = document.getElementById("marca").value;
    const model = document.getElementById("modelo").value;
    fetch(`https://ha-front-api-proyecto-final.vercel.app/cars?year=${year}&brand=${brand}&model=${model}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                // Mostrar mensaje de alerta
                alert("No se encontraron autos con esas especificaciones.");
            } else {
                // Aquí puedes procesar y mostrar los autos filtrados
                console.log(data);
            }
        });
});
// ventas.js
function formatPrice(price) {
    return new Intl.NumberFormat().format(price);
}

