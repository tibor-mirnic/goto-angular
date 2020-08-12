export interface IRunOutsideAngularEvent {
  name: string;
  callback: (event: any) => boolean | void;
}
