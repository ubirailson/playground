import React, { Component } from "react";

class CardContato extends Component {

    render() {
        return (
            <section>
                <header>
                    <h3>{this.props.contato.nome}</h3>
                </header>
                <p>{this.props.contato.telefone}</p>
            </section>

        );
    }
}
export default CardContato;