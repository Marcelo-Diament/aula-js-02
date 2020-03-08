
console.log('\n\n%c\tScript contato.js carregado\t\t\n\n', 'background-color:yellowgreen;color:#000;font-size:27px;font-weight:bold;');


/*
 * Variáveis
 */

// Formulário
const formulario = document.querySelector('#formContato');

// Inputs do Formulário
/* Perceba que agora estamos usando o querySelector 'dentro' do formulário, não mais dentro do documento todo */
// Veja que podemos declarar várias const usando uma keyword apenas, separando cada variável com uma vírgula
const nome = formulario.querySelector('#nome'),
    email = formulario.querySelector('#email'),
    cep = formulario.querySelector('#cep'),
    cidade = formulario.querySelector('#cidade'),
    estado = formulario.querySelector('#estado'),
    logradouro = formulario.querySelector('#logradouro'),
    bairro = formulario.querySelector('#bairro'),
    numero = formulario.querySelector('#numero'),
    complemento = formulario.querySelector('#complemento'),
    mensagem = formulario.querySelector('#mensagem');

// Botões
const limparBtn = formulario.querySelector('[type="reset"]');
const enviarBtn = formulario.querySelector('#formContato [type="submit"]');

// Modais
const modalLimparForm = document.querySelector('#modalLimparForm');
const modalBody = modalLimparForm.querySelector('.modal-body');
const modalFecharBtn = modalLimparForm.querySelector('button.close');
const modalLimparBtn = modalLimparForm.querySelector('#confirmarLimparForm');
const modalCancelarLimparBtn = modalLimparForm.querySelector('#cancelarLimparForm');


/*
 * Funções Genéricas (atreladas à variáveis)
 */

// Atrelando a função preventDefault (de forma genérica) à variável prevenirAcaoEsperada
const prevenirAcaoEsperada = () => {
    event.preventDefault();
}

// Limpando cada um dos campos
const limparForm = () => {
    nome.value = '';
    email.value = '';
    cep.value = '';
    cidade.value = '';
    estado.value = '';
    logradouro.value = '';
    bairro.value = '';
    numero.value = '';
    complemento.value = '';
    mensagem.value = '';
}


/*
 * Eventos
 */

// Evitando que o botão do tipo reset limpe o formulário para confirmarmos a limpeza no modal
limparBtn.addEventListener('click', () => {

    // Chamando o preventDefault() através da variável que criamos
    prevenirAcaoEsperada();

    console.log('\n\nEvitando que o botão do tipo reset limpe o formulário, que seria a ação esperada\n\n');

});

// Atrelando uma função quando for confirmada a limpeza dos campos do form
modalLimparBtn.addEventListener('click', () => {

    console.log('\n\nAvisando que os campos estão sendo limpos e desabilitando os botões do modal.\n\n');

    // Definindo o atributo disabled aos botões, para que o usuário não tente clicar enquando o evento está 'rodando'
    modalCancelarLimparBtn.setAttribute('disabled',"");
    modalLimparBtn.setAttribute('disabled',"");

    // Alterando o texto do parágrafo dentro do modal-body
    modalBody.firstElementChild.innerText = 'Limpando campos...';

    console.log('\n\nUsando o setTimeout() para darmos um delay entre o clique e as ações seguintes.\n\n');
    
    // Configurando um delay ('tempo de espera') antes de continuar com a limpeza
    setTimeout( () => {

        console.log('\n\nAvisando que os campos estão sendo limpos e chamando a função limparForm() quando ocorre o evento do tipo clique no botão de confirmação da limpeza do form.\n\n');

        // Chamando a função limparForm()
        limparForm();

        // Alterando o HTML do modal-body (para incluirmos a tag <b>)
        modalBody.firstElementChild.innerHTML = '<b>Campos zerados!</b>';

        // Vamos criar um Node do tipo Elemento
        novoParagrafoModalBody = document.createElement('p');

        // Também vamos criar um Node do tipo Texto
        textoNovoParagrafoModalBody = document.createTextNode('Vamos fechar esse modal!');

        // Vamos inserir esse texto dentro do novo parágrafo
        novoParagrafoModalBody.appendChild(textoNovoParagrafoModalBody);

        // Agora vamos selecionar o Node (não o elemento) e incluir o novo parágrafo (com seu texto incluso).
        modalBody.appendChild(novoParagrafoModalBody);

        console.log('\n\nUsando o setTimeout() novamente para que vejam as ações ocorrendo.\n\n');

        setTimeout( () => {

            console.log('\n\nFechando o modal através de um click executado pelo nosso script, removendo o disabled dos 2 botões e voltando para o texto original.\n\n');

            // Clicando no X para fechar o modal
            modalFecharBtn.click();

            // Removendo o atributo disabled dos 2 botões
            modalCancelarLimparBtn.removeAttribute('disabled');
            modalLimparBtn.removeAttribute('disabled');

            // Voltando para o texto original (com innerHTML para remover a tag <b>)
            modalBody.firstElementChild.innerHTML = '<p>Você tem certeza de que deseja limpar o formulário?</p>';

            // Apagando o segundo parágrafo que havíamos adicionado
            modalBody.childNodes[1].remove();

        }, 1500); // Após definirmos a função a ser executada no setTimeout, definimos o tempo de delay em milisegundos. Essa refere-se ao 2o setTimeout

    },1500); // Definindo o tempo do 1o setTimout (ms)

});


