// Função para formatar CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
}

// Função para formatar Telefone
function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, "");
    telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2");
    telefone = telefone.replace(/(\d{5})(\d{4})$/, "$1-$2");
    return telefone;
}

// Adiciona o evento de formatação dos campos CPF e Telefone
document.getElementById("cpf").addEventListener("input", function(event) {
    event.target.value = formatarCPF(event.target.value);
});

document.getElementById("telefone").addEventListener("input", function(event) {
    event.target.value = formatarTelefone(event.target.value);
});


// Função de cadastro de cliente
async function cadastrarCliente(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let cpf = document.getElementById("cpf").value.trim();
    let telefone = document.getElementById("telefone").value.trim();

    // Remove a formatação antes de enviar os dados
    let cpfSemFormatacao = cpf.replace(/\D/g, "");
    let telefoneSemFormatacao = telefone.replace(/\D/g, "");

    let cpfValido = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
    let telefoneValido = /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);

    if (!nome || !cpf || !telefone) {
        mostrarModalErro("Preencha todos os campos obrigatórios!");
        return;
    }

    if (!cpfValido) {
        mostrarModalErro("CPF inválido!");
        return;
    }

    if (!telefoneValido) {
        mostrarModalErro("Telefone inválido!");
        return;
    }

    let cliente = { nome, CPF: cpfSemFormatacao, telefone: telefoneSemFormatacao };

    try {
        const response = await fetch("http://127.0.0.1:8000/api/clientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });

        const data = await response.json(); // Obtém os dados da resposta

        if (response.ok) {
            mostrarModalSucesso();
        } else {
            mostrarModalErro(data.message || "Erro ao cadastrar cliente!");
        }
    } catch (error) {
        mostrarModalErro("Erro ao cadastrar cliente!");
        console.error("Erro ao cadastrar cliente:", error);
    }
}

function mostrarModalSucesso() {
    document.getElementById("modalSucesso").style.display = "flex";
}

// Função para mostrar o modal de erro
function mostrarModalErro(mensagem) {
    document.getElementById("modalErro").querySelector("p").textContent = mensagem;
    document.getElementById("modalErro").style.display = "flex";
}

// Fechar o modal de sucesso
document.getElementById("fecharModalSucesso").addEventListener("click", function () {
    document.getElementById("modalSucesso").style.display = "none";
    window.location.href = "index.html"
});

// Fechar o modal de erro
document.getElementById("fecharModalErro").addEventListener("click", function () {
    document.getElementById("modalErro").style.display = "none";
});