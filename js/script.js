document.getElementById("contato").addEventListener("input", function(e) {
    let value = e.target.value;
    
    // Remove todos os caracteres que não são dígitos
    value = value.replace(/\D/g, '');
    
    // Adiciona os parênteses e o hífen conforme necessário
    if (value.length > 0) {
        value = '(' + value;
    }
    if (value.length > 3) {
        value = value.slice(0, 3) + ')' + value.slice(3);
    }
    if (value.length > 9) {
        value = value.slice(0, 9) + '-' + value.slice(9);
    }
    
    // Limita o tamanho do valor a 14 caracteres (incluindo parênteses e hífen)
    e.target.value = value.slice(0, 14);

      if (value.length === 14) {
        this.classList.remove("erro");
        this.classList.add("correto");
    } else {
        this.classList.remove("correto");
        this.classList.add("erro");
    }

});

document.getElementById("cpf").addEventListener("input", function(e) {
     let value = e.target.value;    
   
    value = value.replace(/\D/g, '');
   
   if (value.length > 3) {
        value = value.slice(0, 3) + '.' + value.slice(3);
    }
    if (value.length > 7) {
        value = value.slice(0, 7) + '.' + value.slice(7);
    }
    if (value.length > 11) {
        value = value.slice(0, 11) + '-' + value.slice(11);   }  
    e.target.value = value.slice(0, 14);
   
   
    if (value.length === 14) {
        document.getElementById("aviso").classList.add("mensagem-aviso");
        this.classList.remove("erro");
        this.classList.add("correto");
    } else {
        document.getElementById("aviso").classList.remove("mensagem-aviso");
        this.classList.remove("correto");
        this.classList.add("erro");
    }
});


document.addEventListener('DOMContentLoaded', function() {
   
  const canvas = document.getElementById('signature-pad');
  const signaturePad = new SignaturePad(canvas);
  const btnSalvar = document.getElementById('salvar-assinatura');
  const btnLimpar = document.getElementById('limpar-assinatura');  
  const modal = new bootstrap.Modal(document.getElementById('assinaturaModal'));  
  const assinaturaThumbnail = document.getElementById('assinatura-thumbnail');
  const form = document.getElementById('formulario-casinhas');
  const urlAssinatura = document.getElementById('assinatura');
  let assinaturaRealizada = false;

  btnSalvar.addEventListener('click', function() {
    if (signaturePad.isEmpty()) {
      alert('Por favor, faça sua assinatura.');
    } else {
      const signatureData = signaturePad.toDataURL();
      urlAssinatura.value = signatureData;
      assinaturaThumbnail.src = signatureData;
      assinaturaThumbnail.style.display = 'block';
      alert('Assinatura salva com sucesso!'); 
      assinaturaRealizada = true;
      //fechar modal
      modal.hide();  
      
    }
  });

  btnLimpar.addEventListener('click', function() {
    signaturePad.clear();
    assinaturaRealizada = false;
  });




form.addEventListener('submit', function(e){
    e.preventDefault();

    const radios = document.querySelectorAll('.form-check-input');
    let radioSelecionado = false;
    const nome = document.getElementById('nome').value;
    const endedereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('contato').value;
    const cpf = document.getElementById('cpf').value;
    

    for (const radio of radios) {
    if (radio.checked) {
      radioSelecionado = true;
      break;
    }
  }

    if (!radioSelecionado) {
      alert('Por favor, selecione uma opção antes de enviar o formulário.');
      return;
    }    
     if (nome === '' || endedereco === '' || telefone === '' || cpf === '' || cpf.length < '14') {
      console.log(cpf.length);
      alert('Por favor, preencha todos os campos antes de enviar o formulário.');
      return;
    }
 

    if (!assinaturaRealizada) {
      alert('Por favor, salve sua assinatura antes de enviar o formulário.');
      return;
    }


    
    
   
  

    fetch(form.action, 
    {
    method:"POST",
    body:new FormData(form),    
    })   
    .then(
        response =>{
        //se dados forem enviados corretamente
        alert('Dados enviados com Sucesso!!',response);
      
        form.reset();
        assinaturaThumbnail.style.display = 'none';
        signaturePad.clear();
        assinaturaRealizada = false;
        
    })
    .catch(err => {
        console.error('Erro no envio dos dados!!',err);
})




});


document.getElementById('limpar-formulario').addEventListener('click', () => {
    form.reset();
    assinaturaThumbnail.style.display = 'none';
    signaturePad.clear();});
});

