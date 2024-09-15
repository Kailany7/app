const { select, input, checkbox } = require('@inquirer/prompts') // para extrair algum módulo pronto

let meta = {
    value: 'Toamr 3l de água por dia',
    checked: false
}

let metas = [ meta ]  

const cadastraMetas = async () => {
    const meta = await input({ message: "Digite a meta:" }) 
    
    if(meta.length == 0){
        return
    }

    metas.push( 
        { value: meta, checked: false}
    )
} 

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as Setas para mudar de meta, o Espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
       //choices é uma escola e colocamos uma array : []
        choices: [...metas], // colocamos as metas dentro da lista que podemos imaginar como uma caixa e os ... fez uma copia d emeta e espalhou na "caixa"
        instructions: false, // limpa a instrução em ingles que aparece
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!")
        return
    }
    // mecanismo para desmarcar as metas
    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {  //forEach (para cada) ver o que o usuario digitou e compara com as metas
         const meta = metas.find((m)=> {  //find ver as metas já feitas para comparar com a meta digitada
             return m.value == resposta
         }) 
         meta.checked = true
    })

    console.log('Meta(s) marcadas como concluída(s)')
}



const start = async () => { 
    
    while(true){
        
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
                    name: "Sair",
                    value: "sair"

                }
            
            ] 
                
        }) 

        switch(opcao) {
            case "cadrastrar":
                await cadastraMetas() 
                console.log(metas)
                break
            case "listar":
                await listarMetas() 
                break
            case "sair":
                console.log("Até a próxima")
                return    
        }

    }
    
}


start()