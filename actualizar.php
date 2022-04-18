<?php

include 'Conexion.php';

if (isset($_POST['id'])) {

    $id = $_POST['id'];
    $consulta = "SELECT * FROM `tareas` WHERE id = '$id' ";
    $resultado = mysqli_query($conexion, $consulta);

    if (!$resultado) {
        die("error");
    }

    //recorremos el resultado
    //? toca transformar el resultado en un arrelgo para poder recorrerlo. con mysqli_fetch_array
    $json = array();
    while ($fila = mysqli_fetch_array($resultado)) {
        //se crea un arreglo que va contener los datos que se traiga
        $json[] = array(
            'nombre' => $fila['nombre'],
            'descripcion' => $fila['descripcion'],
            'id' => $fila['id']
        );
    }
    //se convierten los datos del JSON en string
    $jsonstring = json_encode($json[0]);
    echo $jsonstring;
}
