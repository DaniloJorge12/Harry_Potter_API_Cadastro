//Buscar itens
import bruxos from "../models/dados.js";

//Buscar itens
const getAllbruxos = (req, res) => {
    const { id, nome, casa, ano, varinha, mascote, patrono, especialidade } = req.query;
    let resultado = bruxos;

    if(nome) {
        resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()))
    }

    if(id) {
        resultado = resultado.filter(b => b.id === parseInt(id))
    }

    if(casa) {
        resultado = resultado.filter(b => b.casa.toLowerCase().includes(casa.toLowerCase()))
    }

    if(ano) {
        resultado = resultado.filter(b => b.ano === parseInt(ano))
    }

    if(varinha) {
        resultado = resultado.filter(b => b.varinha.toLowerCase().includes(varinha.toLowerCase()))
    }

    if(mascote) {
        resultado = resultado.filter(b => b.mascote.toLowerCase().includes(mascote.toLowerCase()))
    }

    if(patrono) {
        resultado = resultado.filter(b => b.patrono.toLowerCase().includes(patrono.toLowerCase()))
    }

    if(especialidade) {
        resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()))
    }
    
    res.status(200).json({
        message: "Lista de bruxos convocada com sucesso!",
        total: resultado.length,
        bruxos: resultado
    });
};

//Buscar por id
const getbruxosByld = (req, res) => {
    const id = parseInt(req.params.id);
    const bruxo = bruxos.find(b => b.id === id);

    if(!bruxo) {
        return res.status(404).json({
            message: "Nenhum bruxo foi encontrado no Beco Diagonal!"
        });
    }
    
    res.status(200).json(bruxo);
};

//Create
const createbruxo = (req, res) => {
    const { nome, casa, ano, varinha, mascote, patrono, especialidade } = req.body;
    const nomeExistente = bruxos.find(b => b.nome.toLowerCase() === nome.toLowerCase());

    if (!nome || !casa || !ano) {
        return res.status(400).json({
            success: false,
            message: "Nome, casa e ano são campos obrigatórios para criar um bruxo!"
        });
    }
    
    if (nomeExistente) {
        return res.status(400).json({
            success: false,
            message: `Já existe um bruxo com o nome '${nome}'!`
        });
    }

    const novobruxo = {
        id: bruxos.length + 1,
        nome, 
        casa, 
        ano, 
        varinha, 
        mascote, 
        patrono, 
        especialidade
    };

    bruxos.push(novobruxo);
    return res.status(201).json({
        success: true,
        message: "Bruxo(a) criado(a) com sucesso!",
        bruxo: novobruxo
    });
};

//Delete
const deletebruxo = (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O ID selecionado é invalido"
        });
    }

    //Verificar se não tem outro Board Game com o ID
    const gameParaRemover = boardGames.find(g => g.id === id);

    if(!gameParaRemover) {
        return res.status(404).json({
            success: false,
            message: `O Board Game com o ID ${id} não existe`
        });
    }

    //Remover o Board Game com ID
    const gamesFiltrados = boardGames.filter(g => g.id !== id);
    boardGames.splice(0, boardGames.length, ...gamesFiltrados);


    res.status(200).json({
        success: true,
        message: `O Board Game com o ${id} foi removido com sucesso`
    })
};

//Update
const updatebruxo = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, categoria, minJogadores, maxJogadores, duracao, complexidade, editor, preco } = req.query;

    if(isNaN(id)){
        return res.status(400).json({
            success: false,
            message: "O id deve ser um número válido!"
        })
    }

    const gameExiste = boardGames.find(g => g.id === id);
    if(!gameExiste){
        return res.status(404).json({
            success: false,
            message: `O Board Game com o id ${id} é inexistente`
        })
    }

    const gamesAtualizado = boardGames.map(g => 
        g.id === id ? {
            ...g,
            ...(nome && { nome }),
            ...(categoria && { categoria }),
            ...(minJogadores && { minJogadores }),
            ...(maxJogadores && { maxJogadores }),
            ...(duracao && { duracao }),
            ...( complexidade &&  { complexidade }),
            ...( editor &&  { editor }),
            ...( preco &&  { preco })
        } : g
    );

    boardGames.splice(0, boardGames.length, ...gamesAtualizado);
    const gameEditado = boardGames.find(g => g.id === id);

    res.status(200).json({
        success: true,
        message: "Dados do Bruxo atualizado",
        boardGames: gameEditado
    })
}

export { getAllbruxos, getbruxosByld, createbruxo, deletebruxo, updatebruxo };