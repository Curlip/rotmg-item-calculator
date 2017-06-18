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
Item.prototype.writeHeader = function(){
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
Item.prototype.writeItem = function(container){
    var top = $("<div class='item'>")
    var norm = $("<div class='ingame'>");                                                      //[SPRITE]     Title    T*
        norm.attr("title", (this.id ? this.id : this.name))
    top.append(this.writeHeader())

    var desc = $("<div class='desc'>")                                                      //Description about the item
        desc.append("<p>" + (this.desc).split("\\n").join("<br />") + "</p>")
    norm.append(desc)

    norm.append("<hr />")                                                                    //--------------------------

    if(this.feedpower){
        norm.append($("<span class='fp'>").append("Feed Power: " + this.feedpower))          //Feed Power: ***
    }

    top.append(norm);

    var menu = $("<div class='menu'>");
    var json = $("<pre class='json'>" + JSON.stringify(this, null, 4) + "</pre>");
    menu.css("display", "none")
    menu.append(json);
    top.append(menu);

    top.click(function(){
        norm.toggle();
        menu.toggle();
    })

    container.append(top)
}
