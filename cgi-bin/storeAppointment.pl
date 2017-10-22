#!C:\xampp\perl/bin/perl.exe

use DBI;
use CGI qw(:standard);

#Checks post request
if($ENV{'REQUEST_METHOD'} eq 'POST'){ 

    my $dbh =DBI->connect("dbi:SQLite:appDB.db")
    || die $DBI::errstr;

#assigning each parametres to the spacific variables and
#on bellow INSERT statment I have used it to store  to the database
    my $date=param("date"); 
    my $time=param("time"); 
    my $descriptionValue=param("description"); 
   
#if appointment table not exist the bellow command
#will create a new table with the name of appointment. 
    $dbh->do("CREATE TABLE appointment(
           date TEXT,
           time TEXT,
           description VARCHAR(100))");

#prepare statement and store the recored to the database table called appointment 
    my $sth = $dbh->prepare("INSERT INTO appointment
                          (date,time,description) VALUES(?,?,?)");
    $sth ->execute($date, $time,$descriptionValue) || die $DBI::errstr;
    $sth->finish();

#clse database
    $dbh->disconnect(); 
}

#Redirect to the main page (index.html in side directory perlApp)
print ("Location: http://localhost\\appointmentApp\n");      
print ("Content-type: text/html\n\n");
