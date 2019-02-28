
// siempre partimos de una funcion generica
window.onload=iniciar; // al cargar la pagina ejecutaramos iniciar()

/********Funciones Previas*************/
//----------------------------------------------------------//

//Funciones para  Updates de los div codigo HTML

function editError(msn) {//edito div errores
	var divErrores = document.getElementById('errores');
	if (msn!= null){
		divErrores.innerHTML= msn+'</br>';
	}else{divErrores.innerHTML='';}
} 

function editIntentos(msn) {// edito div Intentos
	var divIntentos = document.getElementById('intentos');
	if (msn!= null){
		divIntentos.innerHTML= msn+'</br>';
	}else{divIntentos.innerHTML='';}
} 

function editBody(msn) {
	document.body.innerHTML = document.body.innerHTML +msn;
}

function paginaDestino(msn) {// pagina de destino
	//document.forms[0].action = msn;
	var elFormulario = document.getElementById("formulario");
	elFormulario.action =msn;
} 

// Funciones para el tratamiento de  cookies 

//________ Funciones genericas ________________
function setCookie(cname,cvalue,exdays) {// guarda la cookie de una manera determinada en document.cookie
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  console.log('<p> setCookie:   variable ='+cname + "=" + cvalue + ";" + expires + '</p>');
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) { // devuelve el valor que le asignamos a una variable en un cooki
  var name = cname + "="; // ponemos en name [variable=]
  var decodedCookie = decodeURIComponent(document.cookie); // recuperamos la informacion de la cooki
  var ca = decodedCookie.split(';'); // troceamos en un array varios strings [variable=valor]
  for(var i = 0; i < ca.length; i++) { // recorremos ese array de strings [variable=valor]
    var c = ca[i]; //aqui tenemos i=0-> [var1=val1] i=1-> [var2=val2]i=2->[var3=val3]i=3->[var4=val4] ....
    while (c.charAt(0) == ' ') {// elimina espacios en blanco antes de [variable ...
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) { //cogemos [variable=] y probamos si encaja desde char(0) con [variable=valor]; si coincide [variable=]
      c=c.substring(name.length, c.length);
	  console.log('<p> getCookie:  valor de variable ='+c+'</p>');
	  return c;
	  
    }
  }
  return null;
}
//elminar cookie

// guardo una cookie de una manera muy precisa
function setCookie(key, value, expireDays, expireHours, expireMinutes, expireSeconds) {
        var expireDate = new Date();
        if (expireDays) {
            expireDate.setDate(expireDate.getDate() + expireDays);
        }
        if (expireHours) {
            expireDate.setHours(expireDate.getHours() + expireHours);
        }
        if (expireMinutes) {
            expireDate.setMinutes(expireDate.getMinutes() + expireMinutes);
        }
        if (expireSeconds) {
            expireDate.setSeconds(expireDate.getSeconds() + expireSeconds);
        }
        document.cookie = key +"="+ escape(value) +
            ";domain="+ window.location.hostname +
            ";path=/"+
            ";expires="+expireDate.toUTCString();
    }

	
// elimino la cokie en un segundo	
function deleteCookie(name) {
        setCookie(name, "", null , null , null, 1);
    }

//________ Funciones Adaptadas APLICACION ________________

function printCookie(){
	var cont = getCookie('cont');
	console.log('<p>  cont  = '+cont+'</p>');
	if (cont >= 0){
	console.log('<p>  valor de cont  > 0 </p>');
	cont++;
	setCookie('cont',cont,30); // incrementamos el valor de count
	console.log('<p>  Incrementando : valor de cont   = '+getCookie('cont')+' </p>')
	}
	if (cont == null){
	console.log('<p>  valor de cont  = null </p>');
	setCookie('cont',1,30);// establecemos count en 1
	console.log('<p>   cambio valor de cont  = 1 </p>');
	}
	editIntentos(getCookie('cont'));
}


function borrarCookie(){
	deleteCookie('cont');
	console.log('estoy borrando cookie : cont '+ document.cookie );
}


// funciones Internas

function convertirMayusculas(objet)
{
	/*
		En este ejemplo accedemos a la propiedad value de un objeto con id nombre y le asignamos 
		su contenido actual pero convertido a mayúsculas con el método toUpperCase() del objeto String.
	*/
	objet.value=objet.value.toUpperCase();
}
function limpiar (){
	deleteCookie('cont');
	console.log('estoy borrando cookie : cont '+ document.cookie );
	editError(null);
	editIntentos(null);
	
}



/******** Programa Principal *************/
//----------------------------------------------------------//

