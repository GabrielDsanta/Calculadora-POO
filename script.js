

const botaoNumeros = document.querySelectorAll('#buttonDefault')
const botaoOperador = document.querySelectorAll('#buttonOperator')
const botaoEquals = document.querySelector('#buttonEquals')
const botaoDelete = document.querySelector('#buttonDelete')
const valorAnteriorTexto = document.querySelector('#valorAnterior')
const valorAtualTexto = document.querySelector('#valorAtual')
const botaoClear = document.querySelector('#botaoLimpar')

class Calculator{
    constructor(valorAnteriorTexto, valorAtualTexto){
        this.valorAnteriorTexto = valorAnteriorTexto
        this.valorAtualTexto = valorAtualTexto
        this.Clear()
    }

    Clear(){
        this.valorAtual = ""
        this.valorAnterior = ""
        this.operation = undefined
    }

    Update(){
        this.valorAnteriorTexto.innerText = `${this.valorAnterior} ${this.operation || ""}`
        this.valorAtualTexto.innerText = this.valorAtual
    }
  
    AddNumber(number){
        if(this.valorAtual.includes(".") && number === ".") return 
        
        this.valorAtual = `${this.valorAtual}${number.toString()}`
    }

    Operator(operation){
        if(this.valorAnterior !== ''){
            this.Calculate()
        }
        this.operation = operation

        this.valorAnterior = this.valorAtual
        this.valorAtual = ""
    }

    Calculate(){
        let resultado 

        const valorAnteriorParse = parseFloat(this.valorAnterior)
        const valorAtualParse = parseFloat(this.valorAtual)

        if(isNaN(valorAnteriorParse) || isNaN(valorAtualParse)) return

        switch(this.operation){
            case "+":
            resultado = valorAnteriorParse + valorAtualParse
            break;

            case "-":
            resultado = valorAnteriorParse - valorAtualParse
            break;

            case "*":
            resultado = valorAnteriorParse * valorAtualParse
            break;

            case "÷":
            resultado = valorAnteriorParse / valorAtualParse
            break;

            default:
            return
        }
        this.valorAtual = resultado
        this.operation = undefined
        this.valorAnterior = ""
    }

    Delete(){
        this.valorAtual = ""
    }
}

const NewCalculator = new Calculator(valorAnteriorTexto, valorAtualTexto)

for(const numberButton of botaoNumeros){
        numberButton.addEventListener('click', () => {
        NewCalculator.AddNumber(numberButton.innerText)
        NewCalculator.Update()
    })
}

for(const operationChoose of botaoOperador){
        operationChoose.addEventListener('click', () => {
        NewCalculator.Operator(operationChoose.innerText)
        NewCalculator.Update()
    })
}

botaoClear.addEventListener('click', () => {
    NewCalculator.Clear()
    NewCalculator.Update()
})

botaoEquals.addEventListener('click', () => {
    NewCalculator.Calculate()
    NewCalculator.Update()
})

botaoDelete.addEventListener('click', () => {
    NewCalculator.Delete()
    NewCalculator.Update()
})
