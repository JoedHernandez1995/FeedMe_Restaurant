
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

$(document).ready(function() {
    console.log( "ready!" ); //Test jquery is ready

    var comboBox = '<div class="input-field col s12">';
        comboBox += '<select class="orderStatus">';
        comboBox += '<option value="" disabled selected>Estado de la Orden</option>';
        comboBox += '<option value="1">Aceptada</option>';
        comboBox += '<option value="2">Pendiente</option>';
        comboBox += '<option value="3">Cancelada</option>';
        comboBox += "</select>";
        comboBox += "<label>Estado de la Orden</label>";
        comboBox += "</div>";

    var editOrder = [];

    /*Load Orders from Server*/
    $.ajax({
      url: 'http://feedmeserver.herokuapp.com/comidas_cliente',
      type: 'GET',
      cache: false,
      dataType: "json",
      success: function(ordersData) {
        $.each(ordersData, function(key, value){
          $("#ordersTable > tbody").append("<tr><td>"+
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
