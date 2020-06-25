<?php 
    // Na linha abaixo está pegando as informações presentes no arquivo conexão.php
    require_once 'conexao.php';

    // Verifica se há alguma coisa dentro de $_GET['cupom']
    if( !empty($_GET['cupom']) ) {
        // Decodifica a informação contida dentro de $_GET['cupom'] para a estrutura Json.
        // Logo após recolhe toda informação necessária para a criação do cupom.
        $novoCupom = json_decode($_GET['cupom'], true);
        $id_clinica = $novoCupom['idClinica'];
        $servico = $novoCupom['servicoNome'];
        $porcentagem = $novoCupom['porcentagem'];
        $preco_original = $novoCupom['precoOriginal'];
        $data = $novoCupom['data'];

        // Comando usado para inserir no banco de dados.
        $inserir = "INSERT INTO `desconto`(`id_cupom`, `id_clinica`,`servico`, `porcentagem`, `preco_original`, `data`)
        VALUES (NULL, $id_clinica, '$servico', $porcentagem, $preco_original, '$data')";

        // Executa o comando acima.
        $insere_cupom = mysqli_query( $conn, $inserir );

        // Se tudo ocorreu bem, retorna uma mensagem positiva.
        if( mysqli_insert_id( $conn ) ) {
            echo "Novo cupom foi criado!";
        } else {
            echo "Não foi possivel criar um novo cupom!";
        }
    }
