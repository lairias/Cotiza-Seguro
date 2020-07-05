// import app from './app_EM6'
import css from "../css/bootstrap-material-design.css";
import css1 from "../css/bootstrap-material-design.min.css";
import css2 from "../css/custom.css";


//clase de cotisador
export function Seguro(marca, anio, tipo) {
  //constructor del Back-end
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}
//Creamos el prototype de Seguro
 Seguro.prototype.cotizarSeguro =  function(informacion){
    // console.log(informacion)
    /*  1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */

    //creamos la base del codigo
    const  base = 2000;
    let cantidad

    switch (this.marca) {
        case '1':
            cantidad = base* 1.15;
            break;
    
        case '2':
            cantidad = base * 1.05;
            break;
        case '3' :
            cantidad = base * 1.35;
             break;
    }
    
    //calculamos el anio paara aplicar un precio por anio
    const diferencia = new  Date().getFullYear() - this.anio;
    //cada anio de diferencia reducimos 3% el valor del seguro
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    //calcularemos si el usiario selecciona el basico o el completo, y se lo aplicarems
    if(this.tipo === 'basico'){
        cantidad *= 1.30
        
    } else{
        cantidad *= 1.50
    }
    return cantidad
}

//todo lo que se muestra
function Interfaz() {}
//Creamos el prototype del Interfaz
Interfaz.prototype.mostrarError = function (mensaje, tipo) {
    const div = document.createElement("div");

    div.classList.add("notificacion");

    if (tipo === "error") {
        //mensaje que se imprime en el HTML
        formulario.insertBefore(div, document.querySelector(".form-group"));
        setTimeout(() => {
            div.classList.add(tipo);
            div.innerHTML = `${mensaje}`;
            setTimeout(() => {
                div.classList.remove(tipo);
                div.innerHTML = ``;
                setTimeout(() => {
                    div.remove();
                }, 500);
            }, 3000);
        }, 1000);
    } else if (tipo === "correcto") {
        //mensaje que se imprime en el HTML
        formulario.insertBefore(div, document.querySelector(".form-group"));
        setTimeout(() => {
            div.classList.add(tipo);
            div.innerHTML = `${mensaje}`;
            setTimeout(() => {
                div.classList.remove(tipo);
                div.innerHTML = ``;
                setTimeout(() => {
                    div.remove();
                }, 500);
            }, 3000);
        }, 100);
    }
};
//imprimir el resultado de la cotizacion
Interfaz.prototype.mostrarResultado= function(seguro, total){

    const resultado = document.querySelector('#resultado');
    const a = document.createElement('a')
    a.classList.add('borrar');
    a.innerText = 'X'
    let marca;
    switch(seguro.marca){
        case '1':
            marca = 'americano';
        break;
        case '2':
            marca = 'Asiatico'
            break
            case '3':
                marca = 'Europeo';
                break;

    }
    const div = document.createElement('div');
    div.innerHTML = `
    Tu Resumen <br>
    Marca: ${marca}<br>
    Año:${seguro.anio}<br>
    Tipo: ${seguro.tipo}<br>
    Total: $ ${total}<br>

    
    `;
    const cargando = document.querySelector('#cargando img')
    cargando.style.display = 'block'
    console.log(resultado)
    setTimeout(()=>{
        cargando.style.display = 'none';
        resultado.appendChild(div)
        setTimeout(()=>{
            div.remove()
        }, 5000)
        
    },3000)
}




//-----------EventListener
//funcion para leer los datos seleccionados del Form
const formulario = document.querySelector("#cotizar-seguro");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  //lemos los datos del Form
  //seleccionamos la fabrica de Automobiles
  const marca = document.querySelector("#marca");
  const marcaSelecionada = marca.options[marca.selectedIndex].value;
  //selecionamos el anio
  const anio = document.querySelector("#anio");
  const anioSelecionado = anio.options[anio.selectedIndex].value;
  //seleccionamos el RadiosButoom del Form
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  //si el cliente crea o no una solicitud
  //creamos instancia de interfaz
  const interfaz = new Interfaz();
  //validamos que nungun campo este vacio
  if (marcaSelecionada === "" || anioSelecionado === "" || tipo === "") {
    //los campos se encuentran vacios

    interfaz.mostrarError("Faltal datos, Revisar el formulario", "error");

    console.log("faltan datos");
  } else {
    //creamos la nueva instancia del Seguro
    const seguro = new Seguro(marcaSelecionada,anioSelecionado,tipo);
      interfaz.mostrarError("Calculando...", "correcto");
      
      //nos retunr un Cantidad
      const cantidad = seguro.cotizarSeguro(seguro);

    interfaz.mostrarResultado(seguro, cantidad);

// console.log(seguro)
//cotisamos el Seguro
  }
});

//obtenmos el año actual par aque no exixta un carro fabricado con mayor año presente
const max = new Date().getFullYear(),
  mix = max - 20;
const selectanios = document.querySelector("#anio");
//for para que imprima los anios es el HTML
for (let i = max; i > mix; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  selectanios.appendChild(option);
}
//-------------------funcciones de las instancias 
