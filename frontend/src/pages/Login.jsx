import { useState } from "react"; // Tiramos o useEffect que não estava em uso

function Login() {
    const [usuario, setUsuario] = useState({ email: "", senha: "" });
    // Limpei as outras variáveis de estado (dados, texto, etc.) que você não estava usando aqui

    const realizarLogin = () => {
        if (usuario.email !== "" && usuario.senha !== "") {
            
            // Aqui  vai entrar o fetch()
            console.log("Enviando para o backend:", usuario);
            alert('Simulação: Usuário logado com sucesso!');
            
        } else {
            // Corrigido para console.log minúsculo
            console.log("Erro: Preencha email e senha para logar.");
        }
    }

    const lidarComMudanca = (evento) => {
        const { name, value } = evento.target;
        setUsuario({ ...usuario, [name]: value });
    };

    return (
        <div className="Login">
            <label>email</label>
            <input
                type="text"
                name="email"
                placeholder="email@email.com"
                onChange={lidarComMudanca}
                value={usuario.email}
            />
            
            <label>senha</label>
            <input
                type="password"
                name="senha"
                placeholder="sua senha"
                onChange={lidarComMudanca}
                value={usuario.senha}
            />
            
            <button onClick={realizarLogin}>Logar</button>
        </div>
    );
}

export default Login;