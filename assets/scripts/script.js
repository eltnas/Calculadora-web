// Elementos
const tela = document.querySelector('.tela-nums p');

let valorAtual = '0';
let valorAnterior = null;
let operacaoAtual = null;

// Função para adicionar números ou caracteres especiais na tela
function addNum(num) {
    if (num === 'ce') {
        valorAtual = '0';
        atualizarTela();
        return;
    }

    if (num === 'porc') {
        valorAtual = (parseFloat(valorAtual) / 100).toString();
        atualizarTela();
        return;
    }

    if (num === 'raiz') {
        valorAtual = Math.sqrt(parseFloat(valorAtual)).toString();
        atualizarTela();
        return;
    }

    if (valorAtual === '0' && num !== '.') {
        valorAtual = num;
    } else {
        valorAtual += num;
    }

    atualizarTela();
}

// Função para adicionar operações
function addOperacao(operacao) {
    if (operacao === 'CA') {
        valorAtual = '0';
        valorAnterior = null;
        operacaoAtual = null;
        atualizarTela();
        return;
    }

    if (operacaoAtual && valorAnterior !== null) {
        calcular();
    }

    operacaoAtual = operacao;
    valorAnterior = valorAtual;
    valorAtual = '0';
}

// Função para adicionar o ponto decimal
function ponto() {
    if (!valorAtual.includes('.')) {
        valorAtual += '.';
        atualizarTela();
    }
}

// Função para realizar o cálculo
function calcular() {
    if (!operacaoAtual || valorAnterior === null) return;

    const anterior = parseFloat(valorAnterior);
    const atual = parseFloat(valorAtual);

    let resultado;

    switch (operacaoAtual) {
        case '+':
            resultado = anterior + atual;
            break;
        case '-':
            resultado = anterior - atual;
            break;
        case '*':
            resultado = anterior * atual;
            break;
        case '/':
            resultado = anterior / atual;
            break;
        default:
            return;
    }

    valorAtual = resultado.toString();
    valorAnterior = null;
    operacaoAtual = null;
    atualizarTela();
}

// Função para atualizar a tela da calculadora
function atualizarTela() {
    tela.textContent = valorAtual;
}

// Função para capturar entradas do teclado
document.addEventListener('keydown', (event) => {
    const teclasNumericas = '0123456789';
    const teclasOperacoes = {
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        '=': '=',
        'Enter': '=',
        'Backspace': 'ce',
        'c': 'CA',
        '.': '.'
    };

    if (teclasNumericas.includes(event.key)) {
        addNum(event.key);
    } else if (teclasOperacoes[event.key]) {
        const operacao = teclasOperacoes[event.key];
        if (operacao === '=') {
            calcular();
        } else if (operacao === 'ce' || operacao === 'CA') {
            addOperacao(operacao);
        } else if (operacao === '.') {
            ponto();
        } else {
            addOperacao(operacao);
        }
    }
});