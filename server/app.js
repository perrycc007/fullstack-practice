const express = require('express')
const app = express();
const mysql = require('mysql')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const {PrismaClient} = require('@prisma/client')
const auth = require('./middleware/auth')


const prisma = new PrismaClient()

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'ChowPakHei07',
    database: 'profile',
    insecureAuth : true

})



  app.patch("/changepassword", auth, async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const updateUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: password,
      },
    })
    if (updateUser.status == 200);
      res.json({updateUser})
    })

  app.post("/login", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const result = await prisma.user.findFirst({
      where: {
        email: email,
        password: password
      },
    })
    if (result.status == 200);
      const user = result.id
      const accessToken = generateAccessToken(user)
      res.json({ accessToken: accessToken, userID: user})
  });

  function generateAccessToken(email) {
    return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
  }


  app.post("/signup", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const result = await prisma.user.create({
      data:  {
        email: email,
        name: 'perry',
        password: password
    }})
    if (result.status == 200);
      const user = result.id
      const accessToken = generateAccessToken(user)
      res.json({ accessToken: accessToken})
    // console.log(result)
    res.json({result})
    });


  app.post("/apply", async(req, res) => {
    const content = req.body.content;
    const createdAt = req.body.createdAt;
    const title = req.body.title;
    const authorId = parseInt(req.body.authorId);
    const result = await prisma.post.create({
        data: {
            content: content,
            createdAt: createdAt,
            title: title,
            authorid: authorId
            // authorid: 5 
        },
      }
    )
    console.log(result)
    res.json({result})
    });


app.get("/profile/:userid", async(req, res) => {
  const userid = parseInt(req.params.userid);
  const result = await prisma.profile.findUnique({
  where: {
    userid: userid ,
  },
})  
  if (result.status == 200);
  console.log(result)
  res.json({ result})
})
    

app.patch("/profile", async(req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const acceptedterms = req.body.acceptedterms;
  const jobtype = req.body.jobtype;
  const userid = req.body.userid;
  const result = await prisma.profile.updateMany({
      where: {
        userid: userid,
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        acceptedterms: acceptedterms,
        jobtype:jobtype,
        userid:userid
      },
    }
  }
  )
  console.log(result)
  res.json({result})
  });
    


app.post("/profile", async(req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const acceptedterms = req.body.acceptedterms;
  const jobtype = req.body.jobtype;
  const userid = req.body.userid;
  const result = await prisma.profile.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        acceptedterms: acceptedterms,
        jobtype:jobtype,
        userid:userid
      },
    }
  )
  console.log(result)
  res.json({result})
  });

  app.post("/favourite", async(req, res) => {
    const caseid = parseInt(req.body.caseid);
    const userid = parseInt(req.body.userid);
    const result = await prisma.favourite.create({
        data: {
          caseid:caseid,
          userid:userid,
        },
      }
    )
    console.log(result)
    res.json({result})
    });
 
    app.get("/favourite", async(req, res) => {
      const userid = parseInt(req.body.userid);
      const result = await prisma.favourite.findMany({
        where: {
          userid: 5,
          },
          select: {
            caseid: true,
          }
        }
      )
      console.log(result)
      res.json({result})
      });
   

    app.delete("/favourite", async(req, res) => {
      const caseid = parseInt(req.body.caseid);
      const userid = req.body.userid;
      const result = await prisma.favourite.delete({
          where: {
            caseid:caseid,
            userid:userid
          },
        }
      )
      console.log(result)
      res.json({result})
      });

  app.get("/case", async(req, res) => {
    // const authorid = parseInt(req.params.userid)

    const result = await prisma.post.findMany({
        skip: parseInt(req.query.skip),
        take: parseInt(req.query.limit),
        // where: {
        //   caseid: 10 ,
        // },
        orderBy: {
          title: 'asc',
        },
  })  
  const count = await prisma.post.count({
    where: {
      authorid: 5 ,
    },
})  
    if (result.status == 200 && res.status == 200);{
        req.query.completed === 'true'
        console.log(result)
        console.log(count)
        res.json({count, result  })}
  })

app.listen(3001, () => {
    console.log('connected')
})