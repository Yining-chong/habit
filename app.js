const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let habits = [];
let nextId = 1;

// ==================================== home.ejs
app.get('/', (req, res) => {
    res.render('home', { habits });
});

//  ==================================== add.ejs
app.get('/add', (req, res) => {
    res.render('add');
});

// add 
app.post('/add', (req, res) => {
    const { name } = req.body;
    const newHabit = {
        id: nextId++,
        name: name,
        completed: false
    };
    habits.push(newHabit);
    res.redirect('/');
});

// done habit
app.get('/habit/:id/done', (req, res) => {
    const id = parseInt(req.params.id);
    habits = habits.map(h => {
        if (h.id === id) {
            return { ...h, completed: true };
        }
        return h;
    });
    res.redirect('/');
});

//  ==================================== edit.ejs
app.get('/habit/:id/edit', (req, res) => {
    const id = parseInt(req.params.id);
    const habit = habits.find(h => h.id === id);
    res.render('edit', { habit });
});

// edit habit
app.post('/habit/:id/edit', (req, res) => {
    const id = parseInt(req.params.id);
    habits = habits.map(h => {
        if (h.id === id) {
            return {
                ...h,
                name: req.body.name
            };
        }
        return h;
    });
    res.redirect('/');
});

// delete habit
app.get('/habit/:id/delete', (req, res) => {
    const id = parseInt(req.params.id);
    habits = habits.filter(h => h.id !== id);
    res.redirect('/');
});

// =================== Start the server ========================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
