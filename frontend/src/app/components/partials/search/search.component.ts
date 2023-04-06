/* The SearchComponent class is an Angular component that handles searching functionality and
navigation to search results. */
/* `ActivatedRoute` is a service provided by Angular that contains information about the
currently activated route and its parameters. In this code, `ActivatedRoute` is used to
subscribe to changes in the route parameters of the current activated route. When the route
parameter `searchTerm` changes, the callback function is executed and the `searchTerm`
property of the `SearchComponent` is updated with the new value of `params.searchTerm`.
This allows the `SearchComponent` to always have the latest value of the search term
entered by the user in the URL.`Router` is a service provided by Angular that allows for programmatic navigation
between different views or components in an Angular application. In this code, it is
used to navigate to the search results page when the user enters a search term and
clicks the search button. The `navigateByUrl` method of the `Router` service is
called with the URL of the search results page, which includes the search term as a
parameter. This causes the application to navigate to the search results page and
display the appropriate search results based on the search term entered by the user. */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
/* The SearchComponent class handles search functionality and navigation in a TypeScript Angular
application. */
export class SearchComponent implements OnInit {
  searchTerm: string = "";

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    /* `activatedRoute.params.subscribe((params) => {...})` is subscribing to changes in the route
    parameters of the current activated route. When the route parameter `searchTerm` changes, the
    callback function is executed and the `searchTerm` property of the `SearchComponent` is updated
    with the new value of `params.searchTerm`. This allows the `SearchComponent` to always have the
    latest value of the search term entered by the user in the URL. */
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) this.searchTerm = params.searchTerm;
    });
  }

  ngOnInit() {}

  /**
   * The function redirects to a search page with the given search term as a parameter.
   * @param {string} term - string - a variable that represents the search term entered by the user.
   */
  search(term: string): void {
    if (term) this.router.navigateByUrl("/search/" + term);
  }
}
