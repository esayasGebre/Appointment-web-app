#!C:\xampp\perl/bin/perl.exe

use DBI;
use CGI qw(:standard);
use utf8;
use Encode;
print header('application/json');
use JSON -support_by_pp;

#assign the serche value to the variable
#called str that came from search inptbox 
my $str =param("searchValue");
my $dbh =DBI->connect("dbi:SQLite:appDB.db") || die "can not connect to the database";
my $sql;

#to get all appointment (if search input box null)
if($str eq ""){
	$sql='SELECT * FROM appointment';
}

#get recoreds only that have content of str in any location of the description attribute 
$sql = 'SELECT * FROM appointment WHERE description LIKE ?';
my $sth = $dbh->prepare($sql);
$sth->execute("%$str%");
my $data_json=[];
while (my @row = $sth->fetchrow_array) {
	#putting Result set to array of objcts
	push @{$data_json},{'date'=>$row[1],'time'=>$row[2],'description'=>$row[3]}; 
}

$dbh -> disconnect();

# converting all pushed result sets of data_json to json object json_object
my $json_object = to_json( $data_json, { utf8 => 1, pretty => 1 } ); 
print "$json_object";

