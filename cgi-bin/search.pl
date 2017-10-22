#!C:\xampp\perl/bin/perl.exe

use DBI;
use CGI qw(:standard);
use utf8;
print header('application/json');
use JSON -support_by_pp;

#Assign the search value to the variable called str that we request from search inptbox 
	my $str =param("searchValue");
	
	my $dbh =DBI->connect("dbi:SQLite:appDB.db")
	|| die $DBI::errstr;
	
    	my $sql;

#To get all appointments (if search input box null)
	if($str eq ""){
		$sql='SELECT * FROM appointment';
	}

#To get recoreds/appointments only that contain the value of str in any part of the description content  
	$sql = 'SELECT * FROM appointment WHERE description LIKE ?';
	my $sth = $dbh->prepare($sql);
	$sth->execute("%$str%");
	
	my $data_json=[];
	while (my @row = $sth->fetchrow_array) {
	#putting the result set to the array of object
		push @{$data_json},{'date'=>$row[0],'time'=>$row[1],'description'=>$row[2]}; 
	}
    	$sth->finish();
    	$dbh -> disconnect();

#Converting all pushed result sets of data_json to json object json_object
	my $json_object = to_json( $data_json, { utf8 => 1, pretty => 1 } ); 
	print "$json_object";
