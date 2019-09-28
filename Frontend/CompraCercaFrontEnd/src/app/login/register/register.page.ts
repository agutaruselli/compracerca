import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthenticationService,
              public toastController: ToastController,
              public alertController: AlertController,
              public menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.registerForm = this.formBuilder.group({
      username : [null, Validators.required],
      password : [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });
  }

  /*onFormSubmit(form: NgForm) {
    this.authService.register(form)
      .subscribe(_ => {
        this.presentAlert('Register Successfully', 'Please login with your new username and password');
      }, (err) => {
        console.log(err);
      });
  }*/

  onFormSubmit(form: NgForm) {
      this.presentAlert('Register Successfully', 'Please login with your new username and password');
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
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
