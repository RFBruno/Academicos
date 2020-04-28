class Despesa{
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano;
		this.mes = mes;
		this.dia = dia;
		this.tipo = tipo;
		this.descricao = descricao;
		this.valor = valor;
	}

	validarDados(){
		for(let i in this){
			if(this[i] == undefined || this[i] == '' || this[i] == null ){
				return false;
			}

		}

		return true;
	}	
}

class Bd{

	constructor(){
		let id = localStorage.getItem('id');

		if(id === null){
			localStorage.setItem('id',0);
		}
	}

	getProximoId(){
		let proximoId = localStorage.getItem('id');
		return parseInt(proximoId)+1;
	}

	gravar(d){
		let id = this.getProximoId();

		localStorage.setItem(id, JSON.stringify(d));

		localStorage.setItem('id',id);
	}

	recuperarTodosRegistros(){
		//ARRAY DE DESPESAS
		let despesas = Array();		
		let id = localStorage.getItem('id');

		//recuperando todas as despesas
		for(let i = 1; i<=id; i++){
			let despesa = JSON.parse(localStorage.getItem(i));			
			//condiçao para indices removidos
			if(despesa === null){
				continue	
			}
			despesa.id = i;
			despesas.push(despesa);
		}
		
		return despesas;
	}

	pesquisar(despesa){
		let despesasFiltradas = Array();
		despesasFiltradas = this.recuperarTodosRegistros();
		
		//APLICANDO FILTROS
		//ANO
		if(despesa.ano != ''){
		despesasFiltradas = despesasFiltradas.filter(df => df.ano == despesa.ano);
		}
		//MES
		if(despesa.mes != ''){
		despesasFiltradas = despesasFiltradas.filter(df => df.mes == despesa.mes);
		}
		//DIA
		if(despesa.dia != ''){
		despesasFiltradas = despesasFiltradas.filter(df => df.dia == despesa.dia);
		}	
		//TIPO
		if(despesa.tipo != ''){
		despesasFiltradas = despesasFiltradas.filter(df => df.tipo == despesa.tipo);
		}
		//DESCRICAO
		if(despesa.descricao != ''){
		despesasFiltradas = despesasFiltradas.filter(df => df.descricao == despesa.descricao);
		}
		//VALOR
		if(despesa.valor != ''){		
		despesasFiltradas = despesasFiltradas.filter(df => df.valor == despesa.valor);
		}

		return despesasFiltradas;		
	}

	remover(id){
		localStorage.removeItem(id);
	}
}

let bd = new Bd();

function cadastrarDespesa(){ 
	
	let ano = document.getElementById('ano');
	let mes = document.getElementById('mes');
	let dia = document.getElementById('dia');
	let tipo = document.getElementById('tipo');
	let descricao = document.getElementById('descricao');
	let valor = document.getElementById('valor');	


	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
		);

	if(despesa.validarDados()){
		bd.gravar(despesa);		
		document.getElementById('modalHeader').classList.add('text-success');		
		document.getElementById('modalTitulo').innerHTML='Adicionado';
		document.getElementById('modalDescricao').innerHTML='Despesa cadastrada com sucesso';
		document.getElementById('modalBtn').innerHTML='Ok';
		document.getElementById('modalBtn').classList.add('btn-success');

		$('#modalRegistraDespesa').modal('show');
		ano.value = '';
		mes.value = '';
		dia.value = '';
		tipo.value = '';
		descricao.value = '';
		valor.value = '';

	}else{
		//dialog erro	
		document.getElementById('modalHeader').classList.add('text-danger');		
		document.getElementById('modalTitulo').innerHTML='Erro na Gravacao';
		document.getElementById('modalDescricao').innerHTML='Exitem campos obrigatorios que nao foram preenchidos';		
		document.getElementById('modalBtn').innerHTML='Voltar';
		document.getElementById('modalBtn').classList.add('btn-danger');
		
		$('#modalRegistraDespesa').modal('show');
	}

}


function carregaListDespesa(despesas = Array(), filtro = false){
	
	if(despesas.length == 0 && filtro == false){
		despesas = bd.recuperarTodosRegistros();
	}

	//SELECIONA O ELEMENTO TBODY DA TABELA
	let listaDespesas = document.getElementById('listaDespesas');
	listaDespesas.innerHTML = '';
	despesas.forEach(function(d){

		//criando a linha (tag -> th)
		let linha = listaDespesas.insertRow();

		//criando as colunas (tag -> td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`  ;
		
		//ajustando o tipo
		switch(d.tipo){
			case '1': d.tipo = 'Alimentação'
				break;
			case '2': d.tipo = 'Educação'
				break;
			case '3': d.tipo = 'Lazer'
				break;
			case '4': d.tipo = 'Saúde'
				break;
			case '5': d.tipo = 'Transporte'
				break;
		}
		linha.insertCell(1).innerHTML = d.tipo;

		linha.insertCell(2).innerHTML = d.descricao;
		linha.insertCell(3).innerHTML = d.valor;

		//criar botao de exclusao
		let btn = document.createElement('button');
		btn.className = 'btn btn-danger';
		btn.innerHTML = '<i class="fas fa-times"></i>';
		btn.id = `id_despesa_${d.id}`;
		btn.onclick = function(){
			//remover despesa			
			let id = this.id.replace('id_despesa_','');			
			bd.remover(id);
			modal();

			function modal(){
			document.getElementById('modalHeader').classList.add('text-success');		
			document.getElementById('modalTitulo').innerHTML='Excluido';
			document.getElementById('modalDescricao').innerHTML='Despesa excluida com sucesso';
			document.getElementById('modalBtn').innerHTML='Ok';
			document.getElementById('modalBtn').classList.add('btn-success');
			$('#modalRegistraDespesa').modal('show');			
			}
		}
		linha.insertCell(4).append(btn);
		
	});

	if(despesas.length == 0){
		listaDespesas.insertRow().innerHTML = '<strong style="position:absolute; top: 90%; left:36%; margin-bottom: 10%; letter-spacing:3px;">Nenhum resultado</strong>';
	}

}

function pesquisarDespesa(){
	let ano = document.getElementById('ano').value;
	let mes = document.getElementById('mes').value;
	let dia = document.getElementById('dia').value;
	let tipo = document.getElementById('tipo').value;
	let descricao = document.getElementById('descricao').value;
	let valor = document.getElementById('valor').value;

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);	
	
	let despesas = bd.pesquisar(despesa);
	carregaListDespesa(despesas, true);
}





