document.addEventListener('DOMContentLoaded', function() {
  fetchSimulados();

  document.getElementById('botaoBuscar').addEventListener('click', function() {
    const query = document.getElementById('search').value.toLowerCase();
    fetchSimulados(query);
  });
});

function fetchSimulados(query = '') {
  fetch('http://localhost:3000/simulados')
    .then(response => response.json())
    .then(data => {
      const simuladoContainer = document.getElementById('simulado-container');
      simuladoContainer.innerHTML = '';
      const filteredSimulados = data.filter(simulado => simulado.concurso.toLowerCase().includes(query));
      filteredSimulados.forEach(simulado => {
        const simuladoElement = document.createElement('div');
        simuladoElement.className = 'simulado-caixinha';
        simuladoElement.innerHTML = `
          <h2>${simulado.concurso}</h2>
          <p>${simulado.descricao}</p>
          <p>Data de Aplicação: ${simulado.dataAplicacao}</p>
          <p>Número de Questões: ${simulado.numeroQuestoes}</p>
          <a href="${simulado.link}" target="_blank">Acessar Simulado</a>
        `;
        simuladoContainer.appendChild(simuladoElement);
      });
    })
    .catch(error => console.error('Error fetching simulados:', error));
}