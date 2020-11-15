import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FavCharacters } from '../models/fav-characters';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritesCollection: AngularFirestoreCollection<FavCharacters>
  
  constructor(private db: AngularFirestore) { 
    this.favoritesCollection = this.db.collection<FavCharacters>('favorites');
  }

  getFavorites(userId: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return this.favoritesCollection.ref.where('userId', '==', userId).get();
  }

  addFavorite(userId: string, characterId: number): Promise<void> {
    return this.getFavorites(userId).then((res) => {
      if (res.docs.length <= 0) {
        this.favoritesCollection.add({userId, favorites: [characterId]})
        .then((res) => {
          console.log(res.id);
        });
      } else {
        
        let newFavs = [...res.docs[0].get('favorites')];

        if ((res.docs[0].get('favorites') as Array<number>).includes(characterId)) {
          newFavs = newFavs.filter((fav) => fav !== characterId);
        } else {
          newFavs.push(characterId);
        }

        const favDoc: FavCharacters = {
          id: res.docs[0].id,
          userId: res.docs[0].get('userId'),
          favorites: newFavs,
        }

        this.favoritesCollection.doc<FavCharacters>(favDoc.id).update({
          userId: favDoc.userId,
          favorites: favDoc.favorites,
        });
      }
    });

  }

  getFavArray(userId: string): Array<number> {
    this.getFavorites(userId).then((res) => {
      console.log(res.docs.length)
      let favs = res.docs[0].get('favorites') as Array<number>;
      return favs;
  }).catch(err => console.log(err));
  return;
}

}
