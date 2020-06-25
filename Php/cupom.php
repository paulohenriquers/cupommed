<?php 
    // Na linha abaixo está pegando as informações presentes no arquivo conexão.php
    require_once 'conexao.php';
    
    // Verifica se há alguma coisa dentro de $_GET['id']
    if(!empty($_GET['id'])) {
        header('Content-type: application/json'); //informa ao client o tipo de conteudo a ser retornado, no caso Json

        $cupomId = $_GET['id'];
        
        // Comando para buscar no banco de dados todas as inormações da tabela desconto.
        $busca = 'SELECT * FROM `desconto` INNER JOIN clinica ON desconto.id_clinica = clinica.id WHERE desconto.id_cupom =' . $cupomId;
        
        // Executa o comando acima.
        $resultado_cupom = mysqli_query( $conn, $busca );

        // Cria um vetor para mais tarde implementar coisas dentro dele.
        $descontos = array();
        
        // Verifica se há alguma informação retornada pela query executada acima.
        // Caso não haja nada, retorna uma mensagem de não encontrado.
        if( ($resultado_cupom) and ($resultado_cupom->num_rows != 0) ) {
            while( $row_cupom = mysqli_fetch_assoc( $resultado_cupom ) ) {
                array_push( $descontos, $row_cupom );
            }  
        } else {
            echo "Nenhum Cupom encontrada";
            return;
        }

        // Retorna ao client o array com as informação requisitadas.
        echo json_encode( $descontos );

        return;
    }