// Executa algumas as ações necessárias para pegar informações do banco de dados. 
// Variáveis e funções já com nomes explicativos.

const URL_SERVICO = 'http://localhost/cupom_med/Php/categoria.php?servicos=';
const URL_CLINICA = 'http://localhost/cupom_med/Php/clinicas.php?clinica=';
const URL_CUPOM = 'http://localhost/cupom_med/Php/cupom.php?id=';

function buscarCategoriaPor(nome) {
    buscaNoBanco(URL_SERVICO, nome);
}

function buscarClinicaPor(nome) {
    buscaNoBanco(URL_CLINICA, nome);
}

function buscaNoBanco(url, nome) {
    const content = document.querySelector('.content'); 
    content.classList.add('hidden');

    document.querySelector('.finalizar').classList.add('hidden');
    document.querySelector('.cupons-container').classList.remove('flex-column');

    const cupons = document.querySelector('.helper');
    cupons.classList.remove('hidden');

    document.querySelector('.helper-header').innerHTML = `${nome}`;
    const cupomContainer = document.querySelector('.cupons-container');
    cupomContainer.innerHTML = '';

    $.post(url + nome, resultado => {
        console.log(resultado)

        resultado.map(cupom => {
            cupomContainer.innerHTML += `
                <div class="cupom">
                    <fieldset>
                        <legend>${cupom.porcentagem}% de desconto</legend>
                        <img src=${cupom.img} alt=${cupom.nome}>
                        <span>${cupom.servico}</span>
                    </fieldset>
                    <button onclick="addCupomNoCarrinho(document.getElementById(${cupom.id_cupom}))" class="adquirir" id=${cupom.id_cupom} >Adquirir</button>
                </div>
            `;
        });
    });
}
let qtd = 0; 
var dados = []; 

function addCupomNoCarrinho(e) {
    qtd++;

    dados.push(e.id);

    localStorage.cupomCarrinho = dados;

    console.log('dados')
    console.log(dados)

    const qtdCarrinho = document.querySelector('.carrinho-qtd');
    qtdCarrinho.innerHTML = qtd;
}