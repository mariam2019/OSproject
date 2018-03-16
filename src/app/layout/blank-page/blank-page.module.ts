import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import {CanvasWhiteboardModule} from 'ng2-canvas-whiteboard';

import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {

    ChatComponent
} from '../dashboard/components';

@NgModule({
    imports: [CommonModule, BlankPageRoutingModule,
        CanvasWhiteboardModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        FormsModule, ReactiveFormsModule],
    declarations: [BlankPageComponent,
        ChatComponent]
})
export class BlankPageModule {}
