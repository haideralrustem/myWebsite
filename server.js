const express= require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();


const PORT = process.env.PORT || 3000;
const members = [{name: 'Hansel', age: 50}, {name:'Wynadlin', age: 25}];
var collegesArray = [];
var colleges = 
{
    "metadata": {
        "total": 7175,
        "page": 0,
        "per_page": 5
    },
    "results": [  {
            "school.zip": "10115",
            "school.degrees_awarded.predominant_recoded": 3,
            "school.school_url": "nyts.edu",
            "school.tuition_revenue_per_fte": 16921,
            "school.name": "New York Theological Seminary",
            "school.state": "NY",
            "school.alias": "NYTS",
            "id": 193894,
            "school.city": "New York",
            "school.operating": 1,
            "school.degrees_awarded.highest": 4,
            "school.ownership": 2
        },
        {
            "school.zip": "30331",
            "school.degrees_awarded.predominant_recoded": 3,
            "school.school_url": "www.carver.edu",
            "school.tuition_revenue_per_fte": 9969,
            "school.name": "Carver Bible College",
            "school.state": "GA",
            "school.alias": "Carver College",
            "id": 139287,
            "school.city": "Atlanta",
            "school.operating": 0,
            "school.degrees_awarded.highest": 3,
            "school.ownership": 2
        },
        {
            "school.zip": "33634",
            "school.degrees_awarded.predominant_recoded": 3,
            "school.school_url": "www.strayer.edu/florida/tampa-westshore",
            "school.tuition_revenue_per_fte": 15030,
            "school.name": "Strayer University-Florida",
            "school.state": "FL",
            "id": 449038,
            "school.city": "Tampa",
            "school.operating": 1,
            "school.degrees_awarded.highest": 4,
            "school.ownership": 3,
            "school.alias": null
        },
        {
            "school.zip": "19713",
            "school.degrees_awarded.predominant_recoded": 3,
            "school.school_url": "www.strayer.edu/delaware/christiana",
            "school.tuition_revenue_per_fte": 14330,
            "school.name": "Strayer University-Delaware",
            "school.state": "DE",
            "id": 450298,
            "school.city": "Newark",
            "school.operating": 1,
            "school.degrees_awarded.highest": 4,
            "school.ownership": 3,
            "school.alias": null
        },
        {
            "school.zip": "06437-2319",
            "school.degrees_awarded.predominant_recoded": 1,
            "school.school_url": "www.teachbeauty.com",
            "school.tuition_revenue_per_fte": 11682,
            "school.name": "European Academy of Cosmetology and Hairdressing",
            "school.state": "CT",
            "school.alias": "Teach Hairdressing Academy |Teach Academy",
            "id": 457332,
            "school.city": "Guilford",
            "school.operating": 1,
            "school.degrees_awarded.highest": 1,
            "school.ownership": 3
        }
    ]
}
;

var metadata;
var results;

const apiKey = 'IA9StnuBLlQbthBjT7d8FY2DgO4i5waOLePBR0rq';


// app.get('/api/members', function(req, res){
//     res.json(members);
// });








app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});
app.use(express.json());  // this parses the transferred json in between
app.use(express.urlencoded({extended: false}));


// var request = require('request');

// request({url: 'https://api.data.gov/ed/collegescorecard/v1/schools?id=193894&fields=school.name,id&api_key=IA9StnuBLlQbthBjT7d8FY2DgO4i5waOLePBR0rq', 
// json: true}, function(err, res, json) {
//   if (err) {
//     throw err;
//   }
//   colleges = json;
//   console.log(colleges);
// });



