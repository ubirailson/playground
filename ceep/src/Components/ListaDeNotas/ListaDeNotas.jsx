import React, { Component } from "react";
import CardNota from "../CardNota";
import "./estilo.css"

class ListaDeNotas extends Component {

    constructor() {
        super();
        this.state = {notas:[]};

        //Cada bind cria nova referência para a função
        //Então para que o desinscrever funcione preciso guardar
        //a mesma referência do bind
        this._novasNotas = this._novasNotas.bind(this);
    }
    componentDidMount() {
        this.props.notas.inscrever(this._novasNotas);
    }

    componentWillUnmount() {
        this.props.notas.desinscrever(this._novasNotas);
    }

    _novasNotas(notas) {
        this.setState({...this.state,notas});
    }

    render() {
        return (
            <ul className="lista-notas">
                {this.state.notas.map((nota, index) => {
                    return (
                        <li className="lista-notas_item" key={index}>
                            <CardNota 
                                titulo={nota.titulo} 
                                texto={nota.texto} 
                                categoria={nota.categoria}
                                apagarNota={this.props.apagarNota}
                                indice={index}/>
                        </li>
                    );
                })}

            </ul>
        );
    }
}

export default ListaDeNotas;