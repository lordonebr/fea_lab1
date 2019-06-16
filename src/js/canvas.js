// constantes utilizadas
const widthBorderCol = 1;
const colorBorderCol = "black";
const colorTextValue = "black";
const colorDespesa = "#FF0000";
const colorReceita = "#00FF00";
const graphicPaddingTop = 25;
const graphicTextValuePaddingTop = 5;
const graphicTextDatePaddingTop = 15;
const graphicTextValuePaddingLeft = 2;
const graphicTextValueFont = "10px Arial";

// desenha uma coluna do gráfico
function drawColumn(element, widthCol, numCol, height, color, labelValue, labelDate){
    var canvas = document.getElementById(element);
    var context = canvas.getContext("2d");
    
    let valX = numCol * widthCol;
    let valY = canvas.height;
    let valHeight = height * -1;

    // barra do grafico
    context.rect(valX, valY, widthCol, valHeight);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = widthBorderCol;
    context.strokeStyle = colorBorderCol;
    context.stroke();

    // texto do valor
    context.font = graphicTextValueFont;
    context.fillStyle = colorTextValue;
    context.fillText(labelValue, valX+graphicTextValuePaddingLeft, valY+valHeight-graphicTextValuePaddingTop);

    // texto da data
    context.font = graphicTextValueFont;
    context.fillStyle = colorTextValue;
    context.fillText(labelDate, valX+graphicTextValuePaddingLeft, valY+valHeight-graphicTextDatePaddingTop);
}

// desenha um gráfico
function drawGrafico(element, objGrafico, maxValue, color){

    var canvas = document.getElementById(element);

    let listKeys = Object.keys(objGrafico).sort();
    let numCol = listKeys.length;;
    let widthCol = canvas.width / numCol;
    let valMaxGrafico = canvas.height - graphicPaddingTop;

    if(maxValue < 0)
        maxValue = maxValue * -1;
    
    for(let col = 0; col < numCol; col++){
        let dateVal = listKeys[col];
        let value = objGrafico[dateVal];
        if(value < 0)
            value = value * -1;

        let setVal = (value * valMaxGrafico) / maxValue;
            drawColumn(element, widthCol, col, setVal, color, value.toFixed(2), dateVal);
    }
}

// função auxiliar para o metodo sort
function sortValue(a,b){
    if( isNaN(a) && isNaN(b) ) {
      return (a < b ? -1 : (a > b ? 1 : 0));
    } else {
      return b - a
    }
}

// recebe uma data no formato YYYY/MM
// retorna a data seguinte no formato YYYY/MM
function getNextDate(dateYYYYMM){

    let yearValue = parseInt(dateYYYYMM.substring(0, 4));
    let monthValue = parseInt(dateYYYYMM.substring(5, 7))
    monthValue++;
    if(monthValue === 13){
        yearValue++;
        monthValue = 1;
    }

    let monthValueString = monthValue.toString();
    if(monthValue < 10)
        monthValueString = '0' + monthValue.toString();

    let nextValue = yearValue.toString() + '/' + monthValueString;
    return nextValue;

}

function drawGraficos(){

    let example = [];

    example.push({
        "date"  : "2019/06/12",
        "value" : 100.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2019/04/10",
        "value" : 50.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2019/06/11",
        "value" : 250.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2019/05/30",
        "value" : -15.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2019/05/01",
        "value" : -55.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2019/04/17",
        "value" : -60.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2019/04/17",
        "value" : 60.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2019/05/30",
        "value" : -120.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/12/30",
        "value" : 66.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2019/01/30",
        "value" : -120.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/01/30",
        "value" : -120.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/07/30",
        "value" : -130.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/08/30",
        "value" : -30.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/09/30",
        "value" : -40.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/10/30",
        "value" : -543.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/11/30",
        "value" : -443.22,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/12/30",
        "value" : -444.22,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/07/30",
        "value" : 853.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/08/30",
        "value" : 632.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/09/30",
        "value" : 653.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/10/30",
        "value" : 654.0,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/11/30",
        "value" : 543.22,
        "category" : "teste",
        "description" : ""
    });

    example.push({
        "date"  : "2018/12/30",
        "value" : 423.22,
        "category" : "teste",
        "description" : ""
    });


    // separa as despesas/receitas por mês
    let maiorDespesa = 0;
    let maiorReceita = 0;
    let despesas = {};
    let receitas = {};
    let sortData = example.sort((a, b) => sortValue(a.date, b.date));
    for(let i = 0; i < sortData.length; i++){
        let item = sortData[i];
        let dateItem = item.date.substring(0, 7);
        let valueItem = item.value;
        if(valueItem > 0){
            // item é uma receita
            let valTotal = 0;
            if(receitas[dateItem] != undefined)
                valTotal = receitas[dateItem];

            valTotal += valueItem;
            receitas[dateItem] = valTotal;

            if(maiorReceita < valTotal)
                maiorReceita = valTotal;

            // se não existe despesa para esta data, vamos criar
            if(despesas[dateItem] == undefined)
                despesas[dateItem] = 0;
        }
        else{
            // item é uma despesa
            let valTotal = 0;
            if(despesas[dateItem] != undefined)
                valTotal = despesas[dateItem];

            valTotal += valueItem;
            despesas[dateItem] = valTotal;

            if(maiorDespesa > valTotal)
                maiorDespesa = valTotal;

             // se não existe receita para esta data, vamos criar
             if(receitas[dateItem] == undefined)
                receitas[dateItem] = 0;
        }
    }

    // cria as datas mensais faltantes entre os lançamentos (se existirem)
    let nextValue = undefined;
    let datasReceitas = Object.keys(receitas);
    for(let k = 0; k < datasReceitas.length; k++){

        while(nextValue != undefined && nextValue != datasReceitas[k]){
            despesas[nextValue] = 0;
            receitas[nextValue] = 0;
            nextValue = getNextDate(nextValue);
        }

        nextValue = getNextDate(datasReceitas[k]);
    }

    // o gráfico deve mostrar no máximo os 12 últimos meses, 
    // se existir uma quantidade maior, separamos os 12 ultimos meses
    let receitasGrafico = [];
    let despesasGrafico = [];
    let listKeys = Object.keys(receitas).sort();
    if(listKeys.length > 12){
        maiorDespesa = 0;
        maiorReceita = 0;
        let initKey = listKeys.length - 12;
        for(let k = initKey; k < listKeys.length; k++){
            receitasGrafico[listKeys[k]] = receitas[listKeys[k]];
            if(maiorReceita < receitas[listKeys[k]])
                maiorReceita = receitas[listKeys[k]];

            despesasGrafico[listKeys[k]] = despesas[listKeys[k]];
            if(maiorDespesa > despesas[listKeys[k]])
                maiorDespesa = despesas[listKeys[k]];
        }
    }
    else{
        receitasGrafico = receitas;
        despesasGrafico = despesas;
    }

    if(Object.keys(receitasGrafico).length > 0){
        $("#receitasLastMonths").text(Object.keys(receitasGrafico).length);
        drawGrafico("canvasReceitas", receitasGrafico, maiorReceita, colorReceita);
    }

    if(Object.keys(despesasGrafico).length > 0){
        $("#despesasLastMonths").text(Object.keys(despesasGrafico).length);
        drawGrafico("canvasDespesas", despesasGrafico, maiorDespesa, colorDespesa);
    }
}