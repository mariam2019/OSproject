import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {HttpServiceService} from '../../../http-service.service'
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers:[HttpServiceService]
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';

    constructor(private translate: TranslateService, public router: Router,private  http:HttpServiceService) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        this.getimages();
    }

    ngOnInit() {}

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    loaded=false;
    private screenshots:[{data, date}];

    getimages()
    {
        this.http.loadIMG().subscribe(
            post => {
                console.log(post.error);
                if(post.error==-1)
                {
                    try
                    {this.screenshots.push(post.message);}
                    catch (e){console.log(e);}
                    console.log(post.message);
                    //   console.log(screenshots[i].date);
                    //this.loaded=true;
                }
                else console.log("error",post.message.data)
            },
            error => { console.log(error)}



        );
    }
    closeResult: string;
    open(content) {
        // this.modalService.open(content).result.then((result) => {
        //     this.closeResult = `Closed with: ${result}`;
        // }, (reason) => {
        //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        // });
    }

    private getDismissReason(reason: any) {
        // if (reason === ModalDismissReasons.ESC) {
        //     return 'by pressing ESC';
        // } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        //     return 'by clicking on a backdrop';
        // } else {
        //     return  `with: ${reason}`;
        // }
    }
}
