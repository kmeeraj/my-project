import { Component, OnInit,Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-svgwidget',
  templateUrl: './svgwidget.component.html',
  styleUrls: ['./svgwidget.component.css']
})
export class SvgwidgetComponent implements OnInit {

  @Input() data: any;
  shade:string;
  numberOfShades:number;
  displayShades:any;
  colors : string[];
  DBcolors : string[];
  sanitizer: DomSanitizer;
  dat:any;
  constructor(private sanitize: DomSanitizer, private route : ActivatedRoute,
    private r : Router) {
    this.sanitizer = sanitize
   }

   getBackground(color) {     
    return this.sanitizer.bypassSecurityTrustStyle(`fill:${color};fill-opacity:1;`);
  }


  getMapperY(mapper){
    return ((mapper.to.y + mapper.from.y )/2)+mapper.delta;  
  }

  getMapperX(mapper){
   return (mapper.from.x /2)+mapper.delta; 
  }

  getArc(mapper){
    
    var d = "M"+(mapper.to.x ) +","+(mapper.to.y )+ "  C"+(mapper.to.x+mapper.delta)+","+(mapper.to.y-mapper.delta)+ " " + (mapper.from.x+mapper.delta )+ "," +( mapper.from.y-mapper.delta ) + " " + (mapper.from.x) + "," + (mapper.from.y) ;
    console.log(d);
    console.log(mapper.to.x,mapper.to.y);
    return  d;
   
  }

  expand(database){
    if(database.expand){
      database.expand=false;
    }else{
      database.expand = true;
    }
    console.log(database);
  }
  
  paramsChanged(id) {
    console.log(id);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paramsChanged(params['id']);
    });
    this.DBcolors=["Tomato","SteelBlue","SlateGrey","Silver","SeaGreen","Red","Orchid","Olive","MidnightBlue","Maroon","Indigo","HotPink"];
    this.colors=["lime","orange","AliceBlue","Tan","Aqua","Cyan","Bisque","Goldenrod","Turquoise","Thistle","Cornsilk","Gold"];
    var variant = this.data["systems"].length; 
    
    
    var angle = 360/variant;
    
    var counter = 0;
    var startAngle = 0;
    var endAngle = 0;

    var sectorAngleArr = [];

    for (var i = 0; i < variant; i++) {      
      sectorAngleArr.push(angle);
    }

    for (var i = 0; i < variant; i++) {
      var system = this.data["systems"][i];    
      system["color"]=this.colors[Math.floor(Math.random()*12)];      
      this.colors.slice(system["color"],1);
      system["dShade"]=this.numberOfShades;            
      startAngle = endAngle;
      endAngle = startAngle + eval(sectorAngleArr[i]);
      // Check if the angle is over 180deg for large angle flag
      var percent = endAngle - startAngle;
      var overHalf = 0;
      if (percent > 180) {
        overHalf = 1;
      }
      system["startAngle"]=startAngle;
      system["endAngle"]=endAngle;
      system["percent"]=percent;
      // Super fun math for calculating x and y positions
      var x1 = 250 + 250 * Math.cos(Math.PI * startAngle / 180);
      var y1 = 250 + 250 * Math.sin(Math.PI * startAngle / 180);
  
      var x2 = 250 + 250 * Math.cos(Math.PI * endAngle / 180);
      var y2 = 250 + 250 * Math.sin(Math.PI * endAngle / 180);
  
      var d = "M250,250  L" + x1 + "," + y1 + "  A250,250 0 " + overHalf + ",1 " + x2 + "," + y2 + " z";
      system["x1"]=x1;
      system["y1"]=y1;
      system["x2"]=x2;
      system["y2"]=y2;
      if(system["endAngle"] <= 180){
        system["centerX"]=(x1+x2)/2  ;
        system["centerY"]=(y1+y2)/2 - 200 ;
      }else{
        system["centerX"]=(x1+x2)/2 ;
        system["centerY"]=(y1+y2)/2 + 200;
      }

      system["overHalf"]=overHalf;
      system["d"]=d;
      this.drawDB(system);
      this.dat=system.databases;
    }
   
    
  }

  drawDB(system) {
    var variant = system["databases"].length;
    var x1= system["x1"];
    var y1= system["y1"];
    var x2= system["x2"];
    var y2= system["y2"];
    var deltaX = (x2 - x1 )/ variant;
    var deltaY = (y2 - y1 )/ variant;
    
    for (var i = 0; i < variant; i++) {
      var database = system["databases"][i];
      var radius = 20;
      var y =0;
      var x = 0;
      if(system["endAngle"] <= 180){
        y = y1 - 100- radius;
        x = x1 + (i* deltaX) -(4*radius);  
      }else{
        y = y1 + 100+radius;
        x = x1 + (i* deltaX) + (4* radius);  
      }
      
  
      database["x"]=x;
      database["y"]=y;
      for ( let tab of database.info){
        tab["x"]=database["x"];
        tab["y"]=database["y"];
      }

      database["color"]=this.DBcolors[Math.floor(Math.random()*12)];      
    }
  }

}
