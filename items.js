baseURL = "https://static.drips.pw/rotmg/production/current";
var items = []

//basic item from 'equip.xml'
function Item(name, desc, tier){
    this.name = name;
    this.desc = desc;
    this.tier = tier;

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

        div += "<div class='item'>"
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
}

//reloads items array using 'xml'
//This should allow for selectable xml files
function reloadItems(xml){
    items = [];

    $(xml).find("Object").each(function(i,e){
        $obj = $(e);

        name = $obj.attr("id");
        desc = $obj.find("Description").text();
        tier = $obj.find("Tier").text();

        item = new Item(name, desc, tier);

        item.spriteFile = $obj.find("File").text() + ".png";
        item.spriteRef = $obj.find("Index").text();

        //item.spriteFile = item.spriteFile.replace("playerskins", "playersSkins")

        item.consumable = $obj.find("Consumable").length;
        item.soulbound = $obj.find("Soulbound").length;
        item.feedpower = $obj.find("feedPower").text();
        item.famebonus = $obj.find("FameBonus").text();

        items.push(item);
    })
}

//Populate the items array with STATIC.DRIPS.PW data
$.ajax({
    url: baseURL + "/xml/Equip.xml",  //TODO Make configurable
    type: "get",
    datatype:"xml",
    success: function(xml){
        reloadItems(xml);

        //append all items to page
        for(var i = 0; i < items.length; i++){
            items[i].drawItem($("body"))
        }
    }
})
