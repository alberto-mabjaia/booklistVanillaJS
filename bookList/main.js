class Book {
	constructor(id, titulo, autor, data){
		this.id = id;
		this.titulo = titulo;
		this.autor = autor;
		this.data = data;
	}
}

class UI {
	static mostrarLivros(){
		// temporario 
		const LivrosGuardados = guardarLivrosLocal.getBooks();


		const livros = LivrosGuardados;

		livros.forEach(function(book)
			{
				UI.adicionarLivro(book)
			});

		
	}



	static adicionarLivro(book){
			const lista = document.querySelector("#book-list");
			const row = document.createElement("tr");
			row.innerHTML = `
				<td>${book.id}</td>
				<td>${book.titulo}</td>
				<td>${book.autor}</td>
				<td>${book.data}</td>
				<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
			`;
			lista.appendChild(row);
		}

	static alertas(mensagem, nomeClasse){
		const div = document.createElement('div');
		div.className = `alert alert-${nomeClasse}`;
		div.appendChild(document.createTextNode(mensagem));
		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');

		container.insertBefore(div, form);

		// tempo para tirar o alert
		setTimeout(()=> document.querySelector('.alert').remove(), 1000)

	}

	static limparCampos(){
		const id = document.querySelector("#id").value = '';
		const titulo = document.querySelector("#title").value = '';
		const autor = document.querySelector("#autor").value = '';
		const data = document.querySelector("#data").value = '';
	}



	static apagarLivro(el){
		if(el.classList.contains('delete')){
			el.parentElement.parentElement.remove();
		}
	}


}

class guardarLivrosLocal{

	static getBooks(){
		let livros;
		if(localStorage.getItem('livros') === null){
			livros = [];
		}else{
			livros = JSON.parse(localStorage.getItem('livros'))
		}

		return livros;
	}

	static addLivro(book){
		const livros = guardarLivrosLocal.getBooks();

		livros.push(book);
		localStorage.setItem('livros', JSON.stringify(livros));

	}

	static removerLivro(id){

		const livros = guardarLivrosLocal.getBooks();


		livros.forEach((livro, index) => {
			if(livro.id === id){
				livro.splice(index, 1);
			}
		});

		localStorage.setItem('livros', JSON.stringify(livros))
	}
}


	

// evento: mostrar na tela

document.addEventListener('DOMContentLoaded', UI.mostrarLivros);


// Evento adicionar livro
document.querySelector("#book-form").addEventListener('submit', (e)=>{
	// prevenir a submisao automatica
	e.preventDefault();

	// pegar os valores da form
	const  id = document.querySelector("#id").value;
	const titulo = document.querySelector("#title").value;
	const autor = document.querySelector("#autor").value;
	const data = document.querySelector("#data").value;

	if(titulo === '' || autor === '' || data === ''){
		UI.alertas('Preencha todos campos','danger');
	}else{

	// instanciar o livro
	const livro = new Book(id, titulo,autor, data);

	// adicionar livro
	UI.adicionarLivro(livro);

	guardarLivrosLocal.addLivro(livro);

	// mostrar alerta de sucesso
	UI.alertas('Adicionado com sucesso','success');

	// limpar os dados
	UI.limparCampos();


}
});


// evento remover um item

document.querySelector("#book-list").addEventListener('click', (e)=>{
	UI.apagarLivro(e.target);
	// remover do local storage
	guardarLivrosLocal.removerLivro(e.target.parentElement.previousElementSibling.textContent)
	// alerta de apagar
	UI.alertas('Apagado com sucesso', 'success')
})
