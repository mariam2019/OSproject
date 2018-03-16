import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    private password="";
    private email="";
    private wrong=false;
    constructor(public router: Router) {}

    ngOnInit() {}

    onLoggedin() {
        this.wrong=false;
        if(this.email=="mariam@gmail.com"&&this.password=="mirna") {
            this.router.navigate(['/home/dashboard']);
            localStorage.setItem('isLoggedin', 'true');
        }
        else this.wrong=true;
    }
}
