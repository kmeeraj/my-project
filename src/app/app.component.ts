import { Component, ChangeDetectorRef, NgZone, ViewContainerRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TdMediaService, TdDialogService } from '@covalent/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data={};
  list=[];
  
  logListEvent = function(action, index, external, type) {
    var message = external ? 'External ' : '';
    message += type + ' element was ' + action + ' position ' + index;
    console.log(message);
  };

  logEvent = function(message) {
    console.log(message);
  };

  getBackground = function(color){
      return this.sanitize.bypassSecurityTrustStyle("background:"+color);
  }

  addTo($event: any,database:any,system:any,table:any) {
    console.log(database);
    console.log($event.dragData);
    console.log(table);
    console.log($event.dragData.table);
    if($event.dragData.database == table.database && $event.dragData.system == table.system){
        console.log("error");
        this.openAlert();
    }else{
        database.tables.push($event.dragData.table);
        var sys = this.data["systems"];
        var dat = {
        "system":system.name,
        "database":database.name,
        "table":$event.dragData.table};
        database.info.push(dat);
        var counter = 0;     
        for(let m of this.data["mapping"] ){
            if( ($event.dragData.database == m.from.database || $event.dragData.database == m.to.database )
                 && ( $event.dragData.system ==  m.from.system || $event.dragData.system == m.to.system )){
                    counter++;
            }

        }
        var map ={
            "from" :$event.dragData,
            "to" : table,
            "text": "Tranfered data from "+$event.dragData.table+" to "+table.table,
            "delta": (counter * 20)
        }
        this.data["mapping"].push(map);
    }
    
    this.chRef.detectChanges();
    this.zone.run(() => { this.data = this.data } );
    
    console.log(this.data);
    
  }

  onOpen = function(database){
      database.expand=true;
  }

  updateData = function(){
     for(let system of this.data.systems){
         for(let db of system.databases){
            db["info"]=[];
             for(let table of db.tables){
                let temp = {
                    "system":system.name,
                    "database":db.name,
                    "table":table                    
                }
                db["info"].push(temp);  
                db["expand"]=false;              
            }
         }
     }
  };

  openAlert = function() {
    this._dialogService.openAlert({
      message: 'Cannot transfer table within same database.',
      disableClose: false, // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Alert', //OPTIONAL, hides if not provided
      closeButton: 'Close', //OPTIONAL, defaults to 'CLOSE'
      width: '400px', //OPTIONAL, defaults to 400px
    });
  }

  constructor(public media: TdMediaService,private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer, private chRef: ChangeDetectorRef, private zone : NgZone,
    private _dialogService: TdDialogService, private _viewContainerRef: ViewContainerRef, private sanitize: DomSanitizer) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
    this.list= [
        {listName: "A", items: [
            { "label":"item A1","selected": false},{"label":"item A3"},{"label":"item A3"},{"label":"item A4"}], dragging: false},
        {listName: "B", items: [
            {"label":"item B1","selected": false},{"label":"item B2"},{"label":"item B3"},{"label":"item B4"}], dragging: false}
      ];
  
    this.data={
      "mapping":[],
      "systems": [{
              "name": "System1",
              "type": "Hadoop",
              "databases": [{
                      "name": "ties",
                      "tables": ["emp", "salary", "Mustang"]
                  },
                  {
                      "name": "qgpt",
                      "tables": ["abc", "xyz", "lmn"]
                  },
                  {
                      "name": "rto",
                      "tables": ["animals", "birds"]
                  }
              ]
          },
  
          {
              "name": "System2",
              "type": "Teradata",
              "databases": [{
                      "name": "ties",
                      "tables": ["emp", "salary", "Mustang"]
                  },
                  {
                      "name": "qgpt",
                      "tables": ["abc", "xyz", "lmn"]
                  },
                  {
                      "name": "rto",
                      "tables": ["animals", "birds"]
                  }
              ]
          }
      ]
    };
    this.updateData();
    }

    
}
