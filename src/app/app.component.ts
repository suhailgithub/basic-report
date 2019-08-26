import { Component } from '@angular/core';
import { Model, TodoItem,LRGReport } from './model';
import { HttpClient} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-todo',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PIM LRG reports';
  public reportsPerPage = 4;
  public selectedPage =1;
  model = new Model();
  
  constructor(private  http:HttpClient) {
	  this.http.get('assets/deployment_runs.txt', { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
		var splitData = data.split(/\n/);
		for(var i=splitData.length-1; i >=0; i--){
			console.log(splitData[i] + " " + i);
			if(splitData[i]){
			var reportDate = splitData[i].split("_lrg_");
			this.model.lrg_reports.push(new LRGReport(reportDate[0],reportDate[1],splitData[i]));	
			}
			
		}
		
      });
  }
    getName() {
        return this.model.admin;
    }
    getTodoItems() {
		
        return this.model.items.filter(item => !item.done);
    }
	
	getLrgReports(){
		return this.model.lrg_reports;
	}
	
	getSpecificLrgReports(inputRelease){
		console.log(inputRelease);
		let reportList = this.getLrgReports();
		let pageIndex = (this.selectedPage -1) * this.reportsPerPage;
		console.log("page Index " +pageIndex);
		console.log("second index " +  Number(pageIndex) + Number(this.reportsPerPage));
		this.changePage(1);
		if(inputRelease == null || inputRelease ==''){
			return reportList.filter(reportList=>reportList.release!="").splice(pageIndex, this.reportsPerPage);
		}
		return reportList.filter(reportList=>reportList.release==inputRelease).splice(pageIndex, this.reportsPerPage);
	}

    changePage(newPage : number){
		this.selectedPage = newPage;
		//getSpecificLrgReports(inputRelease);
	}
	
	changePageSize(newSize : number){
		this.reportsPerPage = Number(newSize);
		this.changePage(1);
	}
	
	getPageNumbers():number[]{
		if(inputRelease == null || inputRelease ==''){
			return Array(Math.ceil(this.getLrgReports().length / this.reportsPerPage)).fill(0).map((x, i) => i + 1);
		}else{
			return Array(Math.ceil((this.getLrgReports().filter(reportList=>reportList.release==inputRelease)).length / this.reportsPerPage)).fill(0).map((x, i) => i + 1);
		}
			
	}
}
