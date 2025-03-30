// Variáveis para armazenar os valores e a operação
let valorVisor = '';
let valorAnterior = '';
let operacao = '';

// Captura o visor e todos os botões
const visor = document.getElementById('visor');
const botoes = document.querySelectorAll('button');

// Adiciona evento de clique a cada botão
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const valorBotao = botao.textContent;

        // Se for número ou ponto, adiciona ao visor
        if (!isNaN(valorBotao) || valorBotao === '.') {
            valorVisor += valorBotao;
            visor.value = valorVisor;
        }
        // Se for operação (+, -, *, /)
        else if (['+', '-', '*', '/'].includes(valorBotao)) {
            valorAnterior = valorVisor;
            operacao = valorBotao;
            valorVisor = '';
        }
        // Se for "=", calcula o resultado
        else if (valorBotao === '=') {
            let resultado;
            const num1 = parseFloat(valorAnterior);
            const num2 = parseFloat(valorVisor);

            switch (operacao) {
                case '+': resultado = num1 + num2; break;
                case '-': resultado = num1 - num2; break;
                case '*': resultado = num1 * num2; break;
                case '/': resultado = num1 / num2; break;
            }

            visor.value = resultado;
            valorVisor = resultado.toString();
        }
        // Limpar (botão "C")
        else if (botao.classList.contains('limpar')) {
            valorVisor = '';
            valorAnterior = '';
            operacao = '';
            visor.value = '';
        }
    });
});