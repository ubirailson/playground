import React, { Component }  from "react";
import "./estilo.css";

class FormularioCadastro extends Component {

    constructor(props) {
        super(props);
        this.titulo = "";
        this.texto = "";
        this.categoria = "Sem Categoria";
        this.state = {categorias:[]};

        //Cada bind cria nova referência para a função
        //Então para que o desinscrever funcione preciso guardar
        //a mesma referência do bind
        this._novasCategorias = this._novasCategorias.bind(this);
    }

    componentDidMount() {
        this.props.categorias.inscrever(this._novasCategorias);
    }

    componentWillUnmount() {
        this.props.categorias.desinscrever(this._novasCategorias);
    }

    _novasCategorias(categorias) {
        this.setState({...this.state, categorias});
    }

    _handleMudancaTitulo(event) {
        event.stopPropagation();
        this.titulo = event.target.value;
    }

    _handleMudancaTexto(event) {
        event.stopPropagation();
        this.texto = event.target.value;
    }

    _handleMudancaCategoria(event) {
        event.stopPropagation();
        this.categoria = event.target.value;
    }

    _criarNota(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.criarNota(this.titulo, this.texto, this.categoria);
    }

    render() {
        return (
            <form className="form-cadastro" 
                onSubmit={this._criarNota.bind(this)}>
                <h1>Meu App</h1>
                <select onChange={this._handleMudancaCategoria.bind(this)} 
                    className="form-cadastro_input">
                    <option>Sem Categoria</option>
                    {this.state.categorias.map((categoria, index) => {
                        return <option key={index}>{categoria}</option>
                    })}
                </select>
                <input type="text" 
                    placeholder="Título" 
                    className="form-cadastro_input" 
                    onChange={this._handleMudancaTitulo.bind(this)} />
                <textarea placeholder="Escreva sua nota"
                    rows={15}
                    className="form-cadastro_input"
                    onChange={this._handleMudancaTexto.bind(this)}  />
                <button className="form-cadastro_input form-cadastro_submit">
                    Criar nota
                </button>
            </form>
        );
    }
}

export default FormularioCadastro;