//basic item from 'equip.xml'
function Item(xml, url){
    this.url = url;

//XML DATA:

    //HEADER
    var attr = xml.attr("id");
    var tag = xml.find("DisplayId").text();
    if(tag && !tag.includes("{")){
        this.name = tag;
        this.id = attr;
    }else{
        this.name = attr;
        this.id = tag;
    }

    this.desc = xml.find("Description").text();
    this.tier = xml.find("Tier").text();

    //SPRITE
    this.spriteFile = xml.find("File").text() + ".png";
    this.spriteRef = xml.find("Index").text();
    //FLAGS
    this.consumable = xml.find("Consumable").length;
    this.soulbound = xml.find("Soulbound").length;
    //UNIVERSAL:
    this.bag = xml.find("BagType").text();
    this.feedpower = xml.find("feedPower").text();
    this.famebonus = xml.find("FameBonus").text();
    //EQUIPMENT STATS
    this.type = slotType(xml.find("SlotType").text());
    //WEAPONS
    if(this.type && 0xF0 == 0x00){
        this.mindamage = parseInt(xml.find("MinDamage").text());
        this.maxdamage = parseInt(xml.find("MaxDamage").text());
        this.averagedamage = (this.mindamage + this.maxdamage) / 2;                                                 //average damage
        this.range = (parseFloat(xml.find("Speed").text()) * parseFloat(xml.find("LifetimeMS").text())) / 10000;    //speed * lifetime / 10000
        this.rof = (0 - parseFloat(xml.find("RateOfFire").text())) * 100;                                           //(0-range) * 100
    }
}
