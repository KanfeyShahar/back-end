const express = require("express");
require("./db/mongoose");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const bcrypt = require("bcryptjs");
const Store = require("./models/store.js");
const Resource=require("./models/name_room")
const Product = require("./models/product.js");
const Event = require("./models/event.js");
const Friend = require("./models/friend.js");
const Family = require("./models/family.js");
const FriendEvents = require("./models/friendsEvent.js");
const FamilyEvents = require("./models/familyEvent.js");
const Inventory = require("./models/inventory.js");
const Basket = require("./models/basket.js");
const Car = require("./models/cars.js");
const Equipment = require("./models/equipment.js");
const Movement = require("./models/movement_inventory.js");
const Rooms = require("./models/rooms.js");
const Hall = require("./models/hall.js");
const Order = require("./models/order.js");
const User = require("./models/user.js");
const Permission = require("./models/permissions.js");
const Counter = require("./models/counter.js");
const Counter1 = require("./models/inventory_count.js");
const axios = require("axios");
const bodyParser = require("body-parser");
const checkAuth = require('../src/middleware/check-auth')
const app = express();
const port = process.env.PORT || 5000;
const jwt =  require('jsonwebtoken');
const e = require("express");
const mongoose = require('mongoose')


require("dotenv").config();
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Authorization, Accept')
    res.setHeader('Access-Control-Allow-Methods','*')
    next()
})

// const String ="במבה אסם"
// var config1 = {
//   method: "POST",
//   url:"https://api.superget.co.il/?api_key=97ddb29a556ef7b1bbf3400b5a8b933d17419119&action=GetProductsByName&product_name="+encodeURI(String)+"&limit=1",
// };
// axios(config1).then((res)=>console.log(res.data))

// const String ="במבה אסם"
// var config1 = {
//   method: "POST",
//   url:"https://api.superget.co.il/?api_key=97ddb29a556ef7b1bbf3400b5a8b933d17419119&action=GetPriceByProductID&store_id=4&product_id=10000&limit=1",
// };
// axios(config1).then((res)=>console.log(res.data))

// var config2 = {
//   method: "POST",
//   url:"https://api.superget.co.il/?api_key=97ddb29a556ef7b1bbf3400b5a8b933d17419119&action=GetStoresByCityID&city_id=391",
// };
// axios(config2).then((res)=>{
//   res.data.forEach((p) => {
//     const product = new Store(p);
//     product.save();
//   })
// })

let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"canfeyshakhar@gmail.com",
        pass:"sapir1234",
    },
    tls:{
        rejectUnauthorized:false
    }

})



// let mailOptions = {
//     from :"knafeyshahar1@gmail.com",
//     to:"sapir7777@gmail.com",
//     subject:"מבחן",
//     text:"בהצלחה"
// }

// transporter.sendMail(mailOptions,function(err,success){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Email sent")
//     }
// })


