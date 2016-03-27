
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
        url: "http://feedmeserver.herokuapp.com/ordenAceptada",
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
        url: "http://feedmeserver.herokuapp.com/ordenLista",
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
        url: "http://feedmeserver.herokuapp.com/ordenEntregada",
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

    var comboBox;
    var editOrder = [];

    /*Load Orders from Server*/
    $.ajax({
      url: 'http://feedmeserver.herokuapp.com/comidas_cliente',
      type: 'GET',
      cache: false,
      dataType: "json",
      success: function(ordersData) {
        $.each(ordersData, function(key, value){
          comboBox = '<div class="input-field col s12">';
          comboBox += "<select id=\"orderStatus_"+value.id_orden+"\" onchange=\"updateOrderStatus("+value.id_orden+")\">";
          comboBox += '<option value="" disabled selected>Estado de la Orden</option>';
          comboBox += '<option value="1">N</option>';
          comboBox += '<option value="2">A</option>';
          comboBox += '<option value="3">D</option>';
          comboBox += '<option value="3">L</option>';
          comboBox += '<option value="3">E</option>';
          comboBox += '<option value="3">C</option>';
          comboBox += "</select>";
          comboBox += "<label>Estado de la Orden</label>";
          comboBox += "</div>";
          $("#ordersTable > tbody").append(
            "<tr><td>"+
            value.nombre+"</td><td>"+
            value.precio+"</td><td>"+
            value.id_orden+"</td><td>"+
            value.tiempo+"</td><td>"+
            comboBox+"</td></tr>"
          );
          $('select').material_select();
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
            url: "http://feedmeserver.herokuapp.com/restaurante_create",
            data: registrationJSONData,
            contentType: "application/json",
            dataType: 'json'
          })
          .done(function(data, textStatus, jqXHR){
            console.log("Ajax completed: " + data);
          })
          .fail(function(jqXHR, textStatus, errorThrown){
            console.log("Ajax problem: " + textStatus + ". " + errorThrown);
          });
          event.preventDefault();
        }
      }
    }); //End Registration Form Submit

    /*Submit Login Form*/
    $("#loginForm").submit(function(event){
      var loginFormArray = $("#loginForm").serializeArray();//Serialize all the data in the form
      var loginJSONData = toJSON(loginFormArray);//Convert form data to JSON formData
      $.ajax({
        type: "POST",
        url: "http://feedmeserver.herokuapp.com/loginRestaurante",
        data: loginJSONData,
        contentType: "application/json",
        dataType: 'json'
      })
      .done(function(data, textStatus, jqXHR){
        console.log("Ajax completed: " + data);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        console.log("Ajax problem: " + textStatus + ". " + errorThrown);
      });
      event.preventDefault();
    });//End Login Form Submit

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
