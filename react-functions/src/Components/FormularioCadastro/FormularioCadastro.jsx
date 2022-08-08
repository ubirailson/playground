import React, {useState} from 'react';
import { TextField, Button, Switch, FormControlLabel } from '@mui/material';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';

// function FormularioCadastro(props) {
// const aoEnviar = props.aoEnviar;
function FormularioCadastro({aoEnviar, validarCPF}) {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [cpf, setCpf] = useState("");
    const [promocoes, setPromocoes] = useState(true);
    const [novidades, setNovidades] = useState(true);
    const [erros, setErros] = useState({cpf:{valido:true, texto:""}});

    return (
        <form 
            onSubmit={(event)=>{
                event.preventDefault();
                aoEnviar({nome, sobrenome, cpf, novidades, promocoes});
            }}>
            <TextField 
                value={nome}
                onChange={(event) => {
                    setNome(event.target.value);
                }}
                id="nome" label="Nome" variant="outlined" margin="normal" fullWidth />

            <TextField 
                value={sobrenome}
                onChange={(event) => {
                    setSobrenome(event.target.value);
                }}
                id="sobrenome" label="SobreNome" variant="outlined" margin="normal" fullWidth />

            <TextField 
                value={cpf}
                onChange={(event) => {
                    setCpf(event.target.value);
                }}
                onBlur={(event) => {
                    const ehValido = validarCPF(event.target.value);
                    setErros({cpf:ehValido})
                }

                }
                error={!erros.cpf.valido}
                helperText={erros.cpf.texto}
                id="cpf" label="CPF" variant="outlined" margin="normal" fullWidth />

            <FormControlLabel 
                label="Promoções" 
                control={
                    <Switch onChange={(event) => {
                            setPromocoes(event.target.checked);
                        }}
                        name="promocoes" 
                        checked={promocoes} 
                        color="primary" 
                    />} 
            />

            <FormControlLabel 
                label="Novidades" 
                control={
                    <Switch onChange={(event) => {
                            setNovidades(event.target.checked);
                        }}
                        name="novidades" 
                        checked={novidades} 
                        color="primary" 
                    />} />

            <Button type="submit" variant="contained">Cadastrar</Button>
        </form>
    );
}

export default FormularioCadastro;