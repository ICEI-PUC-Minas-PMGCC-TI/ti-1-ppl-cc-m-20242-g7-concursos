function FormaTemplate() {
    const dataMaxima = new Date();
    dataMaxima.setFullYear(dataMaxima.getFullYear() + 2);
    const dataMaximaFormatada = dataMaxima.toISOString().split('T')[0];

    return `
        <form id="scheduleForm" class="container mt-4">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="cargo" placeholder="ex.: Auditor Fiscal, Engenharia Civil" style="border-radius: 30px;">
                <label for="cargo">Cargo</label>
            </div>
            <div class="form-floating mb-3">
                <input type="number" class="form-control" id="horas" placeholder="Digite o nº de horas de estudo (ex.: 3)" min="1" max="24" style="border-radius: 30px;">
                <label for="horas">Horas de Estudo</label>
            </div>
            <div class="form-floating mb-3">
                <input type="date" class="form-control" id="dataProva" placeholder="Digite a data da prova" max="${dataMaximaFormatada}" style="border-radius: 30px;">
                <label for="dataProva">Data da Prova</label>
            </div>
            <fieldset class="row mb-3">
                <legend class="col-form-label col-sm-2 pt-0">Dias para estudar</legend>
                <div class="col-sm-10" id="diasDisponiveis">
                    ${['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
                        .map((dia, i) => `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="${i === 6 ? 0 : i + 1}" id="${dia.toLowerCase()}">
                                <label class="form-check-label" for="${dia.toLowerCase()}">${dia}-Feira</label>
                            </div>
                        `).join('')}
                </div>
            </fieldset>
            <div class="d-grid gap-2 d-md-block">
                <button type="submit" class="btn btn-primary mb-3">Criar Cronograma</button>
                <button id="showCronogramasButton" class="btn btn-primary mb-3" type="button">Seus Cronogramas</button>
                <button id="fecharCronogramasBtn" class="btn btn-primary mb-3" type="button">Fechar Cronogramas</button>
            </div>
        </form>
        <div id="cronogramaContainer" class="container mt-4"></div>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#app').innerHTML = FormaTemplate();

    const form = document.getElementById('scheduleForm');
    const fecharBtn = document.getElementById('fecharCronogramasBtn');
    const mostrarBtn = document.getElementById('showCronogramasButton');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    });

    if (fecharBtn) {
        fecharBtn.addEventListener('click', fecharTodosCronogramas);
    }

    if (mostrarBtn) {
        mostrarBtn.addEventListener('click', mostrarCronogramas);
    }
});



function geraSchedule(cargoSelecionado, horasPorDia, dataProva, diasSelecionados) {
    const cronograma = [];
    let diaAtual = new Date();

    while (diaAtual <= dataProva) {
        const diaSemana = diaAtual.getDay();
        if (diasSelecionados.includes(diaSemana)) {
            const materiaIndex = cronograma.length % cargoSelecionado.materias.length;
            const materia = cargoSelecionado.materias[materiaIndex];

            cronograma.push({
                dia: diaAtual.toLocaleDateString('pt-BR'),
                materia: materia.nome,
                horas: horasPorDia,
                livro: materia.livro
            });
        }
        diaAtual.setDate(diaAtual.getDate() + 1);
    }

    return cronograma;
}

async function salvarCronograma(cronograma, cargoNome) {
    try {
        const response = await fetch('http://localhost:3000/cronogramas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cargo: cargoNome, cronograma })
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar cronograma no servidor.');
        }

    } catch (error) {
        console.error('Erro ao salvar cronograma:', error);
        alert('Erro ao salvar cronograma no servidor.');
    }
}

async function mostrarCronogramas() {
    try {
        const response = await fetch('http://localhost:3000/cronogramas');
        if (!response.ok) {
            throw new Error('Erro ao buscar cronogramas salvos no servidor.');
        }

        const cronogramas = await response.json();
        const cronogramaContainer = document.getElementById('cronogramaContainer');
        document.getElementById('fecharCronogramasBtn').addEventListener('click', fecharTodosCronogramas);

        if (cronogramas.length === 0) {
            cronogramaContainer.innerHTML = "<p class='text-muted'>Nenhum cronograma salvo encontrado.</p>";
            return;
        }

        cronogramaContainer.innerHTML = "<h2 class='mb-4'>Cronogramas Salvos</h2>";

        cronogramas.forEach((item) => {
            const div = document.createElement('div');
            div.className = 'cronograma-item mb-3';
            div.innerHTML = `
                <div class="list-group">
                    <div class="list-group-item">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Cronograma para: ${item.cargo}</h5>
                            <button class="btn btn-danger btn-sm" onclick="deletarCronograma('${item.id}')">Apagar</button>
                        </div>
                        ${item.cronograma.map(dia => `
                            <div class="list-group">
                <div class="list-group-item">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Estudar: ${dia.dia}</h5>
                        <small>${dia.materia}</small>
                    </div>
                    <p class="mb-1">Livro Recomendado: ${dia.livro}</p>
                    <small>Estude por: ${dia.horas} horas</small>
                </div>
            </div>
                        `).join('')}
                    </div>
                </div>
            `;
                
            cronogramaContainer.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao mostrar cronogramas:', error);
        const cronogramaContainer = document.getElementById('cronogramaContainer');
        cronogramaContainer.innerHTML = "<p class='text-danger'>Erro ao carregar cronogramas.</p>";
    }
} 



function fecharTodosCronogramas() {
    const cronogramaContainer = document.getElementById('cronogramaContainer');
    cronogramaContainer.innerHTML = "<p class='text-muted'>Todos os cronogramas foram fechados.</p>";
}

document.addEventListener('DOMContentLoaded', () => {
    window.deletarCronograma = async function (id) {
        try {
            const response = await fetch(`http://localhost:3000/cronogramas/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar cronograma do servidor.');
            }

            mostrarCronogramas(); 
        } catch (error) {
            console.error('Erro ao deletar cronograma:', error);
            alert('Erro ao deletar cronograma do servidor.');
        }
    };
});


