$(document).ready(function() {
    drawGraficos();

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
        else
            form[field.name] = field.value;
        });

        if(form.date != "" && form.value != ""){
            event.preventDefault();  // não deixa recarregar a página principal, pelo redirecionamento do submit
            // SALVAR NO INDEXEDDB
            // SALVAR NA TABELA
        }

    }); 
});