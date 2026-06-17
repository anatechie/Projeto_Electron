//inicia o app
//importa o app e o Browser
// {} -> desconstrucao ao inves de
//const app = require ('electron')
//const Browser = require ('electron')
const {app, BrowserWindow} = require('electron')

//atualizacao automatica da janela
//tratamento de erro
try{
    require('electron-reloader')(module)
}
catch(e){
    console.log('erro ao carregar o electron-reloader', e)
}


//cria janela
function criarJanela(){
    const janela = new BrowserWindow({
        //tamanho inicial
        width: 1000,
        //altura inicial
        height: 700,
        //tamanho min q usuatio pode colocar na janela
        minWidth: 800,
        //altura min
        minHeight: 600,

        //Muda titulo da janela
        title: 'Sistema de Estoque'
    })

    //pega html e coloca na janela do software
    janela.loadFile('index.html')
}

//carrega o electron antes de iniciar o software
//then -> se der certo, chama a func de criar a janela
//whenReady -> quando o stw tiver pronto, faz o then
app.whenReady().then(()=>{
    //func criar janela
    criarJanela()

    //se app em segundo plano, abre janela
    //app.on->  se o sftw estiver funcionando
    app.on('active', ()=>{
        //browserwindow.getAllWindow verifica todas as janelas abertas do windows,
        //ve se a do sftw existe, senao, ele abre janela
        if(BrowserWindow.getAllWindows().length === 0){
            criarJanela()
        }
    })
})