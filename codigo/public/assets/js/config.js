const dbMock = {
    voltar: [
      { id: 1, class: 'btn-voltar', icon: 'oi oi-chevron-left' }
    ],
    botoes: [
      { id: 1, label: 'Sua Conta', class: 'btn btn-light', icon: 'oi oi-person' },
      { id: 2, label: 'Notificações', class: 'btn btn-light', icon: 'oi oi-bell' },
    ]
  };
  function adicionarBotaoVoltar() {
    const voltar = dbMock.voltar[0];
    const buttonHTML = `
      <button class="${voltar.class}" id="backButton">
        <i class="${voltar.icon}"></i>
      </button>
    `;
  
    document.getElementById('buttonContainer').innerHTML = buttonHTML;
  
    document.getElementById('backButton').addEventListener('click', () => {
      window.location.href = './homepage.html'; 
    });
  }
  
  function exibirBotoes() {
    let str = '';

    for (let i = 0; i < dbMock.botoes.length; i++) {
      const button = dbMock.botoes[i];
  
      str += `
        <div class="d-flex align-items-center my-3" style="width: 100%; max-width: 600px;">
            <div style="display: flex; align-items: center; justify-content: flex-start; width: 40px;">
                <i class="${button.icon} botao-icone"></i>
            </div>
            <button class="${button.class} text-start flex-grow-1" type="button" 
                style="padding: 16px 30px; font-size: 1.2rem; width: 100%;" 
                onclick="window.location.href='exibepagina.html?id=${button.id}'">
                ${button.label}
            </button>
        </div>
  
        `
    }
  
    document.querySelector('#botoes').innerHTML = str;
  }

  document.body.onload = () => {
    adicionarBotaoVoltar();
    exibirBotoes();
  }