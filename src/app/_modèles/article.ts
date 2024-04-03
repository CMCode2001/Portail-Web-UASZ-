import { typeArticle } from "./typeArticle";
export enum categorie{
    Actualite="Actualite",Evenement="Evenement",Opportunité="Opportunité"
}
export class article{
    idArt: number;
    visible: boolean;
    description: string;
    datepub: string;
    titre: string;
    typeArticle: typeArticle ;//Categories
    imageCouverture: string;
    archive: boolean;
    
}