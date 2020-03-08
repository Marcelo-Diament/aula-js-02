<?php
    $tituloDaPagina = "Formulários | JS - Aula 02";
    require_once("./inc/head.php");
?>
<body>
    <?php require_once("./inc/header.php"); ?>
    <main class="container my-5">
        <form id="formContato" action="./obrigado.php" method="post" class="col-6 mx-auto border rounded bg-light p-4">
            <div class="form-row">
                <h3 class="text-center pt-2 pb-0">Formulário de Contato</h3>
                <p class="pt-0 pb-4">Envie sua mensagem e retornaremos em breve!</p>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="nome">Nome</label>
                    <input type="text" class="form-control" id="nome" name="inputNome" placeholder="Fulano da Silva" autofocus required>
                </div>
                <div class="form-group col-md-6">
                    <label for="email">email</label>
                    <input type="email" class="form-control" id="email" name="inputEmail" placeholder="fulano@dasilva.com" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="cep">CEP</label>
                    <input type="text" onblur="pesquisarCep(this.value);" class="form-control" id="cep" name="inputCep" placeholder="12345-678" maxlength="9" minlength="8" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="cidade">Cidade</label>
                    <input type="text" class="form-control" id="cidade" name="inputCidade" placeholder="São Paulo" required>
                </div>
                <div class="form-group col-md-2">
                    <label for="estado">UF</label>
                    <select id="estado" class="form-control" name="inputEstado" required>
                        <option selected disabled>UF</option>
                        <?php foreach($ufs as $uf): ?>
                            <option><?= $uf; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="logradouro">Logradouro</label>
                <input type="text" class="form-control" id="logradouro" name="inputLogradouro" placeholder="Rua Cardoso de Melo, 123" required>
            </div>
            <div class="form-row">
                <div class="form-group col-md-5">
                    <label for="bairro">Bairro</label>
                    <input type="text" class="form-control" id="bairro" name="inputBairro" placeholder="Centro" required>
                </div>
                <div class="form-group col-md-2">
                    <label for="numero">Número</label>
                    <input type="number" class="form-control" id="numero" name="inputNumero" placeholder="123" required>
                </div>
                <div class="form-group col-md-5">
                    <label for="complemento">Complemento</label>
                    <input type="text" class="form-control" id="complemento" name="inputComplemento" placeholder="Bloco A, Andar 1, Sala 12">
                </div>
            </div>
            <div class="form-group">
                <label for="mensagem">Mensagem</label>
                <textarea class="form-control" id="mensagem" name="inputMensagem" placeholder="Escreva sua mensagem aqui..." required></textarea>
            </div>
            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="aceite" name="inputAceite">
                    <label class="form-check-label" for="aceite">
                        Estou de acordo com os termos e políticas do site
                    </label>
                </div>
            </div>
            <div class="form-group mt-4 mb-0 d-flex flex-row justify-content-end">
                <button type="reset" class="btn btn-secondary" data-toggle="modal" data-target="#modalLimparForm">Limpar</button>
                <button type="submit" class="btn btn-primary ml-2">Cadastrar</button>
            </div>
            <!-- MODAL FORM -->
            <div class="modal" id="modalLimparForm" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Limpar Formulário</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Você tem certeza de que deseja limpar o formulário?</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-dismiss="modal" id="cancelarLimparForm">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="confirmarLimparForm">Limpar Formulário</button>
                    </div>
                    </div>
                </div>
            </div>
            <!-- /MODAL FORM -->
        </form>
    </main>
   <?php require_once("./inc/footer.php"); ?>
   <script src="assets/js/contato.js"></script>
</body>
</html>