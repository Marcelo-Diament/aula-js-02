<?php
    $tituloDaPagina = "Mensagem Enviada | JS - Aula 02";

    if($_REQUEST && isset($_REQUEST)):
        if(isset($_REQUEST["inputNome"])) { $nome = $_REQUEST["inputNome"]; }
        if(isset($_REQUEST["inputEmail"])) { $email = $_REQUEST["inputEmail"]; }
        if(isset($_REQUEST["inputCep"])) { $cep = $_REQUEST["inputCep"]; }
        if(isset($_REQUEST["inputCidade"])) { $cidade = $_REQUEST["inputCidade"]; }
        if(isset($_REQUEST["inputEstado"])) { $estado = $_REQUEST["inputEstado"]; }
        if(isset($_REQUEST["inputLogradouro"])) { $logradouro = $_REQUEST["inputLogradouro"]; }
        if(isset($_REQUEST["inputNumero"])) { $numero = $_REQUEST["inputNumero"]; }
        if(isset($_REQUEST["inputComplemento"])) { $complemento = $_REQUEST["inputComplemento"]; }
        if(isset($_REQUEST["inputMensagem"])) { $mensagem = $_REQUEST["inputMensagem"]; }
        if(isset($_REQUEST["inputAceite"])){ $aceite = $_REQUEST["inputAceite"]; }

    endif;

    require_once("./inc/head.php");
?>
<body>
    <?php require_once("./inc/header.php"); ?>
    <main class="container my-5">

        <?php if( $_REQUEST && isset($_REQUEST) ): ?>
            
            <article>
                <h2>Obrigado! Os seguintes dados foram recebidos:</h2>
                <table class="table table-bordered my-5">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">email</th>
                            <th scope="col">CEP</th>
                            <th scope="col">Cidade - UF</th>
                            <th scope="col" colspan="2">Logradouro</th>
                            <th scope="col">Número - Complemento</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" rowspan="2"><?= $nome ?></th>
                            <td><?= $email ?></td>
                            <td><?= $cep ?></td>
                            <td><?= $cidade  . " - " . $estado ?></td>
                            <td colspan="2"><?= $logradouro ?></td>
                            <td><?= "n&deg; " . $numero . ", " . $complemento ?></td>
                        </tr>
                        <tr>
                            <td colspan="6" class="text-left pl-3"><?= $mensagem ?></td>
                        </tr>
                    </tbody>
                </table>
                <?php if(!isset($aceite)): ?>
                    <small class="bg-danger text-white p-3">Os termos do site não foram aceitos</small>
                <?php else: ?>
                    <small class="bg-success text-white p-3">Os termos do site foram aceitos</small>
                <?php endif; ?>
            </article>

        <?php else: ?>
        
            <article class="alert alert-warning col-6 mx-auto" role="alert">
                <p><b>Ops... parece que nenhum dado foi recebido!</b></p>
                <p>Por favor, preencha o formulário de <a href="contato.php" title="Acessar o formulário de contato" rel="next">Contato</a>.</p>
                <p>Se você acabou de preencher o formulário, foi direcionado para essa página e está vendo essa mensagem...<br/>deve ter algum erro no seu código! Nesse caso... bora debugar! hehehe</p>
            </article>

        <?php endif; ?>
    </main>
   <?php require_once("./inc/footer.php"); ?>
</body>
</html>