import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { paisSmall } from 'src/app/interfaces/paises.interfaces';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required]
  })


  regiones: string[] = [];
  paises: paisSmall[] =[]

  constructor(private fb: FormBuilder,
              private paisesService: PaisesService) { }

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones

    //?Cuando cambie la region

    this.miFormulario.get('region')?.valueChanges.subscribe(region => {
      console.log(region)

      this.paisesService.getPaisesPorRegion(region).subscribe(paises => {
        console.log(paises);
        
        this.paises = paises
      })
      
    })

  }

  guardar() {
    console.log(this.miFormulario.value);
    
  }

}
