import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  fromDate:any;
  toDate:any;
  reportData:any;
  reportDetails:any[]=[];
  reportDates:any[]=[];
  showTable: boolean = false;
  suboperationalDetails: any;
  constructor(private reportService: ReportsService) { }

  ngOnInit(): void {
  }


  getReportData(){
    if(this.fromDate && this.toDate){
      const format = 'yyyy-MM-dd';
      const locale = 'en-US';
      this.fromDate = (formatDate(this.fromDate, format, locale));
      this.toDate = (formatDate(this.toDate, format, locale));
      console.log(this.fromDate+' '+this.toDate);
      this.reportService.getData().subscribe(res =>{
        this.reportData = res;
        this.reportData = this.reportData['sizewise']
        this.reportData['seascusdetails'].filter((e:any) => {
          e.linedetails.filter((ee:any)=>{
            ee.suboperationdetails.filter((sub:any)=>{
              sub.createddate.filter((d:any)=>{
                if(d.createddate >= this.fromDate && d.createddate <= this.toDate){
                  sub.createddate = d
                  ee.suboperationdetails = []
                  ee.suboperationdetails.push(sub);
                  this.suboperationalDetails = ee.suboperationdetails
                  e.linedetails = []
                  e.linedetails.push(ee);
                  this.reportDetails.push(e);
                  this.reportDates.push(d);
                }
              })
            })
          })
        })
        this.showTable = true
      })
     
    }
   
  }

}
