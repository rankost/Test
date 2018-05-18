import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private UserServce: UserServiceService) {
    this.route.params.subscribe( params => 
      {
      const filter = "(uid=" + params.uid + ")";
      this.UserServce.getUser("o=domen1.rs,o=isp", "SUB", filter).subscribe(
        data => console.log(JSON.stringify(data))
      );
    });
   }

  ngOnInit() {
  }

}
