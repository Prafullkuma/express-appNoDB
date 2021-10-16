const express=require('express')
const router=express.Router()
const uuid=require('uuid')

const member=require('../../Member')

router.get('/',(req,res)=>{
    res.json(member)
})

router.get('/:id',(req,res)=>{
    const id=req.params.id
    const result=member.find((ele)=>{
        return ele.id == id
    })
    if(result){
       res.json(result)
    }   
    else{
        res.status(400).send({message:"Data not found"})
    }
})
router.post('/',(req,res)=>{
    const data={
      id:uuid.v4(),
      name:req.body.name,
      email:req.body.email,
      status:req.body.status  
    }
    if(!req.body.name || !req.body.email){
        res.send({message:"Please provide data"})
    }else{
        member.push(data)
        res.send({message:"new memeber is added",data:data})
    } 
})

router.put('/:id',(req,res)=>{
     const body=req.body
     const id=req.params.id 
     const result=member.find((ele)=>ele.id==id)
     if(result){
         
         result.name=body.name,
         result.email=body.email,
         result.status=body.status
         res.json({message:"result are updated"})
     }
     else{
        res.status(400).json({message:"No member found"})
     }
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id
    const result=member.filter((ele)=>{
        return ele.id != id
    })
    if(result){
       res.json({message:"Member Delete",result})
    }   
    else{
        res.status(400).send({message:"Data not found"})
    }
})
module.exports=router
