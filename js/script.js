$( document ).ready(function() {
   $('#cancelApp').hide();
});

$('#newApp').click(function(){
   
   $('#ifError').empty();
   var value = $('#newApp').val();
	if(value == 'NEW' ){
		$('#newApp').attr({ type :'submit', value:'ADD' });
		$('#addAppointment').show();
      		$('#cancelApp').show();
	}else{
		var inputDate = $('#vDate').val();
		var valid = futureDate(inputDate);
		
      		if(valid === true){
            		$("#appForm").submit();
      		}else{
         		$('#ifError').append("<strong>Error: Appointments shouldn't be made in the past.</strong>");
      		}
	}
});

//The DATE input should contain a date picker with built in validation.
//(Appointments shouldn't be made in the past).
function futureDate(inputDate) {
   var currentDate = new Date().getTime();
   ddate = inputDate.split("-");
   inputDate = new Date(ddate[0], ddate[1]-1, ddate[2]).getTime();
   //console.log(inputDate);
   //console.log(currentDate);
   return (inputDate >= currentDate) ? true : false;
}
   
$('#cancelApp').click(function(){
   $('#newApp').attr({ type:'button', value:'NEW' });
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
			var row = '<tr>';
                  	row = row +  '<td>' + data[key].date + '</td>' +
                     		'<td>' + data[key].time + '</td>' +
                     		'<td>' + data[key].description + '</td>';
                  	row = row + '</tr>';
                  	$('#tableContent').append(row);
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
