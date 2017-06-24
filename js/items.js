//basic item from 'equip.xml'
function Item(xml, url){
    var self = this;

    this.name = xml.attr("id");
    this.equipStats = {};

    $.each(xml.children(), function(i, ele){
        elem = $(ele);

        elem.tagName = elem.prop("tagName");

        if(elem.tagName === "Item"){ return; }
        if(elem.tagName === "Class"){ return; }

        if(elem.tagName === "DisplayId"){ self.name = elem.text(); return; };
        if(elem.tagName === "Description"){ self.desc = elem.text(); return; }
        if(elem.tagName === "Tier"){ self.tier = elem.text(); return; }

        if(elem.tagName === "BagType"){ self.bag = elem.text(); return; }
        if(elem.tagName === "feedPower"){ self.feedpower = elem.text(); return; }
        if(elem.tagName === "FameBonus"){ self.famebonus = elem.text(); return; }

        if(elem.tagName === "Consumable") { self.consumable = true; return; }
        if(elem.tagName === "Soulbound") { self.soulbound = true; return; }

        if(elem.tagName === "Texture") {
            self.spriteFile = elem.children("File").text() + ".png";
            self.spriteRef  = elem.children("Index").text();
            return;
        }

        if(elem.tagName === "SlotType") {
            self.type = slotType(parseInt(elem.text()));
            return;
        }

        if(elem.tagName === "ActivateOnEquip"){
            if(elem.text() === "IncrementStat"){
                var statType = stat(elem.attr("stat"));
                self.equipStats[statType] = elem.attr("amount");
            }
            return;
        }

        if(elem.tagName === "RateOfFire"){ self.rof = elem.text(); return; }
        if(elem.tagName === "MultiHit") { self.multihit = true; return; }
        if(elem.tagName === "ArmorPiercing") { self.pierce = true; return; }

        if(elem.tagName === "Projectile"){
            self.mindamage = parseInt(elem.find("MinDamage").text());
            self.maxdamage = parseInt(elem.find("MaxDamage").text());
            self.range  = ( parseFloat( elem.children("Speed").text() ) * parseFloat( elem.children("LifetimeMS").text() ) ) / 10000;
            self.shots  = parseInt(elem.find("NumProjectiles").text());
            return;
        }
    });

    this.url = url;
}
