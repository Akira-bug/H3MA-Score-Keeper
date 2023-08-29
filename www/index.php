<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<html>
<head>
    <title>Database testing page</title>
    <style>
        th { 
            text-align: left; 
        }

        table. th, td {
            border: 2px solid grey;
            border-collapse: collapse;
        }

        th, td {
            padding: 0.2em;
        }

    </style>
</head>

<body>
    <h1>Database test page!</h1>

    <p>Showing contents of fencers table:</p>
    <table border="1">
        <tr><th>ID</th> <th>Name</th> <th>Club</th></tr>
        
        <?php
        $db_host = '127.0.0.1';
        $db_name = 'fvision';
        $db_user = 'webuser';
        $db_passwd = 'insecure_db_pw';

        $pdo_dsn = "mysql:host=$db_host;db_name=$db_name";

        $pdo = new PDO($pdo_dsn, $db_user, $db_passwd);

        $q = $pdo->query("SELECT * FROM fencers);

        while($row = $q->fetch()){
            echo "<tr><td>".$row["id"]."</td><td>".$row["name"]."</td><td>".$row["club"]."</td></tr>\n";
        }
        ?>
    </table>
</body>
</html>