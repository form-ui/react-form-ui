import { FormTypes, FormTypesString } from "./types";
import { RootCtrl, ctrlMode } from "./root_ctrl";

export type FiledTypes = string | number | boolean;

export type FiledMessages = { error?: any; wrang?: any; info?: any };
export type ValidationResult = undefined | string | FiledMessages;

export type ValidationFunc<T> = (val: T) => ValidationResult;

// Base configuration params ev
export abstract class FiledConf<Y, T extends FiledConfData<Y>> {
  abstract data: T;
}

export interface FiledConfData<T> {
  type: FormTypes | FormTypesString;
  title: String;
  validationPipes?: ValidationFunc<T>[];
  default?: T;
  required?: boolean;
  props?: any;
  meta?: any;
}

export class SingleFiledConf<Y, T extends FiledConfData<Y>> extends FiledConf<
  Y,
  T
> {
  data = ({
    type: this.type,
    title: "",
    required: false,
    props: {}
  } as any) as T;

  constructor(public type: FormTypes) {
    super();
    this.data.type = type;
  }

  get required() {
    this.data.required = true;
    return this;
  }

  title(title: string) {
    this.data.title = title;
    return this;
  }

  pipe(vp: ValidationFunc<Y>[]) {
    this.data.validationPipes = vp;
  }
}

export interface BaseFormCtrlArgs {
  root:null | RootCtrl<any>;
  parent?: BaseFormCtrl<any>;
}

export interface BaseCtrlState<T> {
  value?: T;
  mode: null | ctrlMode;
  is_err: boolean;
  dirty: boolean;
  msgs: FiledMessages;
}

export abstract class BaseFormCtrl<T> {
  relation: BaseFormCtrlArgs | null = null;

  state: BaseCtrlState<T> = {
    value: undefined,
    mode: null,
    is_err: false,
    dirty: false,
    msgs: {}
  };

  constructor(args: BaseFormCtrlArgs) {
    this.relation = args;
  }

  get value() {
    return this.state.value;
  }

  abstract onChange(args: any) {

  }

  // connect to the parent and root
  mount() {

  }
  // disconnect
  unmount() {
    
  }
}
