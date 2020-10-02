## Context

In cases where we have a complex model, that is represented with a component which has many children, then we create a `Context`. This
is done to avoid many `@Input` and `@Output` events between parent and child components. You can think of a `Context` as a state manager.

`Context` is an service that we provide on the parent component which can be injected in child components.

Each component should have it's local state that is synced with the `Context` state, with this we maintain immutability.

`Note`: If you have a situation where you need to update multiple portions of the state, you would implement that method in the context and then fire some event, with this you have solved the issue with race conditions.

## Events

We use `events` and `commands` to communitcate between the components.

`Events` happen after we have updated the state in the `Context` and with `Commands` we invoke some action that could change the state.

## Observables

There are three `observables`
- `onEvent: Subject<IContextEvent<T, E | ContextEvent>>`
- `onCommand: Subject<C | ContextCommand>`
- `isLoading: Subject<boolean>`

```
export interface IContextEvent<T, E> {
  model: T;
  event: E
}
```

## Context Class

There is an abstract [Context](https://github.com/tibor-mirnic/goto-angular/blob/master/src/app/infrastructure/core-ui/util/context.ts) class, located in the `core-ui` module, that you implement based on your needs.

#### Methods

There are several `protected` methods available
```
async init(): Promise<void> { ... }

protected updateModel(
  event: E | ContextEvent,
  update: (model: T) => T
  ) { ... }

protected executeCommand(command: C | ContextCommand) { ... }

protected setIsLoading(isLoading: boolean) { ... }
```