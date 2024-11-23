document.getElementById('btn-pesquisar').addEventListener('click', buscarConcursos);

async function buscarConcursos() {
    const nome = document.getElementById('nome').value.toLowerCase();
    const data = document.getElementById('data').value;
    const nivelEnsino = document.getElementById('nivelEnsino').value.toLowerCase();
    const localizacao = document.getElementById('localizacao').value.toLowerCase();

    try {
        // Fetch dos dados do db.json
        const response = await fetch('http://localhost:3000/concursos'); 
        const concursos = await response.json();

        // Filtros
        const resultados = concursos.filter((concurso) => {
            return (
                (!nome || concurso.nome.toLowerCase().includes(nome)) &&
                (!data || concurso.data === data) &&
                (!nivelEnsino || concurso.nivelEnsino.toLowerCase() === nivelEnsino) &&
                (!localizacao || concurso.localizacao.toLowerCase().includes(localizacao))
            );
        });

        // Renderizar resultados
        const listaResultados = document.getElementById('lista-resultados');
        listaResultados.innerHTML = '';

        if (resultados.length === 0) {
            listaResultados.innerHTML = '<p>Nenhum concurso encontrado.</p>';
        } else {
            resultados.forEach((concurso) => {
                const item = document.createElement('div');
                item.classList.add('resultado-item');
                item.innerHTML = `
                    <h3>${concurso.nome}</h3>
                    <p><strong>Data de Inscrição:</strong> ${concurso.dataInscricao}</p>
                    <p><strong>Data do Concurso:</strong> ${concurso.data}</p>
                    <p><strong>Nível de Ensino:</strong> ${concurso.nivelEnsino}</p>
                    <p><strong>Localização:</strong> ${concurso.localizacao}</p>
                    <p><strong>Salário:</strong> R$ ${concurso.salario}</p>
                `;
                listaResultados.appendChild(item);
            });
        }
    } catch (error) {
        console.error('Erro ao buscar concursos:', error);
    }
}
