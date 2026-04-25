import { PrismaClient } from '@prisma/client'
import { create } from 'domain'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const saltRounds = 10
    const senhaCriptografada = await bcrypt.hash('12345678', saltRounds)

    // 1. Criar um Gestor
    const gestor = await prisma.usuario.upsert({
        where: { login: 'admin' },
        update: {
            senha: senhaCriptografada,
        },
        create: {
            nome: 'Cássio Gestor',
            login: 'admin',
            senha: senhaCriptografada,
            funcao: 'Gestor',
        },
    })

    const senhaMaria = await bcrypt.hash('123', saltRounds)
    
    // 2. Criar um Funcionário
    const funcionario = await prisma.usuario.upsert({
        where: { login: 'limpeza01' },
        update: {
            senha: senhaMaria,
        },
        create:{
            nome: 'Luiz Limpeza',
            login: 'limpeza01',
            senha: senhaMaria,
            funcao: 'Funcionário',
        },
    })

    // 3. Criar uma Tarefa: (Testando a relação 1:N entre Usuario e Tarefa)
    await prisma.tarefa.create({
        data: {
            titulo: 'Limpar Suíte 05',
            descricao: 'Trocar lençóies e repor frigobar',
            local: 'Quarto 05',
            prioridade: 'Alta',
            status: 'atribuida',
            usuarioId: funcionario.id, // Relacionando a tarefa ao funcionário
        },
    })
        console.log('Seed com senhas criptografadas!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) =>{
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })