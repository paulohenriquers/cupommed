<?php 
    //  Na linha abaixo está pegando as informações presentes no arquivo conexão.php
    require_once 'conexao.php';
    
    // Verifica se há alguma coisa dentro de $_GET['servicos']
    if( !empty( $_GET['servicos'] ) ) {
        header('Content-type: application/json'); //informa ao client o tipo de conteudo a ser retornado, no caso Json

        $servico = $_GET['servicos'];

        // Verifica o conteudo de serivico, para então armazenar em busca a query especifica. 
        if( $servico == 'hoje' ) {
            $busca = 'SELECT * FROM desconto INNER JOIN clinica on desconto.id_clinica = clinica.id WHERE DATE(desconto.data) = CURDATE()';
        } else {
            $busca = 'SELECT * FROM desconto INNER JOIN clinica on desconto.id_clinica = clinica.id WHERE desconto.servico = "' . $servico . '"';
        }

        // Executa a query presente em busca
        $resultado_servicos = mysqli_query( $conn, $busca );

        // Cria um vetor para mais tarde implementar coisas dentro dele.
        $descontos = array();
        
        // Verifica se há alguma informação retornada pela query executada acima.
        // Caso não haja nada, retorna uma mensagem de não encontrado.
        if( ($resultado_servicos) and ($resultado_servicos->num_rows != 0) ) {
            while( $row_servico = mysqli_fetch_assoc( $resultado_servicos ) ) {
                array_push( $descontos, $row_servico );
            }  
        } else {
            echo "Nenhum Cupom encontrada";
        }

        // Retorna ao client o array com as informação requisitadas.
        echo json_encode( $descontos );

        return;
    }

    // Código executado caso não haja nada dentro de $_GET['servicos']. 
    $busca_servicos = 'SELECT servico FROM desconto GROUP BY servico';
    $resultado_servicos = mysqli_query( $conn, $busca_servicos );

    $lista_servicos = "<ul class='servicos' >";

    if( ($resultado_servicos) and ($resultado_servicos->num_rows != 0) ) {
      while( $row_servico = mysqli_fetch_assoc( $resultado_servicos ) ) {
        $lista_servicos .= '<li>' . $row_servico['servico'] . '</li>';
      }  
    } else {
        echo "Nenhuma categoria encontrada";
    }

    $lista_servicos .= '</ul>';

    // Retorna um elemento ul para o html. 
    echo $lista_servicos;
