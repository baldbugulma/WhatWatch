import {Component, inject} from '@angular/core';
import {WwInputComponent} from '../../../common-ui/components/ww-input/ww-input.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../data-access/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    WwInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService: AuthService = inject(AuthService);

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  onLogin(){
    this.form.markAllAsTouched()
    if(this.form.valid){
      this.authService.login(this.form.value)
        .subscribe((res) => console.log(res))
    }
  }
}
