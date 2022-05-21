// Utilisation de multer pour enregistrer les fichiers images
const multer = require('multer');

// Modification de l'extension des fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/bmp': 'bmp'
};

const storage = multer.diskStorage({
    // Enregistrement dans le dossier "images"
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // Génération du nom du fichier : nom d'origine + numero unique + . + extension
    filename: (req, file, callback) => {
        const brut = file.originalname;
        name = brut.split('.').slice(0, -1).join('.');
        finalName = name.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, finalName + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');
// //_______________________Configuration du middleware Multer______________//
// // Importation de "multer" pour gérer les requêtes http avec un envoi de fichier image
// const multer = require('multer');

// // Une constante pour gérer le dictionnaire de MimeTypes
// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png',
//   'image/gif': 'gif',
//   'image/webp': 'webp',
//   'image/bmp': 'bmp'
// };

// // Pour gérer la destination du fichier image,son nom, la taille du fichier et de son nom et pour envoyer un message d'erreur 
// const storage = multer.diskStorage({
//   // la destination du stockage du fichier
//   destination: (req, file, callback) => {
//     callback(null, 'images');
//   },
//   filename: (req, file, callback) => {
//     //suppression des espaces dans les noms des fichiers images
//     //const name = file.originalname.split(' ').join('_');
//     const extension = MIME_TYPES[file.mimetype];
//     //nommage du fichier dans le dossier de destination (date + format du fichier)
//     callback(null, `${Date.now()}.${extension}`);
//   },
//   fileFilter: (req, file, callback) => {
//     if (file.mimetype === ('image/jpg' || 'image/jpeg' || 'image/png' || 'image/gif' || 'image/webp' || 'image/bmp')) {
//       callback(null, true);
//     } else {
//       callback(new multer.MulterError("le format du fichier n'est pas accepté (jpg, jpeg, png, gif, webp, bmp)"));
//     }
//   }
// })

// // exportation du middleware multer
// module.exports = multer({
//   storage: storage,
//   limits: { 
//     // le frontend ne permet pas encore d'afficher un message d'erreur mais la taille des photos est limitée à 650 * 650
//     fileSize: 650 * 350
//   },
// }).single('image');