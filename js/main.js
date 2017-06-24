let defaultURL1 = "https://static.drips.pw/rotmg/production/current";

var URL1 = defaultURL1;
var URL2 = "";

var items1 = []
var items2 = []

function loadXML(url){
    return $.ajax({
        url: url,
        type: "get",
        datatype:"xml"
    });
}

$(document).ready(function(){
    load();

    $("#primary-input").keypress(function(event){
        if(event.which == 13){
            event.preventDefault();
            reload();
        }
    });

    $("#secondary-input").keypress(function(event){
        if(event.which == 13){
            event.preventDefault();
            reload();
        }
    });
});

function load(){
    items1 = {};
    items2 = {};

    $("#main-list > .list").empty();
    $("#secondary-list > .list").empty();

    var promise1 = loadXML(URL1 + "/xml/Equip.xml");
    var promise2 = $.Deferred(function(d){
        if(URL2){                                                   //check if a second URL is actually present
            var loading = loadXML(URL2 + "/xml/Equip.xml");

            loading.done(function(data){
                d.resolve(data);
            });

            loading.fail(function(){
                d.resolve("<Objects><Object id=\"Error\"></Object></Objects>");
            });
        }else{
            d.resolve([""]);
        }
    });

    $.when(promise1, promise2).done(function(d1,d2){
        var xml1 = d1[0];
        var xml2 = d2;

        $.each($(xml1).find("Object"), function(i, ele){
            var $ele = $(ele);
            items1[$ele.attr("type")] = new Item($(ele), URL1)
        });

        $.each(items1, function callback(key, value) {
            value.writeItem($("#main-list > .list"));
        });

        $.each($(xml2).find("Object"), function(i, ele){
            var $ele = $(ele);
            items2[$ele.attr("type")] = new Item($(ele), URL1)
        });

        $.each(items2, function callback(key, value) {
            value.writeItem($("#secondary-list > .list"));
        });
    });
}

function reload(){
    URL1 = $("#primary-input").val();
    URL2 = $("#secondary-input").val();

    if(URL1 == ""){
        URL1 = defaultURL1;
    }

    load();
}
