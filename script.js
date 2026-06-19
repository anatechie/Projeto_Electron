const formProduto = document.getElementById('formProduto')
const nomeProduto = document.getElementById('nomeProdutos')
const marcaProduto = document.getElementById('marcaProdutos')
const quantidadeProduto = document.getElementById('quantidadeProdutos')
const precoProduto = document.getElementById('precoProdutos')
const listaProduto = document.getElementById('listaProdutos')
const quantidadeTotal = document.getElementById('quantidadeTotal')
const valorTotal = document.getElementById('valorProdutos')

let produtos = carregarProdutos()

//espera o botao ser clicado
//func q recebe o evento
formProduto.addEventListener('submit', function(evento){
    //previne envio antecipado
    evento.preventDefault()

    // objeto: produto {}
    const produto ={
        //value: pega o valor
        //trim remove espaco
 // propriedade
        id: Date.now(),
        nome: nomeProduto.value.trim(),
        marca: marcaProduto.value.trim(),
        quantidade: Number(quantidadeProduto.value),
        preco: Number(precoProduto.value)
    }

    if(produto.nome === '' ){
        nomeProduto.focus() //se o campo referido estiver vazio, o focus() demarca o campo especifico que nao foi preenchido
        return
    }

    if(produto.marca === '' ){
        marcaProduto.focus()
        return
    }

    if(produto.quantidade === '' ||  produto.preco <= 0){
        quantidadeProduto.focus() //se o campo referido estiver vazio ou for menor ou igual a 0, o focus() demarca o campo especifico que nao foi preenchido
        return
    }

    
    precoProduto.focus()
    if(produto.preco === '' || produto.quantidade <= 0){
        return
    }

    //joga(push) dentro de produto(objeto) e produtoS recebe as informações
    produtos.push(produto)
    

    salvarProdutos() //salva os produtos
    atualizarTela() //atualiza a tela

    formProduto.reset() //reseta formulario

    nomeProduto.focus()

    function atualizarTela(){
        //retorna numero de elementos do array comparando com 0
        if(produtos.length === 0) {
            listaProduto.innerHTML = // se estiver vazio a mensagem aparece
            `<tr> <td class= 'mensagem-vazia'> Nenhum produto cadastrado</td> <tr>`

            atualizarResumo()
            return //apos retorna o que foi feito
        }

        produtos.forEach(function(produto){ 
            const totalProduto = produto.quantidade * produto.preco

            const linha = document.createElement('tr') //cria linha
          //muda para o nome dos campos
            linha.innerHTML = ` 
            <td>${produto.nome}</td>
            <td>${produto.marca}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.preco}</td>
            <td>${totalProduto}</td>

            <button class='botao-excluir data-id= ${produto.id}>Excluir<button/>
            `
            
        listaProduto.appendChild(linha) //adiciona produto na tabela
        })

        atualizarResumo() //atualiza o resumo do estoque

    }
    listaProduto.addEventListener('click', function(evento){
        const botaoClicado = evento.target //target é o alvo

        if(botaoClicado.classList.contains('botao-excluir')){
            const idProduto = Number(botaoClicado.dataset.id) //faz conversao para Number setando o id

            produtos = produtos.filter(function (produto){ //produtos recebe o filtro
                return produto.id !== idProduto //retorna se produto é diferente do idProduto
            })
            salvarProdutos() //salva os produtos
            atualizarTela() //atualiza a tabela
        }
    })
})

function atualizarResumo() {
    //conteudo do texto 
    totalProdutos.textContent = produtos.length // quantidade de produtos

    const somaQuantidade = produtos.reduce(function (total, produto) { 
        return total + produto.quantidade // retorna a soma da quantidade do produto
    }, 0)

    const somaValor = produtos.reduce(function (total, produto) {
        return total + produto.quantidade * produto.preco //retorna o valor
    }, 0)

    quantidadeTotal.textContent = somaQuantidade //recebe o valor da soma da quantidade de produtos
    valorTotal.textContent = somaValor //recebe a soma do valor dos produtos
}

function salvarProdutos() {
    localStorage.setItem('produtos', JSON.stringify(produtos)) //local storage armazena localmente, pois nao tem banco de dados para persistencia
}

function carregarProdutos() {
    const produtosSalvos = localStorage.getItem('produtos')  //pega os itens armazenados

    if (produtosSalvos === null) { //verifica se os produtos salvos estao vazios
        return [] // retorna array vazio 
    }

    return JSON.parse(produtosSalvos) //retorna um json dos produtos salvos { .... }
}

atualizarTela() //atualiza a tabela?