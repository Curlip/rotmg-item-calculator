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

//Return html for an Item Sprite
Item.prototype.drawSprite = function(){
    row = 0 - (this.spriteRef >>> 4);
    column = 0 - (this.spriteRef & 0x00F);

    container = $("<div class='item-sprite'>")
        container.css("background-image", "url(" + this.url + "/sheets/" + this.spriteFile + ")")
        container.css("background-position", column*48 + "px " + row*48 + "px ")

    return container;
}

//Return html for an Item Header (sprite + name + tier)
Item.prototype.drawHeader = function(){
    var container = $("<h3 class='item-header'>");
        container.append(this.drawSprite())                                                 //[Sprite]

    var text = $("<div class='header-text'>")
        text.append("<div class='item-name'>" + this.name + "</div>")                       //NAME

        var tier = $("<div class='tier'>")                                                  //Tier
            if(!this.consumable){
                if(this.tier) { tier.append("T" + this.tier) }
                if(!this.tier){ tier.append("<span style='color: #8B2DDC;' >UT</span>")}
            }
        text.append(tier);
    container.append(text);

    return container;
}

//Append Beutiful HTML Representation of 'item' to 'container'
Item.prototype.drawItem = function(container){
    var top = $("<div class='item'>");                                                      //[SPRITE]     Title    T*
        top.attr("id", "item" + this.identifier)
        top.attr("title", (this.id ? this.id : this.name))
    top.append(this.drawHeader())

    var desc = $("<div class='desc'>")                                                      //Description about the item
        desc.append("<p>" + (this.desc).split("\\n").join("<br />") + "</p>")
    top.append(desc)

    top.append("<hr />")                                                                    //--------------------------

    if(this.feedpower){
        top.append($("<span class='fp'>").append("Feed Power: " + this.feedpower))          //Feed Power: ***
    }

    container.append(top)
}