function iniciar()
{
//-------- Diseño de entorno de inicio ------------------------------------------// 
	//document.cookie='a=a1; path=/';
	//document.cookie='b=b1; path=/';
	//document.cookie='c=c1; path=/';
	//document.cookie='d=d1; path=/';
	//document.cookie='cont=0; path=/';
	deleteCookie('cont'); // al iniciar la aplicacion establecemos la cookie cont sin informacion.
	console.log('Iniciamos la aplicacion con las cookies : '+ document.cookie);
//----------------- TRATAMIENTO DE EVENTOS ------------------------------------//
	
	/*************************   Evento 1     ****************************
	
	*	Al hacer click en el botón de enviar tendrá que llamar a la la función validar.
	*	funcion  que valida el formulario.
	*	El evento de click lo programamos en la fase de burbujeo (false).
	
	********************************************************************************************/
	document.getElementById("enviar").addEventListener('click',validar,false);
	/**************************   Evento 2     ****************************
	*	Al hacer click en el botón de Limpiar tendrá que llamar a la la función borrarCookie.
	*	funcion Limpiar   que borran las cookies y los div que vamos a utilizar en el formulario.
	*	El evento de click lo programamos en la fase de burbujeo (false).
	********************************************************************************************/
	document.getElementById("button").addEventListener('click',limpiar,false)
		/**********************   Evento 3     ****************************
	*	Al hacer click fuera del entorno de nombre tendrá que llamar a la la función convertir en mayusculas.
	*	convertirMayusculas necesita un objeto [document.getElementById('nombre')] y necesitamos de una  función anónima para enviar el objeto.
	*	El evento de click lo programamos en la fase de burbujeo (true).
	********************************************************************************************/
	document.getElementById('nombre').addEventListener('blur', function (event) {
        event.stopPropagation();
        convertirMayusculas(this);
    }, true);
		/**********************   Evento 4     ****************************
	*	Al hacer click fuera del entorno de apellido tendrá que llamar a la la función convertir en mayusculas.
	*	convertirMayusculas necesita un objeto [document.getElementById('apellido')] y necesitamos de una  función anónima para enviar el objeto.
	*	El evento de click lo programamos en la fase de burbujeo (true).
	********************************************************************************************/
    document.getElementById('apellidos').addEventListener('blur', function (event) {
        event.stopPropagation();
        convertirMayusculas(this);
    }, true);
	//----------------- Fin EVENTOS ------------------------------------//
	

}


//----------------------------------------------------------//


function validar(eventopordefecto)	// En la variable que pongamos aquí gestionaremos el evento por defecto 
{									// asociado al botón de "enviar" (type=submit) que en este caso
		
		console.log('Entro en function validar '+ document.cookie );	
	
//document.cookie='d=d3; path=/';	
//console.log(document.cookie);
	
	// Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
	
	
	if (	validarcampostexto(this)
			
			&& validarEdad() 
			&& validarNif() 
			&& validarEmail() 
			&& validarTelefono() 
			&& validarFecha()
			&& validarHora() 	
			&& validarProvincia() 
						
			&& confirm("¿Deseas enviar el formulario?"))
	{
				console.log('function validar -> TRUE ');	
				return true;
	}else{
	
		// Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
        
		
		eventopordefecto.preventDefault();
		
		
		//printCookie();
		console.log('function validar -> FALSE ');	
		console.log('mostramos la informacion ' + document.cookie);
		printCookie();
		return false;	// Salimos de la función devolviendo false.
	}
}

//----------------------------------------------------------//




function validarcampostexto(objeto)
{
	// A esta función le pasamos un objeto (que en este caso es el botón de enviar.
	// Puesto que validarcampostexto(this) hace referencia al objeto dónde se programó ese evento
	// que fue el botón de enviar.
	var formulario = objeto.form;	// La propiedad form del botón enviar contiene la referencia del formulario dónde está ese botón submit.

	for (var i=0; i<formulario.elements.length; i++)
	{
		// Eliminamos la clase Error que estuviera asignada a algún campo.
		formulario.elements[i].className="";
	}
	
	// De esta manera podemos recorrer todos los elementos del formulario, buscando los que son de tipo texto.
	// Para validar que contengan valores.
	for (var i=0; i<formulario.elements.length; i++)
	{
		if (formulario.elements[i].type == "text" )
		{
			if (formulario.elements[i].value=="")
			{
			editError("El campo: "+formulario.elements[i].name+" no puede estar en blanco");
			formulario.elements[i].className="error";
			formulario.elements[i].focus();
			return false;
			}
			
		}
		

	}
	
	return true;	 // Si sale de la función con esta instrucción es que todos los campos de texto son válidos.
}

//----------------------------------------------------------//







function validarEdad()
{
var patron = /^[0-9]+$/; 
/**
[inicia en uno o mas numeros del 0 al 9]
[puedes poner mas de un  numero]
[termina el patron ]
*/	
	if ( 
		(patron.test(document.getElementById("edad").value))
		&& 	document.getElementById("edad").value > 0 
		&& 	document.getElementById("edad").value < 106 
		&& (!isNaN(document.getElementById("edad").value))  
		){
	
		document.getElementById("edad").className="";	
		return true;
	}
	else
	{
		editError("El campo: Edad no es correcto utilize Digitos desde 0 hasta 105.");
		
		
		// Situamos el foco en el campo matrícula y le asignamos la clase error.
		document.getElementById("edad").focus();
		document.getElementById("edad").className="error";	
		return false;
	}
}	

