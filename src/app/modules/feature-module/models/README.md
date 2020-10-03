## Models

Here we define all models that are used in the module.

Models should always be defined as an `interface`. This does not apply to `enums` and models that have some business logic of their own.

## Structure

```
models/
  enums/
    user-type.ts
  request/
    get-users.ts
    save-user.ts
  response/
    get-users.ts
    save-user.ts
  some-model.ts
  errors.ts
  tokens.ts
```
File name convention is the same as one defined by `@angular/cli`.

## Request/Response

Most of the models in a feature module are ones that come from an api. Eeach api call should always have its `request` and `response` interface.

As for naming an `interface`, a request should always have a `Request` suffix, and a response should always have a `Response` suffix.

Even though your `GET` method receives query params, your service method should always have an `Request` interface declared.

`models/request/get-users.ts`
```
export inteface IGetUsersRequest {
  query: string;
  skip: number;
  take: number;
}
```

`models/response/get-users.ts`
```
export interface IGetUsersResponse {
  records: IUser[];
  totalRecords: number;
}
```

## Enums

We user `enums` to define various types, events etc. Enums should not have an `Enum` suffix.

For better readability enums sent from `api` should use string conversion.

`models/enums/user-type.ts`
```
export enum UserType {
  ADMINISTRATOR = 'ADMIN',
  USER = 'USER'
}
```

If we want to have a description for each `enum` type then we create a `description` enum. Description enums should always have a `Description` suffix.

We match the `value` of the `enum` to be the `key` of the `description` enum.

`models/enums/user-type.ts`
```
export enum UserTypeDescription {
  ADMIN = 'Applicatoin administrator',
  USER = 'Simple user`
}
```

## Errors

Every module should have at least one error. This way you can have more granular messages presented to the user.

```
export class FeatureModuleError extends UserFriendlyError {
  constructor(message: string) {
    super(message, 'Feature Module');
  }
}
```

## Tokens

Here we define `InjectionToken<T>`'s that can be imported anywhere in the module. We are using tokens becase we want to free module of any dependency, event when importing from an `environment`. Tokens are provided in `forRoot` methor or in a `root` module.