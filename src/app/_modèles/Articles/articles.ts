// Enum pour le type d'article
enum TypeArticle {
    Actualite = 'actualite',
    Evenement = 'evenement',
    Opportunite = 'opportunite'
  }

  // Modèle Article
  export class Article {
    idArt: number;
    visible: boolean;
    description: string;
    date_pub: Date;
    titre: string;
    typeArticle: TypeArticle;
    imageCouverture: string;
    archive: boolean;

  }
