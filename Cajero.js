$( document ).ready(function() {
    getProduct();
    
});

let jsonP = {
    "producto":[ 
    ]
};

function getProduct() {
    $.ajax({
      url: 'http://server2.lnavarro.cl:3300/producto/',
      success: function(respuesta) {
        console.log("respuesta:" + JSON.stringify(respuesta));
        jsonP.producto= respuesta;
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      }
    });
  }

//Declaración de Variables
var posicion;
var arrayNombre  = new Array();
var arrayvalor = new Array();
var arraycodigo   = new Array();
var arraycantidad   = new Array();
var arraytotal   = new Array();
var cantidad;
var datos  = [];
var objeto = {};
var j=0;
var listaproductos;
var totalgeneral;
var total =0;
var total1;
var MedioPago;
var vuelto;
var MontoEfectivo1;
var vueltotex;


function buscar(){
    console.log("Ingresó en le función buscar");
    var codigo = document.getElementById("buscadorCN").value;
    cantidad = document.getElementById("Cantidad").value;
    total = document.getElementById("total");
    total1 = document.getElementById("total").value;
    MedioPago =document.getElementById("MetodoPago").value;
    MontoEfectivo1 = document.getElementById("MontoEfectivo").value;
    vueltotex = document.getElementById("vuelto");
    vueltotex.textContent = vuelto;
    console.log("Codigo Ingresado: "+codigo);
    var resultadoBusqueda = document.getElementById("resultado");
    resultadoBusqueda.textContent = validaCodigo(codigo);
    printTable(posicion);    
    total.value = totalgeneral;
}

function metodoPago(){
    MedioPago =document.getElementById("MetodoPago").value;
    MontoEfectivo1 = document.getElementById("MontoEfectivo").value;
    console.log("MedioPago: " + MedioPago);
    console.log("MontoEfectivo1: " + MontoEfectivo1);
    console.log("total1: " + total1);
    if(MedioPago =="Efectivo")
    {
        vuelto = parseInt(MontoEfectivo1,10) - parseInt(total1,10) ;
    }
    else
    {
        vuelto =0;
    }   
    console.log(vuelto);
    vueltotex = document.getElementById("vuelto");
    vueltotex.textContent = vuelto;
}


function validaCodigo(codigo){
    console.log("Ingresó en le función validaCodigo: " + codigo);
    var respuesta = "Producto no Disponible";
       
    for(var i=0; jsonP.producto.length>i; i++)
    {
        if(jsonP.producto[i].codigo == codigo || jsonP.producto[i].nombre ==codigo)
        {
          respuesta =" ";
          posicion = i;
        }     
    }
    return respuesta;
}

 
function printTable(posicion){
console.log("Ingresó en la función printTable");
console.log("posicion:" +posicion);

 arraycodigo[j] = jsonP.producto[posicion].codigo;
 arrayNombre[j] = jsonP.producto[posicion].nombre; 
 arrayvalor[j] = jsonP.producto[posicion].precio;
 arraycantidad[j] = cantidad;
 arraytotal[j]   = parseInt((jsonP.producto[posicion].precio),10)*(cantidad);
 console.log("arraycodigo[j]" + arraycodigo[j]);
 console.log("arrayNombre[j]" + arrayNombre[j]);
 console.log("arrayvalor[j]" + arrayvalor[j]);
 console.log("arraycantidad[j]" + arraycantidad[j]);
 console.log("arraytotal[j] " + arraytotal[j]);

datos.push({ 
         "codigo"  : arraycodigo[j],
         "nombre"  : arrayNombre[j],
         "valor"   : arrayvalor[j],
         "cantidad" : arraycantidad[j],
         "total" :  arraytotal[j]
         
    });
objeto.datos = datos;
console.log(JSON.stringify(objeto));
j= j+1;
console.log("j: "+j);

for(var i = 0;objeto.datos.length>i ;i++){
    var precio = parseInt(arraytotal[i],10);
    var subtotal; 
    if(j==1)
    {
       subtotal = 0; 
    }
    else
    {
       console.log("else total1: " + total1);
       subtotal = parseInt(total1, 10); 
    }
    
    console.log("precio:" + precio);
    console.log("subtotal:" + subtotal);
    
   totalgeneral = precio + subtotal ; 
  };
  console.log("totalgeneral:" + totalgeneral);
 //Se declara la variable en la cual se va a mostrar el resultado.
 var resultTable = document.getElementById("resultados");
//Se declara una variable llamada HTML en la cual se guardará toda la información del HTML
   var html=''; 
  for(var i = 0;objeto.datos.length>i ;i++){
     html += '<tr>';
     html += '<td>' + arraycodigo[i]  + '</td>';
     html += '<td>' + arrayNombre[i]  + '</td>';
     html += '<td>' + arrayvalor[i]  + '</td>';
     html += '<td>' + arraycantidad[i] + '</td>';
     html += '<td>' + parseInt((arrayvalor[i]),10)*parseInt((arraycantidad[i]),10)+'</td>';
     html += '</tr>';
    }
 // se envia a la variable HTML para cambiar la sintaxis del HTML de la variable result.

 resultTable.innerHTML= html;    
 
}

