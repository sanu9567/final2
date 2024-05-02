const express = require('express');
const login = require('./model');
const Admin = require('./adminmode'); // Admin model
// const Cards = require('./cardsPizza'); 
// const food = require('./food');
// const Sandwitch = require('./sandwitch');
const cors = require('cors');
const Food = require('./food');
// const Pizza = require('./cardsPizza');


const app = express();
app.use(express.json());
app.use(cors());

// Api to add data to db

  app.post('/addu', async (req, res) => {
    try {
      const existingUser = await login.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send("Email already exists");
      }
  
      const newUser = new login(req.body);
      await newUser.save();
      res.send("User added");
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
// Api to view data from db
app.get('/view', async (req, res) => {
    try {
        let result = await login.find();
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Deleting a data
app.delete('/remove/:id', async (req, res) => {
    try {
        let id = req.params.id;
        await login.findByIdAndDelete(id);
        res.send("Deleted");
    } catch (error) {
        res.status(500).send(error);
    }
});

// Other routes
app.get('/', (req, res) => {
    res.send("Message from server");
});

app.get('/trial', (req, res) => {
    res.send("trial server");
});

app.post('/trouble', (req, res) => {
    res.send("troubleshooter");
});

// Add this route to your Express server

app.post('/verify', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await login.findOne({ email, password });
        if (user) {
            res.json({ message: 'User exists in the database.' });
        } else {
            res.json({ message: 'User does not exist in the database.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying user.' });
    }
});

//user login

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    login.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("success")
                } else {
                    res.json("password is incorrect")
                }
            } else {
                res.json("no data existed")
            }
        })
        .catch(err => console.log(err));
})




//admin login

app.post('/adminLogin', (req, res) => {
    const { email, password } = req.body;
    Admin.findOne({ email: email })
        .then(admin => {
            if (admin) {
                if (admin.password === password) {
                    res.json("Admin login success")
                } else {
                    res.json("Password is incorrect")
                }
            } else {
                res.json("Admin does not exist")
            }
        })
        .catch(err => console.log(err));
})

//admin add

app.post('/adda', async (req, res) => {
    try {
      const existingUser = await Admin.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send("Email already exists");
      }
  
      const newUser = new Admin(req.body);
      await newUser.save();
      res.send("admin added");
    } catch (error) {
      res.status(500).send(error);
    }
  });

  //pizza add
  app.post('/addpizza', async (req, res) => {
    try {
      const { title, description, imageUrl } = req.body;
      const pizza = new Pizza({ title, description, imageUrl });
      await pizza.save();
      res.status(201).json({ message: 'Pizza added successfully', pizza });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

  //pizza view
  app.get('/viewp', async (req, res) => {
    try {
        let result = await Cards.find();
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

//pizza remove
app.delete('/removep/:id', async (req, res) => {
  try {
      let id = req.params.id;
      await Pizza.findByIdAndDelete(id);
      res.send("Deleted");
  } catch (error) {
      res.status(500).send(error);
  }
});

// Mandhi add
app.post('/addfood', async (req, res) => {
    try {
      const { name, description, imageUrl } = req.body;
      const food = new Food({ name, description, imageUrl });
      await food.save();
      res.status(201).json({ message: 'Item added successfully', food });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Mandhi view
  app.get('/viewfood', async (req, res) => {
    try {
      const foodData = await Food.find();
      res.json(foodData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  //mandhi remove

app.delete('/removem/:id', async (req, res) => {
  try {
      let id = req.params.id;
      await Food.findByIdAndDelete(id);
      res.send("Deleted");
  } catch (error) {
      res.status(500).send(error);
  }
});
// sandwitch add
app.post('/addsandwitch', async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    const sandwitch = new SandwitchData({ name, description, imageUrl });
    await sandwitch.save();
    res.status(201).json({ message: 'Sandwitch added successfully', sandwitch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// sandwitch view
app.get('/viewsandwitch', async (req, res) => {
  try {
    const sandwitchData = await sandwitch.find();
    res.json(sandwitchData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//sandwitch remove

app.delete('/removesandwitch/:id', async (req, res) => {
try {
    let id = req.params.id;
    await sandwitch.findByIdAndDelete(id);
    res.send("Deleted");
} catch (error) {
    res.status(500).send(error);
}
});

// Port
app.listen(8080, () => {
    console.log('port is running at 8080');
});
