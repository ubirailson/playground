import React, { Component } from "react";
import "./assets/App.css";
import "./assets/index.css";
import FormularioCadastro from "./Components/FormularioCadastro";
import ListaDeCategorias from "./Components/ListaDeCategorias";
import ListaDeNotas from "./Components/ListaDeNotas";
import Categorias from "./dados/Categorias";
import ArrayDeNotas from "./dados/ArrayDeNotas";

class App extends Component {

  constructor(props) {
    super(props);
    this.categorias = new Categorias();
    this.notas = new ArrayDeNotas();
    // this.state = {
    //   // notas: [],
    //   // categorias: ["Games", "Música"],
    // };
  }
  // criarNota(titulo, texto, categoria) {
  //   const novaNota = {titulo, texto, categoria};
  //   const novoArrayDeNotas = [... this.state.notas, novaNota];
  //   const novoEstado = {
  //     notas: novoArrayDeNotas
  //   };
  //   this.setState(novoEstado);
  // }

  // adicionarCategoria(nomeCategoria) {
  //   const novoArrayCategorias = [... this.state.categorias, nomeCategoria];
  //   const novoEstado = {...this.state, categorias:novoArrayCategorias};
  //   this.setState(novoEstado);
  // }

  // deletarNota(index) {
  //   let arrayNotas = this.state.notas;
  //   arrayNotas.splice(index,1);
  //   this.setState({notas:arrayNotas});
  // }


  render() {
    return (
      <section className="conteudo">
        <FormularioCadastro 
          categorias={this.categorias} 
          criarNota={this.notas.adicionarNota.bind(this.notas)} 
        />
        <main className="conteudo-principal">
          <ListaDeCategorias 
            adicionarCategoria={this.categorias.adicionarCategoria.bind(this.categorias)}
            categorias={this.categorias} 
          />
          <ListaDeNotas 
            apagarNota={this.notas.apagarNota.bind(this.notas)} 
            notas={this.notas} 
          />
        </main>
      </section>
    );
  }
}
export default App;
