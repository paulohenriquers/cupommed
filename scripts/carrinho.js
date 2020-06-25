// Executa todas as ações necessárias referente ao carrinho. 
// Variáveis e funções já com nomes explicativos.

const content = document.querySelector('.content');

const compras = document.querySelector('.car-container');
compras.addEventListener('click', e => {
    content.classList.add('hidden');
    const cuponsDoCarrinho = localStorage.getItem('cupomCarrinho').split(',');

    document.querySelector('.helper-header').innerHTML = 'CARRINHO';

    const cupomContainer = document.querySelector('.cupons-container');
    cupomContainer.innerHTML = '';
    var valor = 0;
    cuponsDoCarrinho.map( id => {

        console.log(id)
        $.get(`http://localhost/cupom_med/Php/cupom.php?id=${id}`, cupom => {

            const precoComDesconto = cupom[0].preco_original - ((cupom[0].porcentagem / 100) * cupom[0].preco_original);
            valor += precoComDesconto;
    
            cupomContainer.innerHTML += `
                <div class="cupom flex">
                    <fieldset>
                        <legend>R$${precoComDesconto} CONSULTA</legend>
                        <img src=${cupom[0].img}>
                        <span>${cupom[0].servico}</span>
                    </fieldset>
    
                    <label for="qtd">
                        QUANTIDADE
                        <input type="number" name="qtd" onchange="addValores(${precoComDesconto}, ${id})" value="1" id='val${id}' class="qtd-cupom">
                    </label>
    
                    <span>
                        SUB-TOTAL
                        <p class="sub-total" id='sub${id}'>${precoComDesconto}</p>
                    </span>
                </div>
            `;
            const totalFinal = document.querySelector('#total');
    
            totalFinal.innerHTML = `TOTAL: R$${valor}`;
        });
    });
    console.log(valor)

    document.querySelector('.cupons-container').classList.toggle('flex-column');
    document.querySelector('.finalizar').classList.remove('hidden');
});


function addValores(preco, id) {
    const qtdValue = document.querySelector(`#val${id}`);
    const subtotal = document.querySelector(`#sub${id}`);

    subtotal.innerHTML = preco * qtdValue.value;

    somaValorFinal();
}

function somaValorFinal() {
    const todosSubTotais = document.querySelectorAll('.sub-total');
    const somaTotal = [];
    todosSubTotais.forEach(sub => {
        somaTotal.push(parseFloat(sub.textContent));
    });

    const final = somaTotal.reduce((valorAnterior, valorAtual) => valorAtual + valorAnterior);

    console.log(final)
    const totalFinal = document.querySelector('#total');

    totalFinal.innerHTML = `TOTAL: R$${final}`;
}
