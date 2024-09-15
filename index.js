const { select } = require('@inquirer/prompts') // para extrair algum módulo pronto

const start = async () => {  //start é uma função
    
    while(true){
        // await é como se fosse uma espera informando que o usuario vai selecionar alguma coisa. O AWAIT precisa de ASYNC para funcionar
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
                console.log("vamos cadastrar")
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