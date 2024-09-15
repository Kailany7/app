const { select, input } = require('@inquirer/prompts') // para extrair algum módulo pronto

let meta = {
    value: 'Toamr 3l de água por dia',
    checked: false
}

let metas = [ meta ]  // lista de metas

const cadastraMetas = async () => {
    const meta = await input({ message: "Digite a meta:" }) 
    
    if(meta.length == 0){ // length é para ver quantos caracteres foram escritos, nesse caso para o if funcionar tem que ser Zero caracteres
        console.log('A meta não pode ser vazia')
        return
    }

    metas.push( // serve para colocar mais metas
        { value: meta, checked: false}
    )
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
                console.log("vamos listar")
                break
            case "sair":
                console.log("Até a próxima")
                return    
        }

    }
    
}


start()