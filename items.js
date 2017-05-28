var items = []

//basic item from 'equip.xml'
function Item(xml){
    this.name = xml.attr("id");
    if(xml.find("DisplayId").text()){
        this.name = xml.find("DisplayId").text();
        this.id = xml.attr("id");
    }
    this.desc = xml.find("Description").text();
    this.tier = xml.find("Tier").text();

    this.spriteFile = xml.find("File").text() + ".png";
    this.spriteRef = xml.find("Index").text();
    //item.spriteFile = item.spriteFile.replace("playerskins", "playersSkins")
    this.consumable = xml.find("Consumable").length;
    this.soulbound = xml.find("Soulbound").length;
    this.feedpower = xml.find("feedPower").text();
    this.famebonus = xml.find("FameBonus").text();

    //Return html for an Item Sprite
    Item.prototype.drawSprite = function(){
        row = 0 - (this.spriteRef >>> 4);
        column = 0 - (this.spriteRef & 0x00F);

        div = ""

        div +=      "<div class='item-sprite'"
        div +=          "style='"
        div +=              "background-image: url(" + baseURL + "/sheets/" + this.spriteFile + ");"
        div +=              "background-position:" + column*48 + "px " + row*48 + "px;"
        div +=      "'></div>"


        return div;
    }

    //Append Beutiful HTML Representation of 'item' to 'container'
    Item.prototype.drawItem = function(container){
        div = "";

        div += "<div class='item' title='"+(this.id ? this.id : this.name)+"'>"
        div +=     "<h3 class='item-header'>"
        div +=         this.drawSprite()
        div +=         "<div class='header-text'>"
        div +=             "<div class='item-name'>" + this.name + "</div>"
        div +=             "<div class='tier'>" + (this.tier == "" ? "<span style='color: #8B2DDC;' >UT</span>" : (this.consumable ? "" : "T" + this.tier)) + "</div>"
        div +=         "</div>"
        div +=     "</h3>"
        div += "</div>"

        container.append(div)
    }

    items.push(this);
}
