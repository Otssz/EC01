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

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const aluno = new Aluno(
    inputNome.value,
    Number(inputIdade.value),
    selectCurso.value,
    Number(inputNota.value),
  );

  if (indiceEdicao === null) {
    alunos.push(aluno);
  } else {
    alunos[indiceEdicao] = aluno;
    indiceEdicao = null;
    botaoSubmit.textContent = "Cadastrar";
  }
  renderizarTabela();
  form.reset();
});

function renderizarTabela() {
  tabela.innerHTML = "";
  alunos.forEach(function (aluno, indice) {
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
    alunos.splice(indice, 1);

    indiceEdicao = null;
    botaoSubmit.textContent = "Cadastrar";
    form.reset();

    renderizarTabela();
  }
  if (botao.dataset.acao === "editar") {
    const aluno = alunos[indice];
    inputNome.value = aluno.nome;
    inputIdade.value = aluno.idade;
    selectCurso.value = aluno.curso;
    inputNota.value = aluno.notaFinal;
    indiceEdicao = indice;
    botaoSubmit.textContent = "Salvar";
  }
});
