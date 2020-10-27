import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Output,Input, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { FarmersdataService } from 'app/shared/services/farmers/farmersdata.service';
import { Farmersdata} from 'app/shared/data/farmersdata/farmersdata';
import { MatSnackBar } from '@angular/material/snack-bar';
import{TableColumn} from '../tables/TableColumn';
import { Product} from 'app/shared/data/farmersdata/farmersproduct';
import { Phones} from 'app/shared/data/farmersdata/phones';
import {Sort} from "@angular/material/sort";

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-farmers-update',
  templateUrl: './farmers-update.component.html',
  styleUrls: ['./farmers-update.component.scss']
})
export class FarmersUpdateComponent implements OnInit {
  farmersproduct:Product[];
  phone:Phones[];
  isData:Boolean=false;
  farmers:Farmersdata =new Farmersdata();
  productsTableColumns: TableColumn[];
  //msg:string="Address Added Successfully";
  isadded:boolean=false;
  @Input() data:number;
  userForm: FormGroup
  productForm: FormGroup
  addMsg: any;
  defaultZone:any;
  defaultLang:any;
  
  constructor(private farmersService : FarmersdataService,public snackBar: MatSnackBar,private farmerService: FarmersdataService,
    private route: ActivatedRoute,private router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.initColums();
    console.log(this.data);
    this.loadproduct();

    this.productForm = this.fb.group({
      productName: ['',[Validators.required,Validators.pattern('[a-zA-Z][a-z.A-Z0-9 ]{1,}')]],
      listprice: ['',[Validators.required,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      sellingprice: ['',[Validators.required,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      maxsellingcapacity: ['',[Validators.required,Validators.pattern('^[0-9]+([0-9]{1,2})?$')]],
      
  
    });


    if(this.data!=null){
      this.isData=true;
      this.farmersService.getFarmersById(this.data)
      .subscribe(data => {
       console.log(data);
       this.farmers=data;
        this.userForm.controls["fullName"].setValue(data.fullName);
        this.userForm.controls["address"].setValue(data.address);
        this.userForm.controls["pickupAddress"].setValue(data.pickupAddress);
        this.userForm.controls["place"].setValue(data.place);
        this.addPhoneDetails();
        this.userForm.controls["contactperson"].setValue(data.contactperson);
        this.userForm.controls["landareasqft"].setValue(data.landareasqft); 
        this.userForm.controls["assignedzone"].setValue(data.assignedzone);
        this.userForm.controls["preferredlanguage"].setValue(data.preferredlanguage);
      });
      this.userForm = this.fb.group({
        fullName: ['',[Validators.required,Validators.pattern('[a-zA-Z][a-z.A-Z0-9 ]{1,}')]],
        address: ['',[Validators.required,Validators.minLength(5)]],
        pickupAddress: ['',[Validators.required,Validators.minLength(5)]],
        place: ['',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z0-9 ]{1,}')]],
        contactperson: ['',[Validators.required, Validators.pattern('[a-zA-Z][a-z.A-Z0-9 ]{1,}')]],
        landareasqft: ['',[Validators.required,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
        assignedzone: [''],
        isActive:[false],
        preferredlanguage:[''],
        phones:this.fb.array([])
    
      });
    }
    else{
      this.isData=false;
      console.log("Farmers Add");
      this.userForm = this.fb.group({
        fullName: ['',[Validators.required,Validators.pattern('[a-zA-Z][a-z.A-Z0-9 ]{1,}')]],
        address: ['',[Validators.required,Validators.minLength(5)]],
        pickupAddress: ['',[Validators.required,Validators.minLength(5)]],
        place: ['',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z0-9 ]{1,}')]],
        contactperson: ['',[Validators.required, Validators.pattern('[a-zA-Z][a-z.A-Z0-9 ]{1,}')]],
        landareasqft: ['',[Validators.required,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
        assignedzone: ['',Validators.required],
        isActive:[false],
        preferredlanguage:['',Validators.required],
        phones:this.fb.array([this.addphonegroup()])
    
      });
    }
    this.defaultZone = this.zones[0].name;
    this.defaultLang = ["English"];
  }
  addPhoneDetails(){
   
    const control = <FormArray> this.userForm.controls.phones;
        this.farmers.phones.forEach(x => {
            control.push(this.fb.group({
              phoneId:x.phoneId,
              mobileno: x.mobileno
              
            }))
        });
        return control;
  }

  addphonegroup() {
    return this.fb.group({
      phoneId:[''],
      mobileno: ['',[Validators.required,Validators.pattern("[+0-9-)( ][-0-9)(]{3,30}")]]
     
      
    });
  }
  addphonetype() {
    this.phonesArray.push(this.addphonegroup());
  }
  phId:number;
  removephonetype(index:number) {
    //this.phone=this.phonesArray.at(index).value;
    this.phId=this.phonesArray.at(index).value.phoneId;
    //console.log(this.phonesArray.at(index).value.phoneId);
    //console.log(this.phonesArray.value)
    console.log(this.phId);
       
    this.phonesArray.removeAt(index);
    this.farmerService.deletePhone(this.phId).subscribe(data=>console.log(data));

      
  }
  get phonesArray() {
    return <FormArray>this.userForm.get('phones');
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);

  }
  public checkProductError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
    
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
  onSubmit(){
  console.log("Clicked the submit");
   this.save();
  
}
  save() {
    console.log(this.userForm.value);
    if(this.data!=null){
      this.farmerService.updateFarmersdata(this.data,this.userForm.value)
      .subscribe(data =>{ console.log(data);
        this.snackBar.open('Farmers Data updated Sucessfully', ' ', {
          duration: 2000,
  
        });
      },(error: Response) => {  
         if(error.status === 200)  {
       // alert('sign in successfully !!!'); 
       this.snackBar.open('Farmers Data Updated Sucessfully', ' ', {
        duration: 2000,

      });
        console.log(error); 
      } 
      else if(error.status === 400)  {  
        
        //alert(' Error Occured in client Side'); 
        this.snackBar.open('Address Already exists', ' ', {
          duration: 2000,
  
        }); 
        console.log(error);  
      } else if(error.status === 500)  {  
        
        //alert(' Error Occured in client Side'); 
        this.snackBar.open('Server Side error', ' ', {
          duration: 2000,
  
        }); 
        console.log(error);  
      }
      else {  
          
       // alert('An Unexpected Error Occured.'); 
        this.snackBar.open('An Unexpected Error Occured', ' ', {
          duration: 2000,
  
        }); 
        console.log(error);  
      }
    
     
    });
    
  
    this.farmers = new Farmersdata();
    }
    else{
    this.farmerService.addFarmersdata(this.userForm.value)
      .subscribe(data =>{ console.log(data);
        this.snackBar.open('Farmers Data added Sucessfully', ' ', {
          duration: 2000,
  
        });
      },(error: Response) => {  
         if(error.status === 200)  {
       // alert('sign in successfully !!!'); 
       this.snackBar.open('Farmers Data added Sucessfully', ' ', {
        duration: 2000,

      });
        console.log(error); 
      } 
      else if(error.status === 400)  {  
        
        //alert(' Error Occured in client Side'); 
        this.snackBar.open('Address Already exists', ' ', {
          duration: 2000,
  
        }); 
        console.log(error);  
      } else if(error.status === 500)  {  
        
        //alert(' Error Occured in client Side'); 
        this.snackBar.open('Server Side error', ' ', {
          duration: 2000,
  
        }); 
        console.log(error);  
      }
      else {  
          
       // alert('An Unexpected Error Occured.'); 
        this.snackBar.open('An Unexpected Error Occured', ' ', {
          duration: 2000,
  
        }); 
        console.log(error);  
      }
    
     
    });
    
  
    this.farmers = new Farmersdata();
   
  }
    
  
  }


  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  selectedValue: string;
  languages = [
    { id: 1, name:'English' },
    { id: 2, name: 'Tamil' },
   // { id: 3, name: 'Hindi', disabled: true },
    { id: 3, name: 'Hindi' },
    { id: 4, name: 'Malayalam' }
  ];
  zones=[
    { id: 1, name:'Trizan-09' },
    { id: 2, name: 'Nantu-87' },
    { id: 3, name: 'Maser08' },
    { id: 4, name: 'Beron-565' }
  ];
  initColums():void{
    this.productsTableColumns=[
      {
        name: 'productId',
        dataKey: 'productId',
        isSortable: true
      },
      {
        name: 'productName',
        dataKey: 'productName',
        isSortable: true
      },
      {
        name: 'maxsellingcapacity',
        dataKey: 'maxsellingcapacity',
        isSortable: true
      },
      {
        name: 'listprice',
        dataKey: 'listprice',
        isSortable: true
      },
      {
        name: 'sellingprice',
        dataKey: 'sellingprice',
        isSortable: true
      }
    ];
  }

  loadproduct(){
    if(this.data!=null)
    this.farmersService.getProductList(this.data).subscribe(data => {this.farmersproduct= data; console.log(data)});
     
  }
  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.farmersproduct = this.farmersproduct.sort((a: Product, b: Product) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.farmersproduct = this.farmersproduct.sort((a: Product, b: Product) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.farmersproduct;
    }
  }
  prodAdd:boolean=false;
  addProduct(data:any){
    this.proddId=null;
    this.prodAdd=true;
    this.productForm = this.fb.group({
      productName: ['',[Validators.required,Validators.pattern('[a-zA-Z][a-z.A-Z0-9 ]{1,}')]],
      listprice: ['',[Validators.required,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      sellingprice: ['',[Validators.required,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      maxsellingcapacity: ['',[Validators.required,Validators.pattern('^[0-9]+([0-9]{1,2})?$')]],
      
  
    });
  }
  proddId:number;
  updateProduct(prodId){
    this.prodAdd=true;
this.proddId=prodId;
    this.farmersService.getProductByProductId(prodId)
    .subscribe(data => {
     console.log(data);
     this.farmers=data;
      this.productForm.controls["productName"].setValue(data.productName);
      this.productForm.controls["listprice"].setValue(data.listprice);
      this.productForm.controls["sellingprice"].setValue(data.sellingprice);
      this.productForm.controls["maxsellingcapacity"].setValue(data.maxsellingcapacity);
      
    });
    this.productForm = this.fb.group({
      productName: ['',[Validators.required,Validators.pattern('[a-zA-Z][a-z.A-Z0-9 ]{1,}')]],
      listprice: ['',[Validators.required,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      sellingprice: ['',[Validators.required,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      maxsellingcapacity: ['',[Validators.required,Validators.pattern('^[0-9]+([0-9]{1,2})?$')]],
      
  
    });
  }
  success:Boolean=false;
  onProductSubmit(){
    console.log(this.productForm.value);
    if(this.proddId==null){
    this.farmerService.addProducts(this.data,this.productForm.value)
    .subscribe(data =>{ console.log(data);
      this.snackBar.open('Product Added Sucessfully', ' ', {
        duration: 2000,
      });
      this.prodAdd=false;
      this.success=true;
      this.loadproduct();
    },(error: Response) => {  
       if(error.status === 200)  {
     // alert('sign in successfully !!!'); 
     this.snackBar.open('Product Added Sucessfully', ' ', {
      duration: 2000,

    });
      console.log(error); 
    } 
    else if(error.status === 400)  {  
      
      //alert(' Error Occured in client Side'); 
      this.snackBar.open('Error Occured in client Side', ' ', {
        duration: 2000,

      }); 
      console.log(error);  
    } else if(error.status === 500)  {  
      
      //alert(' Error Occured in client Side'); 
      this.snackBar.open('Server Side error', ' ', {
        duration: 2000,

      }); 
      console.log(error);  
    }
    else {  
        
     // alert('An Unexpected Error Occured.'); 
      this.snackBar.open('An Unexpected Error Occured', ' ', {
        duration: 2000,

      }); 
      console.log(error);  
    }
  
   
  });
  this.prodAdd=false;

  this.loadproduct();
    }
    else{
      this.farmerService.updateProduct(this.data,this.proddId,this.productForm.value)
      .subscribe(data =>{ console.log(data);
        this.snackBar.open('Product Updated Sucessfully', ' ', {
          duration: 2000,
  
        });
        this.prodAdd=false;
        this.success=true;
        this.loadproduct();
      },(error: Response) => {  
         if(error.status === 200)  {
       // alert('sign in successfully !!!'); 
       this.snackBar.open('Product Updated Sucessfully', ' ', {
        duration: 2000,
  
      });
        console.log(error); 
      } 
      else if(error.status === 400)  {  
        
        //alert(' Error Occured in client Side'); 
        this.snackBar.open('Error Occured in client Side', ' ', {
          duration: 2000,
  
        }); 
        console.log(error);  
      } else if(error.status === 500)  {  
        
        //alert(' Error Occured in client Side'); 
        this.snackBar.open('Server Side error', ' ', {
          duration: 2000,
  
        }); 
        console.log(error);  
      }
      else {  
          
       // alert('An Unexpected Error Occured.'); 
        this.snackBar.open('An Unexpected Error Occured', ' ', {
          duration: 2000,
  
        }); 
        console.log(error);  
      }
    
     
    });
    this.prodAdd=false;
    this.loadproduct();
     
    }
  }
  deleteProduct(){
    this.farmerService.deleteProduct(this.data,this.proddId).subscribe(data=>{console.log(data);
      this.snackBar.open('Product Deleted  Sucessfully', ' ', {
        duration: 2000,
      });
      this.prodAdd=false;
      this.loadproduct();
    });
  }
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  info:any="deleted Farmers"
  deleteFarmers(){
    this.farmerService.deleteFarmerdata(this.data).subscribe(data=>{console.log(data);
      this.snackBar.open('FarmersData Deleted  Sucessfully', ' ', {
        duration: 2000,
      });
    });
    this.delete.emit(this.info);
  }
}