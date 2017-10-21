
$( document ).ready(function() {
   $('#cancelApp').hide();
});

$('#newApp').click(function (){
   
   $('#ifError').empty();
   var value = $('#newApp').val();
	if(value == 'NEW' ){
		$('#newApp').attr({type :'submit', value:'ADD' });
     		$('#addAppointment').show();
      		$('#cancelApp').show();
	}else{
      		var date = $('#datepicker').val();
      		var time = $('#time').val();
     		var desc = $('#description').val();
      
      		if( date != '' && time != '' && desc != '' ){
         		$("#appForm").submit();
        
     		}else{
         		$('#ifError').append("<strong>Error: All inputs are requeired...</strong>");
     		}
	}
});

// To allow only future date
$(function() {
   $( "#datepicker" ).datepicker({minDate: 0});
} );

   
$('#cancelApp').click(function(){
   $('#newApp').attr({ type:'button', value:'NEW' });
   $('#addAppointment').hide();
   $('#cancelApp').hide();
});

//$('#searchButton').click( function getAppointments(){
$('#searchButton').click(getAppointments);
function getAppointments(){
  
   var search = $('#searchText').val();
   $.ajax({
      type: 'POST',
      url: '/cgi-bin/search.pl',
      dataType: 'json',
      data: { 'searchValue' : search },
      success: function(data){
         $('#tableContent').empty();
         $('#ifNoAppData').empty();
         
         if( data.length === 0 ){
            $('#ifNoAppData').append('<h3>There is no appointment with description__:  <em>' + search + '</em>.</h3>');
         }
         else{
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
         alert("Handle Errors: something is error in Ajax request.");
      },
      complete: function() {
      }
  });
}
