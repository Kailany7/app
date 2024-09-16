const { select, input, checkbox } = require('@inquirer/prompts') // para extrair algum módulo pronto

let mensagem = "Bem-vindo ao App de Metas "
let meta = {
    value: 'Toamr 3l de água por dia',
    checked: false
}

let metas = [ meta ]  

const cadastraMetas = async () => {
    const meta = await input({ message: "Digite a meta:" }) 
    
    if(meta.length == 0){
        mensagem = 'A meta não pode ser vazia.'
        return
    }

    metas.push( 
        { value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso!"
} 

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as Setas para mudar de meta, o Espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
        choices: [...metas],
        instructions: false, 
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada!"
        return
    }
    
    
    respostas.forEach((resposta) => {  
         const meta = metas.find((m)=> {
             return m.value == resposta
         }) 
         meta.checked = true
    })

    mensagem = 'Meta(s) marcada(s) como concluída(s)'
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = 'Não existem metas realizadas! :('
        return
    }  
    
    await select({
        message: "Metas Realiazadas: " + realizadas.length,
        choices: [...realizadas],
    })
}

const metasAbertas =async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true // se o falso for diferente de verdadeiro então ele é verdadeiro = se a meta marcada for diferente de marcada então ela não ta marcada
    })

    if(abertas.length == 0){
        mensagem = 'Não existem metas abertas! :)'
        return
    }

    await select({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas],
    }
    )
}

const deletarMetas = async () => {
    const metasDesmarcadas =  metas.map((meta) => {  // o map modifica a array original
       return {value: meta.value, checked: false,}
    })

    const itensADeletar = await checkbox({
        message: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false, 
    })

    if(itensADeletar.length == 0) {
        mensagem = 'Nenhum item para deletar!'
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item

        })
    })

    mensagem = "Meta(s) deleta(s) com sucesso!"

}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => { 
  
    while(true){
        mostrarMensagem()
        
        const opcao = await select ({
            message: "Menu >",
            choices: [   // choices = escolhas
                {
                    name: "Cadastrar meta",
                    value: "cadrastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"

                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"

                },
                {
                    name: "Metas abertas",
                    value: "abertas"

                },
                {
                    name: "Deletar metas",
                    value: "deletar"

                },
                {
                    name: "Sair",
                    value: "sair"

                }
            
            ] 
                
        }) 

        switch(opcao) {
            case "cadrastrar":
                await cadastraMetas() 
                break
            case "listar":
                await listarMetas() 
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até a próxima")
                return    
        }

    }
    
}


start()