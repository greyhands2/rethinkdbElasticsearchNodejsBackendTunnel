










var express = require('express');
var app     = express();
var _ = require('underscore');
var async = require("async");
var path    = require("path");
var php = require("node-php");
var mysql   = require("mysql");
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var moment = require('moment');

moment().format();
var r = require('rethinkdbdash')({
	port: 28015,
    cursor: true,
	host: 'localhost'
});
var router  = express.Router();
var cors = require('cors');
var request = require('request');
var FormData = require('form-data');
var elasticsearch=require('elasticsearch');
var Bodybuilder = require('bodybuilder');
const eb = require('es-builder');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

// use it before all route definitions
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.static(__dirname + '/public'));
app.use("/", php.cgi(__dirname));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.php');
});


// Handle socket operation.
// On any connection listen for events.
var founders = io.of('/found');
var losters = io.of('/lost');
var fosters = io.of('/update');
var hosters = io.of('/search');
var qosters = io.of('/suggest');
var mosters = io.of('/suggest1');
var rosters = io.of('/suggest2');
var posters = io.of('/suggest3');
var zz = [];
var dd = [];
var mm = [];
var pp = [];
var xoxo = [];
var xo = [];
var woxo = [];
var hits = {};
var pomo = [];
var asyncTasks = new Array();
var anoyin = [];


//var founder_rooms = ['found_room1','found_room2','found_room3'];
//var loster_rooms = ['lost_room1','lost_room2','lost_room3'];
//function containsRegex(a, regex){
  //for(var i = 0; i < a.length; i++) {
    //var pos = a[i].search(regex);
    //if(pos > -1){
    //  return pos;

    //}
  //}
  //return null;
//}






















founders.on('connection', function(socket){
    console.log('yepa!!!  e don connect');
   
  socket.on('vroom', function(froom, muudah) {
       
      
           
           
         socket.join(froom);  
           
  //console.log(muudah);
          
          
          
          
        r.table('notifhi').filter({
    "Category": froom,
    "Condition": "Found",
            "school": muudah        
}).changes().limit(5).run().then(function(response){
           
    response.each(function(err, item){
        
        
        socket.emit('room', item);  
        
    })
        
      
     
        
     
 
     
 
	
})
.error(function(err){
	console.log(err);
})  
          
          

      
    // console.log(anoyin.length); 

    });
    
    
     
  socket.on('jroom', function(kroom, muudah) {
    asyncTasks.length = 0;
   
     async.forEachOf(kroom, function (value, key, callback) {
       r.table('notifhi').filter({
    "Category": value,
    "school": muudah,
    "Condition": "Found"
}).orderBy(
    r.desc("date")
).limit(10).run().then(function(cursor) {
    return cursor.toArray();
}).then(function(results) {
for(res in results){
          //for (var res = 0; res <= results.length; res++){
             
 asyncTasks.push(results[res]);
               
              
          }
           return callback();
       callback();
          //console.log(results)
}).catch(function(err) {
    // process error
          
               console.log('error')
})
  
   
 
  
  
}, function (err) {
  if (err) console.error(err.message);
  // configs is now a map of JSON data
  dirty_shit(asyncTasks);
}) 
      
      
      
      function dirty_shit(a){
          console.log(a);
          
          
          
      }
      
      
      
           
         
              
             
    
              
   
     
  });
   
     //console.log(asyncTasks)
//function dirty_shit(a){
     
    // riks.length = 0;
    //riks.push(a);
    
    
     //socket.emit('room1', riks); 
    
//} 
    
   
     
       
       
  
});



  
losters.on('connection', function(socket){
    console.log('yepa!!!  e don connect');
  socket.on('zroom', function(lroom, muudah) {
       
      
           
           
         socket.join(lroom);  
           
  //console.log(lroom);
          
          
          
          
        r.table('notifhi').filter({
    "Category": lroom,
    "Condition": "Lost",
            "school": muudah
}).changes().limit(5).run().then(function(tresponse){
           
    tresponse.each(function(err, ditem){
        
        
        socket.emit('room2', ditem);  
    })
        
      
     
        
     
 
     
 
	
})
.error(function(err){
	console.log(err);
})  
          
          
          
          
           r.table('notifhi').filter({
    "Category": lroom,
               "school": muudah,
    "Condition": "Lost"
}).orderBy(
   r.desc("date")
).limit(10).run().then(function(tresponse){
           
   tresponse.each(function(err, diitem){
       
           socket.emit('room1', diitem); 
           
           }); 
               
               
               
            
        
     
 
     
 
	
})
.error(function(err){
	console.log(err);
})
      
      
      
    
      
    
      
      
      

      
      
    });
    
    
    
    
    
    
});






