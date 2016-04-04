
var currentUserID = [];
/*Convert Javascript Array Objects to JSON Format*/
function toJSON(formArray){
  var obj = {};
  $.each(formArray, function(i, pair){
    var cObj = obj, pObj, cpName;
    $.each(pair.name.split("."), function(i, pName){
      pObj = cObj;
      cpName = pName;
      cObj = cObj[pName] ? cObj[pName] : (cObj[pName] = {});
    });
    pObj[cpName] = pair.value;
  });
  return JSON.stringify(obj);
}

function loadOrders(currentUserID){

}

function deleteFood(foodID){
  var objectData2 = new Object();
  objectData2.id_comida = foodID.toString();
  var JSONFoodID = JSON.stringify(objectData2);
  alert(JSONFoodID);
  $.ajax({
    type: "POST",
    url: "http://feedmeserver.herokuapp.com/EliminarComida",
    data: JSONFoodID,
    contentType: "application/json",
    dataType: 'json'
  })
  .done(function(data, textStatus, jqXHR){
    console.log("Ajax completed: " + data);
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    console.log("Ajax problem: " + textStatus + ". " + errorThrown);
  });
}

/*Send AJAX Request to server to update order status*/
function updateOrderStatus(orderId){
  var orderStatus = $("#orderStatus_"+orderId+" option:selected").text();
  var objectData = new Object();
  objectData.id_orden = orderId;
  var JSONOrderID = JSON.stringify(objectData); //JSON Data to send to Server

  switch(orderStatus){
    case 'N':
      break;
      case 'D':
        $.ajax({
          type: "POST",
          url: "http://feedmeserver.herokuapp.com/ordenDenegada",
          data: JSONOrderID,
          contentType: "application/json",
          dataType: 'json'
        })
        .done(function(data, textStatus, jqXHR){
          console.log("Ajax completed: " + data);
        })
        .fail(function(jqXHR, textStatus, errorThrown){
          console.log("Ajax problem: " + textStatus + ". " + errorThrown);
        });
      break;
    case 'A':
      $.ajax({
        type: "POST",
        url: "https://feedmeserver.herokuapp.com/ordenAceptada",
        data: JSONOrderID,
        contentType: "application/json",
        dataType: 'json'
      })
      .done(function(data, textStatus, jqXHR){
        console.log("Ajax completed: " + data);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        console.log("Ajax problem: " + textStatus + ". " + errorThrown);
      });
      break;
    case 'L':
      $.ajax({
        type: "POST",
        url: "https://feedmeserver.herokuapp.com/ordenLista",
        data: JSONOrderID,
        contentType: "application/json",
        dataType: 'json'
      })
      .done(function(data, textStatus, jqXHR){
        console.log("Ajax completed: " + data);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        console.log("Ajax problem: " + textStatus + ". " + errorThrown);
      });
      break;
    case 'E':
      $.ajax({
        type: "POST",
        url: "https://feedmeserver.herokuapp.com/ordenEntregada",
        data: JSONOrderID,
        contentType: "application/json",
        dataType: 'json'
      })
      .done(function(data, textStatus, jqXHR){
        console.log("Ajax completed: " + data);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        console.log("Ajax problem: " + textStatus + ". " + errorThrown);
      });
      break;
    case 'C':
      break;
    default:
      alert("Ha ocurrido un Error");
  }
}

