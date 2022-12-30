import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { HttpClientModule } from '@angular/common/http';
import { SelectFieldsComponent } from './select-fields/select-fields.component';
import { SelectFieldsColorComponent } from './select-fields-color/select-fields-color.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogBoxEditComponent } from './dialog-box-edit/dialog-box-edit.component';
import {MatIconModule} from '@angular/material/icon';
import { SelectYearComponent } from './select-year/select-year.component';
import { SelectCapacityComponent } from './select-capacity/select-capacity.component';
import { SelectPriceComponent } from './select-price/select-price.component';


@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    SelectFieldsComponent,
    SelectFieldsColorComponent,
    DialogBoxComponent,
    DialogBoxEditComponent,
    SelectYearComponent,
    SelectCapacityComponent,
    SelectPriceComponent,

  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class AppModule {}
