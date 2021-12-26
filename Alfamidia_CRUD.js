let DataBase = [];

//==================================================== script para adicionar entradas ===================================================

function Cadastrar() {
    let ent_nome = document.getElementById("ent_nome").value;
    let ent_tel = document.getElementById("ent_tel").value;
    let ent_ddd = document.getElementById("ent_ddd").value;
    let ent_birth = document.getElementById("ent_birth").value;
    let ent_nota = document.getElementById("ent_nota").value;
    let status_msg = document.getElementById("status_msg");

    if (ent_ddd == 0) {
        status_msg.innerHTML = `Escolha um DDD válido`;
    } else if (ValidDate(ent_birth) && isTxt(ent_nome) && isNum(ent_tel) && isNum(ent_nota)) {
        var aluno = {
            nome: ent_nome,
            tel: ent_tel,
            ddd: ent_ddd,
            birth: ent_birth,
            nota: ent_nota,
        }
        DataBase.push(aluno)
        show()
        var inputs = document.getElementsByClassName('inp');
        for (let item of inputs) {
            item.value = '';
        }
        status_msg.innerHTML = `Usuário cadastrado com sucesso!`;
    }
}

//==================================================== script para remover entradas ===================================================

function Remover() {
    status_msg.innerHTML = ``;
    if (DataBase.length == 0) {
        status_msg.innerHTML = `Não há cadastros para remover`;
    } else {
        let index = Number(prompt("Insira número do cadastro que deseja remover"))
        if (index <= 0 || index > DataBase.length) {
            status_msg.innerHTML = `Valor invalido, tente novamente`;
        } else {
            if (confirm(`Tem certeza que deseja remover cadastro ${index}?`)) {
                DataBase.splice(index - 1, 1);
                show()
            }
        }
    }
}

function self_del(index){
    status_msg.innerHTML = ``;
    if (confirm(`Tem certeza que deseja remover cadastro ${index + 1} - ${DataBase[index].nome}?`)){
        DataBase.splice(index, 1);
        show()
    }
}

//==================================================== script para mostrar entradas ===================================================

function show() {
    let all_outputs = document.getElementById("all_outputs");
    let output = document.getElementById("output");
    all_outputs.style.display = "block";
    var exibir = "";
    for (var i in DataBase) {
        exibir += `
                    Cadastro ${(Number(i) + 1)}:
                    <input type="button" value="Remover" class="btn" onclick="self_del(${i})"><br>
                    Nome: ${DataBase[i].nome} <br>
                    Telefone: ${DataBase[i].ddd} ${DataBase[i].tel}<br>
                    Nascimento: ${DataBase[i].birth.replace(/^(\d{4})*-(\d{2})*-(\d{2})$/, "$3-$2-$1")} <br>
                    Nota: ${DataBase[i].nota} <br>
                    <hr>
                    `
    }
    output.innerHTML = `${exibir}`;
    if (DataBase.length == 0) {
        all_outputs.style.display = "none";
    }
}

//==================================================== scripts para validação de dados ===================================================

function ValidDate(preenchida) {

    let atual = new Date();

    if (preenchida.length == 0) {
        status_msg.innerHTML = `Preencha seu nascimento`;
    } else {
        preenchida = new Date(preenchida);
        if (preenchida > atual) {
            status_msg.innerHTML = `Data inválida`;
            return false;
        } else {
            return true;
        }
    }
}

function isTxt(x) {
    if (x.length == 0) {
        status_msg.innerHTML = `Faltam dados`;
    } else {
        var str = x;
        if (/^[\D ]+$/.test(str)) {
            return true;
        } else {
            status_msg.innerHTML = `Entrada "${str}" inválida! Insira apenas letras`;
            return false;
        }
    }
}
function isNum(x) {
    var str = x;
    if (x.length == 0) {
        status_msg.innerHTML = `Faltam dados!`;
    } else {
        if (/^[\d ,.-]+$/.test(str)) {
            return true;
        } else {
            status_msg.innerHTML = `Valor de entrada: "${str}" é inválido! Insira apenas números`;
            return false;
        }
    }
}