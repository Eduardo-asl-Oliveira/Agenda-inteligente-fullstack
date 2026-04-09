import { useState, useEffect } from "react";

function Cadastro() {
    
    const [usuario, setUsuario] = useState({ nome: "", email: "", telefone: "", senha: "" });
    const [dados, setDados] = useState([]);

    
    useEffect(() => {
        fetch("http://localhost:8080/api/usuarios")
            .then((resp) => resp.json())
            .then((data) => setDados(data))
            .catch((error) => console.log("erro", error));
    }, []);

    const enviarCadastro = () => {
        // Verifica se o email digitado já existe no banco
        const emailExiste = dados.some(c => c.email === usuario.email);
        
        if (!emailExiste) {
            // Simulando o sucesso do envio
            console.log("Enviando para o backend:", usuario);
            alert("Cadastro realizado com sucesso!");
        } else {
            
            alert("Este email já está em uso, tente outro."); 
        }
    }

    const lidarComMudanca = (evento) => {
        const { name, value } = evento.target;
        setUsuario({ ...usuario, [name]: value });
    };

    return (
        <div className="cadastro">
            <label>nome</label>
            <input
                type="text"
                name="nome"
                placeholder="nome"
                onChange={lidarComMudanca}
                value={usuario.nome} 
            />
            
            <label>email</label>
            <input
                type="text"
                name="email" 
                placeholder="email@email.com"
                onChange={lidarComMudanca}
                value={usuario.email} 
            />
            
            <label>telefone</label>
            <input
                type="text"
                name="telefone"
                placeholder="(00)00000-0000"
                onChange={lidarComMudanca}
                value={usuario.telefone} 
            />
            
            <label>senha</label>
            <input
                type="password" 
                name="senha"
                placeholder="sua senha"
                onChange={lidarComMudanca}
                value={usuario.senha} 
            />
            
            <button onClick={enviarCadastro}>Cadastrar</button>
        </div>
    )
}

export default Cadastro;