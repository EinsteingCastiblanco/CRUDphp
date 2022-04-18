<?php

include 'Conexion.php';

//si exite una varible enviada por metodo post
if(isset($_POST['nombre']) ){
    //creamos variables con los datos que recibimos
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $consulta = " INSERT INTO `tareas`(`id`, `nombre`, `descripcion`) VALUES ('','$nombre','$descripcion') ";
    $resultado = mysqli_query( $conexion, $consulta);

    if(!$resultado){
        die('ocurrio un error');
    }else {
        echo "guardado";
    }
}else {
    echo "todos los campos son obligatorios";
}
?>