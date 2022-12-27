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

  public loginUser() {
    this.userService.loginUser(this.user).subscribe(data => {      
      console.log(data);
      sessionStorage.setItem("id", data.id.toString());
      this.router.navigate(["/home"]);
    },
    error => {
      console.log(error);
      this.toastr.error(`Please fill in the right username/password.`, 'Credentials invalid');
    })
  }

}