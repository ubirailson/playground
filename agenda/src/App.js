import React, { Component } from "react";
import './App.css';
import CadastroContato from "./Pages/CadastroContato";
import ListaContatos from "./Pages/ListaContatos";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contatos: [
        {nome: "Bira", telefone: "84 988383831"}, 
        {nome: "Lica", telefone: "84 988599959"}]
    };
  }

  render() {
    return (
      <div>
        <header>
          <h1>Agenda</h1>
        </header>
        <section>
          <CadastroContato contatos={this.state.contatos} setState={this.setState.bind(this)} />
        </section>
        <section>
          <h3>Contatos Cadastrados:</h3>
          <ListaContatos contatos={this.state.contatos}/>
        </section>
      </div>
    );
  }
}

export default App;
