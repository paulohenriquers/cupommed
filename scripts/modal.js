// Executa todas as ações necessárias para a tela de criar cupons. 
// Variáveis e funções já com nomes explicativos.

const fechaModal = document.querySelector('#fecha');
const modal = document.querySelector('.modal');

const selectClinicas = document.querySelector('#clinica-select');
const criarCupom = document.querySelector('#criar');

const buttonCriar = document.querySelector('.search-button');

buttonCriar.addEventListener('click', e => {
    modal.classList.toggle('hidden');
});

fechaModal.addEventListener('click', () => {
    modal.classList.toggle('hidden');
});

criarCupom.addEventListener('click', e => {
    e.preventDefault();
    const idClinica = selectClinicas.value;
    const servicoNome = document.querySelector('#servico-nome').value;
    const porcentagem = document.querySelector('#porcento').value;
    const precoOriginal = document.querySelector('#preco').value;

    const novoCupom = {
        idClinica,
        servicoNome,
        porcentagem, 
        precoOriginal,
        data: formatDate(Date())
    };

    const urlInserir = `http://localhost/cupom_med/Php/criaDesconto.php?cupom=${JSON.stringify(novoCupom)}`; 

    $.post(urlInserir, resultado => {
        alert(`${resultado}`);
        document.location.reload(true);
    });

});

$.post('http://localhost/cupom_med/Php/clinicas.php?clinica=all', resultado => {
    selectClinicas.innerHTML = '';

    resultado.map(clinica => {
        selectClinicas.innerHTML += `
            <option value=${clinica.id}>${clinica.nome}</option>
        `;
    });
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
