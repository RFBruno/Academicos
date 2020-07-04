function bordaRadius( SE = 0, SD = 0, IE = 0, ID = 0) {
    let painelBorda = document.querySelector('#painel-borda');
    
    painelBorda.style.borderRadius = `${SE}px ${SD}px ${ID}px ${IE}px `;
    textoCss();
}


let SE = document.querySelector('#bordaSE');
let SD = document.querySelector('#bordaSD');
let IE = document.querySelector('#bordaIE');
let ID = document.querySelector('#bordaID');
let btn = document.querySelector('#btn');

function parametros() {

    SE.value == '' ? SE.value = 0 : SE.value;
    SD.value == '' ? SD.value = 0 : SD.value;
    IE.value == '' ? IE.value = 0 : IE.value;
    ID.value == '' ? ID.value = 0 : ID.value;

    
    bordaRadius(SE.value, SD.value, IE.value, ID.value);
}

function textoCss(){
    let areaCss = document.querySelector('textarea[name="conteudo-css"]');
    let texto = '';
    
    if(SE.value == SD.value && IE.value == ID.value && SE.value == ID.value){
        texto = 'border-radius: '+ SE.value + 'px';
    }else{
        texto = `border-radius: ${SE.value}px ${SD.value}px ${IE.value}px ${ID.value}px`;
    }
    
    areaCss.value = texto;    
    
}

function copiandoCss() {    
    let textoAreaCss = document.querySelector('textarea[name="conteudo-css"]');

    textoAreaCss.select();

    document.execCommand('copy');

    alert('Comando css copiado!!');
        
  }


function addEventos() {
    
    document.querySelectorAll('input').forEach(el => {
        el.addEventListener('click', e=>{
            el.select();
        })

        el.addEventListener('keyup', parametros);
    })

    btn.addEventListener('click', copiandoCss);
    
}

window.addEventListener('load', addEventos);