$(document).ready(function() {
    console.log( "ready!" ); //Test jquery is ready
    var comboBoxOrderStatus; //ComboBox used to change order status
    var collapsibleItem;
    var cardMenuItem;
    var orderIdCompare = 0;
    var index = [-1];
    var popValue = 0;
    var acumular;
    /*Load Orders from Server*/
    $.ajax({
      url: 'https://feedmeserver.herokuapp.com/comidas_cliente',
      type: 'GET',
      cache: false,
      dataType: "json",
      success: function(ordersData) {
        $.each(ordersData, function(key, value){
          comboBoxOrderStatus = '<div class="input-field col s12">';
          comboBoxOrderStatus += "<select id=\"orderStatus_"+value.id_orden+"\" onchange=\"updateOrderStatus("+value.id_orden+")\">";
          comboBoxOrderStatus += "<option value=\"1\" >"+value.estado+"</option>";
          var receivedStatus = value.estado;
          switch(receivedStatus){
            case 'N':
              comboBoxOrderStatus += '<option value="2">A</option>';
              comboBoxOrderStatus += '<option value="3">D</option>';
              comboBoxOrderStatus += '<option value="4">L</option>';
              comboBoxOrderStatus += '<option value="5">E</option>';
              comboBoxOrderStatus += '<option value="6">C</option>';
              break;
            case 'D':
              comboBoxOrderStatus += '<option value="2">A</option>';
              comboBoxOrderStatus += '<option value="3">N</option>';
              comboBoxOrderStatus += '<option value="4">L</option>';
              comboBoxOrderStatus += '<option value="5">E</option>';
              comboBoxOrderStatus += '<option value="6">C</option>';
              break;
            case 'A':
              comboBoxOrderStatus += '<option value="2">N</option>';
              comboBoxOrderStatus += '<option value="3">D</option>';
              comboBoxOrderStatus += '<option value="4">L</option>';
              comboBoxOrderStatus += '<option value="5">E</option>';
              comboBoxOrderStatus += '<option value="6">C</option>';
              break;
            case 'L':
              comboBoxOrderStatus += '<option value="2">A</option>';
              comboBoxOrderStatus += '<option value="3">D</option>';
              comboBoxOrderStatus += '<option value="4">N</option>';
              comboBoxOrderStatus += '<option value="5">E</option>';
              comboBoxOrderStatus += '<option value="6">C</option>';
              break;
            case 'E':
              comboBoxOrderStatus += '<option value="2">A</option>';
              comboBoxOrderStatus += '<option value="3">D</option>';
              comboBoxOrderStatus += '<option value="4">L</option>';
              comboBoxOrderStatus += '<option value="5">N</option>';
              comboBoxOrderStatus += '<option value="6">C</option>';
              break;
            case 'C':
              comboBoxOrderStatus += '<option value="2">A</option>';
              comboBoxOrderStatus += '<option value="3">D</option>';
              comboBoxOrderStatus += '<option value="4">L</option>';
              comboBoxOrderStatus += '<option value="5">E</option>';
              comboBoxOrderStatus += '<option value="6">N</option>';
              break;
            default:
              alert("Ha ocurrido un Error");
          }
          comboBoxOrderStatus += "</select>";
          comboBoxOrderStatus += "<label></label>";
          comboBoxOrderStatus += "</div>";

          popValue = index.pop();
          if(popValue == value.id_orden){
            acumular = "<li>";
            acumular += "<strong>Nombre del Plato: </strong>"+value.nombre+" <strong>Precio: </strong>"+value.precio+"</li>";
            $("#orden_"+value.id_orden+"").append(acumular);
            index.push(value.id_orden);
          }else {
            collapsibleItem = "<li>";
            collapsibleItem += "<div class=\"collapsible-header\"><i class=\"material-icons\">description</i>ID de Orden: "+value.id_orden+"</div>"
            collapsibleItem += "<div class=\"collapsible-body\">";
            collapsibleItem += "<div class=\"container\">";
            collapsibleItem += "</br>"
            collapsibleItem += "<ul id=\"orden_"+value.id_orden+"\">";
            collapsibleItem += "<li> Estado De La Orden: "+comboBoxOrderStatus+" </li>";
            collapsibleItem += "<li> Tiempo: "+value.tiempo+" </li>";
            collapsibleItem += "<li><strong> Nombre del plato: </strong>"+value.nombre+" <strong> Precio: </strong>"+value.precio+"</li>";
            collapsibleItem += "</ul>";
            collapsibleItem += "</br>"
            collapsibleItem += "</div>";
            collapsibleItem += "</div>";
            collapsibleItem += "</li>";
            $("#listadoDeOrdenes").append(collapsibleItem);
            //acumular = "";
            index.push(value.id_orden);
          }
          $('select').material_select();
          $('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
          });
        });
      },
      error: function(e) {
        //called when there is an error
        //console.log(e.message);
      }
    });

    /*Load Foods from Server*/
    $.ajax({
      url: 'https://feedmeserver.herokuapp.com/comidas',
      type: 'GET',
      cache: false,
      dataType: "json",
      success: function(menuItem) {
        $.each(menuItem, function(key, value){
            //cardMenuItem = "<div class=\"container\">";
            cardMenuItem = '<div class="card medium col s5 m3 push-m1" style="margin-left:20px">';
            cardMenuItem += '<div class="card-image waves-effect waves-block waves-light">';
            cardMenuItem += "<img class=\"activator\" src=\""+value.foto+"\">";
            cardMenuItem += "</div>";
            cardMenuItem += '<div class="card-content">';
            cardMenuItem += "<span class=\"card-title activator grey-text text-darken-4\">"+value.nombre+"<i class=\"material-icons right\">more_vert</i></span>";
            cardMenuItem += "<p>Precio: "+value.precio+"</p>";
            cardMenuItem += "</div>";
            cardMenuItem += '<div class="card-reveal">';
            cardMenuItem += "<span class=\"card-title grey-text text-darken-4\">ID Comida: "+value.id_comida+"<i class=\"material-icons right\">close</i></span>"
            cardMenuItem += "<p>"+value.descripcion+"</p>"
            cardMenuItem += "<ul>";
            cardMenuItem += "<li>Categoria: "+value.categoria+" </li>";
            cardMenuItem += "<li>Veces Ordenada: "+value.veces_ordenada+" </li>";
            cardMenuItem += "<li>ID Restaurante: "+value.id_restaurante+" </li>";
            cardMenuItem += "<li>Nombre Restaurante: "+value.nom_restaurante+" </li>";
            cardMenuItem += "</ul>";
            cardMenuItem += "</div>";
            cardMenuItem += "<div class=\"card-action\">";
            cardMenuItem += "<a href=\"#\" onClick=\"deleteFood("+value.id_comida+")\">Eliminar</a>";
            cardMenuItem += "<a href=\"#\">Modificar</a>";
            cardMenuItem += "</div>";
            cardMenuItem += "</div>";
            //cardMenuItem += "</div>";
            $("#indexComidas").append(cardMenuItem);
        });
      },
      error: function(e) {
        //called when there is an error
        //console.log(e.message);
      }
    });


    /*Submit Registration Form*/
    $("#registrationForm").submit(function(event){
      /*Get data from password fields and assign values to variables*/
      var registrationPassword = $("#restaurant_registrationPassword").val();
      var confirmRegistrationPassword = $("#restaurant_confirmRegistrationPassword").val();

      /*Validate if password length is equal or greater than 8 characters */
      if(registrationPassword.length < 8){
        alert("La longitud de la contrasena debe ser mayor o igual a 8 caracteres");
        event.preventDefault(); //Prevent Form Submission
      }else{
        /*Validate if password and password confirmation fields match*/
        if(registrationPassword != confirmRegistrationPassword){
          alert("Las contrasenas no son iguales, vuelva a introducirlas");
          event.preventDefault(); //Prevent Form Submission
        }else{
          /*Sumbit Form*/
          var registrationFormArray = $("#registrationForm").serializeArray(); //Serialize all the data in the form
          var registrationJSONData = toJSON(registrationFormArray); //Convert form data to JSON formData
          $.ajax({
            type: "POST",
            url: "https://feedmeserver.herokuapp.com/restaurante_create",
            data: registrationJSONData,
            contentType: "application/json",
            dataType: 'json'
          })
          .done(function(data, textStatus, jqXHR){
            console.log("Ajax completed: " + data);
          })
          .fail(function(jqXHR, textStatus, errorThrown){
            console.log("Ajax problem: " + textStatus + ". " + errorThrown);
            alert("Bienvenido");
            window.location.href = "mainPage.html";
          });
          event.preventDefault();
        }
      }
    }); //End Registration Form Submit

    /*Submit Login Form*/
    $("#loginForm").submit(function(event){
      var loginData = new Object();
      loginData.id_usuario = $("#restaurant_loginID").val();
      loginData.contrasena = $("#restaurant_loginPassword").val();
      var JSONloginData = JSON.stringify(loginData);
      $.ajax({
        type: "POST",
        url: "https://feedmeserver.herokuapp.com/loginRestaurante",
        data: JSONloginData,
        contentType: "application/json",
        dataType: 'json'
      })
      .done(function(data, textStatus, jqXHR){
        console.log("Ajax completed: " + data);
      })
      .fail(function(responseDataArray, textStatus, errorThrown){
        if(responseDataArray.responseText == "existe" && responseDataArray.status == 200){
          //currentUserID = loginData.id_usuario;
          alert("Bienvenido");
          window.location.href = "mainPage.html";
        }else if(responseDataArray.status == 401){
          alert("Error, Su Usuario o Contrasena no son validos!");
          console.log("Ajax problem: " + textStatus + ". " + errorThrown);
        }
      });
      event.preventDefault();
    });//End Login Form Submit

    /*Submit MenuItem Form*/
    $("#foodItemForm").submit(function(event){
      var menuItemFormJSONdata = new Object();
      var menuItemCategory = $("#menuItem_category").val();

      menuItemFormJSONdata.name = $("#menuItem_name").val();
      menuItemFormJSONdata.price = $("#menuItem_price").val();
      menuItemFormJSONdata.descript = $("#menuItem_description").val();
      menuItemFormJSONdata.category = $("#menuItem_category").val();
      menuItemFormJSONdata.foto = $("#menuTime_picture").val();
      menuItemFormJSONdata.id_restaurante = "usuario7";

      $.ajax({
        type: "POST",
        url: "https://feedmeserver.herokuapp.com/comida_create",
        data: JSON.stringify(menuItemFormJSONdata),
        contentType: "application/json",
        dataType: 'json'
      })
      .done(function(data, textStatus, jqXHR){
        console.log("Ajax completed: " + data);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        alert("Comida agregada exitosamente");
        console.log("Ajax problem: " + textStatus + ". " + errorThrown);
        window.location.href = "comidasIndex.html";
      });
      event.preventDefault();
    });

    /*Hacer la accion del select al hacer un cambio en el status de la orden*/
    /*
    $("#orderStatus").change(function(){
      var text = $("option:selected",this).text();
      console.log(text);
    });*/

    /*Materialize code*/

    $('select').material_select();
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();
});
