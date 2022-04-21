import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AuthService } from 'src/app/services/auth.service';
import { login } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLoginButtonClick = (email: string, password: string) => {
    this.store.dispatch(login({email,password}))
  }

  onButtonClick = () => {
    this.authService.getAccessToken()
  }

}
