// var consultaCEP = fetch("https://viacep.com.br/ws/01001000/json/") // método fetch é assíncrono, parâmetro obrigatório é a url da API
//   .then((resposta) => resposta.json()) //then = retorna quando solicitação é resolvida
//   .then((r) => {
//     if (r.erro) {
//       //não entra no catch se está dentro dos parâmetros normais de um CEP (ex.: quantidade de números), só não existe. Por isso fizemos um erro para quando o cep não existe
//       throw Error("Esse CEP não existe!"); //joga erro "Esse CEP não existe!"
//     } else console.log(r);
//   })
//   .catch((erro) => console.log(erro)) //catch = retorna erro quando solicitação é rejeitada
//   .finally((mensagem) => console.log("Processamento concluído")); //independente da resposta da solicitação, o finally é impresso

// console.log(consultaCEP); //retorna uma promise

async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";

  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
        throw Error("CEP não existente!");
    }

    var logradouro = document.getElementById("endereco");
    var bairro = document.getElementById("bairro");
    var cidade = document.getElementById("cidade");
    var estado = document.getElementById("estado");


    logradouro.value = consultaCEPConvertida.logradouro;
    bairro.value = consultaCEPConvertida.bairro;
    cidade.value = consultaCEPConvertida.localidade;
    estado.value = consultaCEPConvertida.uf;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente! </p>`;
    console.log(erro);
  }
}

// let ceps = ["01001000", "01001001"];
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores)); //faz um array de todos os valores retornados do buscaEndereço. Todos retornam como promises
// console.log(conjuntoCeps)
// Promise.all(conjuntoCeps).then(respostas => console.log(respostas)); 


var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));