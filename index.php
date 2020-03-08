<?php
    $tituloDaPagina = "Práticas | JS - Aula 02";
    require_once("./inc/head.php");
?>
<body>
    <?php require_once("./inc/header.php"); ?>
    <main class="container my-5">
    <article class="row">
        <h1 class="col-12">Práticas de JS</h1>
        <p class="col-12">Para realização da prática em aula, <a href="https://github.com/Marcelo-Diament/aula-js-02-pre">baixe o repositório</a> que preparamos para você!</p>
        <section class="col-12 bg-light rounded border p-5 my-3">
            <h2 class="mb-4">Uso desse documento</h2>
            <p>Acesse os links do menu para ver alguns conceitos básicos de JS em prática.</p>
            <p>Não se esqueça de abrir o console para ver alguns avisos, dicas e explicações extra</p>
        </section>
        <section class="col-12 bg-light rounded border p-5 my-3 row">
            <h2 class="col-12 mb-4">Conteúdo Abordado</h2>
            <ul class="col-12 col-lg-6">
                <li>console.log()</li>
                <li>seletores</li>
                <li>manipulação do DOM</li>
                <li>funções</li>
                <li>loops</li>
            </ul>
            <ul class="col-12 col-lg-6">
                <li>condicionais</li>
                <li>eventos</li>
                <li>AJAX</li>
                <li>callback</li>
                <li>fetch API</li>
            </ul>
        </section>
        <section class="col-12 bg-light rounded border p-5 my-3">
            <h2 class="mb-4">Repositório</h2>
            <p>Baixe ou clone o repositório clicando <a href="https://github.com/Marcelo-Diament/aula-js-02">aqui</a>.</p>
            <p>Atenção: esse repositório só será disponibilizado após o término do módulo.</p>
        </section>
    </article>
    </main>
   <?php require_once("./inc/footer.php"); ?>
</body>
</html>