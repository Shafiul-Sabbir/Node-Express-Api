const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

//creating user array.
const users =[
    {id:0,name:'shayontika',email:'shayontika@gmail.com',phone:'01888888888'},
    {id:1,name:'shabana',email:'shabana@gmail.com',phone:'01888888888'},
    {id:2,name:'shabnur',email:'shabnur@gmail.com',phone:'01888888888'},
    {id:3,name:'sonia',email:'sonia@gmail.com',phone:'01888888888'},
    {id:4,name:'shuchorita',email:'shuchorita@gmail.com',phone:'01888888888'},
    {id:5,name:'shushmita',email:'shushmita@gmail.com',phone:'01888888888'}
]

// greetings from root page.
app.get('/',(req, res) => {
    res.send('hello from my node module.');
  });

//get all datas using Get method.
app.get('/users',(req,res)=>{
    const search = (req.query.search);
    if(search){
        const searchResult = users.filter(user=>user.name.toLowerCase().includes(search));
        res.send(searchResult);
    }
    else{
        res.send(users)
    }
});

// dynamic api / finding specific user using user 'id' and get method.
app.get('/users/:id',(req,res)=>{
    const id = req.params.id;
    const user = users[id];
    res.send(user);

    console.log("searched person is : ", user);
});

//adding new user to the users array using Post method.
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser);
    res.json(newUser);

    console.log("successfully added ", newUser);
 
});

// To Update any users info using user 'id'  and put method 
app.put('/users/:id',(req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedUser = req.body;
    //find the user by id.
    const userToUpdate = users.find(user => user.id == id);
    if(!userToUpdate)
    {
        return res.status(404).json({error : 'user not found'});

    }
    userToUpdate.name = updatedUser.name || userToUpdate.name;
    userToUpdate.email = updatedUser.email || userToUpdate.email;
    userToUpdate.phone = updatedUser.phone || userToUpdate.phone;
    res.json(userToUpdate);

    console.log("successfully updated ", userToUpdate);
});

// to Delete any user using user 'id' and delete method.
app.delete('/users/:id',(req, res) => {
    const id = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(user => user.id == id);
    if (!userIndex)
    {
        return res.status(404).json({error : 'user not found'});
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json(deletedUser);

    console.log("succesfully deleted ", deletedUser);
});

app.listen(port,()=>{
    console.log('listening to port from',port);
})