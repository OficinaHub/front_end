function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
}

function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, "");
    telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2");
    telefone = telefone.replace(/(\d{5})(\d{4})$/, "$1-$2");
    return telefone;
}

document.getElementById("cpf").addEventListener("input", function(event) {
    event.target.value = formatarCPF(event.target.value);
});

document.getElementById("telefone").addEventListener("input", function(event) {
    event.target.value = formatarTelefone(event.target.value);
});

document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let nome = document.getElementById("nome").value.trim();
    let cpf = document.getElementById("cpf").value.trim();
    let telefone = document.getElementById("telefone").value.trim();
    let mensagem = document.getElementById("mensagem");
    
    let cpfValido = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
    let telefoneValido = /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);
    
    if (!nome || !cpf || !telefone) {
        mensagem.textContent = "Preencha todos os campos obrigatórios!";
        mensagem.className = "error";
        return;
    }

    if (!cpfValido) {
        mensagem.textContent = "CPF inválido!";
        mensagem.className = "error";
        return;
    }

    if (!telefoneValido) {
        mensagem.textContent = "Telefone inválido!";
        mensagem.className = "error";
        return;
    }
    
    let cliente = { nome, cpf, telefone };
    
    fetch("http://localhost:3000/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(data => {
        mensagem.textContent = "Cliente cadastrado com sucesso!";
        mensagem.className = "success";
        document.getElementById("cadastroForm").reset();
    })
    .catch(error => {
        mensagem.textContent = "Erro ao cadastrar cliente!";
        mensagem.className = "error";
    });
});