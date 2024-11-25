function carregarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const listaFavoritos = document.getElementById('lista-favoritos');

    listaFavoritos.innerHTML = '';

    if (favoritos.length === 0) {
        listaFavoritos.innerHTML = '<p>Você ainda não possui concursos favoritos.</p>';
        return;
    }

    favoritos.forEach(favorito => {
        const favoritoElement = document.createElement('div');
        favoritoElement.classList.add('favorito');
        favoritoElement.innerHTML = `
            <h3>${favorito.nome}</h3>
            <p><strong>Data Prova:</strong> ${favorito.dataProva}</p>
            <p><strong>Categoria:</strong> ${favorito.categoria}</p>
            <p><strong>Banca:</strong> ${favorito.banca}</p>
            <p><strong>Descrição:</strong> ${favorito.descricao}</p>
            <p><strong>Link:</strong> <a href="${favorito.link}" target="_blank">${favorito.link}</a></p>
            <button onclick="removerFavorito(${favorito.id})">Remover dos Favoritos</button>
        `;
        listaFavoritos.appendChild(favoritoElement);
    });
}

function removerFavorito(id) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const novosFavoritos = favoritos.filter(f => f.id !== id);

    localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
    carregarFavoritos();
}

window.onload = carregarFavoritos;
