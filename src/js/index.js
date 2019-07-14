import '../img/fetch_api.jpg'
import '../img/grafico_acoes.jpg'
import '../img/grafico_despesas_receita.jpg'
import '../img/voltar.png'
import '../css/estilo.scss';
import { LoadAutores } from '../js/utilizandoFetch.js'
import { initIndexedDb, addDataIndexedDb, getAllRegistrosIndexedDb, removeAllRegistrosIndexedDb } from '../js/indexedDb.js'

// preenche tabela de registros
function fillTable(registros){

    $('#tableRegistros tbody tr').remove();

    if(registros != undefined){
        var html = '';

        for(let idx = 0; idx < registros.length; idx++){
            let item = registros[idx];
            let {date, description, value} = item;
            var dateFormat = date.replace( /(\d{4})[-/](\d{2})[-/](\d{2})/, "$3/$2/$1");
            html += '<tr>' +
                    '<td>' + dateFormat + '</td>' +
                    '<td>' + description + '</td>' + 
                    '<td>' + parseFloat(value).toFixed(2) + '</td>' +
                    '</tr>';
        }

        $('#tableRegistros tbody').append(html);
    }
}

$(document).ready(function() {
    
    initIndexedDb().then(res => {
        getAllRegistrosIndexedDb();
    });
    LoadAutores();

    $("#addSubmitBtn").click(function(event){
        
        var form = {};
        // recupera as informações do form
        var x = $("#formRegistro").serializeArray();
        $.each(x, function (i, field) {
        if(field.name === 'value'){
            if(field.value == '')
                form[field.name] = field.value;
            else{
                let valueTemp = field.value.replace(',', '.');
                form[field.name] = parseFloat(parseFloat(valueTemp).toFixed(2));
            }
        }
        else if(field.name === 'date'){
            let valueTemp = field.value.replace('-', '/').replace('-', '/');
            form[field.name] = valueTemp;
        }
        else
            form[field.name] = field.value;
        });

        if(form.date != "" && form.value != ""){
            event.preventDefault();  // não deixa recarregar a página principal, pelo redirecionamento do submit
            addDataIndexedDb(form);

            // recarrega registro do IndexedDB e preenche a tabela e desenha os graficos
            getAllRegistrosIndexedDb(); 

            // limpa form
            $("#valueDate").val("");
            $("#valueInput").val("");
            $("#valueDescription").val("");
        }

    }); 

    $("#clearBtn").click(function(event){
        removeAllRegistrosIndexedDb();
    });   
});

export { fillTable }