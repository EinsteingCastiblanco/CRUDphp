//creacion de iffe
$(document).ready(function () {
  //ocultar un elemento cuando inicie
  $("#task-result").hide();
  listarTareas();

  //varible global para editar saber cuando editar datos
  let editar = false;

  //obtenemos lo que se escriba en el elemento con id search
  $("#search").keyup(function () {
    if ($("#search").val()) {
      let busqueda = $("#search").val(); //obtener el valor con val
      console.log(busqueda);

      //! utilizamos jquery una libreria, para simplificar el codigo de ajax
      //? metodo .ajax el cual contiene un objeto
      $.ajax({
        url: "busqueda.php", //donde vamos a realizar la busqueda
        data: { busqueda }, //datos que se van a enviar
        type: "POST", //tipo de peticion
        success: function (respuesta) {
          //? como recibe un JSON la convertimos en un string
          let tarea = JSON.parse(respuesta);

          //tarea es un arreglo por lo tanto lo podemos recorrer con foreach
          let template = "";
          tarea.forEach((tareas) => {
            template += `
                         <li><a href="#" class="task-item">${tareas.nombre}</a></li>
                        `;
          });

          //seleccionamos una lista e imprimimos las tareas
          $("#container").html(template);

          //mostrar el contenido
          $("#task-result").show();
        },
      });
    }
  });

  //* GUARDAR UN ELEMENTO
  $("#task-form").submit(function (e) {
    e.preventDefault();

    //creamos un objeto con los valores de los dos campos
    const objDatos = {
      nombre: $("#name").val(),
      descripcion: $("#description").val(),
      id: $("#taskId").val()
    };

    //! en caso de que la variable editar sea false, se guarda el dato, si no se actualiza
    //condicion ternaria
    let url = editar === false ? 'guardar.php' : 'editar.php';

      //enviar datos con un metodo de ajax que tiene jquery
      $.post(url , objDatos, function (respuesta) {
        console.log(respuesta);

        //cuando guarde vuelve a llamar la funcion de listar
        listarTareas();
        //limpiar los campos cuando reciba una respuesta
        $("#task-form").trigger("reset");
      });
    
  });

  //* LISTAR LOS ELEMENTOS
  function listarTareas() {
    $.ajax({
      url: "listar.php", //datos que se van a enviar
      type: "GET", //tipo de peticion
      success: function (respuesta) {
        let ta = JSON.parse(respuesta);

        let template = "";
        ta.forEach((tareas) => {
          template += `
                <tr task-id="${tareas.id}">
                    <td>${tareas.id}</td>
                    <td><a href="#" class="task-item" >${tareas.nombre}</a></td>
                    <td>${tareas.descripcion}</td>
                    <td>
                        <button class="task-delete btn btn-danger">
                            Borrar
                        </button>
                    </td>
                </tr>
            `;
        });

        $("#tasks").html(template);
      },
    });
  }

  //* ELIMINAR UN ELEMENTO

  //buscar los elementos que tengan la clase task-delete
  $(document).on("click", ".task-delete", function () {
    //desde el boton vamos accediendo al elemento padre para obtener el id
    let elemento = $(this)[0].parentElement.parentElement;
    let id = $(elemento).attr("task-id");

    if (confirm("Desea eliminar este elemento? ")) {
      //enviamos el id al backend para eliminar el elemento
      $.post("eliminar.php", { id }, function (respuesta) {
        listarTareas();
      });
    }
  });

  //* ACTUALIZAR UN ELEMENTO
  $(document).on("click", ".task-item", function () {
    //desde el boton vamos accediendo al elemento padre para obtener el id
    let elemento = $(this)[0].parentElement.parentElement;
    let id = $(elemento).attr("task-id");

    $.post("actualizar.php", { id }, function (resultado) {
      //convertimos el json en un string
      let datos = JSON.parse(resultado);
      //llenar los campos con los datos obtenidos
      $("#name").val(datos.nombre);
      $("#description").val(datos.descripcion);
      $("#taskId").val(datos.id);
      editar = true;
    });
  });
});
