
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
    url: "https://feedmeserver.herokuapp.com/EliminarComida",
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
          url: "https://feedmeserver.herokuapp.com/ordenDenegada",
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


    /* Submit DEI Form*/
    $("#formularioDEI").submit(function(event){
      var deiItemFormJSONData = new Object();
      deiItemFormJSONData.rtn = $("#deiItem_rtn").val();
      deiItemFormJSONData.correo = $("#deiItem_correo").val();
      deiItemFormJSONData.cai = $("#deiItem_cai").val();
      deiItemFormJSONData.fecha_limite = $("#deiItem_fechaLimite").val();
      deiItemFormJSONData.restauranteid = "usuario7";
      deiItemFormJSONData.facturas_recibidas = $("#deiItem_facturasRecibidas").val();
      alert(JSON.stringify(deiItemFormJSONData));

      $.ajax({
        type: "POST",
        url: "https://feedmeserver.herokuapp.com/createDei",
        data: JSON.stringify(deiItemFormJSONData),
        contentType: "application/json",
        dataType: 'json'
      })
      .done(function(data, textStatus, jqXHR){
        console.log("Ajax completed: " + data);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        alert("Agregado Exitosamente");
        console.log("Ajax problem: " + textStatus + ". " + errorThrown);
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
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 100 // Creates a dropdown of 100 years to control year
    });
});
