/* This is a TypeScript class for a loading component that subscribes to a loading service and updates
a boolean value based on the loading status. */
import { Component, OnInit } from "@angular/core";
import { LoadingService } from "../../../services/loading.service";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"],
})
export class LoadingComponent implements OnInit {
  isLoadingBool!: boolean;
  constructor(loadingService: LoadingService) {
    loadingService.isLoading.subscribe((isLoadingParam) => {
      this.isLoadingBool = isLoadingParam;
    });
  }

  ngOnInit(): void {}
}
