let defaultBaseURL = "https://static.drips.pw/rotmg/production/current";
baseURL = defaultBaseURL;

$(document).ready(function(){
    //Populate the items array with STATIC.DRIPS.PW data
    $.ajax({
        url: baseURL + "/xml/Equip.xml",  //TODO Make configurable
        type: "get",
        datatype:"xml",
        success: function(xml){
            $(xml).find("Object").each(function(i,e){
                new Item($(e))
            })

            //append all items to page
            for(var i = 0; i < items.length; i++){
                items[i].drawItem($("#item-list-column"))
            }
        }
    })
});

function load(url){
    baseURL = url;

    $(document).ready(function(){
        //Populate the items array with STATIC.DRIPS.PW data
        $.ajax({
            url: baseURL + "/xml/Equip.xml",
            type: "get",
            datatype:"xml",
            success: function(xml){
                $(xml).find("Object").each(function(i,e){
                    new Item($(e))
                })

                //append all items to page
                for(var i = 0; i < items.length; i++){
                    items[i].drawItem($("#item-list-column"))
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                $("#url-input").val(defaultBaseURL);
                reload();
            }
        })
    });
}

function setProd(){
    $("#url-input").val("https://static.drips.pw/rotmg/production/current");
    reload();
}

function setTest(){
    $("#url-input").val("https://static.drips.pw/rotmg/testing/current");
    reload();
}

function reload(){
    items = [];
    $("#item-list-column").empty();
    $("#url-input").removeClass("err");
    load($("#url-input").val());

}
