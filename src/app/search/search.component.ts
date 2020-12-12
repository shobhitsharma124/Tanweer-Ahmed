import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit,OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {

  @Input() tabVal: number = 0;

 

  displayedColumns: string[] = ['sno','name','city','package','tpreference','mobile'];
  dataSource;

  constructor(private http:HttpClient) { 
    
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges(){
    if(this.tabVal==3 || this.tabVal==2){
      
      let respo = this.http.get("http://localhost:3000/appointment");
      respo.subscribe((data) => {

        this.dataSource = new MatTableDataSource(data as any);
    });
    }
  }

  searchMaleT(){
    let respo = this.http.get("http://localhost:3000/appointment?tpreference=Male+Trainee");
      respo.subscribe((data) => {

        this.dataSource = new MatTableDataSource(data as any);
    });

  }



  searchFemaleT(){
    let respo = this.http.get("http://localhost:3000/appointment?tpreference=Female+Trainee");
    respo.subscribe((data) => {

      this.dataSource = new MatTableDataSource(data as any);
  });

  }


  searchComplete(){
    let respo = this.http.get("http://localhost:3000/appointment");
    respo.subscribe((data) => {

      this.dataSource = new MatTableDataSource(data as any); });
  }

  ngOnInit(): void {
    
      
    
    
  }

}