/* Função para formatar CEP
Perceba que declaramos function para usarmos o this */
formatarCep = function(){

    // Atrelando o valor digitado à variável (a cada tecla digitada)
    cepDigitado = this.value;

    // Verificando se o CEP já tem 5 dígitos
    if (cepDigitado.length === 5) {
    
        // Incluindo o hífen após o quinto dígito através do operador de concatenação e atribuição
        this.value += '-';
    
    } else if (cepDigitado.length > 0 && cepDigitado.length <= 9) {

        console.log(`\n\nCaractere includo no campo CEP: ${cepDigitado}\n\n`);

    };        

}

// Formatando o valor do input CEP através do evento do tipo keyup.
cep.addEventListener('keyup', formatarCep);


/*
 * Consulta Externa (pesquisa de CEP através do WS - Web Service - do site viacep.com.br)
 */

// Preparando uma função que receberá o retorno do viaCep
function retorno_callback_viacep(resposta) {
    
    // Se não recebermos um erro na resposta...
    if(!('erro' in resposta)) {

        // Populamos os valores dos inputs com os retornos
        logradouro.value = resposta.logradouro;
        bairro.value = resposta.bairro;
        cidade.value = resposta.localidade; // Perceba que o retorno chama a cidade de localidade

        /* No caso do select, precisamos 'checkar' a opção do estado retornado,
        por isso vamos agrupá-los em um array através do seletor querySelectorAll() */
        let estados = formulario.querySelectorAll('option');

        // Varremos cada um dos estados
        for(cadaEstado of estados){

            // E verificamos qual bate com o estado retornado (chamado de uf no retorno recebido)
            if(cadaEstado.value === resposta.uf){

                // Encontrando o estado, incluímos o atributo selected
                cadaEstado.setAttribute('selected','');

            }
            
        };

        // Por fim, já 'pulamos' os campos preenchidos e focamos no campo número
        numero.focus();

    } else {

        // Caso contrário emitimos um alert()
        alert('\nOps!\n\nInfelizmente não encontramos esse CEP...\n\nPor favor, verifique o CEP inserido\n\n');

        // E limpamos os campos que populamos com as reticências
        cidade.value = '';
        estado.value = '';
        logradouro.value = '';
        bairro.value = '';

    }

}

// Definindo a função pesquisarCep()
// O parâmetro el é enviado na definição do evento onblur, declarado como um atributo no input do CEP
function pesquisarCep( el ) {

    /* Limpamos o cep digitado removendo dígitos por RegEx (regular expressions)
        Basicamente estamos usando a função replace(), onde o primeiro parâmetro são quaisquer dígitos - representados por D - e o segundo o que deve substituir os caracteres selecionados - no caso uma string vazia */
    let cepLimpo = el.replace(/\D/g,'');

    console.log(`\n\nLimpamos o cep digitado - ${cep.value} - e deixamos apenas os números - ${cepLimpo}\n\n`);

    // Reformatando CEP após usuário sair do campo (onblur)
    let cepParte1 = cepLimpo.substr(0,5);
    let cepParte2 = cepLimpo.substr(5,3);
    cep.value = cepParte1 + '-' + cepParte2;

    console.log(`\n\nUsando o cepLimpo, reinserimos o CEP formatado - ${cep.value} - no input\n\n`);

    // Verificando se o número de dígitos no campo é menor que 9
    if (cep.value.length !== 9) {

        // Se for menor que 9, o foco volta para o campo
        cep.focus();

        // E incluímos um alerta no label
        cep.previousElementSibling.innerText = 'CEP - Verifique o CEP';
        cep.previousElementSibling.classList.add('text-danger')

    } else {

        // Uma vez que o CEP está corretamente formatado, removemos o alerta
        cep.previousElementSibling.innerText = 'CEP';

        // E se ele possuir a classe text-danger
        if(cep.previousElementSibling.classList.contains('text-danger')){

            // A removemos também
            cep.previousElementSibling.classList.remove('text-danger')
        }

        /* Ainda dentro do cenário em que o CEP está formatado corretamente,
        */

        // Confirmamos se o CEP não está vazio
        if (cepLimpo != '') {

            // Por RegEx criamos um padrão de 8 dígitos de 0 à 9
            let formatoCep = /^[0-9]{8}$/;

            // Confirmamos se o cepLimpo está conforme o padrão
            if(formatoCep.test(cepLimpo)) {

                // Atualizamos o valor dos campos abaixo para mostrar que estão sendo carregados
                logradouro.value = '...';
                bairro.value = '...';
                cidade.value = '...';
                estado.value = '...';

                // Criamos uma tag script (ainda 'solto', inexistente no documento)
                scriptCep = document.createElement('script');

                // Configuramos o atributo script com o endpoint da API do viaCep e indicamos qual será o retorno (retorno_callback_viacep)
                scriptCep.src = 'https://viacep.com.br/ws/'+ cepLimpo + '/json/?callback=retorno_callback_viacep';

                // Inserimos a tag script no documento
                document.body.appendChild(scriptCep);

            }

        }

    }

}