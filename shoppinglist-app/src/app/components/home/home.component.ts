import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Item } from '../../models/item';
import { ItemService } from 'src/app/services/item.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Item[] = [];
  itemForm = this.formBuilder.group({
    itemName: new FormControl('', [Validators.required])
  })

  constructor(private userService: UserService, private itemService: ItemService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getItems();
  }

  private getItems(): any {
    this.itemService.getItemsById().subscribe(itemData => {
      this.items = itemData;
    })
  }

  public async addItem() {
    let itemName = this.itemForm.value.itemName;
    if(!itemName){
      this.toastr.warning(`Could not add item please fill in a value!`, 'Field empty');
      return 
    } 
    let item = new Item(itemName);
    await this.itemService.addItem(item).subscribe(addedItem => {
      if (addedItem) {
        this.items.push(addedItem);
        this.toastr.success(`Item with name ${item.name} has been added succesfully!`, 'Item added');
      }
    })
    this.itemForm.controls['itemName'].setValue('');
  }

  public deleteItem(item: Item) {
    this.itemService.deleteItem(item).subscribe(response => {
      if (response) {
        const i = this.items.indexOf(item, 0);
        if(i > -1) {
          this.items.splice(i, 1);
          this.toastr.info(`Item with name ${item.name} has been deleted succesfully!`, 'Item deleted');
        }
      }
    })
    
  }

  public logOut() {
    this.userService.logOut();
  }
}
