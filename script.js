const html = document.querySelector('html')

//botoes
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const comecarBt = document.querySelector('.app__card-primary-button')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true
const somPlay = new Audio('/sons/play.wav')
const somPause = new Audio('/sons/pause.mp3')
const somTempoFinalizado = new Audio('/sons/beep.mp3')
const timer = document.querySelector('#timer')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = startPauseBt.querySelector('span')
const iniciarOuPausarIcone = startPauseBt.querySelector('img')
console.log(iniciarOuPausarIcone)
const duracaoFoco = 1500
const duracaoDescansoCurto = 300
const duracaoDescansoLongo = 900
let tempoDecorridoEmSegundos = 5
let intervaloId = null


focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

function alterarContexto(contexto) {

    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong"> Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        // somTempoFinalizado.play()
        alert("Tempo finalizado")
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        somPause.play()
        zerar()
        return
    }
    somPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarIcone.setAttribute('src', '/imagens/pause.png' )
    iniciarOuPausarBt.textContent = "Pausar"
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarIcone.setAttribute('src', '/imagens/play_arrow.png' )
    intervaloId = null
}
