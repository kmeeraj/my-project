import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { MatCheckboxModule,  MatIcon} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DndModule} from 'ng2-dnd';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import { CovalentCommonModule, CovalentLayoutModule, CovalentMediaModule, CovalentExpansionPanelModule,
  CovalentStepsModule, CovalentLoadingModule, CovalentDialogsModule, CovalentSearchModule, CovalentPagingModule,
  CovalentNotificationsModule, CovalentMenuModule, CovalentDataTableModule, CovalentMessageModule } from '@covalent/core';

import { MatButtonModule, MatListModule, MatCardModule, MatMenuModule, MatInputModule, MatButtonToggleModule, MatIconModule,
  MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatDialogModule, MatSnackBarModule, MatToolbarModule,
  MatTabsModule, MatSidenavModule, MatTooltipModule, MatRippleModule, MatRadioModule, MatGridListModule,
  MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatAutocompleteModule } from '@angular/material';
import { SvgwidgetComponent } from './svgwidget/svgwidget.component';
import { SystemwidgetComponent } from './systemwidget/systemwidget.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SvgwidgetComponent,
    SystemwidgetComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    CommonModule,
    RouterModule,    
    /** Material Modules */
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatTooltipModule,
    MatRippleModule,
    MatRadioModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatAutocompleteModule,
    /** Covalent Modules */
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule,
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    BrowserModule,
    DndModule.forRoot(),
    HttpClientModule
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