app.post("/rooms", (req, res) => {
  req.body = {
    ...req.body,
    start: new Date(req.body.start).toString(),
    end: new Date(req.body.end).toString(),
  };

  const room = new Rooms(req.body);
  let dateStart = new Date(room.start).toISOString().replace(/T/, ' ').replace(/\..+/, '')  
  let dateEnd = new Date(room.end).toISOString().replace(/T/, ' ').replace(/\..+/, '') 
  const html =
`<style> body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; direction="rtl" } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; direction="rtl"} img { -ms-interpolation-mode: bicubic; direction="rtl" } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } div[style*="margin: 16px 0;"] { margin: 0 !important; } </style> <body style="background-color: #f7f5fa; margin: 0 !important; padding: 0 !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#426899" align="center"> <table border="0" cellpadding="0" cellspacing="0" width="480" > <tr> <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> <div style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">Canfey shahar</div> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#426899" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480" > <tr> <td bgcolor="#ffffff" align="left" valign="top" style="padding: 30px 30px 20px 30px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;"> <h1 style="font-size: 32px; font-weight: 400; margin: 0;">room</h1> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480" > <tr> <td bgcolor="#ffffff" align="left"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td colspan="2" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;"> <p>hello, Your order details: </p> </td> </tr>  <tr> <th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">date start</th> <td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">${dateStart}</td> </tr> <tr> <th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">date End</th> <td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">${dateEnd}</td> </tr> <tr> <th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">number</th><td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">${room.resourceId}</td></tr></table></td></tr> <tr><td bgcolor="#ffffff" align="center"><table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr><td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-top:1px solid #dddddd;"><table border="0" cellspacing="0" cellpadding="0"><tr><td align="left" style="border-radius: 3px;" bgcolor="#426899"><a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 2px; border: 1px solid #426899; display: inline-block;">address:hatishvi 122, haifa</a></td></tr></table></td></tr></table></td> </tr></table></td></tr><tr><td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480"><tr> <td bgcolor="#f4f4f4" align="left" style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" ><p style="margin: 0;">don't replay "<a href="https://company.de" target="_blank" style="color: #111111; font-weight: 700;"><a>".</p></td> </tr></td> </tr> </table></body>`
  let mailOptions = {
    from :"canfeyshakhar@gmail.com",
    to:room.email,
    subject:"אישור זימון חדר-כנפי שחר",
    html:html
}
  room
    .save()
    .then(() => {
        res.send("loaded successfuly room");
        // transporter.sendMail(mailOptions,function(err,success){
        //     if(err){
        //         console.log(err)
        //     }else{
        //         console.log("Email sent")
        //     }
        // })
  
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.post("/hall", (req, res) => {
  req.body = {
    ...req.body,
    start: new Date(req.body.start).toString(),
    end: new Date(req.body.end).toString(),
  };


  const hall = new Hall(req.body);
  let dateStart = new Date(hall.start).toISOString().replace(/T/, ' ').replace(/\..+/, '')  
  let dateEnd = new Date(hall.end).toISOString().replace(/T/, ' ').replace(/\..+/, '') 
  let html =
`<style> body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; direction:rtl ; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; direction:rtl;} img { -ms-interpolation-mode: bicubic; direction:rtl } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table {  border-collapse: collapse !important; direction:rtl !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } div[style*="margin: 16px 0;"] { margin: 0 !important; } </style> <body style="background-color: #f7f5fa; margin: 0 !important; padding: 0 !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#426899" align="center"> <table border="0" cellpadding="0" cellspacing="0" width="480" > <tr> <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> <div style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">כנפי שחר</div> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#426899" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480" > <tr> <td bgcolor="#ffffff" align="right" valign="top" style="padding: 30px 30px 20px 30px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;"> <h1 style="font-size: 32px; font-weight: 400; margin: 0;">שיריון אולם</h1> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480" > <tr> <td bgcolor="#ffffff" align="right"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td colspan="2" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;direction:rtl;"> <p>שלום ${hall.fullName} </p><p>פרטי ההזמנה שלך </p> </td> </tr>  <tr> <th align="right" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400;direction:rtl; line-height: 25px;">${dateStart}</th> <td align="right" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">התחלה</td> </tr> <tr> <th align="right" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">${dateEnd}</th> <td align="right" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">סיום</td> </tr> <tr> <th align="right" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">${hall.description}</th><td align="right" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">בקשות נוספות</td></tr></table></td></tr> <tr><td bgcolor="#ffffff" align="center"><table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr><td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-top:1px solid #dddddd;"><table border="0" cellspacing="0" cellpadding="0"><tr><td align="left" style="border-radius: 3px;" bgcolor="#426899"><a href="#" target="_blank" style="font-size: 14px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 2px; border: 1px solid #426899; display: inline-block;">התשבי 122 חיפה</a></td></tr></table></td></tr></table></td> </tr></table></td></tr><tr><td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480"><tr> <td bgcolor="#f4f4f4" align="right" style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" ><p style="margin: 0;">נא לא לשלוח מייל חוזר "<a href="https://company.de" target="_blank" style="color: #111111; font-weight: 700;"><a>".</p></td> </tr></td> </tr> </table></body>`
  let mailOptions = {
    from :"canfeyshakhar@gmail.com",
    to:hall.email,
    subject:"אישור שיריון אולם-כנפי שחר",
    html: html
}
  hall
    .save()
    .then(() => {
      res.send("loaded successfuly hall");
    //   transporter.sendMail(mailOptions,function(err,success){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log("Email sent")
    //     }
    // })
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.post("/order", (req, res) => {
  const order = new Order(req.body);

  order
    .save()
    .then(() => {
      res.send("loaded successfuly order");
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.post("/resource", (req, res) => {
  const order = new Resource(req.body);

  order
    .save()
    .then(() => {
      res.send("loaded successfuly order");
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.post("/permissions", (req, res) => {
  const permission = new Permission(req.body);

  permission
    .save()
    .then(() => {
      res.send("loaded successfuly permission");
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.post("/list_market", (req, res) => {
 let List=req.body
let String=List.map((e)=>e.itemName)
 console.log(String)
 for (let i = 0; i <String.length; i++) {
  var config1 = {
    method: "POST",
    url:"https://api.superget.co.il/?api_key=97ddb29a556ef7b1bbf3400b5a8b933d17419119&action=GetProductsByName&product_name="+encodeURI(String[i])+"&limit=5",
  };
  axios(config1).then((res)=>console.log(res.data))
 }
console.log(List)

});

app.post("/user_login", async (req, res, next) => {
   await User.find({ email: req.body[0].email })
      .exec()
      .then( user => {
        if (user.length < 1) {
            return  res.status(500).send({error:'that email not found',statusCode:500})

        }
         bcrypt.compare(req.body[0].password, user[0].password, (err, result) => {
             console.log(result)
          if (err) {
            return  res.status(500).send({error:'that email not found',statusCode:500})

          }
          if (result) {
              console.log(result)
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0].id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "10h"
              }
            );
            return res.status(200).json({token:token, userId:user[0].id}) 
          }
          console.log("err")
          res.status(500).send({error:'that email not found',statusCode:500})
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({error:'that email not found',statusCode:500})
      });
  });







// app.post("/user_login", (req, res, next) => {
// let new_user=req.body[0]
// // const salt = await bcrypt.genSalt(12);
//  User.findOne({ email: req.body[0].email }).exec()
//     .then( async(user) =>{
//         if(user.length<1){
//           console.log("first")
//             return  res.status(500).send({error:'that email not found',statusCode:500})
            
//         }
//         let result=false
//         // let passwordHash  = await bcrypt.hash(new_user.password, salt);
//         result = await bcrypt.compare(new_user.password,user.password)
//         console.log(new_user.password)
//         console.log(user.password)
//         console.log(result)
//        if(result){
           
//               console.log("succceded")
//                 const token =  jwt.sign(
//                   {
//                     email: user.email,
//                     userId: user.id
//                   },
//                   process.env.JWT_KEY,
//                   {
//                       expiresIn: "1h"
//                   }
//                 );
//                 return res.status(200).json({token:token,userId:user.id}) 
//         }
//         else{
//             return res.status(500).send({error:'that email not found',statusCode:500});
//         }
//     })
//     .catch((err) => {
//     console.log(err)
//       console.log(err);
//       return  res.status(500).send({error:'that email not found',statusCode:500});
//     });


// });

app.post("/user", async (req, res, next) => {
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (err) {
    const error = console.log("Could not create user, please try again", 500);
    return next(error);
  }

  const user = new User({ ...req.body, password: hashedPassword });
  let mailOptions = {
    from :"canfeyshakhar@gmail.com",
    to:req.body.email,
    subject:"הרשמה למערכת-כנפי שחר",
    html:`<h1>הרשמתך לאתר בוצעה בהצלחה, לעזרה פנה למנהל המערכת-אופיר</h1>`
}
  user
    .save()
    .then(() => {
      res.send("loaded successfuly user");
    //   transporter.sendMail(mailOptions,function(err,success){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log("Email sent")
    //     }
    // })
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.post("/equipment", (req, res) => {
  const equipment = new Equipment(req.body);

  equipment
    .save()
    .then(() => {
      res.send("loaded successfuly basket");
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.post("/movements", (req, res) => {
  const movement = new Movement(req.body);

  movement
    .save()
    .then(() => {
      res.send("loaded successfuly movements");
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.post("/basket", (req, res) => {
  const basket = new Basket(req.body);

  basket
    .save()
    .then(() => {
      res.send("loaded successfuly basket");
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});
app.post("/cars", (req, res) => {
  const car = new Car(req.body);

  car
    .save()
    .then(() => {
      res.send("loaded successfuly car");
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.post("/products", (req, res) => {
  const product = new Product(req.body);

  product
    .save()
    .then(() => {
      res.send("loaded successfuly");
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.post("/family", (req, res) => {
  const family = new Family(req.body);

  family
    .save()
    .then(() => {
      res.send("loaded successfuly");
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});


// app.post("/family", async (req, res) => {
//   const address1 = `${req.body.address}, ${req.body.city}`;
//   var config = {
//     method: "get",
//     url:
//       "https://api.geoapify.com/v1/geocode/search?text=" +
//       encodeURIComponent(address1) +
//       "&apiKey=166fff45b611468eb76e19c8297bcae6",
//     headers: {},
//   };
//   axios(config)
//     .then(function (response) {
//       const family = new Family({
//         ...req.body,
//         latitude: response.data.features[0].geometry.coordinates[1],
//         longitude: response.data.features[0].geometry.coordinates[0],
//       });
//       family
//         .save()
//         .then(() => {
//           res.send("loaded successfuly");
//         })
//         .catch((e) => {
//           res.send(`there is an error ${e}`);
//         });
//     })
//     .catch((e) => {
//       res.send("there is an error for family get");
//     });
// });

app.put("/update_family_address", (req, res) => {
  Family.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newFamily = await Family.findOne({ id: req.body.id });
      res.send(newFamily);
    })
    .catch((e) => {
      res.send(`there was an error updating the family with error  ${e}`);
    });
});



// app.put("/update_family_address", (req, res) => {
//   const address1 = `${req.body.address}, ${req.body.city}`;
//   var config = {
//     method: "get",
//     url:
//       "https://api.geoapify.com/v1/geocode/search?text=" +
//       encodeURIComponent(address1) +
//       "&apiKey=166fff45b611468eb76e19c8297bcae6",
//     headers: {},
//   };
//   axios(config)
//     .then(function (response) {
//       Family.findOneAndUpdate(
//         { id: req.body.id },
//         {
//           ...req.body,
//           latitude: response.data.features[0].properties.lat,
//           longitude: response.data.features[0].properties.lon,
//         }
//       )
//         .then(async () => {
//           let newFamily = await Family.findOne({ id: req.body.id });
//           res.send(newFamily);
//         })
//         .catch((e) => {
//           res.send(`there was an error updating the family with error  ${e}`);
//         });
//     })
//     .catch((e) => {
//       res.send("there is an error for family get");
//     });
// });

app.post("/inventory", (req, res) => {
  const inventory = new Inventory(req.body);

  inventory
    .save()
    .then(() => {
      res.send("loaded successfuly inventory");
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.post("/friends", (req, res) => {
  const friend = new Friend(req.body);
console.log(req.body)
  friend
    .save()
    .then(() => {
      res.send("loaded successfuly friend");
    })
    .catch((e) => {
      res.send(`there is an error ${e} friend`);
    });
});

app.post("/events", (req, res) => {
  const event = new Event(req.body);

  event
    .save()
    .then(() => {
      res.send("loaded successfuly event");
    })
    .catch((e) => {
      res.send(`there is an error ${e} event`);
    });
});

app.post("/counter", (req, res) => {
  const counter = new Counter(req.body);

  counter
    .save()
    .then(() => {
      res.send("loaded successfuly counter");
    })
    .catch((e) => {
      res.send(`there is an error ${e} counter`);
    });
});
app.post("/counter1", (req, res) => {
  const counter1 = new Counter1(req.body);

  counter1
    .save()
    .then(() => {
      res.send("loaded successfuly counter1");
    })
    .catch((e) => {
      res.send(`there is an error ${e} counter1`);
    });
});

app.post("/friends_events", (req, res) => {
  const friend_event = new FriendEvents(req.body);

  friend_event
    .save()
    .then(() => {
      res.send("loaded successfuly event-friend");
    })
    .catch((e) => {
      res.send(`there is an error ${e} event-friend`);
    });
});

app.post("/family_events", (req, res) => {
  const family_event = new FamilyEvents(req.body);

  family_event
    .save()
    .then(() => {
      res.send("loaded successfuly event-family");
    })
    .catch((e) => {
      res.send(`there is an error ${e} event-family`);
    });
});

app.post("/upload_all_products", (req, res) => {
  data = req.body;

  for (let i = 0; i < data.length; i++) {
    setTimeout(() => {
      const p = {
        code: data[i].ItemCode,
        name: data[i].ItemName,
        productNote: data[i].ManufacturerItemDescription,
        manufacture: data[i].ManufacturerName,
        type: data[i].UnitQty,
        size: data[i].UnitOfMeasure,
        price: data[i].ItemPrice,
      };

      const product = new Product(p);

      product.save();
    }, 100);
  }

  res.send("the loading finished successfuly");
});

app.delete("/delete_rooms", (req, res) => {
  Rooms.findOneAndDelete({ id: req.body.id })
    .then(() => {
      res.send();
    })
    .catch((e) => {
      res.send(`there was an error delete${e}`);
    });
});

app.delete("/delete_hall", (req, res) => {

  Hall.findOneAndDelete({ id: req.body.id })
    .then(() => {
      res.send();
    })
    .catch((e) => {
      res.send(`there was an error hall${e}`);
    });
});

app.delete("/delete_friend_event", (req, res) => {
  FriendEvents.findOneAndDelete({ id: req.body.id })
    .then(() => {
      res.send();
    })
    .catch((e) => {
      res.send(`there was an error delete${e}`);
    });
});

app.delete("/delete_family_event", (req, res) => {
  FamilyEvents.findOneAndDelete({ id: req.body.id })
    .then(() => {
      res.send();
    })
    .catch((e) => {
      res.send(`there was an error delete family event${e}`);
    });
});

app.delete("/delete_inventory", (req, res) => {
  Inventory.findOneAndDelete({ id: req.body.id })
    .then(() => {
      res.send();
    })
    .catch((e) => {
      res.send(`there was an error delete Inventory${e}`);
    });
});

app.put("/update_car", (req, res) => {
  Car.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newCar = await Car.findOne({ id: req.body.id });
      res.send(newCar);
    })
    .catch((e) => {
      res.send(`there was an error updating the product with error ${e}`);
    });
});

app.put("/update_order", (req, res) => {
  Order.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newOrder = await Order.findOne({ id: req.body.id });
      res.send(newOrder);
    })
    .catch((e) => {
      res.send(`there was an error updating the product with error ${e}`);
    });
});

app.put("/update_resource", (req, res) => {
  Resource.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newOrder = await Resource.findOne({ id: req.body.id });
      res.send(newOrder);
    })
    .catch((e) => {
      res.send(`there was an error updating the product with error ${e}`);
    });
});

app.put("/update_order1", (req, res) => {
  console.log(req.body);
  Order.findOneAndUpdate(
    ({ id: req.body.id, "items.id": req.body.items.id }, req.body.items)
  )
    .then(async () => {
      let newOrder = await Order.findOne({ id: req.body.id });
      res.send(newOrder);
    })
    .catch((e) => {
      res.send(`there was an error updating the product with error ${e}`);
    });
});

app.put("/update_equipmet", (req, res) => {
  Equipment.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newCar = await Equipment.findOne({ id: req.body.id });
      res.send(newCar);
    })
    .catch((e) => {
      res.send(`there was an error updating the product with error ${e}`);
    });
});

app.put("/update_product", (req, res) => {
  Product.findOneAndUpdate({ code: req.body.code }, req.body)
    .then(async () => {
      let newProduct = await Product.findOne({ code: req.body.code });
      res.send(newProduct);
    })
    .catch((e) => {
      res.send(`there was an error updating the product with error ${e}`);
    });
});

app.put("/update_inventory", (req, res) => {
  Inventory.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newInventory = await Inventory.findOne({ id: req.body.id });
      res.send(newInventory);
    })
    .catch((e) => {
      res.send(`there was an error updating the inventory with error ${e}`);
    });
});
app.put("/update_friend_event", (req, res) => {
  FriendEvents.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newFriendEvents = await FriendEvents.findOne({ id: req.body.id });
      res.send(newFriendEvents);
    })
    .catch((e) => {
      res.send(`there was an error updating the product with error ${e}`);
    });
});

app.put("/update_family_event", (req, res) => {
  FamilyEvents.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newFamilyEvents = await FamilyEvents.findOne({ id: req.body.id });
      res.send(newFamilyEvents);
    })
    .catch((e) => {
      res.send(`there was an error updating the family with error ${e}`);
    });
});

app.put("/update_friend", (req, res) => {
  Friend.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newFriend = await Friend.findOne({ id: req.body.id });
      res.send(newFriend);
    })
    .catch((e) => {
      res.send(`there was an error updating the product with error ${e}`);
    });
});

app.put("/update_basket", (req, res) => {
  Basket.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newBasket = await Basket.findOne({ id: req.body.id });
      res.send(newBasket);
    })
    .catch((e) => {
      res.send(`there was an error updating the basket with error ${e}`);
    });
});
app.put("/update_family", (req, res) => {
  Family.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newFamily = await Family.findOne({ id: req.body.id });
      res.send(newFamily);
    })
    .catch((e) => {
      res.send(`there was an error updating the family with error  ${e}`);
    });
});
app.put("/update_rooms", (req, res) => {

    let dateStart = new Date(req.body.start).toISOString().replace(/T/, ' ').replace(/\..+/, '')  
    let dateEnd = new Date(req.body.end).toISOString().replace(/T/, ' ').replace(/\..+/, '') 
    const html =
  `<style> body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; direction="rtl" } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; direction="rtl"} img { -ms-interpolation-mode: bicubic; direction="rtl" } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } div[style*="margin: 16px 0;"] { margin: 0 !important; } </style> <body style="background-color: #f7f5fa; margin: 0 !important; padding: 0 !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#426899" align="center"> <table border="0" cellpadding="0" cellspacing="0" width="480" > <tr> <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> <div style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">knafey shahar</div> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#426899" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480" > <tr> <td bgcolor="#ffffff" align="left" valign="top" style="padding: 30px 30px 20px 30px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;"> <h1 style="font-size: 32px; font-weight: 400; margin: 0;">room</h1> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480" > <tr> <td bgcolor="#ffffff" align="left"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td colspan="2" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;"> <p>hello, Your order details: </p> </td> </tr>  <tr> <th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">date start</th> <td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">${dateStart}</td> </tr> <tr> <th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">date End</th> <td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">${dateEnd}</td> </tr> <tr> <th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">number</th><td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">${req.body.resourceId}</td></tr></table></td></tr> <tr><td bgcolor="#ffffff" align="center"><table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr><td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-top:1px solid #dddddd;"><table border="0" cellspacing="0" cellpadding="0"><tr><td align="left" style="border-radius: 3px;" bgcolor="#426899"><a href="#" target="_blank" style="font-size: 14px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 2px; border: 1px solid #426899; display: inline-block;">address:hatishvi 122, haifa</a></td></tr></table></td></tr></table></td> </tr></table></td></tr><tr><td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480"><tr> <td bgcolor="#f4f4f4" align="left" style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" ><p style="margin: 0;">don't replay "<a href="https://company.de" target="_blank" style="color: #111111; font-weight: 700;"><a>".</p></td> </tr></td> </tr> </table></body>`
    let mailOptions = {
      from :"canfeyshakhar@gmail.com",
      to:req.body.email,
      subject:"עדכון זימון חדר-כנפי שחר",
      html:html
  }

    
  Rooms.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newRooms = await Rooms.findOne({ id: req.body.id });
      res.send(newRooms);
    //   transporter.sendMail(mailOptions,function(err,success){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log("Email sent")
    //     }
    // })
    })
    .catch((e) => {
      res.send(`there was an error updating the family with error  ${e}`);
    });
});
app.put("/update_hall", (req, res) => {
    let dateStart = new Date(req.body.start).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    let dateEnd = new Date(req.body.end).toISOString().replace(/T/, ' ').replace(/\..+/, ''); 
    let html =
    `<style> body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; direction:rtl ; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; direction:rtl;} img { -ms-interpolation-mode: bicubic; direction:rtl } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table {  border-collapse: collapse !important; direction:rtl !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } div[style*="margin: 16px 0;"] { margin: 0 !important; } </style> <body style="background-color: #f7f5fa; margin: 0 !important; padding: 0 !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#426899" align="center"> <table border="0" cellpadding="0" cellspacing="0" width="480" > <tr> <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> <div style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">כנפי שחר</div> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#426899" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480" > <tr> <td bgcolor="#ffffff" align="right" valign="top" style="padding: 30px 30px 20px 30px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;"> <h1 style="font-size: 32px; font-weight: 400; margin: 0;">שיריון אולם</h1> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480" > <tr> <td bgcolor="#ffffff" align="right"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td colspan="2" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;direction:rtl;"> <p>שלום ${req.body.fullName} </p><p>פרטי ההזמנה שלך </p> </td> </tr>  <tr> <th align="right" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400;direction:rtl; line-height: 25px;">${dateStart}</th> <td align="right" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">התחלה</td> </tr> <tr> <th align="right" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">${dateEnd}</th> <td align="right" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">סיום</td> </tr> <tr> <th align="right" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">${req.body.description}</th><td align="right" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">בקשות נוספות</td></tr></table></td></tr> <tr><td bgcolor="#ffffff" align="center"><table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr><td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-top:1px solid #dddddd;"><table border="0" cellspacing="0" cellpadding="0"><tr><td align="left" style="border-radius: 3px;" bgcolor="#426899"><a href="#" target="_blank" style="font-size: 14px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 2px; border: 1px solid #426899; display: inline-block;">התשבי 122 חיפה</a></td></tr></table></td></tr></table></td> </tr></table></td></tr><tr><td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480"><tr> <td bgcolor="#f4f4f4" align="right" style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" ><p style="margin: 0;">נא לא לשלוח מייל חוזר "<a href="https://company.de" target="_blank" style="color: #111111; font-weight: 700;"><a>".</p></td> </tr></td> </tr> </table></body>`
  
    let mailOptions = {
        from :"canfeyshakhar@gmail.com",
        to:req.body.email,
        subject:"עדכון שיריון אולם-כנפי שחר",
        html: html
    }
    Hall.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newHalls = await Hall.findOne({ id: req.body.id });
      res.send(newHalls);
//      transporter.sendMail(mailOptions,function(err,success){
//      if(err){
//          console.log(err)
//      }else{
//          console.log("Email sent")
//      }
//  })
    })
    .catch((e) => {
      res.send(`there was an error updating the family with error  ${e}`);
    });
});

app.put("/update_counter", (req, res) => {
  Counter.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newCounter = await Counter.findOne({ id: req.body.id });
      res.send(newCounter);
    })
    .catch((e) => {
      res.send(`there was an error updating the event with error events ${e}`);
    });
});

app.put("/update_counter1", (req, res) => {
  Counter1.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newCounter1 = await Counter1.findOne({ id: req.body.id });
      res.send(newCounter1);
    })
    .catch((e) => {
      res.send(`there was an error updating the event with error events ${e}`);
    });
});

app.put("/update_event", (req, res) => {
  Event.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newEvent = await Event.findOne({ id: req.body.id });
      res.send(newEvent);
    })
    .catch((e) => {
      res.send(`there was an error updating the event with error events ${e}`);
    });
});

app.put("/update_user", async (req, res) => {
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (err) {
    const error = new HttpError("Could not create user, please try again", 500);
    return next(error);
  }

  User.findOneAndUpdate(
    { id: req.body.id },
    { ...req.body, password: hashedPassword }
  )
    .then(async () => {
      let newUser = await Event.findOne({ id: req.body.id });
      res.send(newUser);
    })
    .catch((e) => {
      res.send(`there was an error updating the event with error users ${e}`);
    });
});

app.put("/update_permissions", (req, res) => {
  Permission.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(async () => {
      let newPermission = await Permission.findOne({ id: req.body.id });
      res.send(newPermission);
    })
    .catch((e) => {
      res.send(
        `there was an error updating the event with error Permission ${e}`
      );
    });
});

app.get("/events", (req, res) => {
  console.log("events request was sent from the front end app");
  Event.find({})
    .then((events) => {
      res.send(events);
    })
    .catch((e) => {
      res.send(`there is an error ${e} events`);
    });
});

app.get("/stores", (req, res) => {
  console.log("events request was sent from the front end app");
  Store.find({})
    .then((store) => {
      res.send(store);
    })
    .catch((e) => {
      res.send(`there is an error ${e} events`);
    });
});

app.get("/products", (req, res) => {
  console.log("products request was sent from the front end app");
  Product.find({})
    .then((products) => {
      res.send(products);
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.get("/get_resource", (req, res) => {
  console.log("products request was sent from the front end app");
  Resource.find({})
    .then((products) => {
      res.send(products);
    })
    .catch((e) => {
      res.send(`there is an error ${e}`);
    });
});

app.get("/friends", (req, res) => {
  console.log("friends request was sent from the front end app");
  Friend.find({})
    .then((friends) => {
      res.send(friends);
    })
    .catch((e) => {
      res.send(`there is an error ${e} friends`);
    });
});

app.get("/family", (req, res) => {
  console.log("family request was sent from the front end app");
  Family.find({})
    .then((family) => {
      res.send(family);
    })
    .catch((e) => {
      res.send(`there is an error ${e} family`);
    });
});

app.get("/basket", (req, res) => {
  console.log("basket request was sent from the front end app");
  Basket.find({})
    .then((basket) => {
      res.send(basket);
    })
    .catch((e) => {
      res.send(`there is an error ${e} family`);
    });
});

app.get("/inventory", (req, res) => {
  console.log("inventory request was sent from the front end app");
  Inventory.find({})
    .then((inventory) => {
      res.send(inventory);
    })
    .catch((e) => {
      res.send(`there is an error ${e} inventory`);
    });
});

app.get("/friends_events", (req, res) => {
  console.log("friends events request was sent from the front end app");
  FriendEvents.find({})
    .then((friends_events) => {
      res.send(friends_events);
    })
    .catch((e) => {
      res.send(`there is an error ${e} friends`);
    });
});

app.get("/family_events", (req, res) => {
  console.log("family events request was sent from the front end app");
  FamilyEvents.find({})
    .then((family_events) => {
      res.send(family_events);
    })
    .catch((e) => {
      res.send(`there is an error ${e} family`);
    });
});

app.get("/cars", (req, res) => {
  console.log("cars events request was sent from the front end app");
  Car.find({})
    .then((cars) => {
      res.send(cars);
    })
    .catch((e) => {
      res.send(`there is an error ${e} cars`);
    });
});

app.get("/equipment", (req, res) => {
  console.log("equipment events request was sent from the front end app");
  Equipment.find({})
    .then((equipment) => {
      res.send(equipment);
    })
    .catch((e) => {
      res.send(`there is an error ${e} equipment`);
    });
});

app.get("/movements", (req, res) => {
  console.log("movements events request was sent from the front end app");
  Movement.find({})
    .then((movement) => {
      res.send(movement);
    })
    .catch((e) => {
      res.send(`there is an error ${e} movements`);
    });
});

app.get("/order", checkAuth ,(req, res) => {
  console.log("order events request was sent from the front end app");
  Order.find({})
    .then((order) => {
      res.send(order)
    })
    .catch((e) => {
      res.send(`there is an error ${e} order`);
    });
});

app.get("/rooms",(req, res) => {
  console.log("movements events request was sent from the front end app");
  Rooms.find({})
    .then((room) => {
      res.send(room);
    })
    .catch((e) => {
      res.send(`there is an error ${e} movements`);
    });
});




app.get("/hall",checkAuth, (req, res) => {
  console.log("movements events request was sent from the front end app");
  Hall.find({})
    .then((hall) => {
      res.send(hall);
    })
    .catch((e) => {
      res.send(`there is an error ${e} hall`);
    });
});

app.get("/user", (req, res) => {
  console.log("user request was sent from the front end app");
  User.find({})
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.send(`there is an error ${e} user`);
    });
});

app.get("/permissions", (req, res) => {
  console.log("permissions request was sent from the front end app");
  Permission.find({})
    .then((permissions) => {
      res.send(permissions);
    })
    .catch((e) => {
      res.send(`there is an error ${e} permissions`);
    });
});

app.get("/counter",(req, res) => {
  console.log("counter request was sent from the front end app");
  Counter.find({})
    .then((counter) => {
      res.send(counter);
    })
    .catch((e) => {
      res.send(`there is an error ${e} permissions`);
    });
});

app.get("/counter1",(req, res) => {
  console.log("counter1 request was sent from the front end app");
  Counter1.find({})
    .then((counter1) => {
      res.send(counter1);
    })
    .catch((e) => {
      res.send(`there is an error ${e} permissions`);
    });
});


mongoose.connect('mongodb+srv://KanfeyShahar:Kanfey123!@clusterkanfeyshahar0.3xwmo.mongodb.net/production-db?retryWrites=true&w=majority', {
    useNewUrlParser: true
})



app.listen(port, () => {
  console.log(`connected on port ${port}`);
});
