import '/node_modules/@polymer/polymer/polymer.js';
import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js';

const html = String.raw;

export class BadgeScanner extends PolymerElement {
    static get template() { return html`
        <style>
            .scanner { width:70vw;height:50vh;padding: 20px; border: 1px dashed black; font-size:12px; top:0px;display:flex;flex-flow:column;align-items:center; justify-content:center;font-size:20px;text-shadow:5px 5px 5px #000;color:white;
            }
        </style>
        <input type="file" hidden accept="image/*" id="scaninput" on-change="_scanImage">
        <div class="scanner" on-tap="_scan"><img src="/images/scan.svg" height="80" style="opacity:0.4;margin-bottom:25px;"></img><p>Klik hier om een badge te scannen</p></div>
    `; }

    connectedCallback(){
        super.connectedCallback(); 
        qrcode.callback = (decodedDATA) => {
            // the other scanner (app) takes over and registeres another callback changing the handler to the app, changing the this..
            this.dispatchEvent(new CustomEvent('badge-scanned', { detail:decodedDATA, composed:true, bubbles:true }));
        };
    }
    _scan(){
        this.$.scaninput.value = "";
        this.$.scaninput.click();
    }
    _scanImage(e){
        if (e.target.files.length > 0) {
            var file = e.target.files[0];
	        var reader = new FileReader();
            reader.onload = function(e) {
                qrcode.decode(e.target.result);
            };
            // Read in the image file as a data URL.
            reader.readAsDataURL(file);	
        }
    }
}

customElements.define('badge-scanner', BadgeScanner);