function renderizaCronograma(cronograma, cargoNome) {
    const cronogramaContainer = document.getElementById('cronogramaContainer');
    cronogramaContainer.innerHTML = `
        <h2 class='mb-4'>Seu Cronograma de Estudos</h2>
        <button id="clearCronogramaButton" class="btn btn-danger mb-4">Apagar Cronograma</button>
        <button id="saveCronogramaButton" class="btn btn-success mb-4">Salvar Cronograma</button>
    `;

    cronograma.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cronograma-item mb-3';
        div.innerHTML = `
            <div class="list-group">
                <div class="list-group-item">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Estudar: ${item.materia}</h5>
                        <small>${item.dia}</small>
                    </div>
                    <p class="mb-1">Livro Recomendado: ${item.livro}</p>
                    <small>Estude por: ${item.horas} horas</small>
                </div>
            </div>
        `;
        cronogramaContainer.appendChild(div);
    });

    const saveButton = document.getElementById('saveCronogramaButton');
    saveButton.addEventListener('click', () => salvarCronograma(cronograma, cargoNome));

    const clearButton = document.getElementById('clearCronogramaButton');
    clearButton.addEventListener('click', limpaCronograma);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#app').innerHTML = FormaTemplate();

    const form = document.getElementById('scheduleForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cargoNome = document.getElementById('cargo').value.trim();
        let horasPorDia = parseInt(document.getElementById('horas').value, 10);
        const dataProva = new Date(document.getElementById('dataProva').value);
        const dataAtual = new Date();

        const diasSelecionados = Array.from(document.querySelectorAll('#diasDisponiveis input[type="checkbox"]:checked'))
            .map(checkbox => parseInt(checkbox.value, 10));

        if (isNaN(horasPorDia) || horasPorDia <= 0) {
            alert('Digite uma quantidade válida de horas de estudo (não pode ser negativa ou zero).');
            return;
        }

        if (dataProva <= dataAtual) {
            alert('A data da prova deve ser no futuro.');
            return;
        }

        const dataMaxima = new Date();
        dataMaxima.setFullYear(dataAtual.getFullYear() + 2); 

        if (dataProva > dataMaxima) {
            alert('A data da prova não pode ser mais de 2 anos no futuro.');
            return;
        }

        if (diasSelecionados.length === 0) {
            alert('Selecione ao menos um dia disponível.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/cargos');
            if (!response.ok) {
                throw new Error('Erro ao acessar o servidor.');
            }
            const cargos = await response.json();

            const cargoSelecionado = cargos.find(cargo => cargo.nome.toLowerCase() === cargoNome.toLowerCase());

            if (!cargoSelecionado) {
                alert('Selecione um cargo válido.');
                return;
            }

            const cronograma = geraSchedule(cargoSelecionado, horasPorDia, dataProva, diasSelecionados);
            renderizaCronograma(cronograma, cargoNome);
        } catch (error) {
            console.error('Erro ao buscar cargos do servidor:', error);
        }
    });

    const showButton = document.getElementById('showCronogramasButton');
    if (showButton) {
        showButton.addEventListener('click', mostrarCronogramas);
    }
});

function limpaCronograma() {
    const cronogramaContainer = document.getElementById('cronogramaContainer');
    if (cronogramaContainer) {
        cronogramaContainer.innerHTML = "<p class='text-muted'>Nenhum cronograma disponível.</p>";
    }
}
