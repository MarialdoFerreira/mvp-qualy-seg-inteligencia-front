/*--------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/clientes';
  fetch(url, {
    method: 'get',

  })
    .then((response) => response.json())
    .then((data) => {
      data.clientes.forEach(item => insertList(item.nome_cliente, 
                                               item.idade,
                                               item.sexo,
                                               item.dependentes,
                                               item.escolaridade,
                                               item.estado_civil,
                                               item.salario_anual,
                                               item.tipo_cartao,
                                               item.meses_de_relacionamento,
                                               item.qtd_produtos,
                                               item.iteracoes_12_meses,
                                               item.meses_inativo_12_meses,
                                               item.limite_de_credito,
                                               item.valor_transacoes_12_meses,
                                               item.qtd_transacoes_12_meses,
                                               item.predicao_credito
                                              ))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*--------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------*/
getList()


/*--------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------*/
const postItem = async (inputNome, inputIdade, inputSexo, inputDependentes,
                        inputEscolaridade, inputEstadoCivil, inputSalarioAnual, 
                        inputTipoCartao, inputMeses_de_relacionamento, inputQtdProdutos,
                        inputIteracoes_12_meses, inputMesesInativo_12_meses, inputLimiteCredito,
                        inputValorTransacoes_12_meses, inputQtdTransacoes_12_meses
                        ) => {
    
  const formData = new FormData();
  formData.append('nome_cliente', inputNome);
  formData.append('idade', inputIdade);
  formData.append('sexo', inputSexo);
  formData.append('dependentes', inputDependentes);
  formData.append('escolaridade', inputEscolaridade);
  formData.append('estado_civil', inputEstadoCivil);
  formData.append('salario_anual', inputSalarioAnual);
  formData.append('tipo_cartao', inputTipoCartao);
  formData.append('meses_de_relacionamento', inputMeses_de_relacionamento);
  formData.append('qtd_produtos', inputQtdProdutos);
  formData.append('iteracoes_12_meses', inputIteracoes_12_meses);
  formData.append('meses_inativo_12_meses', inputMesesInativo_12_meses);
  formData.append('limite_de_credito', inputLimiteCredito);
  formData.append('valor_transacoes_12_meses', inputValorTransacoes_12_meses);
  formData.append('qtd_transacoes_12_meses', inputQtdTransacoes_12_meses);

  let url = 'http://127.0.0.1:5000/cliente';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/* --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------*/
const insertDeleteButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*--------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}


/*--------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/cliente?nome_cliente='+item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*--------------------------------------------------------------------------------------
  Função para adicionar um novo item  
  --------------------------------------------------------------------------------------*/
const newItem =  () => {
  let inputNome                       = document.getElementById("newInput").value;
  let inputIdade                      = document.getElementById("newIdade").value;
  let inputSexo                       = document.getElementById("newSexo").value;
  let inputDependentes                = document.getElementById("newDependentes").value;
  let inputEscolaridade               = document.getElementById("newEscolaridade").value;
  let inputEstadoCivil                = document.getElementById("newEstadoCivil").value;
  let inputSalarioAnual               = document.getElementById("newSalarioAnual").value;
  let inputTipoCartao                 = document.getElementById("newTipoCartao").value;
  let inputMeses_de_relacionamento    = document.getElementById("newMeses_de_relacionamento").value;
  let inputQtdProdutos                = document.getElementById("newQtdProdutos").value;
  let inputIteracoes_12_meses         = document.getElementById("newIteracoes_12_meses").value;
  let inputMesesInativo_12_meses      = document.getElementById("newMesesInativo_12_meses").value;
  let inputLimiteCredito              = document.getElementById("newLimiteCredito").value;
  let inputValorTransacoes_12_meses   = document.getElementById("newValorTransacoes_12_meses").value;
  let inputQtdTransacoes_12_meses     = document.getElementById("newQtdTransacoes_12_meses").value;


  // Verifique se o nome do cliente já existe antes de adicionar
  const checkUrl = `http://127.0.0.1:5000/clientes?nome=${inputNome}`;
  fetch(checkUrl, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.clientes && data.clientes.some(item => item.nome_cliente === inputNome)) {
        alert("O cliente já está cadastrado.\nCadastre o cliente com um nome diferente ou atualize o existente.");
      } else if (inputNome === '') {
        alert("O nome do cliente não pode ser vazio!");
      } else if (isNaN(inputIdade) || isNaN(inputSexo) || isNaN(inputDependentes) || isNaN(inputEscolaridade) || isNaN(inputEstadoCivil) || isNaN(inputSalarioAnual) || isNaN(inputTipoCartao) || isNaN(inputMeses_de_relacionamento) || isNaN(inputQtdProdutos) || isNaN(inputIteracoes_12_meses) || isNaN(inputMesesInativo_12_meses) || isNaN(inputValorTransacoes_12_meses) || isNaN(inputQtdTransacoes_12_meses)) {
        alert("Esse(s) campo(s) precisam ser números!");
      } else {
        insertList(inputNome, inputIdade, inputSexo, inputDependentes, inputEscolaridade, inputEstadoCivil, inputSalarioAnual, inputTipoCartao, inputMeses_de_relacionamento, inputQtdProdutos, inputIteracoes_12_meses, inputMesesInativo_12_meses, inputLimiteCredito, inputValorTransacoes_12_meses, inputQtdTransacoes_12_meses);
        postItem(inputNome, inputIdade, inputSexo, inputDependentes, inputEscolaridade, inputEstadoCivil, inputSalarioAnual, inputTipoCartao, inputMeses_de_relacionamento, inputQtdProdutos, inputIteracoes_12_meses, inputMesesInativo_12_meses, inputLimiteCredito, inputValorTransacoes_12_meses, inputQtdTransacoes_12_meses);
        alert("Item adicionado!");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })
}


/* --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------*/
const insertList = (nome_cliente, idade, sexo, dependentes, escolaridade, estado_civil, salario_anual, tipo_cartao, meses_de_relacionamento, qtd_produtos, iteracoes_12_meses, meses_inativo_12_meses, limite_credito, valor_transacoes_12_meses, qtd_transacoes_12_meses, predicao_credito) => {
  var item = [nome_cliente, idade, sexo, dependentes, escolaridade, estado_civil, salario_anual, tipo_cartao, meses_de_relacionamento, qtd_produtos, iteracoes_12_meses, meses_inativo_12_meses, limite_credito, valor_transacoes_12_meses, qtd_transacoes_12_meses, predicao_credito];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cell = row.insertCell(i);
    cell.textContent = item[i];
  }

  var deleteCell = row.insertCell(-1);
  insertDeleteButton(deleteCell);

  document.getElementById("newInput").value = "";
  document.getElementById("newIdade").value = "";
  document.getElementById("newSexo").value = "";
  document.getElementById("newDependentes").value;
  document.getElementById("newEscolaridade").value = "";
  document.getElementById("newEstadoCivil").value = "";
  document.getElementById("newSalarioAnual").value = "";
  document.getElementById("newTipoCartao").value = "";
  document.getElementById("newMeses_de_relacionamento").value = "";
  document.getElementById("newQtdProdutos").value = "";
  document.getElementById("newIteracoes_12_meses").value = "";
  document.getElementById("newMesesInativo_12_meses").value = "";
  document.getElementById("newLimiteCredito").value = "";
  document.getElementById("newValorTransacoes_12_meses").value = "";
  document.getElementById("newQtdTransacoes_12_meses").value = "";

  removeElement();

}