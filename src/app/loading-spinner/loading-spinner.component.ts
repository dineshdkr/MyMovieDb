import { Component } from '@angular/core';

@Component({
    selector: 'app-loading-spinner',
    template: '<div class="lds-ellipsis" style="position: fixed;top: 40%;left: 46%;"><div></div><div></div><div></div><div></div></div>',
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent { }
