import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  /**
   * Logs in the user with the provided credentials.
   */
  public loginUser() {
    this.userService.loginUser(this.user).subscribe({
      next: data => {
        sessionStorage.setItem("id", data.id.toString());
        this.router.navigate(["/home"]);
      },
      error: err => this.toastr.error(`Please fill in a correct username/password.`, 'Credentials invalid')
    });
  }

}