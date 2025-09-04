const { calcularMediaAluno } = require('../src/calcularMediaAluno');
test('a1 e a2 indefinidos', () => {
    expect (() => calcularMediaAluno(undefined, 10, 10)).toThrow('Nota a1 ou a2 não informadas') 
    expect (() => calcularMediaAluno(10, undefined, 10)).toThrow('Nota a1 ou a2 não informadas') 
})

test('a1 e a2 não podem ser negativados', () => {
    expect (() => calcularMediaAluno(-1, 10, 10)).toThrow('Nota a1 e a2 não podem ser negativadas') 
    expect (() => calcularMediaAluno(10, -1, 10)).toThrow('ota a1 e a2 não podem ser negativadas') 
})

test('Calcular media qde a1 e a2 quando a2 não for informado', () => {
    expect (calcularMediaAluno(10, 20, undefined)).tobeCloseTo(15)
})

test('a3 não pode ser negativa', () => {
    expect (calcularMediaAluno(10, 20, -1)).tobeCloseTo(30)
})

test('deve calcular a melhor combinação de a3 e a2 quando a3 é informada', () => {
    expect(calcularMediaAluno(10, 20, 25)).toBeCloseTo(25); 
});
