const cpfInput = document.querySelector('.cpf');
const botao = document.querySelector('.verifica')
const result = document.querySelector('.result') 


botao.addEventListener('click', function () {
  let cpf = cpfInput.value.trim(); // Remove espaços extras
  let verificador = new Verificador(cpf); // ✅ Criando instância da classe

  if (verificador.Valida()) {
    result.textContent = "✅ CPF válido!";
    result.style.color = "green";
  } else {
    result.textContent = "❌ CPF inválido!";
    result.style.color = "red";
  }
});

class Verificador {
  constructor(cpf) {
    this.cpf = cpf;
  }

  Valida(){
    this.cpfLimpo = this.cpf.replace(/\D+/g, '');
    this.cpfParcial = this.cpfLimpo.slice(0, -2);
    
    let digito1 = Verificador.criaDigito(this.cpfParcial);
    let digito2 = Verificador.criaDigito(this.cpfParcial + digito1)

    const cpfInt = this.cpfParcial + digito1 + digito2;

    if (/^(\d)\1{10}$/.test(this.cpfLimpo)) return false;
    if(cpfInt.length !== 11){
      return false;}
    if(cpfInt === this.cpfLimpo) {
      return true
    }else{
      
      return false;
    }
  }

  static criaDigito(cpfParcial){
    let cpfArray = Array.from(cpfParcial)
    let regressivo = cpfArray.length + 1;

    let total = cpfArray.reduce((acc, valor) =>{
      acc += (regressivo * Number(valor));
      regressivo--;
      return acc;
    },0);
    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
  }

};


