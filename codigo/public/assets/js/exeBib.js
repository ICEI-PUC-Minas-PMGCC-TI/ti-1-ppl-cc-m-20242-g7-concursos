async function carregarConcursos(materia, searchTerm) {
    try {
        // URL da API do JConcurseiro
        const url = "https://www.jconcurseiro.com.br/api/concursos";
        
        // Fazendo requisição GET para a API
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const concursos = await response.json();
        
        const listaConcursos = document.getElementById('lista-concursos');
        
        // Limpa a lista antes de adicionar os novos concursos
        listaConcursos.innerHTML = '';
        while (listaConcursos.firstChild) {
            listaConcursos.removeChild(listaConcursos.firstChild);
        }

        concursos.forEach(concurso => {
            if (!searchTerm || concurso.organization.toLowerCase().includes(searchTerm.toLowerCase())) {
                const concursoElement = document.createElement('div');
                concursoElement.classList.add('concurso');
                concursoElement.innerHTML = `
                    <h3>${concurso.organization}</h3>
                    <p><strong>Vagas:</strong> ${concurso.workPlacesAvailable}</p>
                    <p><strong>Link:</strong> <a href="${concurso.link}" target="_blank">Clique Aqui</a></p>
                    <p><strong>Status:</strong> ${concurso.status}</p>
                `;
                listaConcursos.appendChild(concursoElement);
            }
        });
    } catch (error) {
        console.error('Erro ao carregar os concursos:', error);
    }
}

// Filtros
document.getElementById("filter-materia").addEventListener("change", function () {
    const value = this.value;
    const searchTerm = document.getElementById("search-bar").value;
    carregarConcursos(value, searchTerm);
});

document.getElementById("search-bar").addEventListener("input", function () {
    const searchTerm = this.value;
    const materia = document.getElementById("filter-materia").value;
    carregarConcursos(materia, searchTerm);
});

// Carrega concursos ao inicializar a página
window.onload = () => carregarConcursos();
