document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/simulados')
    .then(response => response.json())
    .then(data => {
      const simuladoContainer = document.getElementById('simulado-container');
      data.forEach(simulado => {
        const simuladoElement = document.createElement('div');
        simuladoElement.className = 'simulado-caixinha';
        simuladoElement.innerHTML = `
          <h2>${simulado.nome}</h2>
          <p>${simulado.descricao}</p>
          <p>Data de Aplicação: ${simulado.dataAplicacao}</p>
          <p>Concurso: ${simulado.concurso}</p>
          <p>Número de Questões: ${simulado.numeroQuestoes}</p>
          <a href="${simulado.link}" target="_blank">Acessar Simulado</a>
        `;
        simuladoContainer.appendChild(simuladoElement);
      });
    })
    .catch(error => console.error('Error fetching simulados:', error));
});