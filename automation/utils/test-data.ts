export const testData = {
  validUser: {
    document: '12345678',
    password: 'Test123*'
  },
  invalidUser: {
    document: '12345678',
    password: 'ClaveIncorrecta'
  },
  simulacion: {
    default: {
      product: 'CDT',
      amount: 1000000,
      rate: 12.5,
      termMonths: 12
    },
    montoBajo: {
      amount: '50000'
    },
    montoAlto: {
      amount: '600000000'
    },  
    tasaAlta: {
      rate: '150'
    }
  }
};
