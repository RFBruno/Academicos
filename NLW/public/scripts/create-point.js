function dadosJson(elemento, url){
    
    
    fetch(url)
        .then((res)=>{
            return res.json();
        }).then((statesOrCities)=>{

            statesOrCities.forEach(stateOrCity => {                          ;
                let city = stateOrCity.id > 53 ? stateOrCity.nome : stateOrCity.id;
                elemento.innerHTML += `<option value="${city}">${stateOrCity.nome}</option>`
            });            

        })

}

function populateUFs(){
    const ufSelect =  document.querySelector('select[name=uf]');
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

    dadosJson(ufSelect, url);
}

populateUFs();

function getCities(event){
    const citySelect = document.querySelector('select[name="city"]');
    const stateInput = document.querySelector('[name="state"]');
    
    const ufValue = event.target.value;
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Seleciona a cidade</option>";
    citySelect.disabled = true;
    
    dadosJson(citySelect, url);
    citySelect.disabled = false;
}



document
.querySelector('select[name=uf]')
.addEventListener('change', getCities)


// itens de coleta

const itemsToCollect = document.querySelectorAll('.items-grid li');

itemsToCollect.forEach(item =>{
    item.addEventListener("click",handleSelectedItem)
});

const collectedItems = document.querySelector('input[name="items"]');
console.log(collectedItems);

let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;
    
    itemLi.classList.toggle('selected');
    
    const itemId = itemLi.dataset.id;
    
    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId;
        
        return itemFound;
    });
    
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });
        
        selectedItems = filteredItems;
    }else{
        selectedItems.push(itemId);
    }
    collectedItems.value = selectedItems;    
    console.log(collectedItems);
}





