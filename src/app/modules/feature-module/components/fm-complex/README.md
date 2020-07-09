## View

There are cases when we cannot map the `Model` directly to the `HTML`. Then we create a `View` service that is provided on the component.

All logic that is related to the models should reside in the `View`.

The `Component` should only be responsible for managing events, displaying information to user, etc.

Because the view is an `Injectable` we can use `API` service directly in the view.