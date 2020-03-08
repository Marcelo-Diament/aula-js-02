
console.log('\n\n%c\tScript fotos.js carregado\t\t\n\n', 'background-color:yellowgreen;color:#000;font-size:27px;font-weight:bold;');

/*
 * Variáveis
 */

// Container das fotos
const fotosContainer = document.querySelector('#fotosContainer');

// endpoint de onde receberemos as fotos em formato JSON
const endpointApiFotos = 'https://jsonplaceholder.typicode.com/photos';
/*
    Observação importante:
    Esse endpoint nos retornará 5000 imagens, cada uma com o seguinte formato:

    {
        "albumId": 1,
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    }

*/

/*
 * Funções
 */

// Função de apoio (helper function) para adicionar múltiplos atributos
const adicionarAtributos = function (elemento, atributos) {
    for (let key in atributos) {
        elemento.setAttribute(key, atributos[key]);
    }
}

// Função para criar thumbs
const criarNovoThumb = (imgId, imgThumb) => {

    // Se não houver uma lista para receber os thumbs
    if(!document.querySelector('#listaThumbs')) {

        // Criando uma ul e setando seus atributos com nossa função de apoio
        listaThumbs = document.createElement('ul');
        adicionarAtributos(listaThumbs, {'id':'listaThumbs', 'style':'list-style:none;display:flex;flex-flow:row wrap;justify-content: space-between;margin:0 auto 50px auto', 'class': 'row'});

    } else {

        // Se já houver, apenas selecionamos e atrelamos à variável
        listaThumbs = document.querySelector('#listaThumbs');

    }

    // Criando uma li e atribuindo estilo a ela
    novoThumb = document.createElement('li');
    novoThumb.style = 'flex: 0 0 10%; margin:0; padding: 0';
    
    // Criando um link para incluirmos dentro da li
    novoThumbTarget = document.createElement('a');
    adicionarAtributos(novoThumbTarget, {'href': `#imgContainer-${imgId}`, 'title':`Ir para a imagem ${imgId}`, 'class': 'thumb-imagem'});
    novoThumbTarget.style.width = '100%';

    // Criando uma tag img e incluindo os atributos com a função de apoio que criamos
    novaImgThumb = document.createElement('img');
    adicionarAtributos(novaImgThumb, {'id': `imagem-thumb-${imgId}`, 'src': imgThumb, 'width': '100%', 'height': 'auto'});

    // Incluindo imagem no link, link no item da lista, item da lista na lista e lista na section
    novoThumbTarget.appendChild(novaImgThumb);
    novoThumb.appendChild(novoThumbTarget);
    listaThumbs.appendChild(novoThumb);
    fotosContainer.prepend(listaThumbs);

}

// Função para criar articles com as imagens
const criarNovaImagem = (imgAlbum, imgId, imgTitle, imgFull) => {

    // Criando um article e incluindo um id para ele
    novoArticle = document.createElement('article');
    adicionarAtributos(novoArticle, {'class': 'col-6 col-md-4 col-lg-3', 'id': `imgContainer-${imgId}`,'style': 'margin:0; padding: 0'});
    

    // Criando uma tag img e incluindo os atributos com a função de apoio que criamos
    novaImg = document.createElement('img');
    adicionarAtributos(novaImg, {'id': `imagem-${imgId}`, 'title': `Imagem ${imgTitle} do álbum ${imgAlbum} - ${imgTitle}`, 'src': imgFull, 'style': 'width: 100%; height:auto'});

    // Criando uma tag h3 e um textNode com o título, então inserimos o título na tag
    novoTitulo = document.createElement('h3');
    novoTituloTexto = document.createTextNode(imgTitle);
    novoTitulo.appendChild(novoTituloTexto);

    // Incluindo imagem e título ao article
    novoArticle.appendChild(novaImg);
    novoArticle.appendChild(novoTitulo);

    // Incluindo o article à section
    fotosContainer.appendChild(novoArticle);

}



/*
 * Captura das Fotos vindas da API via fetch
 */

// Usando o método fetch para realizar a requisição
fetch(endpointApiFotos)

    // then diz para quando receber a resposta, realizar a função declarada (como só há um parâmetro, podemos usar a arrow function sem parênteses nem chaves)
    .then(response => response.json())

        // Usando a mesma lógica (do .then), quando recebermos o json de retorno, executamos a função declarada como parâmetro
        .then(json => {

            /* Agora que temos o json retornado, vamos filtrá-lo usando a função filter(). A função filter basicamente cria um novo array com os elementos que se encaixarem dentro da condição declarada no return (da função que o filter recebe como parâmetro) */
            const fotosPrimeiroAlbum = json.filter( foto => {

                // Declarando a condição do filtro (o novo array receberá apenas imagens que estejam dentro dessa condição, ou seja, que forem do album 1)
                return foto.albumId === 1;

            });

            for(foto in fotosPrimeiroAlbum) {
                
                // Chamando a função para adicionar o thumb
                criarNovoThumb(fotosPrimeiroAlbum[foto]['id'], fotosPrimeiroAlbum[foto]['thumbnailUrl']);

                // Chamando a função para adicionar a imagem
                criarNovaImagem(fotosPrimeiroAlbum[foto]['albumId'], fotosPrimeiroAlbum[foto]['id'], fotosPrimeiroAlbum[foto]['title'], fotosPrimeiroAlbum[foto]['url']);

            };

        });
