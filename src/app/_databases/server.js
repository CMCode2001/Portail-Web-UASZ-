const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('partenairesDB.json');
const middlewares = jsonServer.defaults();
const multer  = require('multer');

// Définissez le répertoire de destination pour les fichiers téléchargés
const upload = multer({ dest: "uploads/" });

server.use(middlewares);

// Middleware pour le téléchargement de fichiers
server.post('/partenaires', upload.single('logoPart'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucun fichier téléchargé.');
  }
  // Traitez le fichier téléchargé ici, par exemple, enregistrez-le dans la base de données
  // Assurez-vous d'ajuster cette partie selon vos besoins
  // Une fois que vous avez traité le fichier, vous pouvez envoyer une réponse à votre client
  res.send('Fichier téléchargé avec succès.');
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
