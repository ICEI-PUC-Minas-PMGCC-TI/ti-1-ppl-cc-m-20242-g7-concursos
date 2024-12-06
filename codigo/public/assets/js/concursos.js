document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;

    // Requisição para o seu servidor local (JSON Server) com o filtro de pesquisa
    fetch(`http://localhost:3000/concursos?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';  // Limpa os resultados anteriores

            if (data.length > 0) {
                data.forEach(concurso => {
                    const div = document.createElement('div');
                    div.textContent = concurso.nome;
                    resultsDiv.appendChild(div);
                });
            } else {
                resultsDiv.textContent = 'Nenhum concurso encontrado.';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});

// Usando Fetch para obter dados da API externa (JCConcursos)
fetch('https://www.jcconcursos.com.br/api/concursos') // Supondo que a URL seja assim
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Exibe os dados dos concursos no console
        const externalResultsDiv = document.getElementById('external-results');
        externalResultsDiv.innerHTML = '';  // Limpa os resultados anteriores

        if (data.length > 0) {
            data.forEach(concurso => {
                const div = document.createElement('div');
                div.textContent = concurso.nome;
                externalResultsDiv.appendChild(div);
            });
        } else {
            externalResultsDiv.textContent = 'Nenhum concurso encontrado.';
        }
    })
    .catch(error => console.error('Erro ao buscar concursos:', error));
