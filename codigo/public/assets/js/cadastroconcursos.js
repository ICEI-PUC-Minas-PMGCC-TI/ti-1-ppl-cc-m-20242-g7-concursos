async function mostrarConcursos() {
    try {
        const response = await fetch('http://localhost:3000/concursos', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
  
      if (!response.ok) {
        throw new Error('Erro ao carregar os concursos.');
      }
  
      const concurso = await response.json(); 
      const listaConcursos = document.getElementById('lista-concursos'); 
  
      listaConcursos.innerHTML = ''; 
  
      concurso.forEach(concurso => {
        const concursoElement = document.createElement('div');
        concursoElement.classList.add('concurso');
        concursoElement.innerHTML = `
          <h3>${concurso.nome}</h3>
          <p><strong>Data Inscrição:</strong> ${concurso.dataInscricao}</p>
          <p><strong>Data Prova:</strong> ${concurso.dataProva}</p>
          <p><strong>Categoria:</strong> ${concurso.categoria}</p>
          <p><strong>Nível de Ensino:</strong> ${concurso.nivelEnsino}</p>
          <p><strong>Banca:</strong> ${concurso.banca}</p>
          <p><strong>Localização:</strong> ${concurso.localizacao}</p>
          <p><strong>Horário:</strong> ${concurso.horario}</p>
          <p><strong>Descrição:</strong> ${concurso.descricao}</p>
          <p><strong>Link:</strong> <a href="${concurso.link}" target="_blank">${concurso.link}</a></p>
          <p><strong>Materiais:</strong> ${concurso.materiais}</p>
          <div class="botoes">
            <button class="botao" onclick="excluirConcurso('${concurso.nome}')">Excluir</button>
            <button class="botao" onclick="editarConcurso('${concurso.nome}', '${concurso.dataInscricao}', '${concurso.dataProva}', '${concurso.categoria}', '${concurso.nivelEnsino}', '${concurso.banca}', '${concurso.localizacao}', '${concurso.horario}', '${concurso.descricao}', '${concurso.link}', '${concurso.materiais}')">Editar</button>
          </div>
        `;
        listaConcursos.appendChild(concursoElement); 
      });
    } catch (error) {
        console.error('Erro ao carregar os concursos:', error);
    }
}

async function cadastrarConcurso(event) {
    event.preventDefault();
    const id = document.getElementById('concurso-id').value;
    const nome = document.getElementById('nome-concurso').value;
    const dataInscricao = document.getElementById('data-inscricao-concurso').value;
    const dataProva = document.getElementById('data-prova-concurso').value;
    const categoria = document.getElementById('categoria-concurso').value;
    const nivelEnsino = document.getElementById('nivel-ensino-concurso').value;
    const banca = document.getElementById('banca-concurso').value;
    const localizacao = document.getElementById('localizacao-concurso').value;
    const horario = document.getElementById('horario-concurso').value;
    const descricao = document.getElementById('descricao-concurso').value;
    const link = document.getElementById('link-concurso').value;
    const materiais = document.getElementById('materiais-concurso').value;

    const novoConcurso = {
      id: id ? parseInt(id) : Date.now(),
      nome : nome,
      dataInscricao : dataInscricao,
      dataProva : dataProva,
      categoria : categoria,
      nivelEnsino : nivelEnsino,
      banca : banca,
      localizacao : localizacao,
      horario :  horario,
      descricao : descricao,
      link : link,
      materiais : materiais
    };

    let method = 'POST';
    let url = 'http://localhost:3000/concursos';
    if (id) {
        method = 'PUT';
        url += `/${id}`;
    }

    try {
        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoConcurso)
        });
        carregarConcursos();
    } catch (error) {
        console.error('Erro ao salvar o concurso:', error);
    }

    document.getElementById('concurso-id').value = '';
    document.getElementById('nome-concurso').value = '';
    document.getElementById('data-inscricao-concurso').value = '';
    document.getElementById('data-prova-concurso').value = '';
    document.getElementById('categoria-concurso').value = '';
    document.getElementById('nivel-ensino-concurso').value = '';
    document.getElementById('banca-concurso').value = '';
    document.getElementById('localizacao-concurso').value = '';
    document.getElementById('horario-concurso').value = '';
    document.getElementById('descricao-concurso').value = '';
    document.getElementById('link-concurso').value = '';
    document.getElementById('materiais-concurso').value = '';
}

async function excluirConcurso(id) {
    try {
        await fetch(`http://localhost:3000/concursos/${id}`, {
            method: 'DELETE'
        });
        carregarConcursos();
    } catch (error) {
        console.error('Erro ao excluir o concurso:', error);
    }
}

function editarConcurso(id, nome, dataInscricao, dataProva, categoria, nivelEnsino, banca, localizacao, horario, descricao, link, materiais) {
    document.getElementById('concurso-id').value = id;
    document.getElementById('nome-concurso-concurso').value = nome;
    document.getElementById('data-inscricao-concurso').value = dataInscricao;
    document.getElementById('data-prova-concurso').value = dataProva;
    document.getElementById('categoria-concurso').value = categoria;
    document.getElementById('nivel-ensino-concurso').value = nivelEnsino;
    document.getElementById('banca-concurso').value = banca;
    document.getElementById('localizacao-concurso').value = localizacao;
    document.getElementById('horario-concurso').value = horario;
    document.getElementById('descricao-concurso').value = descricao;
    document.getElementById('link-concurso').value = link;
    document.getElementById('materiais-concurso').value = materiais;

}
function criarBotaoFavoritar(concurso) {
    const botao = document.createElement('button');
    botao.textContent = 'Favoritar';
    botao.onclick = () => adicionarFavorito(concurso);
    return botao;
}
  window.onload = mostrarConcursos;
  