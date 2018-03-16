
import { routerTransition } from '../../router.animations';
import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import * as html2canvas from "html2canvas";
import {HttpServiceService} from '../../http-service.service'
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()],
    providers:[HttpServiceService]
})
export class ChartsComponent implements OnInit {
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012'
    ];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];

    // Doughnut
    public doughnutChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail-Order Sales'
    ];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string = 'doughnut';

    // Radar
    public radarChartLabels: string[] = [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
    ];
    public radarChartData: any = [
        { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
    ];
    public radarChartType: string = 'radar';

    // Pie
    public pieChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales'
    ];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: string = 'pie';

    // PolarArea
    public polarAreaChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales',
        'Telesales',
        'Corporate Sales'
    ];
    public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend: boolean = true;

    public polarAreaChartType: string = 'polarArea';

    // lineChart
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }



    ngOnInit() {}

    ///////////////////////////////////////////////////////////////////////


    private url = 'http://localhost:8081';
    private socket;
    private h2ol="";

    private drawing=false;
    private current={color:'black',x:0,y:0};
    private context;
    private canvas;

    constructor(private elem: ElementRef,private ren:Renderer2,private  http:HttpServiceService) {
        this.socket = io(this.url);
        //  this.socket.on('drawing', this.onDrawingEvent);

        this.getData() .subscribe((data) => {
            this.drawLine(data.x0 , data.y0 , data.x1 , data.y1 , data.color,false);
        });
    }

    ngAfterViewInit(){
        this.canvas = this.elem.nativeElement.querySelector('.whiteboard');
        let colors=this.elem.nativeElement.querySelectorAll('.color');
        this.context = this.canvas.getContext('2d');


    }



    drawLine(x0, y0, x1, y1, color, emit){
        this.context.beginPath();
        this.context.moveTo(x0-250, y0-150);
        this.context.lineTo(x1-250, y1-150);
        this.context.strokeStyle = 'green';
        this.context.lineWidth = 1;
        this.context.stroke();
        this.context.closePath();
        console.log(x1-250,y1-130,x0-250,y0-130);

        if (!emit) { return; }
        var w =  this.canvas.width;
        var h =  this.canvas.height;

        this.socket.emit('drawing', {
            x0: x0 ,
            y0: y0,
            x1: x1 ,
            y1: y1,
            color: 'blue'
        });

    }

    onMouseDown(e){
        this.drawing = true;
        this.current.x = e.clientX;
        this.current.y = e.clientY;
        console.log("d");
    }

    onMouseUp(e){
        console.log("u");
        if (!this.drawing) { return; }
        this.drawing = false;
        this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);

    }

    onMouseMove(e){
        console.log("m");
        if (!this.drawing) { return; }
        this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
        this.current.x = e.clientX;
        this.current.y = e.clientY;

    }
    throttle(callback, delay) {
        let previousCall = new Date().getTime();
        return function() {
            var time = new Date().getTime();

            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };}

    onDrawingEvent(data){
        console.log(data);
        // let w = this.canvas.width;
        //let h = this.canvas.height;

    }
    private getData = () =>
    {
        return Observable.create((observer) => {
            this.socket.on('drawing', (data) => {
                observer.next(data);
            });
        });
    }
    private capture()
    {
        html2canvas(document.querySelector("#capture") ).then(canvas => {
            var imgData = canvas.toDataURL("image/png");
            var image = imgData.replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
            // window.location.href=image;
            //document.body.appendChild(canvas);
            this.saveData(imgData);
            this.h2ol=imgData;
            console.log(imgData);

        });
    }
    private saveData(data)
    {
        this.http.saveIMG(data,Date.now()).subscribe(
            post => {
                if(post.response == "Image uploaded successfully") {
                       console.log("horray");
                }
            },
            error => { console.log(error)}



        );
    }

}
