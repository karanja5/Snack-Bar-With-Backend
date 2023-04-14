/* This is the main module of an Angular application that imports and declares various components and
modules. */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/partials/header/header.component";
import { HomepageComponent } from "./components/pages/homepage/homepage.component";
import { RatingModule } from "ng-starrating";
import { SearchComponent } from "./components/partials/search/search.component";
import { TagsBarComponent } from "./components/partials/tags-bar/tags-bar.component";
import { FoodPageComponent } from "./components/pages/food-page/food-page.component";
import { CartPageComponent } from "./components/pages/cart-page/cart-page.component";
import { TitleComponent } from "./components/partials/title/title.component";
import { NotFoundComponent } from "./components/partials/not-found/not-found.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from "./components/partials/footer/footer.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InputContainerComponent } from "./components/partials/input-container/input-container.component";
import { InputValidationComponent } from "./components/partials/input-validation/input-validation.component";
import { TextInputComponent } from "./components/partials/text-input/text-input.component";
import { DefaultButtonComponent } from "./components/partials/default-button/default-button.component";
import { LoadingComponent } from "./components/partials/loading/loading.component";
import { ShowLoadingInterceptor } from "./shared/interceptors/show-loading.interceptor";
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    SearchComponent,
    TagsBarComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginComponent,
    FooterComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    LoadingComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: "toast-bottom-right",
      newestOnTop: false,
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ShowLoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
