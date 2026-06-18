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
        nomeProduto.focus()
        return
    }

    if(produto.marca === '' ){
        marcaProduto.focus()
        return
    }

    if(produto.quantidade === '' ||  produto.preco <= 0){
        quantidadeProduto.focus()
        return
    }

    //alt 124
    precoProduto.focus()
    if(produto.preco === '' || produto.quantidade <= 0){
        return
    }

    //joga(push) dentro de produto(objeto) e produtos recebe as informações
    produtos.push(produto)

    salvarProduto()
    atualizarTela()

    formProduto.reset() 

    nomeProduto.focus()

    function atualizarTela(){
        if(produtos.length === 0) {
            listaProduto.innerHTML = 
            `<tr> <td class= 'mensagem-vazia'> Nenhum produto cadastrado</td> <tr>`

            atualizarResumo()
            return
        }
    }
})