function validarNif()
{
var patron = /^[0-9]{8}-[A-Z]$/; 
/* 
*	[Inicio cadena]
*	 [8 digitos]
*	 [guion] 
*	[letra Mayuscula]
*	[fin cadena]
*/
	
	if ( 
		(patron.test(document.getElementById("nif").value))
		&& 	document.getElementById("nif").value !=""   
		){
	
		document.getElementById("nif").className="";	
		return true;
	}
	else
	{
		editError("El campo: Nif no es correcto utilize el formato  [8 numeros] [-] [Letra mayuscula].");
		
		// Situamos el foco en el campo matrícula y le asignamos la clase error.
		document.getElementById("nif").focus();
		document.getElementById("nif").className="error";	
		return false;
	}
}


function validarEmail()
{
var patron = /^[a-zA-Z0-9][a-zA-Z0-9._-]*[@]{1}[a-zA-Z0-9.-]+\.{1}([a-zA-Z]{2,4})+$/; 
/******
 *[Inicio cadena]
 *[primer caracter letra o numero]
 *[puede llevar o no cualquier cantidad de letras numeros guiones y puntos] 
 *[obligatorio 1 caracter  @]
 *[1 vez o + caracter de  letra numero guiones y puntos] 
 *[obligatoro 1 punto]
 *[una estension , vamso a poner entre 2 y 4 letras]
 *[fin cadena]
*/	
	if ( 
		(patron.test(document.getElementById("email").value))
		&& 	document.getElementById("email").value != '' 
		 
		){
	
		document.getElementById("email").className="";	
		return true;
	}
	else
	{
		editError("El campo: Email no es correcto utilice el formato [caracteres] [@] [caracteres] [.] [extension]");
		
		// Situamos el foco en el campo matrícula y le asignamos la clase error.
		document.getElementById("email").focus();
		document.getElementById("email").className="error";	
		return false;
	}
}

//----------------------------------------------------------//

function validarProvincia()
{
	// Comprueba que la opción seleccionada sea diferente a 0.
	// Si es la 0 es que no ha seleccionado ningún nombre de Provincia.
	if (document.getElementById("provincia").selectedIndex==0)
	{
		editError("Atención!: Debes seleccionar una provincia.");

		// Situamos el foco en el campo provincia y le asignamos la clase error.
		document.getElementById("provincia").focus();
		document.getElementById("provincia").className="error";	
		return false;
	}
	else
		return true;
}


//----------------------------------------------------------//
function validarTelefono(){
var patron = /^[0-9]{9}$/; 
/******
 *[Inicio cadena]
 * [9 numeros]
 *[fin cadena]
*/		
	if ( 
		(patron.test(document.getElementById("telefono").value)) 
		&& (!isNaN(document.getElementById("telefono").value))  
		){
	
		document.getElementById("telefono").className="";	
		return true;
	}
	else
	{
		editError(" El campo: Telefono no es correcto utilice [9 numeros] ");
		
		// Situamos el foco en el campo matrícula y le asignamos la clase error.
		document.getElementById("telefono").focus();
		document.getElementById("telefono").className="error";	
		return false;
	}
}
//----------------------------------------------------------//
function validarHora()
{
//hh:mm
var patron = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/; 
/******
 *[Inicio cadena]
 *[decenas : puden aparecer 0 o 1  unidades de 0 a 9    ó   decenas 2 unidades de 0 a 3]
 *[simbolos :] 
 *[decenas 0 a 5  unidades de 0 a 9  ]
 *[fin cadena]
*/	
	if ( 
		(patron.test(document.getElementById("hora").value))
		&& 	document.getElementById("hora").value != '' 
		 
		){
	
		document.getElementById("hora").className="";	
		return true;
	}
	else
	{
		editError("El campo: HOra no es correcto utilize el formato [hh:mm] ");
		
		// Situamos el foco en el campo matrícula y le asignamos la clase error.
		document.getElementById("hora").focus();
		document.getElementById("hora").className="error";	
		return false;
	}
}


function validarFecha()
{
	//dd-mm-aaaa
var patron = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])(\/|-)([0-9]{4})$/; 
/******
 *[Inicio cadena]
 *[decinas : de 0 a 2  unidades de 0 a 9    ó   decenas 3 unidades de 0 a 1]
 *[simbolos /|-] 
 *[decenas 0 unidades de 1 a 9    ó     decenas 1 unidades de 0 a 2]
 *[simbolos /|-] 
 *[numeros de 0 a 9 ...... 4 veces ]
 *[fin cadena]
*/	
	if ( 
		(patron.test(document.getElementById("fecha").value))
		&& 	document.getElementById("fecha").value != '' 
		 
		){
	
		document.getElementById("fecha").className="";	
		return true;
	}
	else
	{
		editError("El campo: Fecha no es correcto utilize el formato [dd/mm/aaaa] o [dd-mm-aaaa]");
		
		// Situamos el foco en el campo matrícula y le asignamos la clase error.
		document.getElementById("fecha").focus();
		document.getElementById("fecha").className="error";	
		return false;
	}
}