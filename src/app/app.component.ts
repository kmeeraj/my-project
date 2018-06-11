import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core';

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

  addTo($event: any,database:any,system:any) {
    console.log(database);
    console.log($event.dragData);
    database.tables.push($event.dragData.table);
    database.info.push({
        "system":system.name,
        "database":database.name,
        "table":$event.dragData.table});
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
            }
         }
     }
  };

  constructor(public media: TdMediaService,private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer) {
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
