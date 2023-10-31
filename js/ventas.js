document.addEventListener("DOMContentLoaded", function() {
    populateYearSelect();
    populateStateSelect();
    fetchCars();
    fetchBrands();
});

function populateYearSelect() {
    const yearSelect = document.getElementById("anio");
    for (let i = 2023; i >= 1900; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

function populateStateSelect() {
    const stateSelect = document.getElementById("estado");
    const states = ["Nuevo", "Usado"];
    states.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}

function fetchCars(year, brand, model, state) {
    fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
        .then(response => response.json())
        .then(data => {
            if (year || brand || model || state) {
                data = data.filter(car => 
                    (!year || car.year.toString() === year) &&
                    (!brand || car.brand === brand) &&
                    (!model || car.model === model) &&
                    (!state || car.state === state)
                );
            }
            displayCars(data);
        });
}

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

document.getElementById("marca").addEventListener("change", function() {
    const brand = this.value;
    fetch(`https://ha-front-api-proyecto-final.vercel.app/models?brand=${brand}`)
        .then(response => response.json())
        .then(data => {
            const modelSelect = document.getElementById("modelo");
            modelSelect.innerHTML = "<option>Seleccionar...</option>"; 
            data.forEach(model => {
                const option = document.createElement("option");
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        });
});

document.querySelector(".btn-primary").addEventListener("click", function() {
    const year = document.getElementById("anio").value;
    const brand = document.getElementById("marca").value;
    const model = document.getElementById("modelo").value;
    const state = document.getElementById("estado").value;
    fetchCars(year, brand, model, state);
});

function formatPrice(price) {
    return new Intl.NumberFormat().format(price);
}
