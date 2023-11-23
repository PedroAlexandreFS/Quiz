//VARIAVEIS DE CONTROLE DO NOSSO JOGO

let perguntasFeitas = [];

//PERGUNTAS DO JOGO
const perguntas = [
  //PERGUNTA 0
  {
    pergunta:
      "Qual dessas linguagens não é considerados uma linguagem de programação?",
    respostas: ["PHP", "javaScript", "c++", "HTML"],
    correta: "resp3",
  },
  //PERGUNTA 1
  {
    pergunta: "Em que ano o Brasil foi descoberto?",
    respostas: ["1498", "1500", "1375", "1828"],
    correta: "resp1",
  },
  //PERGUNTA 2
  {
    pergunta: "O que significa a sigla HTML?",
    respostas: [
      "Hyper Tonto Maluco Legal",
      "Hyper Text Markup Language",
      "Hey Trade More Language",
      "Hyper Text Mark lang",
    ],
    correta: "resp1",
  },
  //PERGUNTA 3
  {
    pergunta: "Quais dessas linguagens é considerada uma linguagem de marcação",
    respostas: ["HTML", "javaScript", "c++", "PHP"],
    correta: "resp0",
  },
];

var qtdPerguntas = perguntas.length - 1;

gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas) {
  //gerar um numero aleatorio

  let random = (Math.random() * maxPerguntas).toFixed();

  //converter para numero
  random = Number(random);

  //verificar se a pergunta ja foi feita

  if (!perguntasFeitas.includes(random)) {
    perguntasFeitas.push(random)

    //preencher o html com os dados da questão sorteada
    var p_selecionada = perguntas[random].pergunta;

    //pergunta aparecer na pagina
    $("#pergunta").html(p_selecionada);
    $("#pergunta").attr('data-indice', random);

    //colocar as respostas
    for (var i = 0; i < 4; i++) {
      $("#resp" + i).html(perguntas[random].respostas[i]);
    }
      
    //EMBARALHA AS RESPOSTAS
    var father = $("#respostas");
    var botoes = father.children();
    
    for (var i = 1; i < botoes.length; i++) {
      father.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
    }


  } else {
    //SE A PERGUNTA JA FOI FEITA
    if (perguntasFeitas.length < qtdPerguntas + 1) {
      return gerarPergunta(maxPerguntas);
    } else {

      $('.Quiz').addClass('oculto')
      $('#mensagens').html("parabéns você venceu. Acertou todas as Perguntas!")
      $('#status').removeClass('oculto')

    }
   
  }
}

$('.resposta').click(function () {
  if ($('.Quiz').attr('data-status') !== "travado") {
    
  
    //PECORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA

    resetaBotoes();

    //ADCIONAR A CLASSE SELECTION
    $(this).addClass('selection')
  };
});

//PEGAR O INDICE DA PERGUNTA
$("#confirm").click(function () {
  var indice = $("#pergunta").attr('data-indice');

  //QUAL É A RESPOSTA CERTA
  var respCerta = perguntas[indice].correta;

  //QUAL FOI A RESPOSTA QUE O USUARIO SELECIONOU
  $('.resposta').each(function () {
    if ($(this).hasClass('selection')) {
      var respostaEscolhida = $(this).attr('id');
      if (respCerta == respostaEscolhida) {
        proximaPergunta();

      } else {
        $(".Quiz").attr('data-status', 'travado');
        $('#confirm').addClass('oculto')
        $('#' + respCerta).addClass('correta');
        $('#' + respostaEscolhida).removeClass('selection');
        $('#' + respostaEscolhida).addClass('errado');
        setTimeout(function () {
          gameOver();
        },4000)
      };
    }
  })
});

function newGame() {
  $('#confirm').removeClass('oculto');
  $(".Quiz").attr('data-status', 'ok');
  perguntasFeitas = [];
  resetaBotoes();
  gerarPergunta(qtdPerguntas);
  $('.Quiz').removeClass('oculto')
  $('#status').addClass('oculto')
}

function proximaPergunta() {
 
  resetaBotoes();
  gerarPergunta(qtdPerguntas);
}

function resetaBotoes() {
  $('.resposta').each(function () {
    if ($(this).hasClass('selection')) {
      $(this).removeClass('selection')
    }
    if ($(this).hasClass('correta')) {
      $(this).removeClass('correta')
    }
    if ($(this).hasClass('errado')) {
      $(this).removeClass('errado')
    }
    
  });
};

function gameOver() {
  $('.Quiz').addClass('oculto');
  $('#mensagens').html('Game Over!');
  $('#status').removeClass('oculto');
}

$('#novoJogo').click(function () {
  newGame();
});