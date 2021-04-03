var carta1 = {
    nome: "Naruto Uzumaki",
    imagem: "https://caua1000.files.wordpress.com/2013/05/nrt_naruto-uzumaki-image-special-2.jpg?w=584",
    atributos: {
        ataque: 80,
        defesa: 70,
        chakara: 100
    }
}

var carta2 = {
    nome: "Sasuke Uchiha",
    imagem: "https://animanganaruto77.files.wordpress.com/2009/08/sasukeuchiha.jpg?w=584",
    atributos: {
        ataque: 75,
        defesa: 80,
        chakara: 80
    }
}

var carta3 = {
    nome: "Sakura Haruno",
    imagem: "https://static.wikia.nocookie.net/naruto/images/c/cf/Sakura_%28Naruto_Cl%C3%A1ssico%29.png/revision/latest?cb=20180211141243&path-prefix=pt-br",
    atributos: {
        ataque: 65,
        defesa: 50,
        chakara: 60
    }
}

var carta4 = {
    nome: "Kakashi Hatake",
    imagem: "http://3.bp.blogspot.com/-jggfdeX363o/TdwAij7lCJI/AAAAAAAAAeA/tu-QFSdbGCQ/s1600/kakashi-chidori.jpg",
    atributos: {
        ataque: 82,
        defesa: 90,
        chakara: 95
    }
}

var carta5 = {
    nome: "Tsunade",
    imagem: "https://i.redd.it/6zqeg913tg551.jpg",
    atributos: {
        ataque: 100,
        defesa: 80,
        chakara: 86
    }
}

var carta6 = {
    nome: "Jiraya",
    imagem: "https://static.wikia.nocookie.net/naruto/images/7/73/Jiraiya_perfil.PNG/revision/latest?cb=20191203234503&path-prefix=pt-br",
    atributos: {
        ataque: 96,
        defesa: 88,
        chakara: 90
    }
}

var carta7 = {
    nome: "Orochimaru",
    imagem: "https://criticalhits.com.br/wp-content/uploads/2019/12/orochimaru.jpg",
    atributos: {
        ataque: 100,
        defesa: 94,
        chakara: 97
    }
}

var carta8 = {
    nome: "Rock Lee",
    imagem: "https://criticalhits.com.br/wp-content/uploads/2020/03/rock-lee-1.jpg",
    atributos: {
        ataque: 84,
        defesa: 80,
        chakara: 97
    }
}

var carta9 = {
    nome: "Gaara",
    imagem: "https://kanto.legiaodosherois.com.br/w760-h398-gnw-cfill-q80/wp-content/uploads/2020/09/legiao_w8vr9bf7zBIa.png.jpeg",
    atributos: {
        ataque: 97,
        defesa: 94,
        chakara: 100
    }
}

var cartaMaquina
var cartaJogador
var cartas = [carta1, carta2, carta3, carta4, carta5, carta6, carta7, carta8, carta9]        

var pontosJogador = 0
var pontosMaquina = 0

atualizaPlacar()
atualizaQuantidadeDeCartas()

function atualizaQuantidadeDeCartas() {
    var divQuantidadeCartas = document.getElementById('quantidade-cartas')
    var html = "Quantidade de cartas no jogo: " + cartas.length

    divQuantidadeCartas.innerHTML = html
}

function atualizaPlacar() {
    var divPlacar = document.getElementById('placar')
    var html = "Jogador " + pontosJogador + "/" + pontosMaquina + " Máquina"

    divPlacar.innerHTML = html
}

function sortearCarta() {
    var numeroCartaMaquina = parseInt(Math.random() * cartas.length)
    cartaMaquina = cartas[numeroCartaMaquina]
    cartas.splice(numeroCartaMaquina, 1)

    var numeroCartaJogador = parseInt(Math.random() * cartas.length)
    cartaJogador = cartas[numeroCartaJogador]
    cartas.splice(numeroCartaJogador, 1)

    document.getElementById('btnSortear').disabled = true
    document.getElementById('btnJogar').disabled = false

    exibeCartaJogador()
}

function exibeCartaJogador() {
    var divCartaJogador = document.getElementById("carta-jogador")
    var moldura = '<img src="meu-card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
    var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaJogador.atributos) {
        opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaJogador.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status'>"

    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
    var radioAtributo = document.getElementsByName('atributo')
    for (var i = 0; i < radioAtributo.length; i++) {
        if (radioAtributo[i].checked) {
            return radioAtributo[i].value
        }
    }
}

function jogar() {
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = obtemAtributoSelecionado()

    if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Venceu</p>'
        pontosJogador++
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Perdeu</p>'
        pontosMaquina++
    } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>'
    }

    if (cartas.length == 0) {
        alert("Fim de jogo")
        if (pontosJogador > pontosMaquina) {
            htmlResultado = '<p class="resultado-final">Venceu</p>'
        } else if (pontosMaquina > pontosJogador) {
            htmlResultado = '<p class="resultado-final">Perdeu</p>'
        } else {
            htmlResultado = '<p class="resultado-final">Empatou</p>'
        }
    } else {
        document.getElementById('btnProximaRodada').disabled = false
    }

    divResultado.innerHTML = htmlResultado
    document.getElementById('btnJogar').disabled = true

    atualizaPlacar()
    exibeCartaMaquina()
    atualizaQuantidadeDeCartas()
}

function exibeCartaMaquina() {
    var divCartaMaquina = document.getElementById("carta-maquina")
    var moldura = '<img src="meu-card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
    var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaMaquina.atributos) {
        console.log(atributo)
        opcoesTexto += "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaMaquina.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status --spacing'>"

    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function proximaRodada() {
    var divCartas = document.getElementById('cartas')

    divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"></div>`

    document.getElementById('btnSortear').disabled = false
    document.getElementById('btnJogar').disabled = true
    document.getElementById('btnProximaRodada').disabled = true

    var divResultado = document.getElementById('resultado')
    divResultado.innerHTML = ""
}