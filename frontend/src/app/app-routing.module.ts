import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./components/pages/homepage/homepage.component";
import { FoodPageComponent } from "./components/pages/food-page/food-page.component";
import { CartPageComponent } from "./components/pages/cart-page/cart-page.component";
import { LoginComponent } from "./components/pages/login/login.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "search/:searchTerm", component: HomepageComponent },
  { path: "tag/:tag", component: HomepageComponent },
  { path: "food/:id", component: FoodPageComponent },
  { path: "cart-page", component: CartPageComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
