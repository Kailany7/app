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
        choices: [...metas],
        instructions: false, 
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!")
        return
    }
    
    
    respostas.forEach((resposta) => {  
         const meta = metas.find((m)=> {
             return m.value == resposta
         }) 
         meta.checked = true
    })

    console.log('Meta(s) marcadas como concluída(s)')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log('Não existem metas realizadas! :(')
        return
    }  
    
    await select({
        message: "Metas Realiazaas",
        choices: [...realizadas],
    })
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
                    name: "Metas realizadas",
                    value: "realizadas"

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
            case "realizadas":
                await metasRealizadas()
                break
            case "sair":
                console.log("Até a próxima")
                return    
        }

    }
    
}


start()