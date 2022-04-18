<?php
include 'Conexion.php';

$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$id = $_POST['id'];

echo $id;
$consulta = " UPDATE `tareas` SET `nombre`='$nombre', `descripcion`='$descripcion' WHERE id = '$id' ";
$resultado = mysqli_query($conexion, $consulta);

if (!$resultado) {
    die("error");
}
?>