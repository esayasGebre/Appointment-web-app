
$('#newApp').click(function doSomething(){
   
   $('#ifError').empty();
   var value = $('#newApp').val();
	if(value == 'NEW' ){
		$('#newApp').attr({
		type :'submit',
		value:'ADD'
		});
	}else{
      var inputDate = $('#vDate').val();
      var valid = isFutureDate(inputDate);
      if(valid === true){
            $("#appForm").submit();
      }else{
         $('#ifError').append("<strong>Error: Appointments shouldn't be made in the past.</strong>");
      }
	}
});

//The DATE input should contain a date picker with built in validation.
//(Appointments shouldn't be made in the past).
function isFutureDate(inputDate) {
   var currentDate = new Date().getTime();
   ddate = inputDate.split("-");
   inputDate = new Date(ddate[0], ddate[1]-1, ddate[2]).getTime();
   //console.log(inputDate);
   //console.log(currentDate);
   return (inputDate >= currentDate) ? true : false;
}
   
$('#cancelApp').click(function(){
   $('#newApp').attr({
   type:'button',
   value:'NEW'
   });
});

$( document ).ready(function() {
   $('#cancelApp').hide();
});

$('#newApp').click(function(){
   $('#addAppointment').show();
   $('#cancelApp').show();
});

$('#cancelApp').click(function(){
   $('#addAppointment').hide();
   $('#cancelApp').hide();
});

//$('#searchButton').click( function getAppointments(){
$('#searchButton').click(getAppointments);

function getAppointments(){
   $('#ifNoAppData').empty();
   var search = $('#searchText').val();
   $.ajax({
        type: 'POST',
        url: '/cgi-bin/search.pl',
        dataType: 'json',
        data: { 'searchValue' : search },
        success: function(data){
		
            $('#tableContent').empty();

            if( data.length === 0 ){
		$('#ifNoAppData').append('<h3>There is no appointment with description__:  <em>' + search + '</em>.</h3>');
            }
            else{
               $('#ifNoAppData').empty();
               $('#tableContent').append('<tr><th>DATE</th> <th>TIME</th> <th>DESCRIPTION</th></tr>');
               
               for(var key in data){
                  if(key){
                     $('#tableContent').append('<tr>');		
                     $('#tableContent').append('<td><h4>' + data[key].date + '</h4></td>' +
                     '<td><h4>' + data[key].time + '</h4></td>' + '<td><h4>' + data[key].description + '</h4></td>');
              
                     $('#tableContent').append('</tr>');
                  }
               } 
            }
          
         },
         error: function(){
            alert("Handle Errors: Something is error in Ajax request.");
        },
        complete: function() {
        }
    });
}
