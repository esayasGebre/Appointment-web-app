#!C:\xampp\perl/bin/perl.exe

#DBI is the standard database interface module for Perl. It defines a set of methods, 
#variables and conventions that provide a consistent database interface independent of the actual database being used.
use DBI;
use CGI qw(:standard -debug);

# checks post request
if($ENV{'REQUEST_METHOD'} eq 'POST'){ 

  my $dbh =DBI->connect("dbi:SQLite:appDB.db") || die "can not connect to the database";
  
  #assigning each parametres to the spacific variables and
  #on bellow INSERT statment I have used it to store  to the database
  my $date=param("date"); 
  my $time=param("time"); 
  my $descriptionValue=param("description"); 
   
   #if appointment table not exist the bellow command
   #will create a new table with the name of appointment. 
  $dbh->do("CREATE TABLE appointment(
           id INTEGER PRIMARY KEY,
           date TEXT,
           time TEXT,
           description VARCHAR(100))");
  
#store the recored to the database table called appointment 
  $dbh->do("INSERT INTO appointment(date,time,description) values(?,?,?)",
		undef,
		$date, $time,$descriptionValue);
  
#close database
  $dbh->disconnect(); 
}

#Redirect to the main page (index.html in side directory perlApp)
print ("Location: http://localhost\\perlApp\n");      
print ("Content-type: text/html\n\n");
 
