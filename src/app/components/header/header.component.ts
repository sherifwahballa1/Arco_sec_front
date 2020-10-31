import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/authentication/auth.service';
import { HelperService } from '../../core/services/helper.service';
import { ArcosecService } from '../../core/services/arcosec.service';
import { TokenService } from '../../core/authentication/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username = '';
  isloggedIn: boolean;

  constructor(
    private authService: AuthService,
    private helper: HelperService,
    private arcoService: ArcosecService,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {

    if (this.tokenService.token) {
      this.isloggedIn = true;
      this.arcoService.getProfile().subscribe(data => {
        this.username = data['name'].toString();
      }, err => {
        this.helper.alert(err + ' try again after 1 hour', true);
      });
    }

  }

  logout() {
    this.authService.logout();
  }

}
