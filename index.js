const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/views'));

// Rota
app.get('/', (req,res) =>{
    res.render("index");
})

const PORT = process.env.PORT || 3000; // conecta ou na porta padrão ou na porta 3000
app.listen(PORT, () => {
    console.log('rodando na porta ${PORT}')
}); 
