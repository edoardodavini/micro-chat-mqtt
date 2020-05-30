import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxMqttClientModule } from 'ngx-mqtt-client';
import { IMqttMessage, MqttModule, IMqttServiceOptions } from 'ngx-mqtt';

// Application
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RoomsComponent } from './rooms/rooms.component';


// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

// Mqtt Global configs
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 8885,
  path: '/chat'
};


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDividerModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
    // NgxMqttClientModule.withOptions({
    //   manageConnectionManually: true, //this flag will prevent the service to connection automatically
    //   host: 'localhost',
    //   protocol: 'ws',
    //   port: 8883,
    //   path: '/chat'
    // })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
