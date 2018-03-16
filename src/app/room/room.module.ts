import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';

@NgModule({
  imports: [
    CommonModule,
    RoomRoutingModule
  ],
  declarations: [RoomComponent]
})
export class RoomModule { }
