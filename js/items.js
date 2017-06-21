//basic item from 'equip.xml'
function Item(xml, url){
    var self = this;

    this.url = url;

//XML DATA:

    //HEADER
    var attr = xml.attr("id");
    var tag  = getText(xml, "DisplayId");
    if(tag && !tag.includes("{")){
        this.name = tag;
        this.id = attr;
    }else{
        this.name = attr;
        this.id = tag;
    }

    this.desc       = getText(xml, "Description");
    this.tier       = getText(xml, "Tier");

    //SPRITE
    this.spriteFile = getText(xml, "File") + ".png";
    this.spriteRef  = getText(xml, "Index");
    //FLAGS
    this.consumable = getFlag(xml, "Consumable");
    this.soulbound  = getFlag(xml, "Soulbound");
    //UNIVERSAL:
    this.bag        = getText(xml, "BagType");
    this.feedpower  = getText(xml, "feedPower");
    this.famebonus  = getText(xml, "FameBonus");
    //EQUIPMENT STATS
    this.type = slotType(parseInt(getText(xml, "SlotType")));
    //STAT BOSTS
    this.equipStats = {};
    xml.find("ActivateOnEquip").each( function(i) {
        if($(this).text() === "IncrementStat"){
            var statType = stat($(this).attr("stat"));
            self.equipStats[statType] = $(this).attr("amount");
        }
    } );
    //WEAPONS
    if((this.type & 0xF0) == 0x00){
        this.mindamage = parseInt(getText(xml, "MinDamage"));
        this.maxdamage = parseInt(getText(xml, "MaxDamage"));
        this.range  = (parseFloat(getText(xml, "Speed")) * parseFloat(getText(xml, "LifetimeMS"))) / 10000;
        this.shots  = parseInt(getText(xml, "NumProjectiles"));
        this.rof  = (parseFloat(getText(xml, "RateOfFire")));
        this.multihit  = getFlag(xml, "MultiHit");
        this.pierce  = getFlag(xml, "ArmorPiercing");
    }
}
