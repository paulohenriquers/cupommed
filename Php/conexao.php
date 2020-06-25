<?php
    // Esse arquivo contem todo o código necessário para a conexão com o banco de dados. 
    $servidor = 'localhost';
    $usuario = 'root';
    $senha = '';
    $dbName = 'cupom_med';

    // Cria a conexão com o banco de dados
    $conn = mysqli_connect($servidor, $usuario, $senha, $dbName);
?>