// main GET
app.route('/api/colleges').get(function(req, res){
    
     let all = req.query.all;

     let name = req.query.name;
     let id = req.query.id;
     let zip = req.query.zip;
     let schoolUrl = req.query.schoolUrl;
     let state = req.query.state;
     let city = req.query.city;
     let alias = req.query.alias;

     let tuitionRevenueFte = req.query.tuitionRevenueFte;
     
     let tu_gt = req.query.tu_gt;
     let tu_lt = req.query.tu_lt;

     let operating = req.query.operating;
     let ownership = req.query.ownership;
     let highestDegreeAwarded = req.query.highestDegreeAwarded;
     let predominantDegreeAwarded = req.query.predominantDegreeAwarded;
     
     let results = colleges.results; 

     
    if(parseInt(all) === 1) {  // send all colleges, no filters
        res.send(results);
    }

    else {   // send back filtered results
        var originalSize = results.length;
    if(name) {
        var a = name.split(','); //returns list of comma separated names
        
        // retrieves any college that has a name that exists in the comma separated query
        if(a.length > 1) {
            results = results.filter((e) => {
                if(a.includes(e["school.name"])) {
                    return true;
                }
            });
        }

        else if(a.length === 1) {
            results = results.filter((e) => {
                if(e["school.name"].includes(a[0])) return true;
            });
        }
     }
   

    if(id) {
        var a = id.split(',');
        if(a.length > 1){
            results = results.filter((e) => {
            
                if(a.includes(e["id"].toString())) {
                    return true;
                }
                
            });
        }
        else if(a.length == 1) {
            results = results.filter((e) => {
            
                if(e["id"] === parseInt(a[0])) return true;
            });
        }
    }


    if(zip) {  
        var a = zip.split(','); //returns list of comma separated zip codes
        
        // retrieves any college that has a zip that exists in the comma separated query
        if(a.length > 1) {
            results = results.filter((e) => {
                if(a.includes(e["school.zip"])) {
                    return true;
                }
            });
        }
        else if(a.length === 1) {
            results = results.filter((e) => {
                if(e["school.zip"].includes(a[0])) return true;
            });
        }

    }
    if(schoolUrl) {  
        
        results = results.filter((e) => {
            if(e["school.school_url"].includes(schoolUrl)) return true;
        });
    }

    if(state ) {
        var a = state.split(','); //returns list of comma separated states
        
        // retrieves any college that has a state that exists in the array a
        if(a.length > 1) {
            results = results.filter((e) => {
                if(a.includes(e["school.state"])) {
                    return true;
                }
            });
        }
        else if(a.length === 1) {
            results = results.filter((e) => {
                if(e["school.state"].includes(a[0])) return true;
            });
        }
        
    }

    if(city ) {  
        var a = city.split(','); //returns list of comma separated states
        
        // retrieves any college that has a state that exists in the array a
        if(a.length > 1) {
            results = results.filter((e) => {
                if(a.includes(e["school.city"])) {
                    return true;
                }
            });
        }
        else if(a.length === 1) {
            results = results.filter((e) => {
                if(e["school.city"].includes(a[0])) return true;
            });
        }
        
    }


    if(alias) {  
                
        results = results.filter((e) => {
            if(e["school.alias"].includes(alias) ) return true;
        });
    }
    if(operating) {  // e is element coming from the colleges.result
        results = results.filter((e) => {
            if(e["school.operating"] === parseInt(operating) ) return true;
        });
    }
    if(ownership ) {  
        var a = ownership.split(','); //returns list of comma separated states
        
        // retrieves any college that has a state that exists in the array a
        if(a.length > 1) {
            results = results.filter((e) => {
                if(a.includes(e["school.ownership"].toString())) {
                    return true;
                }
            });
        }
        else if(a.length === 1) {
            results = results.filter((e) => {
                if(e["school.ownership"] == a[0]) return true;
            });
        }
      
    }
    if(tuitionRevenueFte ) {
        console.log('tuition is engaged');
        if(tu_gt || tu_lt){
            if(tu_gt){
                results = results.filter(
                    (e)=> {
                        if(e["school.tuition_revenue_per_fte"] > parseInt(tu_gt)) {
                            return true;
                        }
                    });
            }
            if(tu_lt) {
                results = results.filter(
                    (e)=> {
                        if(e["school.tuition_revenue_per_fte"] < parseInt(tu_lt)) {
                            return true;
                        }
                    });
            }
        }
        else {
            results = results.filter((e) => {
                if(e["school.tuition_revenue_per_fte"] === parseInt(tuitionRevenueFte) ) return true;
            });
        }
        
    }


    if(predominantDegreeAwarded ) {  
        
        var a = predominantDegreeAwarded.split(','); 
        
        
        if(a.length > 1) {
            results = results.filter((e) => {
                if(a.includes(e["school.degrees_awarded.predominant_recoded"].toString())) {
                    return true;
                }
            });
        }
        else if(a.length === 1) {
            results = results.filter((e) => {
                if(e["school.degrees_awarded.predominant_recoded"] == a[0]) return true;
            });
        }

    }


    if(highestDegreeAwarded ) {  
        var a = highestDegreeAwarded.split(','); 
        
        
        if(a.length > 1) {
            results = results.filter((e) => {
                if(a.includes(e["school.degrees_awarded.highest"].toString())) {
                    return true;
                }
            });
        }
        else if(a.length === 1) {
            results = results.filter((e) => {
                if(e["school.degrees_awarded.highest"] == a[0]) return true;
            });
        }

    }

    if(results.length < originalSize){
         res.send(results);
    }
    else if(results.length >= originalSize ){
        console.log('no results were filtered, an empty object was returned');
        res.send([{}]);
    }
   
    
   }    
});

// app.route('/api/colleges/:id').get( (req, res) => {
// 	const college = colleges.find(c => c.id === parseInt(req.params.id));
// 	if(!college) { res.status(404).send('User not found');}
// 	res.send(college);
// });

// filtering by name
app.route('/api/colleges/:name').get((req, res) => {
    const requestedCollegeName = req.params['name'];
    const result = colleges.results.filter( (element) => {
    if(element['school.name'] === requestedCollegeName) {
        return true;
    }
    });
    res.send(result);
});





app.route('/api/post').post((req, res) => {
    res.send(201, req.body)
  });
app.route('/api/post/email').post((req, res) => {
    const output = `
        <h3>You have got a Message From Angular Website!</h3>
        <p>
            from: ${req.body.from}
            name: ${req.body.name}
            phone: ${req.body.phone}
        </p>
        <hr>
        <h3> Message : </h3>
        <p> ${req.body.content}</p>
        <hr>
    `;

      // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:  587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'xariosf117@gmail.com', // generated ethereal user
      pass: '110v3my1am60-LP500' // generated ethereal password
    },
    tls : { rejectUnauthorized: false}
  });

  // send mail with defined transport object
   transporter.sendMail({
    from: '"NodeMailer" <xariosf117@gmail.com>', // sender address
    to: "haideralrustem@yahoo.com", // list of receivers
    subject: "Node Connect", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  }, (err, success) => {
    if (err) {
        console.log(err);
    }
});

  
 
});

//   app.use(express.static(path.join(__dirname, 'dist', 'my-website')));

//   app.get('/', (req, res) => {
//       res.sendFile(path.join(__dirname, 'dist', 'my-website', 'index.html'));
//   });
 



app.listen(PORT, ()=> console.log('Server is running'));