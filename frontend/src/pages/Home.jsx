import { useEffect, useState } from 'react';
import '../css/Home.css';

export default function Home() {
    //Estados
    const [diaSelecionado, setDiaSelecionado] = useState(null);
    const diasDoMes = Array.from({length: 30}, (_,i) => i+1);

    const [dadosEventos, setDadosEventos] = useState([]);
    const [dadosTarefas, setDadosTarefas] = useState([]);

    
    const [eventosDoDia, setEventosDoDia] = useState([]);
    const [tarefasDoDia, setTarefasDoDia] = useState([]);

    // Extrair Mês
    const dataAtual = new Date();
    const mesAtual = dataAtual.toLocaleString('pt-BR', { month: 'long' });

    // Buscar Dados
    useEffect(() => {
        fetch("http://localhost:8080/api/evento")
        .then((resp) => resp.json())
        .then((data) => setDadosEventos(data))
        .catch((error) => console.log("erro", error))
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/api/tarefa") 
        .then((resp) => resp.json())
        .then((data) => setDadosTarefas(data))
        .catch((error) => console.log("erro", error))
    }, []);

    // Ações do Usuário
    function cliqueDia(dia) {
        // Quando clica guardamos o dia 
        setDiaSelecionado(dia);

        
        const eventosFiltrados = dadosEventos.filter(e => e.dataInicial?.dia === dia);
        setEventosDoDia(eventosFiltrados);

        const tarefasFiltradas = dadosTarefas.filter(t => t.dataInicial?.dia === dia);
        setTarefasDoDia(tarefasFiltradas);
    }

    function clicouBotaoItem(item) {
        // Por enquanto, vamos só dar um alert para ver funcionando
        alert(`Você clicou em: ${item.titulo}. Aqui abriremos as opções de Editar/Excluir depois!`);
    }

    // 4. O Retorno Principal (O ÚNICO lugar que desenha na tela)
    return(
        <div className='home-container'>

            {/* Calendario */}
            <div className='calendario'>
                <h2>Mês de {mesAtual}</h2>
                
                {diasDoMes.map((dia) => (
                    <button key={dia} className='botaoDia' onClick={() => cliqueDia(dia)}>
                        {dia}
                    </button>
                ))}
            </div>

            {/* O Quadro Flutuante de Detalhes (Só aparece se diaSelecionado não for null) */}
            {diaSelecionado !== null && (
                <div className='modal-fundo'>
                    <div className='modal-conteudo'>
                        <h2>Agenda do dia {diaSelecionado}:</h2>
                        
                        {/* Lista de Eventos */}
                        <h4>Eventos:</h4>
                        {eventosDoDia.length === 0 ? <p>Sem eventos.</p> : (
                            <ul>
                                {eventosDoDia.map((evento, index) => (
                                    <li key={index}>
                                        <button onClick={() => clicouBotaoItem(evento)}>
                                            {evento.titulo} - {evento.descricao}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Lista de Tarefas */}
                        <h4>Tarefas:</h4>
                        {tarefasDoDia.length === 0 ? <p>Sem tarefas.</p> : (
                            <ul>
                                {tarefasDoDia.map((tarefa, index) => (
                                    <li key={index}>
                                        <button onClick={() => clicouBotaoItem(tarefa)}>
                                            {tarefa.titulo} - {tarefa.descricao}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className='botoes-modal'>
                            <button>+ Tarefa</button>
                            <button>+ Evento</button>
                            <button onClick={() => setDiaSelecionado(null)}>Voltar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Interacao IA */}
            <h3>Fale com a IA</h3>
            <div className='interacaoIA'>
                <input type="text" placeholder="ex: lembre-me de ir ao dentista amanha" />
                <button>Enviar</button>
            </div>
            
        </div>
    );
}