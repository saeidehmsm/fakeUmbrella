import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  @Output() sidenavToggle = new EventEmitter<void>();
  faCloudSunRain = faCloudSunRain;
  ngOnInit(): void {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
