import { IDropdownItem } from '../models/dropdown-item';

import { EnumType } from '../models/enum/enum-type';

export class DropdownEnum {

  private _enum: any;
  private _items: IDropdownItem<string>[];
  private _originalItems: IDropdownItem<string>[];
  private _filterFn: (item: IDropdownItem<string>) => boolean;

  public get items(): IDropdownItem<string>[] {
    const filteredItems = this._originalItems.filter(this._filterFn);
    this._items.splice(0, this._items.length, ...filteredItems);
    return this._items;
  }

  constructor(enumType: typeof EnumType) {
    this._enum = enumType;

    this._filterFn = (item: IDropdownItem<string>) => true;

    this._items = [];
    this._originalItems = Object.keys(this._enum)
      .filter(key => typeof(key) === 'string')
      .map(key => ({
        id: key,
        text: this._enum[key]
      }));
  }

  public setFilterFn(filter: (item: IDropdownItem<string>) => boolean) {
    this._filterFn = filter;
  }

  public updateItems(update: (item: IDropdownItem<string>) => void): void {
    this._originalItems.forEach(a => update(a));
    this._items = [...this._items];
  }

  public addItems(items: IDropdownItem<string>[]): void {
    this._originalItems.push(...items);
    this._items = [...this._items];
  }
}
