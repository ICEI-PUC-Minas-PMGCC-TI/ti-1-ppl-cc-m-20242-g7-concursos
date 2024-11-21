const API_SIMULADOS = "http://localhost:3000/simulados";
const API_CONCURSOS = "http://localhost:3000/concursos";

async function buscar() {
  const consulta = document.getElementById("search").value.toLowerCase();
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = "";

  try {
    const [simuladosRes, concursosRes] = await Promise.all([
      fetch(API_SIMULADOS),
      fetch(API_CONCURSOS)
    ]);

    const simulados = await simuladosRes.json();
    const concursos = await concursosRes.json();

    const simuladosFiltrados = simulados.filter((simulado) =>
      simulado.nome.toLowerCase().includes(consulta) ||
      simulado.concurso.toLowerCase().includes(consulta)
    );

    const concursosFiltrados = concursos.filter((concurso) =>
      concurso.nome.toLowerCase().includes(consulta) ||
      concurso.orgao.toLowerCase().includes(consulta)
    );

    if (simuladosFiltrados.length > 0 || concursosFiltrados.length > 0) {
      simuladosFiltrados.forEach((simulado) => {
        const li = document.createElement("li");
        li.textContent = `Simulado: ${simulado.nome} - ${simulado.concurso} (${simulado.data})`;
        resultados.appendChild(li);
      });

      concursosFiltrados.forEach((concurso) => {
        const li = document.createElement("li");
        li.textContent = `Concurso: ${concurso.nome} - ${concurso.orgao} (${concurso.dataProva})`;
        resultados.appendChild(li);
      });
    } else {
      resultados.innerHTML = "<li>Nenhum resultado encontrado</li>";
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    resultados.innerHTML = "<li>Erro ao buscar dados</li>";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const caixinhas = document.querySelectorAll('.caixinha');

  caixinhas.forEach((caixinha) => {
    const button = caixinha.querySelector('button');
    button.addEventListener('click', () => {
      console.log("Informações do Simulado");
    });
  });
});