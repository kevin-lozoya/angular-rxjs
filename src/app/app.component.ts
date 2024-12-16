import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PublicService } from './public/public.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  characters: any[] = [];
  continents: any[] = [];

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.getCharacters();
    this.getContinents();
  }

  getCharacters() {
    this.publicService.getCharacters().subscribe(
      response => this.characters = response,
      error => console.log(error),
    );
  }

  getContinents() {
    this.publicService.getContinents().subscribe(
      response => this.continents = response,
      error => console.log(error),
    );
  }

  /**
   * Un Observable es un stream de datos que dejamos abierto para recibir información de forma asíncrona.
   * Esto permite que estos datos que recibimos de forma asíncronza (llamada a una API externa, servicio, etc.)
   * se procesen sin parar la aplicación. De esta manera, cuando obtengamos esta información, nuestro Observable
   * recibirá estos datos y, sin hacer nada, actualizará los valores en pantalla o donde sea necesaria esta información.
   */
  firstObservable() {
    const observable = new Observable(subscriber => {
      let count = 0;

      setInterval(() => {
        subscriber.next(count);
        count++;
      }, 1000)
    });

    console.log('Antes de ejecutar el observable...');
    // Creamos un observable que lanza una serie de callback
    // La manera más común de suscribirse a observables es esta
    const subscription = observable.subscribe(
      value => console.log('Callback next', value),
      error => console.log('Callback error', error),
      // El complete aquí no se suele utilizar
      () => console.log('Observable completado'),
    );
    console.log('Después de ejecutar el observable...');

    // Cerrar la suscripción para liberar los recursos que está utilizando el Observable
    setTimeout(() => {
      subscription.unsubscribe();
    }, 3500);
  }
}
