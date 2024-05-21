const validator = require('fastest-validator');
const models = require('../models');
const { default: Validator } = require('fastest-validator');

 //----- creer une validation schema pour le post: set field you wante validate:-------------//
const validationResult = (entite)=>{
    const schema = {
        title :{type:"string", Optional:false,max:"100"},
        content:{type:"string", optional:false,max:"500"},
        categoryId:{type:"number",optional:false}
    
    }
    const v = new validator();
    const validationResponse=v.validate(entite,schema);
    return validationResponse;
    
}
//-------------------------------- Fin validation ------------------------------------------------//

function save(req,res){
    const post  = {
        title : req.body.title,
        content :req.body.content,
        imageUrl : req.body.image_url,
        categoryId : req.body.category_id,
        userId :1
    };
    
    postIsValide =validationResult(post);
    if(postIsValide!==true){
      return res.status(400).json({
         message:"Field not valide ",
         error: postIsValide 
      });
    }
  
    models.Post.create(post).then(result => {

        res.status(201).json({
             message:"Post created successfully",
             post: result
        });
    }).catch(error =>{
          
        res.status(500).json({
            message:"Something went wrong",
            error: error
       });

    });
}

// get post By id :

function getPost(req,res){
    const id = req.params.id;
    
    // todo single data 
    models.Post.findByPk(id).then(result =>{
        if(result)
         {
            res.status(200).json(result);
        
         }
         else{
            res.status(400).json({
                message:"Post is not found !!"
            });
         }
               
    }).catch(error=>{
        
        res.status(500).json({
            maessage:"Somethinh  went wrong",
            error: error
       });
    
        
    });
    

    
}

// Get all Posts 
function allPost(req,res){
    models.Post.findAll().then(result =>{
        res.status(200).json(result);
    }).catch(error =>{
        res.status(500).json({
            message:"Une erreur s'est produite",
            error: error
        });
    });
}

//update post
function update(req,res){
    const id = req.params.id;
    if(id>0){
        const post =
        {
            title : req.body.title,
            content : req.body.content,
            imageUrl : req.body.image_url,
            categoryId : req.body.category_id
        }
        
        /** validation  de postData */
        postIsValide =validationResult(post);
       if(postIsValide!==true){
            return res.status(400).json({
                message:"Field not valide ",
                error: postIsValide 
            });
        }
        models.Post.update(post, {where:{id:id}}).then(result=>{
            res.status(201).json({
            message:"Le post a été  bien sauvegardé !!",
            post:post
           })
        }).catch(error=>{
            res.status(500).json({
                message:"Il y'a eu une erreur quelque part !",
                error:error
            })
        });

        
    }
}

// Delete Post
function deletePost(req,res){
    const id = req.params.id;
    if(id>0){

        models.Post.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message:"Le post a été supprimé avec succèes "
            
            })  
        }).catch(error=>{
            res.status(500).json({
            message:"Une erreur s'est produite !!",
            error :error
            })
        
        }); 
    }
}

module.exports = {
    save : save,
    getPost : getPost,
    allPost : allPost,
    update:update,
    deletePost:deletePost
}