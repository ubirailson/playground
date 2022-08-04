import React, { Component } from "react";

class CadastroContato extends Component {

    constructor(props) {
        super(props);
        this.nome = "";
        this.telefone = "";
    }

    _handleMudancaNome(evento) {
        evento.stopPropagation();
        this.nome = evento.target.value;
    }

    _handleMudancaTelefone(evento) {
        evento.stopPropagation();
        this.telefone = evento.target.value;
    }

    _criarContato(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        const novoContato = { nome: this.nome, telefone: this.telefone };
        const novoArrayDeNotas = [... this.props.contatos, novoContato];
        const novoEstado = {
            contatos: novoArrayDeNotas
        };
        this.props.setState(novoEstado);
    }

    render() {
        return (
            <form onSubmit={this._criarContato.bind(this)}>
                <h3>Insira novo contato:</h3>
                <input type="text" placeholder="Nome do contato"
                    onChange={this._handleMudancaNome.bind(this)} />
                <br />
                <input type="text" placeholder="Telefone do contato"
                    onChange={this._handleMudancaTelefone.bind(this)} />
                <br />
                <button>Cadastrar contato</button>
            </form>
        );
    }
}

export default CadastroContato;