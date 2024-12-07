document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/simulados')
    .then(response => response.json())
    .then(data => {
      const simuladoContainer = document.getElementById('simulado-container');
      data.forEach(simulado => {
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

  document.getElementById('botaoBuscar').addEventListener('click', function() {
    const input = document.getElementById('inputBuscar');
    const query = input.value;
    fetch(`http://localhost:3000/simulados?query=${query}`)
      .then(response => response.json())
      .then(data => {
        const simuladoContainer = document.getElementById('simulado-container');
        simuladoContainer.innerHTML = '';
        data.forEach(simulado => {
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
  });
});
