async function carregarLivros(genero, searchTerm) {
    try {
        // Fetch livros do JSON local
        const responseLocal = await fetch('http://localhost:3000/livros', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const livrosLocal = await responseLocal.json();

        // Fetch livros da API externa
        const responseApi = await fetch('http://localhost:8000/livro/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const livrosApi = await responseApi.json();

        // Combinar os resultados
        const livros = [...livrosLocal, ...livrosApi];

        const listaLivros = document.getElementById('lista-livros');
        listaLivros.innerHTML = '';
        while (listaLivros.firstChild) {
            listaLivros.removeChild(listaLivros.firstChild);
        }

        livros.forEach(livro => {
            if ((!genero || genero === 'all' || livro.genero === genero) &&
                (!searchTerm || livro.nome.toLowerCase().includes(searchTerm.toLowerCase()))) {
                const livroElement = document.createElement('div');
                livroElement.classList.add('livro');
                livroElement.innerHTML = `
                    <h3>${livro.nome}</h3>
                    <p><strong>Autor:</strong> ${livro.nomeDoAutor}</p>
                    <p><strong>Lançamento:</strong> ${livro.lancamento}</p>
                    <p><strong>Tipo:</strong> ${livro.tipo}</p>
                    <p><strong>Gênero:</strong> ${livro.genero}</p>
                    <p><strong>Editora:</strong> ${livro.editora}</p>
                    <p><strong>Ano da Edição:</strong> ${livro.anoEdicao}</p>
                    <p><strong>Número da Edição:</strong> ${livro.numEdicao}</p>
                `;
                listaLivros.appendChild(livroElement);
            }
        });
    } catch (error) {
        console.error('Erro ao carregar os livros:', error);
    }
}

document.getElementById("filter-genero").addEventListener("change", function () {
    const value = this.value;
    const searchTerm = document.getElementById("search-bar").value;
    carregarLivros(value, searchTerm);
});

document.getElementById("search-bar").addEventListener("input", function () {
    const searchTerm = this.value;
    const genero = document.getElementById("filter-genero").value;
    carregarLivros(genero, searchTerm);
});

window.onload = () => carregarLivros();