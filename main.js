const cpfInput = document.querySelector('.cpf');
const botao = document.querySelector('.verifica')
const result = document.querySelector('.result') 

botao.addEventListener('click', function(){
    let cpf = cpfInput.value;

    function valida(cpf){
        const cpfLimpo = cpf.replace(/\D+/g, '');
        let cpfParcial = cpfLimpo.slice(0, -2);;
    
        const digito1 = criaDigito(cpfParcial)
        const digito2 = criaDigito(cpfParcial + digito1)
        if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;
        if( cpfParcial + digito1 + digito2 === cpfLimpo){
        return true;}
        else{
        return false}; 
    }


    function criaDigito(cpfParcial){
        const arrayCpf = Array.from(cpfParcial);
        let regressivo = arrayCpf.length + 1;
        const total = arrayCpf.reduce((ac, valor) => {
            ac += (Number(valor) * regressivo);
            regressivo--;
            return ac;;
        },0);
        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);
    }



    if(valida(cpf)){
        result.innerText = "✅ CPF válido!";
        console.log(cpf)
        result.style.color = 'green';
    }else{
        result.innerText = "❌ CPF Inválido";
        result.style.color = 'red';
    }});
