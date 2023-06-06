import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editscreens',
  templateUrl: './editscreens.component.html',
  styleUrls: ['./editscreens.component.css']
})
export class EditscreensComponent implements OnInit {
  erroroccured: boolean = false;
  errormessege: any
  selectedscreens: any = [];
  screensArray: any = [];
  all_portals = [
    { name: 'greyt hr', display: false },
    { name: 'orange Hrm', display: false },
    { name: 'itms', display: false },
    { name: 'aciana git', display: false },
    { name: 'aciana jira', display: false },
    { name: 'archents jira', display: false },
    { name: 'dry sign', display: false },
    { name: 'aciana azure', display: false },
    { name: 'archents azure', display: false },
    { name: 'asiana aws', display: false },
    { name: 'archents aws', display: false },
    { name: 'adobe', display: false },
    { name: 'envato elements', display: false },
    { name: 'canva pro', display: false },
    { name: 'vimeo', display: false },
    { name: 'vy ond', display: false },
    { name: 'hr portal', display: false },
  ]
  constructor(private adminservice: AdminserviceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.fetchscreens(this.data)
    
  }


  checkboxchange(event: any, index: number) {
    this.all_portals[index].display = event.target.checked
  }

  submitscreens(id: any) {
    this.all_portals.forEach(el => {
      if (el.display == true) {
        this.selectedscreens.push(el.name)
      }
    })
   
    let requestObj = {
      employeeID: this.data.employeeID,
      screens: this.selectedscreens
    }
    this.dialog.closeAll();
    this.adminservice.submitScreens(requestObj).subscribe((data) => {
      if (data) {

        Swal.fire('Success!', "user screens updated successfuly", 'success')

      }
    }, (error) => {
      this.erroroccured = true
      this.errormessege = error.error.errors;
      // Swal.fire('Error!', error.error.errors, 'error');
    })
  }
  fetchscreens(data:any) {
    this.adminservice.getAllScreens(data.employeeID).subscribe((response:any) => {
      // debugger

    
      this.screensArray = response.screens
      this.screensetting()
    });
  }
  screensetting() {
    for (const keyName of this.screensArray) {
      this.all_portals.forEach(el=>{
        if(el.name == keyName){
          el.display = true
        }
      })
    }

  }

}
