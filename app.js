const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let habits = [
    { id: 1, task: "Drink 2L water", description: "Drink 8 glasses", completed: true, streak: 5 },
    { id: 2, task: "Read for 20 mins", description: "Any book", completed: false, streak: 2 },
    { id: 3, task: "10 min meditation", description: "Use calm app", completed: true, streak: 3 },
    { id: 4, task: "Walk 5000 steps", description: "Take a walk", completed: false, streak: 0 }
];

let nextId = 5;

// ==================================== dashboard.ejs
app.get('/', (req, res) => {
    const Count = habits.filter(h => h.completed).length;
    const progress = Math.round((Count / habits.length) * 100);
    res.render('dashboard', { habits, progress, Count });
});

//  ==================================== add.ejs
app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { task, description, date } = req.body;

    const New = {
        id: newId++,      
        task: task,
        description: description,
        date: date
    };
    
    habits.push(New);
    res.redirect('/');
});

// ==================================== manage.ejs
app.get('/manage', (req, res) => {
    res.render('manage', { habits });
});

// ====== delete 
app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    habits = habits.filter(h => h.id !== id);
    res.redirect('/manage');
});

// =================== Start the server ========================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
