//Declaración de variables a usar
const accessToken = '739d8d2b26f0f054e4506016fecb0392'; //Valor del token por defecto, en este caso lo dejo como variable, ya que podría cambiar, aunque podría usar directamente este token abajo en duro



//Función de validación de ingreso de solo números. Devuelve 'True' si cumple con esta condición, se usará más abajo al consultar desde la API
function isValidNumber(input) {
  var regex = /^\d+$/; // Solo números... donde '\d' indica "sólo números"
  //return isNaN(input) // Retorna true si es válido
  return regex.test(input); // Retorna true si es válido
}

//Solicitud de AJAX, dentro de una función a ser usada más abajo
function bringSuperHData(heroId) {
  const apiUrl = `https://www.superheroapi.com/api.php/${accessToken}/${heroId}`; //Url de la API

  $.ajax({
    url: apiUrl,
    method: 'GET',

    success: function(response) {
        console.log(response);
        //alert('Super Id: '+ heroId + '\n' + 'Super nombre: ' + response.name); //Comprueba que trae info
        //Método que recibe datos
        var nombre = response.name;
        var nombreReal = response.biography['full-name'];
        var fuerza = response.powerstats.strength;
        var raza = response.biography.race;
        var combat = response.powerstats.combat;
        var alterEgo = response.biography['alter-egos'];
        var inteligencia = response.powerstats.intelligence;
        var poder = response.powerstats['power'];
        var velocidad = response.powerstats.speed;
        var imagen = response.image.url;
        renderizarData(nombre, fuerza, imagen, nombreReal, velocidad);

        //Enviar datos a una fn que los grafica
        renderizarGraphic(fuerza, combat);
    },
    error: function(error) {
        console.log(error);
        alert('Upsi!, hubo un error al traer los datos buscados');
    }
  });

}


//Capturo el valor ingresado en el input con el evento iniciado por el botón
$(document).ready(function() {
    $('form').on('submit', function(event) {
      event.preventDefault(); // Previene que recargue la página
      
      var heroId = $('#inputHero').val(); //Función/método que captura la información

      //Valida que se hayan ingresado sólo números
      if (isValidNumber(heroId)) {
        bringSuperHData(heroId); // Realiza la solicitud a la API si es válido
        } else {
            alert('Por favor, ingresa solo números'); // Mensaje de error si no cumple la condición
        }
    });
  })


//Función para renderizar en una card, tomando las variables capturadas arriba
function renderizarData(nombre, fuerza, imagen, nombreReal, velocidad, raza, poder, inteligencia, alterEgo) { 
  //Seleccionar un Div del DOM
  var contenedor = document.getElementById('cardContainer');
  console.log(contenedor)
  //Insertar todo el HTML con interpolación
  contenedor.innerHTML = `<div class="card" style="width: 100%;  border:#750400 solid 3px;;">
  <img src="${imagen}" class="card-img-top" alt="imagen de super héroe/heroína">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">Nombre real: ${nombreReal} | Raza: ${raza}</p>
    <p class="card-text">Inteligencia: ${inteligencia} | Alter Ego: ${alterEgo}</p> <!-- hay datos que no está tomando y no entiendo por qué -->
    <hr>
    <ul>
      <li class="card-text">Fuerza: ${fuerza}</li>
      <li class="card-text">Velocidad: ${velocidad}</li>
      <li class="card-text">Poder: ${poder}</li>
    </ul>
  </div>`

}

//Función para renderizar el grafico
function renderizarGraphic(fuerza, combat, poder) {  
        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          theme: "dark1", 
          title: {
            text: "Características"
          },
          data: [{
            type: "doughnut",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            willReaFrequently: true, //Sugerido por la consola para agilizar lectura de datos
            dataPoints: [
              {y: fuerza, label: "Fuerza"},
              {y: combat, label: "Capac. de combate"},
              //{Y: poder, label: "Poder"}, //Por algún motivo no funciona con más de 2 datos 
              
            ],
          }]
        });
        chart.render();
      }
