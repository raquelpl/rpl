module.exports = app => {
    const questions = require("../controllers/question.controller.js");
  
    var router = require("express").Router();
  
    // Create
    router.post("/", questions.create);
  
    // Get
    router.get("/", questions.findAll);

    // Get by Id
    router.get("/:id", questions.findOne);
  
    // Update 
    router.put("/:id", questions.update);
  
    // Delete 
    router.delete("/:id", questions.delete);
  
   
    app.use('/api/questions', router);
  };