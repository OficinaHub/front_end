// Função para formatar o CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
}

// Função para formatar o telefone
function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2");
    telefone = telefone.replace(/(\d{5})(\d{4})$/, "$1-$2");
    return telefone;
}


// Função para carregar clientes na tabela
async function carregarClientes() {
    const API_URL = "http://127.0.0.1:8000/api/clientes";

    try {
        const response = await fetch(API_URL);
        const clientes = await response.json();

        const tabela = document.getElementById("clientesTable");
        tabela.innerHTML = ""; // Limpa antes de adicionar novos dados

        clientes.forEach(cliente => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${formatarCPF(cliente.CPF)}</td>
                <td>${formatarTelefone(cliente.telefone)}</td>
            `;
            tabela.appendChild(linha);
        });
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}

// Chama as funções dependendo da página atual
document.addEventListener('DOMContentLoaded', function () {
    // Se estiver na página de clientes, carrega a lista
    if (document.getElementById("clientesTable")) {
        carregarClientes();
    }

    // Se estiver na página de cadastro, adiciona evento ao formulário
    if (document.getElementById("cadastroForm")) {
        document.getElementById("cadastroForm").addEventListener("submit", cadastrarCliente);
    }
});
