async function carregarLivros(materia, searchTerm) {
    try {
        let url = "http://localhost:300/livros";
        if (materia && materia != "all") {
            url += `?materia=${materia}`;
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const livros = await response.json();

        const listaLivros = document.getElementById('lista-livros');

        listaLivros.innerHTML = '';
        while (listaLivros.firstChild) {
            listaLivros.removeChild(listaLivros.firstChild);
        }

        livros.forEach(livro => {
            if (!searchTerm || livro.titulo.toLowerCase().includes(searchTerm.toLowerCase())) {
                const livroElement = document.createElement('div');
                livroElement.classList.add('livro');
                livroElement.innerHTML = `
                    <h3>${livro.titulo}</h3>
                    <p><strong>Matéria:</strong> ${livro.materia}</p>
                    <p><strong>Editora:</strong> ${livro.editora}</p>
                    <p><strong>Descrição:</strong> ${livro.descricao}</p>
                    <p><strong>Link:</strong> <a href="${livro.link}" target="_blank">Clique Aqui</a></p>
                `;
                listaLivros.appendChild(livroElement);
            }
        });
    } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
    }
}

document.getElementById("filter-materia").addEventListener("change", function () {
    const value = this.value;
    const searchTerm = document.getElementById("search-bar").value;
    carregarLivros(value, searchTerm);
});

document.getElementById("search-bar").addEventListener("input", function () {
    const searchTerm = this.value;
    const materia = document.getElementById("filter-materia").value;
    carregarLivros(materia, searchTerm);
});

window.onload = () => carregarLivros();