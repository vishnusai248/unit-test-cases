import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { of } from 'rxjs';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { environment } from 'src/environments/environment';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let authService:AuthenticationService;
  let sharedservice:SharedServiceService;
  let adminservice:AdminserviceService;
  let httpTestingController:HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageComponent ],
      imports:[HttpClientTestingModule],
      providers:[SharedServiceService,AdminserviceService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService=TestBed.inject(AuthenticationService)
    sharedservice=TestBed.inject(SharedServiceService)
    adminservice=TestBed.inject(AdminserviceService)
    httpTestingController=TestBed.inject(HttpTestingController)
  });
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call loggedin() from shared service on ngOnInit', () => {
    spyOn(sharedservice, 'loggedin').and.callThrough(); 
    fixture.detectChanges();
    expect(sharedservice.isloggedIn).toBeTrue(); 
    
  });
  
  it(" should fetch screens and call screensettings()",fakeAsync(()=>{
    const mockResponse = { screens: ['screen1', 'screen2'] };
    spyOn(component,'screensetting')
    const employeeID='IARC0329';
    component.employeeID=employeeID
    component.fetchscreens();
    const req = httpTestingController.expectOne(`${environment.apiURL}/users/getAllScreens?employeeID=${component.employeeID}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);

    // Wait for the API response to be processed
    tick();

    // Verify that screensArray is updated
    expect(component.screensArray).toEqual(mockResponse.screens);

    // Verify that screensetting() is called
    expect(component.screensetting).toHaveBeenCalled();
    
  }));
  it("should open the correct URL when option is 'greyt hr'", () => {
    spyOn(window, 'open');
    component.card_click('greyt hr');
    expect(window.open).toHaveBeenCalledWith('https://archents.greythr.com/', '_blank');
  });
  
  it("should open the correct URL when option is 'orange Hrm'", () => {
    spyOn(window, 'open');
    component.card_click('orange Hrm');
    expect(window.open).toHaveBeenCalledWith('https://archents.orangehrmlive.com/', '_blank');
  });
  it("should open the correct URL when option is 'itms'", () => {
    spyOn(window, 'open');
    component.card_click('itms');
    expect(window.open).toHaveBeenCalledWith('http://20.204.5.234:44382/', '_blank');
  });
  
  it("should open the correct URL when option is 'hr portal'", () => {
    spyOn(window, 'open');
    component.card_click('hr portal');
    expect(window.open).toHaveBeenCalledWith('http://recruitment.aciana.com/user/login', '_blank');
  });
  
  it("should open the correct URL when option is 'aciana git'", () => {
    spyOn(window, 'open');
    component.card_click('aciana git');
    expect(window.open).toHaveBeenCalledWith('http://49.207.62.175:3300/', '_blank');
  });
  
  it("should open the correct URL when option is 'aciana jira'", () => {
    spyOn(window, 'open');
    component.card_click('aciana jira');
    expect(window.open).toHaveBeenCalledWith('https://id.atlassian.com/login', '_blank');
  });
  
  it("should open the correct URL when option is 'archents jira'", () => {
    spyOn(window, 'open');
    component.card_click('archents jira');
    expect(window.open).toHaveBeenCalledWith('https://archent.atlassian.net/jira/projects', '_blank');
  });
  
  it("should open the correct URL when option is 'dry sign'", () => {
    spyOn(window, 'open');
    component.card_click('dry sign');
    expect(window.open).toHaveBeenCalledWith('https://drysign.exelatech.in/DrySign/login', '_blank');
  });
  
  it("should open the correct URL when option is 'aciana azure'", () => {
    spyOn(window, 'open');
    component.card_click('aciana azure');
    expect(window.open).toHaveBeenCalledWith('https://portal.azure.com', '_blank');
  });
  
  it("should open the correct URL when option is 'archents azure'", () => {
    spyOn(window, 'open');
    component.card_click('archents azure');
    expect(window.open).toHaveBeenCalledWith('https://portal.azure.com', '_blank');
  });
  
  it("should open the correct URL when option is 'aciana aws'", () => {
    spyOn(window, 'open');
    component.card_click('aciana aws');
    expect(window.open).toHaveBeenCalledWith('https://us-east-1.console.aws.amazon.com', '_blank');
  });
  
  it("should open the correct URL when option is 'archents aws'", () => {
    spyOn(window, 'open');
    component.card_click('archents aws');
    expect(window.open).toHaveBeenCalledWith('https://us-east-1.console.aws.amazon.com', '_blank');
  });
  
  it("should open the correct URL when option is 'adobe'", () => {
    spyOn(window, 'open');
    component.card_click('adobe');
    expect(window.open).toHaveBeenCalledWith('https://auth.services.adobe.com/en_US/deeplink.html#/', '_blank');
  });
  
  it("should open the correct URL when option is 'envato elements'", () => {
    spyOn(window, 'open');
    component.card_click('envato elements');
    expect(window.open).toHaveBeenCalledWith('https://elements.envato.com/sign-in', '_blank');
  });
  
  it("should open the correct URL when option is 'canva pro'", () => {
    spyOn(window, 'open');
    component.card_click('canva pro');
    expect(window.open).toHaveBeenCalledWith('https://www.canva.com/en_in/login/', '_blank');
  });
  
  it("should open the correct URL when option is 'vimeo'", () => {
    spyOn(window, 'open');
    component.card_click('vimeo');
    expect(window.open).toHaveBeenCalledWith('https://vimeo.com/', '_blank');
  });
  
  it("should open the correct URL when option is 'vy ond'", () => {
    spyOn(window, 'open');
    component.card_click('vy ond');
    expect(window.open).toHaveBeenCalledWith('https://app.vyond.com/', '_blank');
  });
  
  it("should open the correct URL when option is 'archents'", () => {
    spyOn(window, 'open');
    component.card_click('archents');
    expect(window.open).toHaveBeenCalledWith('https://archents.com/', '_blank');
  });
    
  it('should call loggedin() from shared service, screensetting(), fetchscreens(), and set up event listener', () => {
    spyOn(sharedservice, 'loggedin');
    spyOn(component, 'screensetting');
    spyOn(component, 'fetchscreens');
    spyOn(window.history, 'pushState');
    spyOn(window, 'addEventListener');
  
    component.ngOnInit();
  
    expect(sharedservice.loggedin).toHaveBeenCalled();
    expect(component.screensetting).toHaveBeenCalled();
    expect(component.fetchscreens).toHaveBeenCalled();
    expect(window.history.pushState).toHaveBeenCalledWith(null, '', window.location.href);
    expect(window.addEventListener).toHaveBeenCalledWith('popstate', jasmine.any(Function));
  });
  
  it('should prevent page navigation when popstate event occurs', () => {
    const pushStateSpy = spyOn(window.history, 'pushState');
    const addEventListenerSpy = spyOn(window, 'addEventListener').and.callThrough();
  
    component.ngOnInit();
  
    const eventListener = addEventListenerSpy.calls.mostRecent().args[1] as EventListener;
    const mockEvent = new Event('popstate');
    eventListener(mockEvent);
  
    expect(pushStateSpy).toHaveBeenCalledWith(null, '', window.location.href);
  });
  
  
  
});
