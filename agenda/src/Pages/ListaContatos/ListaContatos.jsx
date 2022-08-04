import React, { Component } from "react";
import CardContato from "../CardContato";

class ListaContatos extends Component {

    render() {
        return (
            <ul>
                {this.props.contatos.map((contato, index) => {
                    return (
                        <li key={index}>
                            <CardContato contato={contato}/>
                        </li>
                    );
                })}

            </ul>
        );
    }
}

export default ListaContatos;