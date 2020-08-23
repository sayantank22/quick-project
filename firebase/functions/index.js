const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail'); //sendgrid library to send emails
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const app = require('express')();
var bodyParser = require('body-parser');
const { uuid } = require('uuidv4');
const cors = require('cors');

dotenv.config();

//sendgrid api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

admin.initializeApp({
  // credential: admin.credential.cert(require('../key/admin.json')),
  // databaseURL: 'https://testproject-257115.firebaseio.com',
});

var firebaseConfig = {
  apiKey: 'AIzaSyA5O1Mu8to1qOPLhAyNGqzPVypIVLxZXvM',
  authDomain: 'testproject-257115.firebaseapp.com',
  databaseURL: 'https://testproject-257115.firebaseio.com',
  projectId: 'testproject-257115',
  storageBucket: 'testproject-257115.appspot.com',
  messagingSenderId: '784435269874',
  appId: '1:784435269874:web:4b02be00dc4128c285c06b',
};

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

const sendMail = (req, res) => {
  console.log(req.body);

  //Get Variables from query string in the search bar
  // const { recipient, sender, topic, text } = req.body;

  //Sendgrid Data Requirements
  //   const msg = {
  //     to: 'sayantank22@gmail.com',
  //     from: 'karmakarbarun22@gmail.com',
  //     subject: 'Test',
  //     text: 'Hey, it worked!',
  //   };

  const msg = {
    to: req.body.recipient,
    from: req.body.sender,
    subject: req.body.topic,
    text: req.body.text,
  };

  //Send Email
  sgMail
    .send(msg)
    .then((res) => {
      if (res.statusCode === 202) {
        return res.json({ message: 'Email sent successfully' });
      }
    })
    .catch((err) => console.log(err));
};

// get user details
const getUserDetails = (req, res) => {
  db.collection('Users')
    .get()
    .then((data) => {
      users = [];
      data.forEach((doc) => {
        users.push({
          userId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(users);
    })
    .catch((err) => console.error(err));
};

// get user
const getUser = (req, res) => {
  db.doc(`Users/${req.params.userId}`)
    .get()
    .then((user) => {
      if (!user.exists) {
        return res.status(404).json({ error: 'Scream not found' });
      }

      // console.log(user.data());

      const userData = {
        firstName: user.data().firstName,
        lastName: user.data().lastName,
        email: user.data().email,
        displayPicture: user.data().displayPicture,
        isEdited: user.data().isEdited,
      };

      return res.json(userData);
    })
    .catch((err) => console.log(err));
};

// create user
const createUser = (req, res) => {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    displayPicture: '',
    isEdited: false,
  };

  db.collection('Users')
    .add(userData)
    .then((doc) => {
      db.doc(`Users/${doc.id}`).update({ userId: doc.id });
      res.json({ message: `User created successfully!` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Something went wrong' });
      console.error(err);
    });
};

// update user
const updateUser = (req, res) => {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  db.doc(`/Users/${req.params.userId}`)
    .update(userData)
    .then(() => {
      return res.json({ message: 'User updated successfully' });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: error.code });
    });
};

// delete user
const deleteUser = (req, res) => {
  const document = db.doc(`/Users/${req.params.userId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'User not found' });
      } else {
        return document.delete();
      }

      // if (doc.data().userHandle !== req.user.handle) {
      //   return res.status(403).json({ error: 'Unauthorized' });
      // }
    })
    .then(() => {
      res.json({ message: 'User deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Upload a profile image for user
const uploadImage = (req, res) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  // String for image token
  let generatedToken = uuid();

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    // console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on('finish', () => {
    admin
      .storage()
      .bucket(firebaseConfig.storageBucket)
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        console.log(req.params.userId);
        // Append token to url ${req.params.userId}
        const displayPicture = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
        return db.doc(`/Users/${req.params.userId}`).update({ displayPicture });
      })
      .then(() => {
        return res.json({ message: 'Image uploaded successfully' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
      });
  });
  busboy.end(req.rawBody);
};

app.get('/users', getUserDetails);

app.get('/user/:userId', getUser);

app.post('/user', createUser);

app.post('/user/:userId', updateUser);

app.delete('/user/:userId', deleteUser);

app.post('/uploadImage/:userId', uploadImage);

app.post('/send-mail', sendMail);

exports.api = functions.https.onRequest(app);
