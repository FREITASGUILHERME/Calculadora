// Variáveis para armazenar os valores e a operação
let valorVisor = '';
let valorAnterior = '';
let operacao = '';
let modoCientifico = '';

// Captura o visor e todos os botões
const visor = document.getElementById('visor');
const botoes = document.querySelectorAll('button');
const alternarModoBtn = document.getElementById('alternar-modo');
const botoesCientificos = document.querySelectorAll('.cientifico');
modoCientifico = false; // Começa no modo padrão

const somClique = new Audio('Audio/Click_1.wav');

// Alternar entre modos padrão/científico
alternarModoBtn.addEventListener('click', () => {
    modoCientifico = !modoCientifico;
    alternarModoBtn.textContent = modoCientifico ? 'Modo Padrão' : 'Modo Científico';

    // Mostra/esconde botões científicos
    botoesCientificos.forEach(botao => {
        botao.classList.toggle('hide');
    });
});

// Adiciona evento de clique a cada botão
botoes.forEach(botao => {
    botao.addEventListener('click', () => {

        // Inicio da parte de audio dos botões
        somClique.currentTime = 0; // Reinicia o áudio se já estiver tocando
        somClique.play(); // Toca o som
        // Fim da parte de audio dos botões

        const valorBotao = botao.textContent;

        if (!isNaN(valorBotao) || valorBotao === '.') {
            valorVisor += valorBotao;
            visor.value = valorVisor;
        }
        else if (['+', '-', '*', '/'].includes(valorBotao)) {
            valorAnterior = valorVisor;
            operacao = valorBotao;
            valorVisor = '';
        }
        else if (valorBotao === '=') {
            calcularResultado();
        }
        else if (botao.classList.contains('limpar')) {
            limparVisor();
        }
        // Funções científicas
        else if (modoCientifico) {
            switch (valorBotao) {
                case 'sin':
                    visor.value = Math.sin(parseFloat(valorVisor));
                    break;
                case 'cos':
                    visor.value = Math.cos(parseFloat(valorVisor));
                    break;
                case 'tan':
                    visor.value = Math.tan(parseFloat(valorVisor));
                    break;
                case 'log':
                    visor.value = Math.log10(parseFloat(valorVisor));
                    break;
                case '√':
                    visor.value = Math.sqrt(parseFloat(valorVisor));
                    break;
                case '^':
                    valorAnterior = valorVisor;
                    operacao = '^';
                    valorVisor = '';
                    break;
                case 'π':
                    valorVisor = Math.PI.toString();
                    visor.value = valorVisor;
                    break;
                case '(':
                case ')':
                    valorVisor += valorBotao;
                    visor.value = valorVisor;
                    break;
            }
        }
    });
});

// Função para cálculos básicos (reutilizada no "=")
function calcularResultado() {
    let resultado;
    const num1 = parseFloat(valorAnterior);
    const num2 = parseFloat(valorVisor);

    switch (operacao) {
        case '+': resultado = num1 + num2; break;
        case '-': resultado = num1 - num2; break;
        case '*': resultado = num1 * num2; break;
        case '/': resultado = num1 / num2; break;
        case '^': resultado = Math.pow(num1, num2); break;
    }

    visor.value = resultado;
    valorVisor = resultado.toString();
}

function limparVisor() {
    valorVisor = '';
    valorAnterior = '';
    operacao = '';
    visor.value = '';
}
