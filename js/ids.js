//SlotTypes:
/*
1       Sword       0x04
2       Dagger      0x00
3       Bow         0x01
4       Tome        0x13
5       Sheild      0x15
6       Leather     0x20
7       Heavy       0x21
8       Wand        0x03
9       Ring        0x30
10      Skin        0x50
11      Spell       0x12
12      Seal        0x16
13      Cloak       0x10
14      Robe        0x21
15      Quiver      0x11
16      Helm        0x14
17      Staff       0x02
18      Poison      0x17
19      Skull       0x18
20      Trap        0x19
21      Orb         0x1A
22      Prism       0x1B
23      Scepter     0x1C
24      Katana      0x05
25      Star        0x1D
26      Egg         0x40
*/

var slottypes = {
    1: 0x04,
    2: 0x00,
    3: 0x01,
    4: 0x13,
    5: 0x15,
    6: 0x20,
    7: 0x21,
    8: 0x03,
    9: 0x30,
    10: 0x50,
    11: 0x12,
    12: 0x16,
    13: 0x10,
    14: 0x21,
    15: 0x11,
    16: 0x14,
    17: 0x02,
    18: 0x17,
    19: 0x18,
    20: 0x19,
    21: 0x1A,
    22: 0x1B,
    23: 0x1C,
    24: 0x05,
    25: 0x1D,
    26: 0x40
}

//Get a slottype value which is eaiser to work with
function slotType(x){
    if(slottypes[x] != undefined){
        return slottypes[x];
    }

    return 0xFF;
}

//------------STATS------------

//SlotTypes:
/*
0       HP      0x1
3       MP      0x2
20      ATK     0x3
21      DEF     0x4
22      SPD     0x5
26      VIT     0x6
27      WIS     0x7
28      DEX     0x8
*/

var stats = {
    0: 0x1,
    3: 0x2,
    20: 0x3,
    21: 0x4,
    22: 0x5,
    26: 0x6,
    27: 0x7,
    28: 0x8,
    0x1: "Maximum HP",
    0x2: "Maximum MP",
    0x3: "Attack",
    0x4: "Defense",
    0x5: "Speed",
    0x6: "Vitality",
    0x7: "Wisdom",
    0x8: "Dexterity"
}

//Get a slottype value which is eaiser to work with
function stat(x){
    if(stats[x]){
        return stats[x];
    }

    return 0xFF;
}
