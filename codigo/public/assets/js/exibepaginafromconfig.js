function handleQueryParam(param) {

    const urlParams = new URLSearchParams(window.location.search);

    
    const queryParam = urlParams.get(param);

    switch (queryParam) {
        case '1':
            console.log('Redirecionando para pagina1.html...');
            window.location.href = "./suaconta.html"; 
            break;
        case '2':
            console.log('Redirecionando para pagina2.html...');
            window.location.href = "./notificacao.html"; 
            break;
        case '3':
            console.log('Redirecionando para pagina3.html...');
            window.location.href = "./privacidadeesegurança.html"; 
            break;
        case '4':
                console.log('Redirecionando para pagina1.html...');
                window.location.href = "./faq.html"; 
                break;
        case '5':
                console.log('Redirecionando para pagina2.html...');
                window.location.href = "./sobre.html"; 
                break;
        default:
            console.log('Parâmetro desconhecido ou não encontrado.');
            window.location.href = "pagina-padrao.html"; 
            break;
    }
}


handleQueryParam('id');