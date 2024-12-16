import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-rxjs';

  ngOnInit(): void {
      this.firstObservable();
  }

  /**
   * Un Observable es un stream de datos que dejamos abierto para recibir información de forma asíncrona.
   * Esto permite que estos datos que recibimos de forma asíncronza (llamada a una API externa, servicio, etc.)
   * se procesen sin parar la aplicación. De esta manera, cuando obtengamos esta información, nuestro Observable
   * recibirá estos datos y, sin hacer nada, actualizará los valores en pantalla o donde sea necesaria esta información.
   */
  firstObservable() {
    const observer = {
      // Callback que se ejecuta cuando recibimos un dato
      next: value => console.log('Callback next', value),
      error: error => console.log('Callback error', error),
      // Se ejecuta cuando cerramos el stream del observable
      complete: () => console.log('Observable completado'),
    };

    // Creamos un observable que lanza una serie de callback
    const observable = new Observable(subscriber => {
      subscriber.next('Hola');
      subscriber.next('Hola observable...');
      subscriber.complete();
      // En el momento que se llama a complete(), el observable se cierra y el observable ya no envían datos
      subscriber.next('Qué pasa tras completar...');
    });

    // Es necesario suscribirse al observable para que empiece la ejecución, aunque más correcta
    observable.subscribe(observer);

    // La manera más común de suscribirse a observables es esta
    observable.subscribe(
      value => console.log('Callback next', value),
      error => console.log('Callback error', error),
      // El complete aquí no se suele utilizar
      () => console.log('Observable completado'),
    );
  }
}
