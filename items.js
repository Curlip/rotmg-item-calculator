var items = []

//basic item from 'equip.xml'
function Item(name, sprite, desc, tier){
    this.name = name;
    this.sprite = sprite;
    this.desc = desc;
    this.tier = tier;

    //Append Beutiful HTML Representation of 'item' to 'container'
    Item.prototype.appendItem = function(container){
        div = "";

        div += "<div class='item'>"
        div +=     "<h3>"
        div +=         "<span class='itemName'>" + this.name + "</span>"
        div +=         "<span class='tier'>" + (this.tier == "" ? "<span style='color: #8B2DDC;' >UT</span>" : (this.consumable ? "" : "T" + this.tier)) + "</span>"
        div +=     "</h3>"
        div +=     this.desc + "<br />"
//        div +=     "<hr/>"
//        div +=     (this.famebonus != "" ? this.famebonus + "% Famebonus <br />" : "")
//        div +=     "<hr/>"
//        div +=     (this.soulbound != "" ? "Soulbound <br />" : "")
//        div +=     (this.feedpower != "" ? "<span class='fp'>" + this.feedpower + "FP </span><br />" : "")
//        div += "</div>"


        container.append(div)
    }
}

//Clears and repopulates items array using 'xml'
//This should allow for selectable xml files
function repopulateItems(xml){
    items = [];

    $(xml).find("Object").each(function(i,e){
        $obj = $(e);

        name = $obj.attr("id");
        sprite = $obj.find("File").text() + "_" + $obj.find("Index").text();
        desc = $obj.find("Description").text();
        tier = $obj.find("Tier").text();

        item = new Item(name, sprite, desc, tier);

        item.consumable = $obj.find("Consumable").length;
        item.soulbound = $obj.find("Soulbound").length;
        item.feedpower = $obj.find("feedPower").text();
        item.famebonus = $obj.find("FameBonus").text();

        items.push(item);
    })
}

//Populate the items array with STATIC.DRIPS.PW data
$.ajax({
    url: "https://static.drips.pw/rotmg/production/current/xml/Equip.xml",  //TODO Make configurable
    type: "get",
    datatype:"xml",
    success: function(xml){
        repopulateItems(xml);

        //append all items to page
        for(var i = 0; i < items.length; i++){
            items[i].appendItem($("body"))
        }
    }
})
