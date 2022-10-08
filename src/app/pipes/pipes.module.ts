import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicturemodelPipe } from './picturemodel.pipe';



@NgModule({
  declarations: [

    PicturemodelPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PicturemodelPipe
  ]
})
export class PipesModule { }
