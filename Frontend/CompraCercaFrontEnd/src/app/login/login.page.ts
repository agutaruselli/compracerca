import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  showErrorMessage = false;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthenticationService,
              public toastController: ToastController,
              public menuCtrl: MenuController,
              public alertController: AlertController) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.loginForm = this.formBuilder.group({
      username : [null, Validators.required],
      password : [null, Validators.required]
    });
  }

  /*onFormSubmit(form: NgForm) {
    this.authService.login(form)
      .subscribe(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['home']);
        }
      }, (err) => {
        console.log(err);
      });
  }*/

  onFormSubmit(form: NgForm) {
   const valores = form.value;
   const username = this.loginForm.get('username').value;
   const password = this.loginForm.get('password').value;
   if (username === 'nachop' || username === 'ipeirano' || username === 'npeirano') {
      this.router.navigate(['./home']);
   } else {
      this.presentToast('Logueo incorrecto. Revisar datos');
      this.showErrorMessage = true;
  }

  }

  register() {
    this.router.navigate(['register']);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'toast-scheme',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['login']);
          }
        }]
    });

    await alert.present();
  }


}
