<?php

include ('Conexion.php');


    //realizar consulta
    $consulta = "SELECT * FROM `tareas` ";

    //este metodo requiere dos parametros, la conexion y la consulta
    $resultado = mysqli_query($conexion, $consulta);

    //en caso de fallar la consulta
    if (!$resultado) {
        die("error");
    }

    //recorremos el resultado
    //? toca transformar el resultado en un arrelgo para poder recorrerlo. con mysqli_fetch_array

    $json = array();
    while($fila = mysqli_fetch_array($resultado)) {
    //se crea un arreglo que va contener los datos que se traiga
      $json[] = array(
        'nombre' => $fila['nombre'],
        'descripcion' => $fila['descripcion'],
        'id' => $fila['id']
      );
    }
    //se convierten los datos del JSON en string
    $jsonstring = json_encode($json);
    echo $jsonstring;

?>
