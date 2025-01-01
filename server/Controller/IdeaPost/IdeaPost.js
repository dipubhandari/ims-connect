import IdeaModel from "../../model/PostIdea.js";
import User_Model from "../../model/User.js";

class IdeaPostController {
  // when user post a idea this runs
  static IdeaPost = async (req, res) => {
    // getting the data from frontend
    const { ideaTitle, idea, ideaCategory, ideator } = req.body;
    // // validating the data
    if (
      !(
        ideaTitle &&
        idea &&
        ideaCategory &&
         ideator
      )
    ) {
      res.send({ error: "Please enter all the fields..." });
    } else {
      const user = await User_Model.findOne({ _id: ideator });
      const post = await IdeaModel.create({
        ideaTitle,
        idea,
        ideaCategory,
        ideatorId:ideator,
        ideatorName:user.name
           });

      if (post) {
        res.send({ success: "You Posted a Idea successfully...." });
      }
      else{
      }
    }
  };


static IdeaDetail = async(req,res) =>{
  try {
    const data = await IdeaModel.find({_id:req.params.id})
    res.send(data[0])
  } catch (error) {
  }
}


  static IdeaApi = async (req, res) => {
    try {
      const AllIdeas = await IdeaModel.find()
        AllIdeas.map(()=>{

        })
      res.send(AllIdeas)
    } catch (error) {}
  };
  static deleteAllIdeas = async(req,res)=>{
    await IdeaModel.deleteMany();
         res.send("deleted")
  }
  static VoteIdea = async(req,res)=>{
  try {
    let countInnovative = 0
    let countEffectiveness = 0
    let countUniqueness = 0
    const {voter,idea,innovative,effectiveness,uniqueness} = req.body
   if(innovative){ countInnovative = 1 } else{ countInnovative=0 }
   if(effectiveness){ countEffectiveness = 1} else{ countEffectiveness =0}
   if(uniqueness){ countUniqueness = 1 }else{ countUniqueness=0}
   const ideaDetail = await IdeaModel.findOne({_id:idea})
   var isExist = false
    ideaDetail.votedBy.map((item)=>{
      if(item == voter){
        res.send({ err_msg: "You has already voted this idea" })
      }
    })
      const update = await IdeaModel.updateOne({ _id: idea }, { 
        innovative:ideaDetail.innovative+countInnovative,effectiveness:ideaDetail.effectiveness+countEffectiveness,uniqueness:ideaDetail.uniqueness+countUniqueness,
        votedBy:[...ideaDetail.votedBy,voter]
       })
      if (update) {
          res.send({ success_msg: "You voted successfully" })
      }
  } catch (error) {
  }
  }
  static deleteIdea = async(req,res) =>{
    const id = req.body.id
   const delete_query = await IdeaModel.deleteOne({_id:id});
   if(delete_query){
    res.send({success_msg:"Idea deleted successfully"})
   }
   else{
    res.send({error_msg:"Idea deleted successfully"})
   }
  }

  // fucntiion for getting the ideas for the particular ideator
  static IdeatorIdeas  = async(req,res) =>{
    try {
      const user = req.params.user
     const ideas = await IdeaModel.find({ideatorId:user});
   if(ideas){
    res.send(ideas)
   }
   else{
    res.send({error_msg:"Idea deleted successfully"})
   }
  
    } catch (error) {
    }

  }

  static DeleteIdeatorIdeas  = async(req,res) =>{
    console.log("deleted works");
    try {
     const deletedId = req.params.id
    //  if id exist
    if(deletedId){
      const deleteIdea = await IdeaModel.deleteOne({_id:deletedId})
      if(deleteIdea){
      res.send({success_msg:"Successfully Deleted Idea..."})
      }
      else{
      res.send({error_msg:"Try Again Something went wrong"})
      }
    }
    else{
      res.send({error_msg:"Try Again Something went wrong"})
    }
    } catch (error) {
    }
  }
  // incentive 
  static Incentive = async(req,res) =>{
  try {
    const id = req.body.id
   if(id){
    const currentIncentive = await IdeaModel.findOne({_id:id})
    const provideIncentive = await IdeaModel.updateOne({_id:id},{incentive:!currentIncentive.incentive})
    if(provideIncentive){
      res.send({success_msg:"Successfully done...."})
    }
    else{
    res.send({error_msg:"Something went wrong"})

    }
   }
   else{
    res.send({error_msg:"Something went wrong"})
   }
  } catch (error) {
  }
  }
}

export default IdeaPostController;