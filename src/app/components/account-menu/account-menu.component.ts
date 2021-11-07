import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }

  onLogoutClick(): void {
    this.loginService.logout();
  }
}
