import { Component, OnInit } from '@angular/core';
import { Router, RouterConfigOptions } from '@angular/router';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  name: any = '';
email: any = '';
screensArray:any=[];
employeeID=sessionStorage.getItem('employeeID')
  screensdetails = [
    { name: 'greyt hr', display: false, imgurl: './assets/greythr.png' },
    { name: 'orange Hrm', display: false, imgurl: './assets/orangehrm.png' },
    { name: 'itms', display: false, imgurl: './assets/IT_Help_Desk_logo.png' },
    { name: 'aciana git', display: false, imgurl: './assets/git_image.jpeg' },
    { name: 'aciana jira', display: false, imgurl: './assets/jira.png' },
    { name: 'archents jira', display: false, imgurl: './assets/jira.png' },
    { name: 'dry sign', display: false, imgurl: './assets/drysign_img.png' },
    { name: 'aciana azure', display: false, imgurl: './assets/azure.png' },
    { name: 'archents azure', display: false, imgurl: './assets/azure.png' },
    { name: 'aciana aws', display: false, imgurl: './assets/aws.png' },
    { name: 'archents aws', display: false, imgurl: './assets/aws.png' },
    { name: 'adobe', display: false, imgurl: './assets/adobe.png' },
    { name: 'envato elements', display: false, imgurl: './assets/envato.png' },
    { name: 'canva pro', display: false, imgurl: './assets/canva.png' },
    { name: 'vimeo', display: false, imgurl: './assets/vimeo.png' },
    { name: 'vy ond', display: false, imgurl: './assets/vynod.png' },
    { name: 'hr portal', display: false, imgurl: './assets/HR_logo.png' },
  ]
  constructor(private router: Router, private authService: AuthenticationService, private sharedservice: SharedServiceService,private adminservice:AdminserviceService) {
    // this.name = sessionStorage.getItem('name');
    // console.log(sessionStorage.getItem('name'))

  }
  ngOnInit(): void {
    this.sharedservice.loggedin();
    this.screensetting()
    //prevent page to go back
    window.history.pushState(null, '', window.location.href);

    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, '', window.location.href);
    });

    this.fetchscreens()
  }
  // keyNames = ['orange Hrm', 'itms', 'aciana jira'];
  fetchscreens() {
    this.adminservice.UsergetAllScreens(this.employeeID).subscribe((response:any) => {
      // debugger

    
      this.screensArray = response.screens
      this.screensetting()
    });
  }
  screensetting() {
    for (const keyName of this.screensArray) {
      this.screensdetails.forEach(el=>{
        if(el.name == keyName){
          el.display = true
        }
      })
    }

  }

  


  card_click(option: string) {
    if (option == "greyt hr") {
      window.open('https://archents.greythr.com/', '_blank')

    }
    else if (option == "orange Hrm") {
      window.open('https://archents.orangehrmlive.com/', '_blank')
    }
    else if (option == "itms") {
      window.open('http://20.204.5.234:44382/', '_blank')
    }
    else if (option == "hr portal") {
      window.open('http://recruitment.aciana.com/user/login', '_blank')
    }
    else if (option == "aciana git") {
      window.open('http://49.207.62.175:3300/', '_blank')
    }
    else if (option == "aciana jira") {
      window.open('https://id.atlassian.com/login', '_blank')
    }
    else if (option == "archents jira") {
      window.open('https://archent.atlassian.net/jira/projects', '_blank')
    }
    else if (option == "dry sign") {
      window.open('https://drysign.exelatech.in/DrySign/login', '_blank')
    }
    else if (option == "aciana azure") {
      window.open('https://portal.azure.com', '_blank')
    }
    else if (option == "archents azure") {
      window.open('https://portal.azure.com', '_blank')
    }
    else if (option == "aciana aws") {
      window.open('https://us-east-1.console.aws.amazon.com', '_blank')
    }
    else if (option == "archents aws") {
      window.open('https://us-east-1.console.aws.amazon.com', '_blank')
    }
    else if (option == "adobe") {
      window.open('https://auth.services.adobe.com/en_US/deeplink.html#/', '_blank')
    }

    else if (option == "envato elements") {
      window.open('https://elements.envato.com/sign-in', '_blank')
    }
    else if (option == "canva pro") {
      window.open('https://www.canva.com/en_in/login/', '_blank')
    }
    else if (option == "vimeo") {
      window.open('https://vimeo.com/', '_blank')
    }
    else if (option == "vy ond") {
      window.open('https://app.vyond.com/', '_blank')
    }
    else if (option == "archents") {
      window.open('https://archents.com/', '_blank')
    }
  }

}
