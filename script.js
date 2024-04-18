function procesarNombres() {
    // Obtener el prefijo ingresado por el usuario
    var prefijo = document.getElementById("prefijo").value.trim();
    // Obtener la cantidad ingresada por el usuario
    var cantidad = parseInt(document.getElementById("cantidad").value.trim());
    // Obtener los nombres de archivo ingresados por el usuario
    var nombres = document.getElementById("nombresArchivo").value.trim().split("\n");

    // Filtrar los nombres de archivo no deseados
    var nombresFiltrados = nombres.filter(function(nombre) {
        // Expresión regular para filtrar los nombres no deseados
        var regex = /^(?!.*(?:_on|_so|_fla|\.swf|header|formas|sprites|textos|sonidos|fuentes|marcos|scenes|otros|scripts|<default package>|Asset|morphshapes)$).*$/i;
        return regex.test(nombre);
    });

    // Si no hay nombres filtrados, mostrar un mensaje y salir de la función
    if (nombresFiltrados.length === 0) {
        document.getElementById("resultado").value = "No hay nombres de archivo válidos para procesar.";
        return;
    }

    // Inicializar el código generado con la parte INICIO
    var codigoGenerado = "INICIO: DO\n";
    codigoGenerado += "    on activate A1\n\n";

    // Generar el código para cada nombre de archivo filtrado
    for (var i = 0; i < nombresFiltrados.length; i++) {
        var nombre = nombresFiltrados[i].trim();
        var nombreProcesado = prefijo + "." + nombre;
        var secuencia = i + 1;
        var siguienteSecuencia = (i === nombresFiltrados.length - 1) ? "INICIO" : "A" + (secuencia + 1);
        var lineaCodigo = `A${secuencia}: DO\n`;
        lineaCodigo += `    user.state get\n`;
        lineaCodigo += `    inventory.add ${cantidad} ${nombreProcesado}\n`;
        lineaCodigo += `    after 1 ${siguienteSecuencia}\n\n`;
        codigoGenerado += lineaCodigo;
    }

    // Mostrar el resultado en el área de texto correspondiente
    document.getElementById("resultado").value = codigoGenerado;

    // Mostrar el nuevo resultado en el nuevo recuadro
    document.getElementById("nuevo-resultado").value = `EXACT:https://cdn-ar.mundogaturro.com/juego/assets/${prefijo}.swf`;
}

function codificarBase64() {
    // Obtener el código generado por el usuario
    var codigoGenerado = document.getElementById("resultado").value;
    // Codificar en base64
    var codigoBase64 = btoa(codigoGenerado);
    // Mostrar el resultado codificado en base64 en el área de texto correspondiente
    document.getElementById("resultadoBase64").value = codigoBase64;
}

function descargarArchivo() {
    // Obtener el contenido del resultado codificado en base64
    var contenidoBase64 = document.getElementById("resultadoBase64").value;
    // Obtener el prefijo ingresado por el usuario
    var prefijo = document.getElementById("prefijo").value.trim();
    // Crear un objeto Blob con el contenido codificado en base64
    var blob = new Blob([contenidoBase64], { type: "text/plain" });
    // Crear un objeto URL para el Blob
    var url = URL.createObjectURL(blob);
    // Crear un elemento <a> para descargar el archivo
    var a = document.createElement("a");
    // Establecer el nombre del archivo con el prefijo proporcionado
    a.download = prefijo + "_archivo.txt";
    // Establecer el enlace de descarga con el objeto URL del Blob
    a.href = url;
    // Simular un clic en el elemento <a> para iniciar la descarga
    a.click();
    // Liberar el objeto URL
    URL.revokeObjectURL(url);
}

//gracias termer por la lista de la linea 12

// <-- by hash -->
