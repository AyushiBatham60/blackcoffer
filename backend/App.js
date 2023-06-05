const express = require('express');
const app = express();
const mongoose = require('mongoose');
const _=require('lodash');
const Schema = mongoose.Schema;

var cors = require('cors');


mongoose.connect('mongodb://127.0.0.1:27017/postDB', { useNewUrlParser: true });
app.use(cors());

const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/api', createProxyMiddleware({ 
    target: 'http://localhost:3000/', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

const dataSchema = new Schema({
    endyear:String,
    intensity:Number,
    sector:String,
    topic:String,
    insight:String,
    url:String,
    region:String,
    start_year:String,
    impact:String,
    added:Date,
    published:Date,
    country:String,
    relevance:Number,
    pestle:String,
    source:String,
    title:String,
    likelihood:Number
  });
  
  const Posts=mongoose.model('posts',dataSchema);

  async function getItem(){
    const item=await Posts.find({});
    
    return item;
}

  app.get('/allData',function(req,res){
    getItem().then(function(found){
        res.send(found);
    })
  })

  let ans=[];
  async function checkPresent(check){
    getItem().then(function(found){
      found.forEach((i)=>{
        let y=i.topic;
        let len=check.length;
        y=y.substring(0,len);
          if(check==y){
             ans.push(i);
          }
      })
    });
  }

  app.get('/byTopic/:name',function(req,res){
    checkPresent(req.params.name);
    
    if(ans==null || ans==''){
      res.status(400).json({
        error: "No post was found",
      });
      return;
    }
    res.send(ans);
  })



  let sectors=[];
  async function checkSector(check){
    getItem().then(function(found){
      found.forEach((i)=>{
        let y=i.sector;
        let len=check.length;
        y=y.substring(0,len);
          if(check==y){
             sectors.push(i);
          }
      })
    });
  }


  app.get('/bySector/:name',function(req,res){
    checkSector(req.params.name);
    
    if(sectors==null || sectors==''){
      res.status(400).json({
        error: "No post was found",
      });
    }
    res.send(sectors);
  })

  let regions=[];
  async function checkRegion(check){
    
    getItem().then(function(found){
      found.forEach((i)=>{
        let y=i.region;
        y=y.replaceAll(" ",'');
        y=y.toLowerCase();
        let len=check.length;
        y=y.substring(0,len);
          if(check==y){
             regions.push(i);
          }
      })
    });
  }

  app.get('/byRegion/:name',function(req,res){
    let y=req.params.name;
    y=y.replaceAll(" ",'');
    y=y.toLowerCase();
    checkRegion(y);
   
    if(regions==null || regions==''){
      res.status(400).json({
        error: "No post was found",
      });
        return;
    }
    let copyy=regions;
    regions=[]
    res.send(copyy);
    
  })

  let sources=[];
  async function checkSource(check){
    
    getItem().then(function(found){
      found.forEach((i)=>{
        let y=i.source;
        y=y.replaceAll(" ",'');
        y=y.toLowerCase();
        let len=check.length;
        y=y.substring(0,len);
          if(check==y){
             sources.push(i);
          }
      })
    });
  }

  app.get('/bySource/:name',function(req,res){
    let y=req.params.name;
    y=y.replaceAll(" ",'');
    y=y.toLowerCase();
    checkSource(y);
    if(sources==null || sources==''){
      res.status(400).json({
        error: "No post was found",
      });
        return;
    }
    let copyy=sources;
   sources=[];
    res.send(copyy);
    
  })



  let countrys=[];
  async function checkCountry(check){
    getItem().then(function(found){
      found.forEach((i)=>{
        let y=i.country;
        y=y.replaceAll(" ",'');
        y=y.toLowerCase();
        let len=check.length;
        y=y.substring(0,len);
          if(check==y){
            countrys.push(i);
          }
      })
    });
  }


  app.get('/byCountry/:name',function(req,res){
    let y=req.params.name;
    y=y.replaceAll(" ",'');
    y=y.toLowerCase();
    checkCountry(y);
    if(countrys==null ||countrys==''){
      res.status(400).json({
        error: "No post was found",
      });
        return;
    }
    let copyy=countrys;
    countrys=[]
    res.send(copyy);
   
  })


  
  let likelihoods=[];
  async function checkLikelihood(check){
    getItem().then(function(found){
      found.forEach((i)=>{
         
          if(check==i.likelihood){
             console.log(check==i.likelihood);
             likelihoods.push(i);
          }
      })
    });
  }
  
  app.get('/byLikelihood/:name',function(req,res){
    
    checkLikelihood(req.params.name);
    
    if(likelihoods==null || likelihoods==''){
      res.status(400).json({
        error: "No post was found",
      });
        return;
    }
    let copyy=likelihoods;
    likelihoods=[]
    res.send(copyy);
  })


  
  let pests=[];
  async function checkPestle(check){
    getItem().then(function(found){
      found.forEach((i)=>{
        let y=i.pestle;
        y=y.replaceAll(" ",'');
        y=y.toLowerCase();
        let len=check.length;
        y=y.substring(0,len);
          if(check==y){
            pests.push(i);
          }
      })
    });
  }


  app.get('/byPestle/:name',function(req,res){
    let y=req.params.name;
    y=y.replaceAll(" ",'');
    y=y.toLowerCase();
    checkPestle(y);
    if(pests==null ||pests==''){
      res.status(400).json({
        error: "No post was found",
      });
        return;
    }
    let copyy2=pests;
    pests=[]
    res.send(copyy2);
   
  })


  
  let relevances=[];
  async function checkRelevance(check){
    getItem().then(function(found){
      found.forEach((i)=>{
         
          if(check==i.relevance){
            //  console.log(check==i.likelihood);
             relevances.push(i);
          }
      })
    });
  }
  
  app.get('/byRelevance/:name',function(req,res){
    
    checkRelevance(req.params.name);
    
    if(relevances==null || relevances==''){
      res.status(400).json({
        error: "No post was found",
      });
        return;
    }
    let copyy=relevances;
    relevances=[];
    res.send(copyy);
  })









  app.listen(3001, () => {
    console.log('Server started on port 3001');
  });