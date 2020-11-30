const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
const studentsData = require("./InitialData");

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

let newId = studentsData.length;

//get details of all students
 app.get("/api/student" , (req,res) => {
    res.send(studentsData);
 });


 //get details of a particular student
 app.get("/api/student/:id" , (req,res) => {
    let studentId = parseInt(req.params.id);

    if(isNaN(studentId)){
        res.sendStatus(404);
        return;
    }

    const students = studentsData.find(student => student.id === studentId);

    if(!students){
        res.sendStatus(404);
        return;
    }
    
    res.send(students);

 });

 //post
 app.post("/api/student" , (req,res) => {
      let newStudent = req.body;

      if(!newStudent.name || !newStudent.currentClass || !newStudent.division){
          res.sendStatus(400);
          return;
      }

      studentsData.push({
          id: newId+1,
          name: newStudent.name,
          currentClass: parseInt(newStudent.currentClass),
          division: newStudent.division  
      })

      newId++;

      res.send({
          id: newId
      })
 });


 //put
 app.put("/api/student/:id" ,(req,res) => {
      let id = parseInt(req.params.id);

      if(isNaN(id)){
          req.sendStatus(400);
          return;
      }

      const st = studentsData.findIndex(s => s.id === id);
      if(st === -1) {
          res.sendStatus(400);
          return;
      }


      if(req.body.name){
          studentsData[st].name = req.body.name;
      }
      if(req.body.currentClass){
        studentsData[st].currentClass = parseInt(req.body.currentClass);
      }
      if(req.body.division){
        studentsData[st].division = req.body.division;
      }  

      res.set("content-type", "application/x-www-form-urlencoded");
      res.send({
          name:req.body.name
      });

 });

 //delete

 app.delete("/api/student/:id" , (req,res) => {
     const deleteId = parseInt(req.params.id);

     if(isNaN(deleteId)){
         res.sendStatus(404);
         return;
     }

     let deleteStudent = studentsData.findIndex(stud => stud.id === deleteId);

     if(deleteStudent === -1){
         res.sendStatus(404);
         return;
     }

     studentsData.splice(deleteStudent , 1);
     res.sendStatus(200);


 });


app.listen(port, () => console.log(`App listening on port ${port}!`))
//console.log("wo");

module.exports = app;   