fosters.on('connection', function(socket){
    console.log('wud soon update');
  socket.on('update', function(fom) {
       
      
           
           
        console.log(fom['id'], fom['date'], fom['tags'], fom['user'], fom['condition'], fom['state']);
          
          
      
     r.table("notifhi").filter({
    id: fom['id'],
    date: fom['date'],
         Post_Text: fom['tags'],
         User: fom['user'],
         Condition: fom['condition'],
         state: fom['state']
     }).update({
    state: 'seen'
}, {returnChanges: true}).run().then(function(kresponse){
           

        if (kresponse.replaced == 1){
            
            console.log(kresponse.replaced); 
            socket.emit('done', kresponse);
           
            
        }
        
        
}).error(function(err){
	console.log(err);
})  
        
     
    });
    
    
  });  
    
    
    














hosters.on('connection', function(socket){
    console.log('wud soon search');
  socket.on('search', function(lom) {
       console.log(lom);
     
   
      client.search({  
  index: 'lostit',
  type: 'string',
     body: {
    query: {
        
    "dis_max" : {
    "tie_breaker" : 0.3,
    "queries" : [
      {
       "common": {
          "post_text": {
          "query": lom,
          "boost": 10,
          "cutoff_frequency": 0.001
          }
       }
      },
      {
        "common": {
          "category": {
          "query": lom,
          "boost": 3,
          "cutoff_frequency": 0.001
          }
        }
      },
      {
        "common": {
          "condition": {
          "query": lom,
          "boost": 1,
          "cutoff_frequency": 0.001
          }
        }
      }
    ]
  }
        
    }
  }
}).then(function (resp) {
      Object.keys(hits).forEach(k => delete hits[k]);    
    hits = resp.hits.hits;
          if (hits.length < 1){
              console.log(hits);

      
          } else {
              
              
            
              for (hit in hits){
                  
                  var fixes = hits[hit];
                  for(fix in fixes){
                      
                     if(fix === "_source") {
                         
                         
                          console.log('na him o!!!!');
                         
                         console.log(fixes[fix]);
                         socket.emit('searchdone', fixes[fix]);
                     }
                      
                      
                      
                  }
               
                
                  
                  
              }
              
              
              
          }
}, function (err) {
    console.trace(err.message);
});
      
      
      
    
      
      
      
      
      
     
      
      
      
           
    });
    
    
  });  
    
    qosters.on('connection', function(socket){
    console.log('wud soon search');
  socket.on('suggest', function(wom) {
       console.log(wom);

             client.suggest({
  index: 'lostit',
  body: {
    text: wom,
    titleSuggester: {
      term: {
        field: 'post_text',
        size: 5
      }
    }
  }
}, function (error, slexponse) {
                 zz.length = 0;
for (slex in slexponse){
    
    if (slex === "titleSuggester"){
        
        var models = slexponse[slex];
        
        for(var e = 0; e < models.length; e++){
          
            
var guns = models[e];
      for (gun in guns){
          
          if(gun === "options"){
              
              var loaded = guns[gun];
              
              
              for(var t = 0; t < loaded.length; t++){
                  
                var shooters = loaded[t];
                  for (shoot in shooters){
                      
                      if(shoot === "text"){
                          
                          
                          zz.push(shooters[shoot]);
                      }   
                  }       
              }
          }
      }         
        }   
    }  
}
    // socket.emit('suggest_research', zz); 
                 
                      console.log(zz); 
                  mm.length = 0;
                 for (var y = 0; y < zz.length; y++){
                     
                     
      client.search({  
  index: 'lostit',
  type: 'string',
     body: {
    query: {
        
    "dis_max" : {
    "tie_breaker" : 0.3,
    "queries" : [
      {
       "common": {
          "post_text": {
          "query": zz[y],
          "boost": 10,
          "cutoff_frequency": 0.001
          }
       }
      },
      {
        "common": {
          "category": {
          "query": zz[y],
          "boost": 3,
          "cutoff_frequency": 0.001
          }
        }
      },
      {
        "common": {
          "condition": {
          "query": zz[y],
          "boost": 1,
          "cutoff_frequency": 0.001
          }
        }
      }
    ]
  }
        
    }
  }
}).then(function (dresp) {
    var fitz = dresp.hits.hits;
          if (fitz.length < 1){
              console.log(fitz.length);

      
          } else {
              
              
             
              mm.push(fitz);
            
              
              
              
              
              
              
              
              
          }
          
           for (var qqt = 0; qqt < mm.length; qt++){
            var seeds = mm[qqt];
           for(var teyy = 0; teyy < seeds.length; teyy++){
               
               var dcreeds = seeds[teyy];
               for (dcreed in dcreeds){
                  if(dcreed === "_source") {
                      var dfeeds = dcreeds[dcreed];
                      console.log(dfeeds);
                       socket.emit('suggest_research', dfeeds); 
                      
                  }
                   
                   
                   
               }
           } 
            
            
            
        }
            
}, function (err) {
    console.trace(err.message);
});
                     
                     
                 }
    
    

});

 
      
      
      
           
    });
    
    
  });













    rosters.on('connection', function(socket){
    console.log('wud soon search');
  socket.on('suggest2', function(mom) {
       console.log(mom);

             client.suggest({
  index: 'lostit',
  body: {
    text: mom,
    phraseSuggester: {
      phrase: {
        field: 'post_text',
        size: 5
      }
    }
  }
}, function (error, blexponse) {
                 pp.length = 0;
for (blex in blexponse){
    
    if (blex === "phraseSuggester"){
        
        var dmodels = blexponse[blex];
        
        for(var ee = 0; ee < dmodels.length; ee++){
          
            
var dguns = dmodels[ee];
      for (dgun in dguns){
          
          if(dgun === "options"){
              
              var reloaded = dguns[dgun];
              
              
              for(var tt = 0; tt < reloaded.length; tt++){
                  
                var dshooters = reloaded[tt];
                  for (dshoot in dshooters){
                      
                      if(dshoot === "text"){
                          
                          
                          pp.push(dshooters[dshoot]);
                      }   
                  }       
              }
          }
      }         
        }   
    }  
}
    // socket.emit('suggest_research', zz); 
                 
                      console.log(pp); 
                 for (var yy = 0; yy < pp.length; yy++){
                     console.log(pp[yy])
                     
      client.search({  
  index: 'lostit',
  type: 'string',
     body: {
    query: {
        
    "dis_max" : {
    "tie_breaker" : 0.3,
    "queries" : [
      {
       "common": {
          "post_text": {
          "query": pp[yy],
          "boost": 10,
          "cutoff_frequency": 0.001
          }
       }
      },
      {
        "common": {
          "category": {
          "query": pp[yy],
          "boost": 3,
          "cutoff_frequency": 0.001
          }
        }
      },
      {
        "common": {
          "condition": {
          "query": pp[yy],
          "boost": 1,
          "cutoff_frequency": 0.001
          }
        }
      }
    ]
  }
        
    }
  }
}).then(function (drespz) {
    var dfitz = drespz.hits.hits;
          if (dfitz.length < 1){
              console.log(dfitz.length);

      
          } else {
              
              
              xoxo.length = 0;
              xoxo.push(dfitz);
            
              
              
              
              
              
              
              
              
          }
          
         
           
}, function (err) {
    console.trace(err.message);
});
                     
                     
                 }
    
    

});

 
      
      
      
           
    });
    
    
  });






































  mosters.on('connection', function(socket){
    console.log('wud soon search');
  socket.on('suggest1', function(pom) {
       console.log(pom);

             client.suggest({
  index: 'lostit',
  body: {
   
    "suggest": {
         text: pom,
      completion: {
        field: 'name_suggest',
          
        size: 5,
          "fuzzy" : {
                "fuzziness" : 2
            }
      }
    }
  }
}, function (error, flexponse) {
                 dd.length = 0;
var adults = flexponse['suggest'];
    for (adult in adults){
        
       
        
        var children = adults[adult];
    for (child in children){
        
        var babies = children[child];
        for (baby in babies){
            var spermcells = babies[baby];
                
                for (sperm in spermcells){
                    var uterus = spermcells[sperm];
                   if(sperm === "text") {
                       
                       dd.push(uterus);
                       
                       
                   }
                    
                    
                }
            
            
        
        }
        
    }
       
    }
    socket.emit('complit_sugg', dd);  
                       console.log(dd);


});

 
      
      
      
           
    });
    
    
  });































