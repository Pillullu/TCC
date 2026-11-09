
const jogos = [
    {
        nome: "Minecraft",
        disponivel: true
    },
    {
        nome: "God of War",
        disponivel: true
    },
    {
        nome: "Subnautica 2",
        disponivel: false
    }
]

// declarando as variaveis gerais 
let timer

const nome_jogo = document.querySelector("#nome-jogo")
const lista = document.querySelector("#lista-jogos")
const form = document.querySelector("#form-jogo")
const pesquisa = document.querySelector("#pesquisa")
const aviso = document.querySelector("#mensagem")

// verificador de duplicação de nome
function jogoExiste(nome) {
    return jogos.some(function(jogo) {
        return jogo.nome.toLowerCase() === nome.toLowerCase()
    })
}

// adiciona os jogos na biblioteca
function adicionarbiblio(jogo, quant) {
    const card = document.createElement("div")
    card.classList.add("card-jogo")

    const titulo = document.createElement("h3")
    titulo.textContent = jogo.nome
    card.appendChild(titulo)

    const label = document.createElement("label")
    label.textContent = "Disponibilidade: " +
        (jogo.disponivel ? "Disponível" : "Indisponível")

    const controles = document.createElement("div")

    const botaostatus = document.createElement("button")
    botaostatus.textContent = jogo.disponivel
        ? "Deixar indisponível"
        : "Deixar disponível"
/// botao de modificar status e funções quando clicado
    botaostatus.addEventListener("click", function() {
        jogos[quant].disponivel = !jogos[quant].disponivel
        renderizarjogos(pesquisa.value.toLowerCase().trim())
    })
/// botao de remover e funções quando clicado
    const remover = document.createElement("button")
    remover.textContent = "Remover jogo"

    remover.addEventListener("click", function() {
        let confirmacao = confirm(
            "Você tem certeza de que quer remover esse jogo?"
        )

        if (confirmacao) {
            aviso.textContent = jogos[quant].nome + " foi removido da biblioteca!"

            jogos.splice(quant, 1)

            clearTimeout(timer)
            timer = setTimeout(function() {
                aviso.textContent = ""
            }, 3000)

            renderizarjogos(pesquisa.value.toLowerCase().trim())
        }
    })

    controles.appendChild(label)
    controles.appendChild(botaostatus)
    controles.appendChild(remover)

    card.appendChild(controles)
    lista.appendChild(card)
}

function renderizarjogos(texto) {
    let encontrou = false
    lista.textContent = ""

    for (let quant = 0; quant < jogos.length; quant++) {
        if (texto === "" || jogos[quant].nome.toLowerCase().includes(texto)) {
            encontrou = true
            adicionarbiblio(jogos[quant], quant)
        }
    }

    if (!encontrou) {
        lista.textContent = "Nenhum jogo encontrado"
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault()

    const nome = nome_jogo.value.trim().replace(/\s+/g, " ")
    const temletra = /[a-zA-Z]/.test(nome)
    const existe = jogoExiste(nome)

    if (nome === "") {
        alert("Digite o nome do jogo!")
    }
    else if (!temletra) {
        alert("O nome precisa conter ao menos uma letra")
    }
    else if (existe) {
        alert("Jogo já cadastrado")
    }
    else {
        jogos.push({
            nome,
            disponivel: true
        })

        nome_jogo.value = ""
        pesquisa.value = ""

        renderizarjogos("")
    }
})
// sistema de pesquisa do site
pesquisa.addEventListener("input", function() {
    const texto = pesquisa.value.toLowerCase().trim()
    renderizarjogos(texto)
})

renderizarjogos("")
