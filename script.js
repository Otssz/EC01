class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = notaFinal;
  }
  isAprovado() {
    return this.notaFinal >= 7;
  }

  toString() {
    return `${this.nome}, ${this.idade} anos, curso de ${this.curso}, nota final ${this.notaFinal}`;
  }
}

let alunos = [];
let indiceEdicao = null;

const form = document.getElementById("form-aluno");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const selectCurso = document.getElementById("curso");
const inputNota = document.getElementById("notafinal");
const tabela = document.getElementById("tabela-alunos");

const botaoSubmit = form.querySelector("button[type='submit']");

const salvarAluno = (aluno) => {
  alunos.push(aluno);
  alert(`Aluno salvo: ${aluno}`);
};

const atualizarAluno = (indice, aluno) => {
  alunos[indice] = aluno;
  alert(`Aluno editado: ${aluno}`);
};

const excluirAluno = (indice) => {
  const removido = alunos.splice(indice, 1)[0];
  alert(`Aluno excluído: ${removido}`);
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const aluno = new Aluno(
    inputNome.value,
    Number(inputIdade.value),
    selectCurso.value,
    Number(inputNota.value),
  );

  if (indiceEdicao === null) {
    salvarAluno(aluno);
  } else {
    atualizarAluno(indiceEdicao, aluno);
    indiceEdicao = null;
    botaoSubmit.textContent = "Cadastrar";
  }
  renderizarTabela();
  form.reset();
});

function renderizarTabela() {
  tabela.innerHTML = "";
  alunos.forEach((aluno, indice) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
          <td>${aluno.nome}</td>
          <td>${aluno.idade}</td>
          <td>${aluno.curso}</td>
          <td>${aluno.notaFinal}</td>
          <td>${aluno.isAprovado() ? "Aprovado" : "Reprovado"}</td>

          <td>
          <button data-acao="editar" data-index="${indice}">Editar</button>
          <button data-acao="excluir" data-index="${indice}">Excluir</button>
          </td>
    `;
    tabela.appendChild(linha);
  });
}

tabela.addEventListener("click", function (event) {
  const botao = event.target;
  const indice = Number(botao.dataset.index);
  if (botao.dataset.acao === "excluir") {
    excluirAluno(indice);
    indiceEdicao = null;
    botaoSubmit.textContent = "Cadastrar";
    form.reset();

    renderizarTabela();
  }
  if (botao.dataset.acao === "editar") {
    const aluno = alunos[indice];
    console.log(`Editando: ${aluno}`);

    inputNome.value = aluno.nome;
    inputIdade.value = aluno.idade;
    selectCurso.value = aluno.curso;
    inputNota.value = aluno.notaFinal;
    indiceEdicao = indice;
    botaoSubmit.textContent = "Salvar";
  }
});
