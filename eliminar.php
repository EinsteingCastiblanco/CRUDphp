<?php 
include 'Conexion.php';

//verificamos que nos este enviando un valor por el metodo post
if(isset($_POST['id'])) {
    $id = $_POST['id'];

    $consulta = "DELETE FROM `tareas` WHERE id = $id";

    $ejecutar = mysqli_query( $conexion, $consulta );

    if(!$ejecutar){
        echo "no se pudo eliminar";
    } else {
        echo "se elimino";
    }
}
?>