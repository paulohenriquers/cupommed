<?php 
    // Na linha abaixo está pegando as informações presentes no arquivo conexão.php
    require_once 'conexao.php';

    // Verifica se há alguma coisa dentro de $_GET['clinica']
    if(!empty($_GET['clinica'])) {
      header('Content-type: application/json'); //informa ao client o tipo de conteudo a ser retornado, no caso Json

      $clinica = $_GET['clinica'];

      // Verifica o conteudo de serivico, para então armazenar em busca a query especifica.
      if( $clinica != 'all' ) {
        $busca = 'SELECT * FROM clinica INNER JOIN desconto on clinica.id = desconto.id_clinica WHERE nome = "' . $clinica . '"';
      } else {
        $busca = 'SELECT * FROM clinica';
      }

      // Executa a query presente em busca
      $resultado_clinica = mysqli_query( $conn, $busca );

      // Cria um vetor para mais tarde implementar coisas dentro dele.
      $descontos = array();
      
      // Verifica se há alguma informação retornada pela query executada acima.
      // Caso não haja nada, retorna uma mensagem de não encontrado.
      if( ($resultado_clinica) and ($resultado_clinica->num_rows != 0) ) {
          while( $row_clinica = mysqli_fetch_assoc( $resultado_clinica ) ) {
              array_push( $descontos, $row_clinica );
          }  
      } else {
          echo "Nenhum Cupom encontrada";
      }

      // Retorna ao client o array com as informação requisitadas.
      echo json_encode( $descontos );

      return;
    }

    // Código executado caso não haja nada dentro de $_GET['clinica']. 
    $busca_clinicas = 'SELECT * FROM clinica ORDER BY id';
    $resultado_clinicas = mysqli_query( $conn, $busca_clinicas );

    $lista_clinicas = "<ul class='clinicas' >";

    if( ($resultado_clinicas) and ($resultado_clinicas->num_rows != 0) ) {
      while( $row_clinica = mysqli_fetch_assoc( $resultado_clinicas ) ) {
        $lista_clinicas .= '<li>' . $row_clinica['nome'] . '</li>';
      }  
    } else {
        echo "Nenhuma clinica encontrada";
    }

    $lista_clinicas .= '</ul>';

    // Retorna um elemento ul para o html. 
    echo $lista_clinicas;
