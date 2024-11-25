
var map = L.map('map').setView([-19.9167, -43.9333], 13); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Função para buscar dados do Json-Server
async function buscarConcursos() {
    try {
        const response = await fetch('http://localhost:3000/concursos'); 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
}

function adicionarMarcadores(concursos) {
  concursos.forEach(concurso => {
    L.marker([concurso.latitude, concurso.longitude])
      .addTo(map)
      .bindPopup(`
        <b>${concurso.nome}</b><br>
        Localização: ${concurso.localizacao}<br>
        Horário: ${concurso.horario}<br>
        Data de Inscrição: ${concurso.dataInscricao}<br>
        Data da Prova: ${concurso.dataProva}
      `);
  });
}

document.getElementById('concurso-search').addEventListener('input', () => {
  const searchTerm = document.getElementById('concurso-search').value.toLowerCase();
  buscarConcursos()
    .then(concursos => {
      const concursosFiltrados = concursos.filter(concurso => {
        return concurso.nome.toLowerCase().includes(searchTerm);
      });
      if (concursosFiltrados.length > 0) {
        const primeiroConcurso = concursosFiltrados[0];
        map.setView([primeiroConcurso.latitude, primeiroConcurso.longitude], 16); 
        exibirInformacoesConcursos(concursosFiltrados);
        document.getElementById('concursos-info').style.display = 'block'; 
      } else {
        document.getElementById('concursos-info').style.display = 'none'; 
      }
    });
});

buscarConcursos().then(adicionarMarcadores);

document.getElementById('concurso-search-button').addEventListener('click', () => {
});

document.getElementById('local-search-button').addEventListener('click', () => {
});
