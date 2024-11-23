async function carregarFavoritos() {
    try {
        const response = await fetch('http://localhost:3000/favoritos', { method: 'GET' });
        if (!response.ok) throw new Error('Erro ao carregar favoritos');

        const favoritos = await response.json();
        const listaFavoritos = document.getElementById('lista-favoritos');

        listaFavoritos.innerHTML = '';
        favoritos.forEach(favorito => {
            const favoritoElement = document.createElement('div');
            favoritoElement.classList.add('favorito');
            favoritoElement.innerHTML = `
                <h3>${favorito.nome}</h3>
                <p><strong>Data Prova:</strong> ${favorito.dataProva}</p>
                <p><strong>Categoria:</strong> ${favorito.categoria}</p>
                <p><strong>Banca:</strong> ${favorito.banca}</p>
                <p><strong>Descrição:</strong> ${favorito.descricao}</p>
                <button onclick="removerFavorito(${favorito.id})">Remover dos Favoritos</button>
            `;
            listaFavoritos.appendChild(favoritoElement);
        });
    } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
    }
}

async function adicionarFavorito(concurso) {
    try {
        await fetch('http://localhost:3000/favoritos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(concurso)
        });
        alert('Concurso adicionado aos favoritos!');
    } catch (error) {
        console.error('Erro ao adicionar favorito:', error);
    }
}

async function removerFavorito(id) {
    try {
        await fetch(`http://localhost:3000/favoritos/${id}`, { method: 'DELETE' });
        carregarFavoritos();
    } catch (error) {
        console.error('Erro ao remover favorito:', error);
    }
}

window.onload = carregarFavoritos;
