import '/node_modules/@polymer/polymer/polymer.js';
import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

const html = String.raw;
const htmlTemplate = html`
    <style>
        .heading { font-size:6vw;}
    </style>
    <paper-dialog style="background-color:#232323;top:0px;position:absolute;z-index:999;overflow:hidden;height:100%;width:100%;margin:0px;" id="dialog" style="margin:10px">
        <div style="display:flex;flex-flow:column">
        <div style$="[[_getPhoto(item.Photo)]]" 
        background:url([[_getPhoto(item.Photo)]]);background-size:100% 100%;">
        <template is="dom-if" if="[[!item.Photo]]">
            <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%">
                <span style="text-align:center;color:white;text-shadow:5px 5px 5px #000;">No Photo Available</span>
            </div>
        </template>
        <span style="text-shadow: 5px 5px 5px #222;line-height:1;position:absolute;padding-left:10px;bottom:10px;color:white;font-size:10vw;">[[item.Username]]
        </div>
        <div style="position:relative;padding:15px;background-color: white;  height:120px;">
            <div>
               
                <template is="dom-if" if="[[!_hasDetails(item)]]">
                    <h1 class="heading" style="color:var(--tint-color)">Helaas!</h1>
                    <p>Jammer genoeg heeft [[item.Username]] niet meer informatie vrijgegeven voor dit evenement.</p>
                </template>
                <template is="dom-if" if="[[_hasDetails(item)]]">
                <h1 class="heading" style="color:var(--tint-color)">[[item.CompanyName]]</h1>
                <p class="title" style="color:var(--tint-color);margin:0px">[[item.PersonaName]]</p>
                <template is="dom-if" if="[[item.Sector]]">
                <p class="title" style="color:var(--tint-color);margin:0px">Sector</p>
                <div style="margin:0px;margin-top:10px;display:flex;flex-wrap:wrap;">
                        <template is="dom-repeat" items="[[_getSectors(item.Sector)]]">
                            <div style="font-size:10px;color:var(--text-primary-color);background-color:var(--tint-color);border-radius:5px;margin:2px;padding-left:5px;padding-right:5px;">{{item}}</div>
                        </template>
                </div>
                </template>
                </template>
            </div>
        </div>
        <div class="buttons" style="display:flex;height:54px;align-items:center;justify-content:flex-end;position:relative;border-top:1px solid #d8d5d5;background-color: white;">
            <template is="dom-if" if="[[_hasDetails(item)]]">
                <span style="user-select: none;margin:10px;margin-right:20px;color:var(--tint-color)" on-tap="_close" dialog-confirm>
                <template is="dom-if" if="{{unlock}}">
                    <iron-icon style="height:12px;width:12px;" icon="lock"></iron-icon>
                </template>
                Meer informatie</span>
            </template>
            <span style="user-select: none;margin:10px;margin-right:20px;color:var(--tint-color)" on-tap="_cancel" dialog-dismiss>Sluiten</span>
        </div>
        </div>
    </paper-dialog>
        `;

export class BadgeBasicInfo extends PolymerElement {
    static get template() {
        return htmlTemplate;
    }
    static get properties(){
        return {
            item: { type:String, notify:true},
            unlock: { type:Boolean, notify:true}
        }
    }


    open(item, unlock) {
        this.item = item;
        this.unlock = unlock;
        this.$.dialog.open();
    }

     _getPhoto(img) {
        if (img && img != "n/a") 
            return `position:relative;top:10px;margin:0px;padding:0px;height:55vh;background:url(${img}) no-repeat;background-size:100% 100%;`;
        else {
            let retval =  `position:relative;margin:0px;padding:0px;height:55vh;`;
            retval += ("background-color:" + ["#43BC84", "#08A195","#0DC4D7"][(Math.floor(Math.random() * 10) % 3)]);
            return retval;
        }
        
    }

    _hasDetails(item){
        return item.Sector || item.Motivation || item.Omschrijving || item.Sectors || item.BusinessModel || item.Description || item.Markets || item.Motivatie || item.Onderwijsinstelling;
        item.Activiteiten || item.CompanyName || item.Functie || item.Linkedin || item.Omschrijving || item.Pijler || item.Samenwerking;
    }
    _getSectors(sectors){
        return sectors ? sectors.split(",") : [];
    }

    _close(){
        this.dispatchEvent(new CustomEvent('close', { detail: { item: this.item, confirmed:true }, bubbles:true, composed:true}));
    }
    _cancel(){
        this.dispatchEvent(new CustomEvent('cancel', { bubbles:true, composed:true}));
    }
}


customElements.define('badge-basicinfo', BadgeBasicInfo);