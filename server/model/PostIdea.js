import mongoose from "mongoose"

const IdeaSchema = new mongoose.Schema({
    ideaTitle: { type: String, required:true },
    ideaCategory: { type: String, required:true },
    idea: { type: String, required:true },
    ideatorId:{type:String,required:true},
    ideatorName:{type:String},
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    incentive:{type: Boolean,default:false},
    likes:[],
    dislikes:[],
    isSelect:{type:String,default:false},
    views:{type:Number,default:0},
    innovative:{type:Number,default:0},
    uniqueness:{type:Number,default:0},
    effectiveness:{type:Number,default:0},
    votedBy:[]
})

const IdeaModel = mongoose.model('ideapost', IdeaSchema)

export default IdeaModel