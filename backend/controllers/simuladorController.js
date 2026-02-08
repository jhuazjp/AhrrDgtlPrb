const MIN_AMOUNT = 100000; // Monto minimo permitido
const MAX_AMOUNT = 500000000; // Monto maximo permitido

const isNumber = (value) => typeof value === 'number' && Number.isFinite(value); // Valida numero finito

const validatePayload = ({ product, amount, rate, termMonths }) => { 
    if (!product || !['CDT', 'AHORRO'].includes(product)) { // Valida producto
        return 'Producto invalido'; 
    } 
    if (!isNumber(amount)) { // Valida monto numerico
        return 'Monto invalido'; 
    } 
    if (amount < MIN_AMOUNT) { // Valida monto minimo
        return `Monto minimo es ${MIN_AMOUNT}`; 
    } 
    if (amount > MAX_AMOUNT) { // Valida monto maximo
        return `Monto maximo es ${MAX_AMOUNT}`; 
    } 
    if (!isNumber(rate) || rate < 0 || rate > 100) { // Valida tasa
        return 'Tasa invalida'; 
    } 
    if (!Number.isInteger(termMonths) || termMonths <= 0 || termMonths > 360) { // Valida plazo
        return 'Plazo invalido'; 
    } 
    return null;
}; 

const simulateCdt = (amount, rate, termMonths) => { // Simulacion CDT
    const annualRate = rate / 100; 
    const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1; // Tasa efectiva mensual
    let balance = amount; 
    const schedule = []; 

    for (let month = 1; month <= termMonths; month += 1) { 
        const interest = balance * monthlyRate; 
        balance += interest; 
        schedule.push({ 
            month, 
            interest: Number(interest.toFixed(2)), 
            balance: Number(balance.toFixed(2)) 
        }); 
    } 

    const finalAmount = Number(balance.toFixed(2)); // Monto final
    const gain = Number((finalAmount - amount).toFixed(2)); // Ganancia

    return { finalAmount, gain, schedule }; 
}; 

const simulateSavings = (amount, rate, termMonths) => { // Simulacion ahorro
    const monthlyRate = rate / 100 / 12; // Tasa mensual simple
    let balance = amount; // Balance inicial
    const schedule = []; // Cronograma

    for (let month = 1; month <= termMonths; month += 1) {
        const interest = balance * monthlyRate; 
        balance += interest; 
        schedule.push({
            month, 
            interest: Number(interest.toFixed(2)), 
            balance: Number(balance.toFixed(2)) 
        }); 
    } 

    const finalAmount = Number(balance.toFixed(2)); // Monto final
    const gain = Number((finalAmount - amount).toFixed(2)); // Ganancia

    return { finalAmount, gain, schedule };
}; 

const simular = (req, res) => { 
    const payload = req.body || {}; 
    const error = validatePayload(payload); // Valida payload

    if (error) { 
        return res.status(400).json({ message: error });
    } 

    const { product, amount, rate, termMonths } = payload; 
    const simulation = 
        product === 'CDT' 
            ? simulateCdt(amount, rate, termMonths) 
            : simulateSavings(amount, rate, termMonths); 

    return res.json({ 
        product, 
        amount, 
        rate, 
        termMonths, 
        finalAmount: simulation.finalAmount, 
        gain: simulation.gain, 
        schedule: simulation.schedule 
    }); 
}; 

module.exports = { 
    simular 
}; 