posters.on('connection', function(socket){
    console.log('wud soon search');
  socket.on('suggest3', function(plom) {
       console.log(plom);

             client.suggest({
  index: 'lostit',
  body: {
   
    "suggest": {
         text: plom,
      completion: {
        field: 'name_suggest',
        size: 5,
          "fuzzy" : {
                "fuzziness" : 2
            }
      }
    }
  }
}, function (error, lexponse) {
                 woxo.length = 0;
var wadults = lexponse['suggest'];
    for (wadult in wadults){
        
       
        
        var dchildren = wadults[wadult];
    for (dchild in dchildren){
        
        var dbabies = dchildren[dchild];
        for (dbaby in dbabies){
            var dspermcells = dbabies[dbaby];
                
                for (dsperm in dspermcells){
                    var duterus = dspermcells[dsperm];
                   if(dsperm === "text") {
                       
                       woxo.push(duterus);
                       
                       
                   }
                    
                    
                }
            
            
        
        }
        
    }
       
    }

                       console.log(woxo);
                         for (var diy = 0; diy < woxo.length; diy++){
                     console.log(woxo[diy])
                     
      client.search({  
  index: 'lostit',
  type: 'string',
     body: {
    query: {
        
    "dis_max" : {
    "tie_breaker" : 0.3,
    "queries" : [
      {
       "common": {
          "post_text": {
          "query": woxo[diy],
          "boost": 10,
          "cutoff_frequency": 0.001
          }
       }
      },
      {
        "common": {
          "category": {
          "query": woxo[diy],
          "boost": 3,
          "cutoff_frequency": 0.001
          }
        }
      },
      {
        "common": {
          "condition": {
          "query": woxo[diy],
          "boost": 1,
          "cutoff_frequency": 0.001
          }
        }
      }
    ]
  }
        
    }
  }
}).then(function (cresh) {
    var drifter = cresh.hits.hits;
          if (drifter.length < 1){
              console.log(drifter.length);

      
          } else {
              
              
              xo.length = 0;
              xo.push(drifter);
            
              
              
              
              
              
              
              
              
          }
          for (var qt = 0; qt < xo.length; qt++){
               
            var seed = xo[qt];
           for(var tey = 0; tey < seed.length; tey++){
               
               var creeds = seed[tey];
               for (creed in creeds){
                  if(creed === "_source") {
                       
                      var feeds = creeds[creed];
                      console.log(feeds);
                       socket.emit('suggest_research3', feeds); 
                      
                  }
                   
                   
                   
               }
           } 
            
            
            
        }
          
}, function (err) {
    console.trace(err.message);
});
                     
                     
                 }

});

 
      
      
      
           
    });
    
    
  });











http.listen(3000,function(){
    console.log("Listening on 3000");
});
