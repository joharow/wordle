let objetivo = "";
const intentosmax = 6;
let cantidadintentos = 0;

//variable para traer el tablero
const tablero = document.getElementById("Tablero");
//variable para traer palabra a adivinar o input
const inputadivinar = document.getElementById("input_adivinar");
//variable para el boton
const botonadivinar = document.getElementById("button_adivinar");

//declaracion
async function obtenerPalabra(){
    try {
        const respuesta = await fetch("https://api.datamuse.com/words?sp=?????");
        const data = await respuesta.json();
        console.log(data);
        objetivo = data[0].word.toUpperCase();//funcion para convertir a mayuscula
        console.log(objetivo);
        crearTablero();
    } catch (error) {
        console.log(error);
    }

}

//funcion para crear tablero de juego

function crearTablero(){
    tablero.innerHTML = '';
    console.log(tablero.innerHTML);
    for(let i = 0; i < intentosmax; i++){
        const fila = document.createElement("div"); 
        fila.classList.add("fila");
        
        for(let j = 0; j < objetivo.length; j++){
            const letraDiv = document.createElement("div");
            letraDiv.classList.add("cajadeletra");
            letraDiv.setAttribute("id", `intento-${i}-letra-${j}`); // Asignar un id único a cada div
            fila.appendChild(letraDiv); 
        }
        tablero.appendChild(fila);
    }
}

//funcion para el evento al hacer click en el boton "adivinar"
botonadivinar.addEventListener("click",() => {
    const palabraIngresada = inputadivinar.value.toUpperCase();
    if(palabraIngresada.length !== objetivo.length){
        alert(`La palabra debe tener ${objetivo.length} letras.`);
        return;
    }

    mostrarPalabra(palabraIngresada);
    verificarPalabra(palabraIngresada);
    cantidadintentos++;

    //limpiar el input para el siguiente intento
    inputadivinar.value = "";

    if(cantidadintentos >= intentosmax){
        alert(`Se acabaron los intentos. La palabra correcta era: ${objetivo}`);
    }
});


//funcion para mostrar la letra en el tablero
function mostrarPalabra(palabra){
    for(let i = 0; i <palabra.length; i++){
        const letraDiv = document.getElementById(`intento-${cantidadintentos}-letra-${i}`);
        letraDiv.textContent = palabra [i]; //mostrar cada letra en la caja correspondiente
        if(palabra[i] === objetivo [i]){
            letraDiv.classList.add("letraverde")
        }
        else{//esta palabra i dentro de objetivo? si esta pintar en amarillo, si no esta en objetivo o no existe pintar en gris
            if(objetivo.search(palabra[i])=== -1){
                letraDiv.classList.add("letragris")
            }else{letraDiv.classList.add("letraamarilla")

            }
        } 
    }
}

// Función para verificar si la palabra ingresada es correcta o no
function verificarPalabra(palabra) {
    if (palabra === objetivo) {
        alert("¡Felicidades! Adivinaste la palabra correcta.");
    } else {
        // Aquí podrías agregar lógica para marcar letras correctas en su lugar o incorrectas
        console.log("Sigue intentando.");
    }
}


//invocado
obtenerPalabra()






