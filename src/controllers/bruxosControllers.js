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
            message: "Feitiço mal executado! Verifique os ingredientes."
        });
    }
    
    if (nomeExistente) {
        return res.status(400).json({
            success: false,
            message: "Já existe um bruxo com esse nome!"
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
        message: "Novo bruxo matriculado em Hogwarts!",
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

    //Verificar se não tem outro Bruxo com o ID
    const bruxoParaRemover = bruxos.find(b => b.id === id);

    if(!bruxoParaRemover) {
        return res.status(404).json({
            success: false,
            message: `O Bruxo com o ID ${id} não existe`
        });
    }

    //Remover o Bruxo com ID
    const bruxosFiltrados = bruxos.filter(b => b.id !== id);
    bruxos.splice(0, bruxos.length, ...bruxosFiltrados);


    res.status(200).json({
        success: true,
        message: "Bruxo atualizado com sucesso!"
    })
};

//Update
const updatebruxo = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, casa, ano, varinha, mascote, patrono, especialidade } = req.query;

    if(isNaN(id)){
        return res.status(400).json({
            success: false,
            message: "O id deve ser um número válido!"
        })
    }

    const bruxoExiste = bruxos.find(b => b.id === id);
    if(!bruxoExiste){
        return res.status(404).json({
            success: false,
            message: `O Board Game com o id ${id} é inexistente`
        })
    }

    const bruxosAtualizados = bruxos.map(b => 
        b.id === id ? {
            ...b,
            ...(nome && { nome }),
            ...(casa && { casa }),
            ...(ano && { ano: parseInt(ano) }), 
            ...(varinha && { varinha }),
            ...(mascote && { mascote }),
            ...(patrono && { patrono }),
            ...(especialidade && { especialidade })
        } : b
    );

    bruxos.splice(0, bruxos.length, ...bruxosAtualizados);
    const bruxoEditado = bruxos.find(b => b.id === id);

    res.status(200).json({
        success: true,
        message: "Bruxo atualizado com sucesso!",
        bruxos: bruxoEditado
    })
}

export { getAllbruxos, getbruxosByld, createbruxo, deletebruxo, updatebruxo };