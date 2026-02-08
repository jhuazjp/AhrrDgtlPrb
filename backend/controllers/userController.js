const DEMO_USERS = [ //Usuarios
    { document: '12345678', password: 'Test123*', name: 'Juan' }]; 

const isValidDocument = (document) => /^\d{5,12}$/.test(document); // Valida documento

const login = (req, res) => { 
    const { document, password } = req.body || {}; 

    if (!document || !password) { // Valida campos requeridos
        return res.status(400).json({ 
            message: 'Campos requeridos', 
            fields: { 
                document: !document, 
                password: !password 
            } 
        }); 
    } 

    if (!isValidDocument(document)) { // Valida formato de documento
        return res.status(400).json({ 
            message: 'Documento invalido', 
            code: 'DOC_INVALID' 
        }); 
    } 

    const user = DEMO_USERS.find( // Buscar usuario
        (item) => item.document === document && item.password === password 
    ); 

    if (!user) { // Credenciales incorrectas
        return res.status(401).json({ 
            message: 'Error Credenciales Incorrectas' 
        }); 
    } 

    return res.json({ 
        token: 'demo-token', 
        user: { 
            document: user.document, 
            name: user.name 
        } 
    }); 
}; 

module.exports = { 
    login 
}; 
