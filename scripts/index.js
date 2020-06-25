// Executa todas as ações necessárias quando há o carregamento da página html. 
// Variáveis e funções já com nomes explicativos.

window.onload = () => {
    document.querySelector('.cupons-container').classList.remove('flex-column');
    document.querySelector('.finalizar').classList.add('hidden');
    
    const content = document.querySelector('.content');

    const banner = document.createElement('img');
    banner.setAttribute('src', './imgs/inicio-banner.jpg');
    content.appendChild(banner);

    const cuponsDeHoje = document.querySelector('#hoje');
    const cupons = document.querySelector('.helper');
    const home = document.querySelector('#home');

    cuponsDeHoje.addEventListener('click', e => {
        content.classList.add('hidden');
        document.querySelector('.helper-header').innerHTML = 'CUPOM DO DIA';

        $.post('http://localhost/cupom_med/Php/categoria.php?servicos=hoje', resultado => {
            const cupomContainer = document.querySelector('.cupons-container');
            document.querySelector('.finalizar').classList.add('hidden');
            document.querySelector('.cupons-container').classList.remove('flex-column');

            cupomContainer.innerHTML = '';

            resultado.map( cupom => {
                cupomContainer.innerHTML += `
                    <div class="cupom">
                        <fieldset>
                            <legend>${cupom.porcentagem}% de desconto</legend>
                            <img src=${cupom.img} alt=${cupom.nome}>
                            <span>${cupom.servico}</span>
                        </fieldset>
                        <button onclick="addCupomNoCarrinho(document.getElementById(${cupom.id_cupom}))" id=${cupom.id_cupom} class="adquirir">Adquirir</button>
                    </div>
                `;
            }); 
        });

        cupons.classList.remove('hidden');
    });
    
    home.addEventListener('click', e => {
        cuponsDeHoje.style.background = '';
        cupons.classList.add('hidden');
        content.classList.remove('hidden');
    });

    const pesquisa = document.querySelector('#search');

    pesquisa.addEventListener('keydown', e => {
        console.log(e.keyCode)
        if( e.keyCode === 13 ) {
            buscarCategoriaPor(pesquisa.value);
        }
    });

    localStorage.removeItem('cupomCarrinho');
}