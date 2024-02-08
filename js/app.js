const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault()

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');
        return;
    }


    // Consult the API
    constultarAPI(ciudad, pais)
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    if (!alerta) {
        const divAlerta = document.createElement('div');

        divAlerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')

        divAlerta.innerHTML = `
        <strong class="font-bold"> Error! </strong>
        <span class="block"> ${mensaje} </span>
        `
        container.appendChild(divAlerta);

        setTimeout(() => {
            divAlerta.remove()
        }, 3000)
    }
}

function constultarAPI(ciudad, pais) {

    const appId = '175c3db7edf652c90c186292837a12a2';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    Spinner() //Shows the spinner while bringing data from the server


    console.log(url)

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            console.log(datos)
            //Clean previous HTML
            limpiarHTML()

            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return;
            }

            // Shows the response in the HTML
            mostrarClima(datos);
        })
}

function mostrarClima(datos) {


    const { name, main: { temp, temp_max, temp_min } } = datos;


    const centigrados = kelvinAcentigrados(temp)
    const max = kelvinAcentigrados(temp_max)
    const min = kelvinAcentigrados(temp_min)

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;` // Entity, shows the C° format;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451`;
    tempMaxima.classList.add('text-xl')

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451`;
    tempMinima.classList.add('text-xl')

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMaxima)
    resultadoDiv.appendChild(tempMinima)

    resultado.appendChild(resultadoDiv)
}

// From farenhait to celsius
const kelvinAcentigrados = grados => parseInt(grados - 273.15);


function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function Spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `
    resultado.appendChild(divSpinner);
}
