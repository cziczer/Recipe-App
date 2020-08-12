import { Component, OnInit, OnDestroy } from "@angular/core";

import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authServise: AuthService
  ) {}

  onLogout() {
    this.authServise.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  ngOnInit() {
    this.userSub = this.authServise.user.subscribe((user) => {
      this.isAuthenticated = !!user; // false when null so need oposite
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
