function getText(xml, name){
    return xml.find(name).text();
}

function getFlag(xml, name){
    return xml.find(name).length;;
}
