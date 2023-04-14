/* This is the routing module for an Angular application with routes for the homepage, food page, cart
page, and login page. */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./components/pages/homepage/homepage.component";
import { FoodPageComponent } from "./components/pages/food-page/food-page.component";
import { CartPageComponent } from "./components/pages/cart-page/cart-page.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { CheckoutPageComponent } from "./components/pages/checkout-page/checkout-page.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "search/:searchTerm", component: HomepageComponent },
  { path: "tag/:tag", component: HomepageComponent },
  { path: "food/:id", component: FoodPageComponent },
  { path: "cart-page", component: CartPageComponent },
  { path: "login", component: LoginComponent },
  { path: "checkout", component: CheckoutPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
