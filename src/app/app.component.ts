import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogin = false;

  // sound = new Howl({
  //   src: ['/assets/game-of-thrones-t.mp3'],
  //   autoplay: true,
  //   loop: true
  // });

  constructor(private route: ActivatedRoute, private router: Router) {

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/login') {
          this.isLogin = false;
        } else if (e.url.includes('/verify')) {
          this.isLogin = false;
        } else if (e.url === '/forget') {
          this.isLogin = false;
        } else {
          this.isLogin = true;
        }
      }
    });
  }

  ngOnInit() {
  }
}
