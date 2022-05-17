//  Obligatorio Primer Semestre 2021, Programación 1, Maria Matto 227056, Tatiana Poznanski 221056

window.addEventListener("load", inicio);
window.addEventListener("load",noGrafica);
window.addEventListener("load",cargarGrafica);
window.addEventListener("load",cargarTabla);
window.addEventListener("load",maximoDonante);
window.addEventListener("load",totales);


let sistema = new Sistema();
let arrayDonadores = [];

function inicio(){
	document.getElementById("btnAgregarDonante").addEventListener("click", agregarDonante);
	document.getElementById("btnAgregarDonador").addEventListener("click", agregarDonacion);
}
function noGrafica(){
	document.getElementById('piechart').style = 'display:none'; // se le coloca display:none a la grafica cuando no hay datos para que no aparezca en la pag
}
function cargarGrafica(){
	google.charts.load('current', {'packages':['corechart']});  //aparece la grafica 
  	google.charts.setOnLoadCallback(drawChart);
}
function cargarTabla(){
	let tabla = document.getElementById("idTabla");
	tabla.innerHTML = " <tr>  <th>Donante</th>  <th>Modo</th> <th>Monto</th>  <th>Comentarios</th>  </tr>";
	let datos = sistema.darTodosDonacion(); //muestra todas las donaciones
	let deMonto = document.getElementById("idResaltarDeMonto").value;  // toma el value que se escribe para resaltar filas
		deMonto = (parseInt(deMonto));  //lo pasamos a numero
	if(datos.length == 0){
		tabla.innerHTML = "Sin datos";
	}else{
		if (document.getElementById("idCheckDonanteCreciente").checked){  //si esta marcado ordenar por donante creciente, la ordena
			sistema.ordenarTablaPorDonanteCreciente();
		}else{
			sistema.ordenarTablaPorMonto();    // sino la ordena por monto
		}
		for(let elemento of datos){      // por cada elemento de la lista de donaciones
			let fila = tabla.insertRow();
			let celda = fila.insertCell();
			celda.innerHTML = elemento.donante.toString();
			let celda2 = fila.insertCell();
			celda2.innerHTML = elemento.modo;
			let celda3 = fila.insertCell();
			celda3.innerHTML = elemento.monto;
			celda3.classList.add('verde');         // se le agrega clase verde para tener la letra verde
			if (elemento.monto>=1000){celda3.classList.add('rojo');}   // si monto>100 se le agrega clase roja
			let celda4 = fila.insertCell();
			celda4.innerHTML = elemento.comentarios;
			if (document.getElementById("idResaltarFilas").checked == true){   //si esta marcado restaltar filas
			if (elemento.monto==deMonto){fila.classList.add('resaltar');}  // y si el monto == al monto ingresado para resaltar, las resalta
			}
		}
	
		totales();

	}
}
function agregarDonante(){
    let formDonantes = document.getElementById("idFormDonantes");
	if(formDonantes.reportValidity()){
		let nombre = document.getElementById("nombre").value;
		let direccion = document.getElementById("direccion").value;
		let telefono = document.getElementById("telefono").value;
    	if(!sistema.estaNombre(nombre)){ // si el nombre NO esta repetido entonces
        	let donante = new Donante(nombre,direccion,telefono);
        	sistema.agregarDonante(donante);
			formDonantes.reset();
			actualizar();
	    }else{
			alert("Donante repetido, ingrese otro");
		}
		 
    }
}
function agregarDonacion(){
	let formRegistroDonaciones = document.getElementById("idFormRegistroDonaciones");
	if(formRegistroDonaciones.reportValidity()){

		let valueDesplegable = document.getElementById("idListaDesplegable").value;
		let donante =  objetoDonante(valueDesplegable);  // devuelve el objeto donante que tenga de nombre el value que este en el valueDesplegable
		let modo = document.getElementById("modo").value;
		let monto = document.getElementById("monto").value;
		let comentarios = document.getElementById("comentarios").value;
		let contador = (contadorT(valueDesplegable)) ;
		arrayDonadores.push(valueDesplegable);
		let donacion = new Donacion(donante,modo,monto,comentarios,contador);
		sistema.agregarDonacion(donacion);

		
		maximoDonante();
		formRegistroDonaciones.reset();
		actualizar();
		cargarTabla();
		drawChart();
		document.getElementById('piechart').style = 'display:inline';  // cuando se agrega una donacion, se muestra la grafica
	}
}
function maximoDonante(){
	let datos = sistema.arrayMaximosDonantes();
	if(datos.length == 0){
		idMaxDonante1.innerHTML = "   Sin datos";

	}else if(datos.length == 1){  // si datos.length==1 se muestra el maximo donante en un parrafo
		
		let idMaxDonante1 = document.getElementById("idMaxDonante1");
		idMaxDonante1.innerHTML = "";
		idMaxDonante.innerHTML = "";
		let nodoT = document.createTextNode("  " + datos[0]);
		idMaxDonante1.appendChild(nodoT);


		}else{                           // si hay mas de un maximo donante se muestra en lista 
			idMaxDonante.innerHTML = "";
			idMaxDonante1.innerHTML = "";
			for(let i=0; i<datos.length; i++ ){
			let li = document.createElement("li" ); // creamos el elemento li
			let nodoT = document.createTextNode(datos[i]); //creamos el elemento (maxDonante)
			li.appendChild(nodoT); // maxDonador se agrega dentro de la etiqueta li
			idMaxDonante.appendChild(li); 
		}
			}

}
function actualizar(){  //funcion que crea denuevo el valueDesplegable con los nombres de los donantes
	let listaDesplegable = document.getElementById("idListaDesplegable");
	listaDesplegable.innerHTML = "";
	let datos = sistema.darTodosDonante();
	for(elemento of datos){  // recorre la lista de los donantes
		let option = document.createElement("option" ); // creamos el elemento option
		let nodoT = document.createTextNode(elemento.nombre); //creamos el elemento (nombre)
		option.appendChild(nodoT); // nombre se agrega dentro de la etiqueta option
		listaDesplegable.appendChild(option); //option se agrega dentro de listaDesplegable
	}
}
function contadorT(nombre){
	let cont = 1;                         // cont cuenta cuantas veces dono cada donante
	for (i=0;i<arrayDonadores.length;i++){  // recorre el array de donadores
		if(nombre==arrayDonadores[i]){      // si encuentra el mismo nombre en la lista
		cont++;                            // se le suma 1 al contador
		}
	}
	return cont;
}
function objetoDonante(valueDesplegable){
	
	let datos = sistema.darTodosDonante();
	for(let elemento of datos){ //recorre lista de donantes
	if(elemento.nombre==valueDesplegable){  //si el nombre del donante (en el combo desplegable) coincide con el nombre de un Donante (objeto)
		valueDesplegable = elemento; // retornamos el objeto Donante 
	}
		}
	return (valueDesplegable);
}
function drawChart() {
let lista = sistema.cantDonacionesPorModo();  // array de cantidad de donaciones por modo
let efectivoC = parseInt(lista[0]);
let transferenciaC = parseInt(lista[1]);
let canjeC = parseInt(lista[2]);
let mercaderiaC = parseInt(lista[3]);
let chequeC = parseInt(lista[4]);
let otroC = parseInt(lista[5]);

	var data = google.visualization.arrayToDataTable([
	  ['Modo', 'Cantidad'],
	  ['Efectivo',efectivoC],
	  ['Transferencia',transferenciaC],
	  ['Canje',canjeC],
	  ['Mercaderia',mercaderiaC],
	  ['Cheque',chequeC],
	  ['Otro',otroC]
	]);
	var options = {
	  title: 'Donaciones por modo'
	};
	var chart = new google.visualization.PieChart(document.getElementById('piechart'));  // para colocar una grafica redonda
	chart.draw(data, options);
 }
function totales(){

	if  (sistema.cantidaDonaciones()==0){          // si no hay donaciones que en los totales se muestre $0
		let idTotalGeneral = document.getElementById("idTotalGeneral");
		idTotalGeneral.innerHTML = "";
		let nodoT = document.createTextNode("$ " + 0);
		idTotalGeneral.appendChild(nodoT);

		let idMontoDonacionMayor = document.getElementById("idMontoDonacionMayor");
		idMontoDonacionMayor.innerHTML = "";
		let nodoTe = document.createTextNode("$ " + 0);
		idMontoDonacionMayor.appendChild(nodoTe);

	}else{

	let idTotalGeneral = document.getElementById("idTotalGeneral");          // tomamos del id en html          
	idTotalGeneral.innerHTML = "";                                              //vacia el  html
	let nodoT = document.createTextNode("$ " + sistema.sumaDonaciones());       // crea un texto de $ + suma de donaciones
	idTotalGeneral.appendChild(nodoT);                                       //lo agregamos al id de html

	let idMontoDonacionMayor = document.getElementById("idMontoDonacionMayor");
	idMontoDonacionMayor.innerHTML = "";
	let nodoTe = document.createTextNode(sistema.maxMontoDonacion());
	idMontoDonacionMayor.appendChild(nodoTe);

	let pCantTotalDonaciones = document.getElementById("pCantTotalDonaciones");
	pCantTotalDonaciones.innerHTML = "";
	let nodoTex = document.createTextNode(sistema.cantidaDonaciones());
	pCantTotalDonaciones.appendChild(nodoTex);

	let promedio = (parseInt(sistema.sumaDonaciones())/parseInt(sistema.cantidaDonaciones())); // promedio dividiendo la suma/cantDonaciones
	let promedioDonaciones = document.getElementById("promedioDonaciones");
	promedioDonaciones.innerHTML = "";
	let nodoText = document.createTextNode(promedio.toFixed()); // tofixed sirve para quitar los decimales
	promedioDonaciones.appendChild(nodoText);

	let donacionMayor = document.getElementById("idMontoDonacionMayor");
	donacionMayor.innerHTML = "";
	let donacion = sistema.maxMontoDonacion();
	donacionMayor.innerHTML = donacion;
}
}

