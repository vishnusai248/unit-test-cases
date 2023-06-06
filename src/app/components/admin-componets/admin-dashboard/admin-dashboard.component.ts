import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Event } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import Swal from 'sweetalert2';
import { EditscreensComponent } from '../editscreens/editscreens.component';
import { SharedServiceService } from 'src/app/services/shared-service.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  searchedName: string = '';
  employeeList: any = [];
  pageNumber:any=0;
  isGridView = false;
  isListView=true;
  pageSize :any; // Set the number of items to display per page
  totalLength:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ActiveStatus: boolean = true;


  constructor(private dialog: MatDialog, private adminservice:AdminserviceService,public sharedservice:SharedServiceService) {
    
    if(this.isListView){
      this.pageSize=5
    }
    else if(this.isGridView) {
      this.pageSize=6

    }
  }
  ngOnInit(): void {
    // this.goToPage(1);
    this.getUsers()
    this.sharedservice.loggedin();
    //prevent page to go back once loggedin
    window.history.pushState(null, '', window.location.href);

    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, '', window.location.href);
    });
  }

  
 

  getUsers(){
    this.adminservice.getAllUsers(this.pageNumber,this.pageSize,this.searchedName).subscribe((response:any) => {
      this.employeeList=response.Employees
      this.totalLength=response.EmployeesCount
      
    });
  }
  searchChange(event: any) {
    
      this.adminservice.getAllUsers(this.pageNumber,this.pageSize,this.searchedName).subscribe((response:any) => {
      
        this.employeeList=response.Employees
        this.totalLength=response.EmployeesCount

      });



  }

  editAccess(employeedata: any) {
    this.dialog.open(EditscreensComponent, {
      autoFocus: false,
      minHeight: '185px',
      minWidth: '100px',
      maxHeight: '400px',
      maxWidth: '500px',
      data: employeedata
    });
  }
  deleteUser(templateRef: TemplateRef<any>, user: any) {
   
    
    this.dialog.open(templateRef, {
      autoFocus: false,
      minHeight: '209px',
      minWidth: '200px',
      maxHeight: '400px',
      maxWidth: '700px',
      data: user
    });
  }
  



  // dummyarray = [
  //   { name: 'vishnu ', email: 'vishnusai.poili@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'Sai Podili', email: 'vishnusai.poili@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'Vishnu Sai ', email: 'vishnusai.poili@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'Podili', email: 'vishnusai.poili@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'Sruthi', email: 'vishnusai.poili@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'Rishith', email: 'vishnusai.poili@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'NEHA', email: 'neha.@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'Mounika', email: 'vishnusai.poili@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'Saritha', email: 'vishnusai.poili@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'Rk', email: 'vishnusai.poili@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'Pavan', email: 'vishnusai.poili@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'Harish', email: 'vishnusai.poili@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'Mahesh', email: 'vishnusai.poili@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
  //   { name: 'NEHA', email: 'neha.@archents.com', mobile: '8688476418', code: 'IARC0329', Designition: 'Trainee' },
    
    
  // ]
  

  toggleViewMode(value:any) {
    console.log(value)
    if (value == "list") { 
      this.isListView=true
      this.isGridView=false
      this.pageSize=5
      this.pageNumber=0
    }
    else{
      this.isListView=false;
      this.isGridView=true;
      this.pageSize=6
      this.pageNumber=0
    }
    this.adminservice.getAllUsers(this.pageNumber,this.pageSize,this.searchedName).subscribe((response:any) => {
      
      this.employeeList=response.Employees
      this.totalLength=response.EmployeesCount

    });




    // const startIndex = this.currentPage * this.pageSize;
    // const endIndex = startIndex + this.pageSize;
    // this.slicedArray = this.dummyarray.slice(startIndex, endIndex);
    // this.totalLength=this.dummyarray.length

    // this.isGridView = !this.isGridView;
    // this.isListView=!this.isListView;
  }


  // for pagination


  onPageChange(event: PageEvent) {
    console.log("event:",event)
    this.pageNumber=event.pageIndex,
    this.pageSize=event.pageSize,

    this.adminservice.getAllUsers(this.pageNumber,this.pageSize,this.searchedName).subscribe((response:any) => {
      
      this.employeeList=response.Employees
      this.totalLength=response.EmployeesCount

    });


  }

  onToggleChange(event:any,data:any){
    let obj={
      employeeID :data.employeeID,
      status :this.ActiveStatus
    }
    this.adminservice.statusToggle(obj).subscribe(response => {
      if(this.ActiveStatus==true){
        Swal.fire('Success!',"user Activated Successful",'success')
      }
      else if((this.ActiveStatus==false)){
        Swal.fire('Success!',"user Deactivated Successful",'success')
      }
      this.getUsers()
    });
    
    // this.ActiveStatus = !this.ActiveStatus;
   }
 
   actionsclick(data:any){
      this.ActiveStatus=data.isActive
   }




}
