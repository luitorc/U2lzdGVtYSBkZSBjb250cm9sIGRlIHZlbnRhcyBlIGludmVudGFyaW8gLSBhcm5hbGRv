window.onload = function(){ //Acciones tras cargar la p�gina
pantalla=document.getElementById("textoPantalla"); //elemento pantalla de salida
document.onkeydown = teclado; //funci�n teclado disponible
}
x="0"; //n�mero en pantalla
xi=1; //iniciar n�mero en pantalla: 1=si; 0=no;
coma=0; //estado coma decimal 0=no, 1=si;
ni=0; //n�mero oculto o en espera.
op="no"; //operaci�n en curso; "no" =  sin operaci�n.

//mostrar n�mero en pantalla seg�n se va escribiendo:
function numero(xx) { //recoge el n�mero pulsado en el argumento.
         if (x=="0" || xi==1  ) {	// inicializar un n�mero, 
            pantalla.innerHTML=xx; //mostrar en pantalla
            x=xx; //guardar n�mero
            if (xx==".") { //si escribimos una coma al principio del n�mero
               pantalla.innerHTML="0."; //escribimos 0.
               x=xx; //guardar n�mero
               coma=1; //cambiar estado de la coma
               }
           }
           else { //continuar escribiendo un n�mero
               if (xx=="." && coma==0) { //si escribimos una coma decimal p�r primera vez
                   pantalla.innerHTML+=xx;
                   x+=xx;
                   coma=1; //cambiar el estado de la coma  
               }
               //si intentamos escribir una segunda coma decimal no realiza ninguna acci�n.
               else if (xx=="." && coma==1) {} 
               // else if (xx=="." && coma==2) {} 
               //Resto de casos: escribir un n�mero del 0 al 9: 	 
               else {
                   pantalla.innerHTML+=xx;
                   x+=xx
               }
            }
            xi=0 //el n�mero est� iniciado y podemos ampliarlo.
         }
function operar(s) {
        coma=0; //Reiniciamos la coma para la segunda o 3ra.. escritura
         igualar() //si hay operaciones pendientes se realizan primero
         ni=x //ponemos el 1� n�mero en "numero en espera" para poder escribir el segundo.
         op=s; //guardamos tipo de operaci�n.
         xi=1; //inicializar pantalla.
         }	
function igualar() {
         if (op=="no") { //no hay ninguna operaci�n pendiente.
            pantalla.innerHTML=x;	//mostramos el mismo n�mero	
            }
         else { //con operaci�n pendiente resolvemos
            sl=ni+op+x; // escribimos la operaci�n en una cadena
            sol=eval(sl) //convertimos la cadena a c�digo y resolvemos
            pantalla.innerHTML=sol //mostramos la soludi�n
            x=sol; //guardamos la soluci�n
            op="no"; //ya no hayn operaciones pendientes
            xi=1; //se puede reiniciar la pantalla.
            }
        }
function raizc() {
         x=Math.sqrt(x) //resolver ra�z cuadrada.
         pantalla.innerHTML=x; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla 
         }
function porcent() { 
         x=x/100 //dividir por 100 el n�mero
         pantalla.innerHTML=x; //mostrar en pantalla
         igualar() //resolver y mostrar operaciones pendientes
         xi=1 //reiniciar la pantalla
         }
function opuest() { 
         nx=Number(x); //convertir en n�mero
         nx=-nx; //cambiar de signo
         x=String(nx); //volver a convertir a cadena
         pantalla.innerHTML=x; //mostrar en pantalla.
         }
function inve() {
         nx=Number(x);
         nx=(1/nx);
         x=String(nx);		 
         pantalla.innerHTML=x;
         xi=1; //reiniciar pantalla al pulsar otro n�mero.
         }

function retro(){ //Borrar s�lo el �ltimo n�mero escrito.
         cifras=x.length; //hayar n�mero de caracteres en pantalla
         br=x.substr(cifras-1,cifras) //describir �ltimo caracter
         x=x.substr(0,cifras-1) //quitar el ultimo caracter
         if (x=="") {x="0";} //si ya no quedan caracteres, pondremos el 0
         if (br==".") {coma=0;} //Si el caracter quitado es la coma, se permite escribirla de nuevo.
         pantalla.innerHTML=x; //mostrar resultado en pantalla	 
         }
function borradoParcial() {
        pantalla.innerHTML=0; //Borrado de pantalla;
        x=0;//Borrado indicador n�mero pantalla.
        coma=0;	//reiniciamos tambi�n la coma				
        }
function borradoTotal() {
         pantalla.innerHTML=0; //poner pantalla a 0
         x="0"; //reiniciar n�mero en pantalla
         coma=0; //reiniciar estado coma decimal 
         ni=0 //indicador de n�mero oculto a 0;
         op="no" //borrar operaci�n en curso.
         }
function teclado (elEvento) { 
         evento = elEvento || window.event;
         k=evento.keyCode; //n�mero de c�digo de la tecla.
         //teclas n�mericas del teclado alfamun�rico
         if (k>47 && k<58) { 
            p=k-48; //buscar n�mero a mostrar.
            p=String(p) //convertir a cadena para poder a��dir en pantalla.
            numero(p); //enviar para mostrar en pantalla
            }	
         //Teclas del teclado n�merico. Seguimos el mismo procedimiento que en el anterior.
         if (k>95 && k<106) {
            p=k-96;
            p=String(p);
            numero(p);
            }
         if (k==110 || k==190) {numero(".")} //teclas de coma decimal
         if (k==106) {operar('*')} //tecla multiplicaci�n
         if (k==107) {operar('+')} //tecla suma
         if (k==109) {operar('-')} //tecla resta
         if (k==111) {operar('/')} //tecla divisi�n
         if (k==32 || k==13) {igualar()} //Tecla igual: intro o barra espaciadora
         if (k==46) {borradoTotal()} //Tecla borrado total: "supr"
         if (k==8) {retro()} //Retroceso en escritura : tecla retroceso.
         if (k==36) {borradoParcial()} //Tecla borrado parcial: tecla de inicio.
         }
