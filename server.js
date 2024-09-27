import { PrismaClient } from '@prisma/client';
import express from 'express';


const prisma = new PrismaClient();

// GET - Listar 
// POST - Criar 
// PUT - Editar
// DELETE - Deletar 

const app = express()
app.use(express.json())

app.post ('/usuarios', async (req, res) => {

    await prisma.user.create({
        data:{
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(201).json(req.body)
    
})

app.put ('/usuarios/:id', async (req, res) => {

    console.log(req);
    
    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data:{
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(201).json(req.body)
    
})

// req = resquest
// res = response 

app.get('/usuarios', async (req, res) => {

    let users = []

    if(req.query){ 
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }else{
        users = await prisma.user.findMany() 
    }
    

    res.status(200).json(users)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: "Usuario Deletado"})
})


app.listen(3000)