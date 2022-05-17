// Obligatorio Primer Semestre 2021, Programación 1, Maria Matto 227056, Tatiana Poznanski 221056

class Sistema{
    constructor(){
        this.listaDonaciones = [];
        this.listaDonantes = [];
    }
    agregarDonante(donante){
        this.listaDonantes.push(donante);
    }
    darTodosDonante(){
        return this.listaDonantes;
    }
    agregarDonacion(donacion){
        this.listaDonaciones.push(donacion);
    }
    darTodosDonacion(){
            return this.listaDonaciones;
    }
    estaNombre(nombre){
        let esta = false;
        for(let i = 0; i < this.listaDonantes.length && !esta; i++){
            if((this.listaDonantes[i].nombre).toUpperCase() == nombre.toUpperCase()){
                esta = true;
            }
        }
        return esta;
    }
    arrayMaximosDonantes(){
        let datos = this.darTodosDonacion();
        let aux = 0;
        let maxDonantee;
        let arrayMaximosDonantes = [];
        for (let elem of datos){  // por cada donacion
            if(elem.contador>aux){ // si el contador es mayor que la variable aux
        aux=elem.contador;         // en la variable aux se guarda el contador maximo  ej. si los contadores son (1,4,3,3) guarda en aux 4
        maxDonantee=elem.donante.nombre;   //guarda el nombre del donante que mas veces dono
            }
            }
        for (let elem of datos){      //por cada donacion
        if(elem.contador==aux){        // los elementos o el elemento que tengan mayor contador
            arrayMaximosDonantes.push(elem.donante.nombre);     // se agregan al array final
            }
            }
            return arrayMaximosDonantes;
        }
    ordenarTablaPorDonanteCreciente(){
        	(this.darTodosDonacion()).sort((a,b) => {
        		a = (a.donante.nombre).toLowerCase();  //si devuelve 1 primero va a, si devuelve -1 va primero b y si devuele 0 no se intercambian
        		b = (b.donante.nombre).toLowerCase();  // a y b son objetos de la lista de donaciones, los ordena por el nombre del donante
        		if (a > b) {
        			return 1;
        		  }
        		  if (a< b) {
        			return -1;
        		  }
        		  return 0;

        	});
      }
    ordenarTablaPorMonto(){ 
        (this.darTodosDonacion()).sort((a,b) => {
        a = parseInt(a.monto);
        b = parseInt(b.monto);             // ordenamos la lista por monto DECRECIENTE
        if (a > b) {
            return -1;
        }
        if (a< b) {
            return 1;
        }
        return 0;
        });
        }
    
    cantDonacionesPorModo(){
        let efectivo = 0;
        let transferencia = 0;
        let canje = 0;
        let mercaderia = 0;
        let cheque = 0;
        let otro = 0;
            for(let elem of this.listaDonaciones){
                let modo = elem.modo;
                if (modo=="Efectivo"){
                    efectivo++;
                }else if(modo=="Transferencia"){
                    transferencia++;
                }else if(modo=="Canje"){
                    canje++;
                }else if(modo=="Mercaderia"){
                    mercaderia++;
                }else if(modo=="Cheque"){
                    cheque++;
                }else{
                    otro++;}
            }
        return [efectivo,transferencia,canje,mercaderia,cheque,otro];
        }
    cantidaDonaciones(){
        return this.listaDonaciones.length;
        }
    sumaDonaciones(){
        let suma = 0;
        for(let elem of this.listaDonaciones){  // por cada elemento de la lista de donaciones
            suma += parseInt(elem.monto);        // se suman los montos en variable suma
        }
        return suma;
        }
    maxMontoDonacion(){
        let max = 0;
        for(let i = 0; i < this.listaDonaciones.length; i++){     // recorre la lista de donaciones
            if(parseInt(this.listaDonaciones[i].monto) > max){    // guarda el maximo en let max
                max = parseInt(this.listaDonaciones[i].monto);
            }
        }
        return ("$ " +  max);
        }

}
class Donante{
    constructor(nombre,direccion,telefono){     // La clase donante creara a los donantes que quieramos registrar
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;

    }
    toString(){
        return  this.nombre + " (" + this.direccion + ", " + this.telefono + ")";// Cada vez que quieramos mostrar el objeto como string se mostrara de esta forma
    }
    nombreEnTabla(){
        return this.donante.nombre + "(" + this.donante.direccion + ", " + this.donante.telefono + ")";
    }
}
class Donacion{
    constructor(donante,modo,monto,comentarios,contador){
        this.donante = donante;
        this.modo = modo;
        this.monto = monto;
        this.comentarios = comentarios;
        this.contador = contador;
    }
    toString(){
        return this.donante+" "+this.modo+" "+this.monto+" "+this.comentarios;  // Cada vez que quieramos mostrar el objeto como string se mostrara de esta forma
    }
}

