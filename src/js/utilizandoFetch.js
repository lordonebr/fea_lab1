const autores = [{ nome: 'André', git: 'lordonebr' }, { nome: 'Hugo Vinicius', git: 'hugovinicius' }];

var rodapeDocumento = document.querySelector('.rodape ul');

function LoadAutores() {
    for (let autor of autores) {
        BuscarDadosGit(autor);
    }
}

function BuscarDadosGit(autor) {
    let url = `https://api.github.com/users/${autor.git}/repos`,
        fetchData = {
            method: 'GET',
            headers: new Headers()
        };

    fetch(url, fetchData)
        .then(response => response.json())
        .then(data => {
            if (data.length == 0) {
                alert(`Repositorio vazio: ${data}`);
                console.log(data);
            } else {
                CarregarDadosGit(autor, data[0]);
            }
        });
}

function CarregarDadosGit(autor, repositorio) {
   let elementLI = document.createElement('li'),
       htmlAutor = `<a href="https://github.com/${autor.git}" target="_blank"><img alt="Foto da capa do Github do Autor" width="260" height="260" class="" src=" ${repositorio.owner.avatar_url}"><br>${autor.nome}</a>`;

   elementLI.innerHTML = htmlAutor;
   rodapeDocumento.appendChild(elementLI);
}

export { LoadAutores }