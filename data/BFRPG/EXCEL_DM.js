
function createEXCEL_DM(){

const EXCEL_DM =  {

"journal":{

"Favourites":[],

"Session Log":[],

"Rules":[],

"Items":{
"weapons": [
{
"name": "Hand Axe",
"cost": "4",
"size": "S",
"weight": "5",
"damage":"1d6",
"description": "Small, light axe, good for throwing"
},
{
"name": "Battle Axe",
"cost": "7",
"size": "M",
"weight": "7",
"damage":"1d8",
"description": "A standard axe for combat"
},
{
"name": "Great Axe",
"cost": "14",
"size": "L",
"weight": "15",
"damage":"1d10",
"description":"A larger, heavier axe for combat"
},
{
"name": "Pickaxe (Military Pick)",
"cost": "6",
"size": "S",
"weight": "4",
"damage":"1d6",
"description": "A weapon with a sharpened spike instead of a blade."
},
{
"name": "Mattock (Footman's Pick)",
"cost":"8",
"size":"M",
"weight":"6",
"damage":"1d8",
"description": "A larger pickaxe, similar to the military pick, but larger and heavier."
},
{
"name": "Dagger",
"cost": "2",
"size": "S",
"weight": "1",
"damage":"1d4",
"description": "A short, sharp blade, good for thrusting."
},
{
"name": "Defending Dagger",
"cost": "7",
"size": "S",
"weight": "2",
"damage":"1d4",
"description":"A dagger with features to help catch or defend against other blades"
},
{
"name": "Silver Dagger",
"cost":"25",
"size":"S",
"weight":"1",
"damage":"1d4",
"description":"A dagger with a silver blade, effective against lycanthropes."
},
{
"name": "Shortsword / Cutlass",
"cost": "6",
"size": "S",
"weight": "3",
"damage":"1d6",
"description":"A shorter sword, good for thrusting or slashing."
},
{
"name": "Longsword / Scimitar",
"cost": "10",
"size": "M",
"weight": "4",
"damage":"1d8",
"description": "A versatile, medium-length sword for slashing and thrusting."
},
{
"name": "Two-Handed Sword",
"cost": "18",
"size": "L",
"weight": "10",
"damage":"1d10",
"description":"A large sword requiring two hands to use."
},
{
"name": "Warhammer",
"cost": "4",
"size": "S",
"weight": "6",
"damage":"1d6",
"description":"A hammer balanced for throwing or melee."
},
{
"name": "Light Mace",
"cost": "5",
"size": "S",
"weight": "5",
"damage":"1d6",
"description":"A small, light mace, better suited for mounted combat or smaller characters."
},
{
"name": "Mace",
"cost": "6",
"size": "M",
"weight": "10",
"damage":"1d8",
"description":"A standard bludgeoning weapon with a head."
},
{
"name": "Morningstar",
"cost": "7",
"size": "M",
"weight": "7",
"damage":"1d8",
"description":"A mace with spikes or blades on the head."
},
{
"name": "Maul / Great Mace",
"cost": "10",
"size": "L",
"weight": "16",
"damage":"1d10",
"description":"Larger, two-handed versions of the hammer and mace."
},
{
"name": "Spear",
"cost": "5",
"size": "M",
"weight": "5",
"damage":"1d6 (one-handed or thrown), 1d8 (two-handed)",
"description":"A simple weapon with a pointed end. Can be thrown one-handed, used in melee one-handed, or melee two-handed."
},
{
"name": "Fork / Trident",
"cost": "6",
"size": "M",
"weight": "5",
"damage":"1d6 (one-handed or thrown), 1d8 (two-handed)",
"description":"A spear with a double or triple-pronged head, can be used to entangle."
},
{
"name": "Boar Spear",
"cost": "6",
"size": "M",
"weight": "5",
"damage":"1d6 (one-handed or thrown), 1d8 (two-handed)",
"description":"A spear with a crossbar to prevent impaled opponents from reaching the wielder."
},
{
"name": "Lance",
"cost": "10",
"size": "L",
"weight": "10",
"damage":"1d8",
"description":"A larger, sturdier spear, best used when mounted."
},
{
"name": "Quarterstaff",
"cost":"2",
"size":"L",
"weight":"4",
"damage":"1d6",
"description":"A long pole that functions as a headless spear."
},
{
"name": "Pole Arm",
"cost": "9",
"size": "L",
"weight": "15",
"damage":"1d10",
"description":"A long pole weapon, typically with a blade, axe, or spike on top."
},
{
"name":"Chain",
"cost":"9",
"size":"M/L",
"weight":"3",
"damage":"1d4",
"description":"A length of chain that can be used as a weapon."
},
{
"name": "Flail",
"cost":"8",
"size":"M",
"weight":"6",
"damage":"1d8",
"description":"A weapon with a weighted head attached to a handle by a chain."
},
{
"name":"Great Flail",
"cost":"12",
"size":"L",
"weight":"15",
"damage":"1d10",
"description":"A larger, two-handed version of a flail."
},
{
"name": "Whip",
"cost":"3",
"size":"M",
"weight":"2",
"damage":"1d3",
"description":"A flexible weapon good for entangling."
},
{
"name": "Club/Cudgel/Walking Staff",
"cost": "0.2",
"size": "M",
"weight": "1",
"damage":"1d4",
"description":"A simple bludgeoning weapon."
},
{
"name": "Silver Walking Stick/Staff",
"cost":"4",
"size":"M",
"weight":"1",
"damage":"1d4",
"description":"A walking stick with a silver head or handle."
},
{
"name":"Greatclub",
"cost":"3",
"size":"L",
"weight":"8",
"damage":"1d8",
"description":"A heavy, two-handed club."
},
{
"name":"Sap/Blackjack",
"cost":"1",
"size":"S",
"weight":"1",
"damage":"1d4 (subduing)",
"description":"A small, subduing weapon."
},
{
"name":"Hook",
"cost":"0.6",
"size":"S",
"weight":"1",
"damage":"1d4",
"description":"A hook-shaped weapon or implement."
},
{
"name": "Sickle",
"cost":"2",
"size":"S",
"weight":"2",
"damage":"1d6",
"description":"An inward-curved cutting weapon"
},
{
"name":"Scythe",
"cost":"7",
"size":"L",
"weight":"10",
"damage":"1d8",
"description":"A large, inward-curved cutting weapon"
},
{
"name": "Shortbow",
"cost": "25",
"size": "M",
"weight": "2",
"damage":"1d6",
"description": "A bow with a shorter stave, good for smaller characters."
},
{
"name": "Silver Quarrel, Light",
"cost": "5",
"size": "XS",
"weight": "*",
"damage":"1d6",
"description": ""
},
{
"name": "Silver Quarrel, Heavy",
"cost": "10",
"size": "XS",
"weight": "*",
"damage":"1d8",
"description": ""
},
{
"name": "Quarrel, Light",
"cost": "0.2",
"size": "XS",
"weight": "*",
"damage":"1d6",
"description": ""
},
{
"name": "Quarrel, Heavy",
"cost": "0.4",
"size": "XS",
"weight": "*",
"damage":"1d8",
"description": ""
},
{
"name": "Arrow, Shortbow",
"cost": "0.1",
"size": "XS",
"weight": "*",
"damage":"1d6",
"description": "An arrow composed of an arrowhead, shaft, and flights."
},

{
"name": "Silver Arrow, Shortbow",
"cost": "1",
"size": "XS",
"weight": "*",
"damage":"1d6",
"description": "An arrow composed of arrowhead, shaft, and flights. The arrowhead is made of silver."
},

{
"name": "Arrow, Longbow",
"cost": "0.2",
"size": "XS",
"weight": "*",
"damage":"1d8",
"description": "An arrow composed of an arrowhead, shaft, and flights."
},

{
"name": "Silver Arrow, Longbow",
"cost": "4",
"size": "XS",
"weight": "*",
"damage":"1d6",
"description": "An arrow composed of arrowhead, shaft, and flights. The arrowhead is made of silver."
},
{
"name": "Longbow",
"cost": "60",
"size": "L",
"weight": "3",
"damage":"1d8",
"description": "A bow with a longer stave for more power and range."
},
{
"name": "Light Crossbow",
"cost": "30",
"size": "M",
"weight": "7",
"damage":"1d6",
"description": "A lighter crossbow with shorter range and less damage."
},
{
"name": "Heavy Crossbow",
"cost": "50",
"size": "L",
"weight": "14",
"damage":"1d8",
"description":"A more powerful crossbow with longer range and more damage."
},
{
"name": "Hand Crossbow",
"cost":"150",
"size":"S",
"weight":"3",
"damage":"1d3",
"description":"A small, one-handed crossbow with short range and less power."
},
{
"name": "Bullet Crossbow",
"cost":"30",
"size":"M",
"weight":"7",
"damage":"N/A",
"description":"A crossbow that fires a bullet."
},
{
"name": "Sling",
"cost": "1",
"size": "S",
"weight": "*",
"damage":"1d4 with sling bullets, 1d3 with stones",
"description": "A simple tool that launches a small projectile at high speed."
},
{
"name": "Bola",
"cost": "2",
"size":"S",
"weight":"2",
"damage":"1d3",
"description":"A weapon with weights on the ends of a cord, good for entangling."
},
{
"name": "Dart / Throwing Blade",
"cost":"1",
"size":"S",
"weight":"* to ½",
"damage":"1d3",
"description":"A small, sharp projectile."
},
{
"name": "Javelin",
"cost":"1",
"size":"M",
"weight":"2",
"damage":"1d4",
"description":"A spear-like weapon designed for throwing."
},
{
"name": "Blowgun",
"cost":"2",
"size":"M",
"weight":"2",
"damage":"1d3",
"description":"A long, hollow tube that uses lung power to fire small darts."
},
{
"name": "Net",
"cost":"20",
"size":"M",
"weight":"5",
"damage":"N/A",
"description":"A weapon used to entangle."
},
{
"name": "Spade",
"cost":"2",
"size":"M",
"weight":"4",
"damage":"1d6",
"description":"A tool that can be used as an improvised weapon."
},
{
"name": "Crowbar",
"cost":"2",
"size":"M",
"weight":"5",
"damage":"1d6",
"description":"A tool that can be used as an improvised weapon."
},
{
"name":"Pitchfork",
"cost":"1",
"size":"M",
"weight":"3",
"damage":"1d6",
"description":"A tool that can be used as an improvised weapon."
},
{
"name":"Frying Pan",
"cost":"0.8",
"size":"S",
"weight":"4",
"damage":"1d4",
"description":"A cooking tool that can be used as an improvised weapon."
},
{
"name":"Torch (fire damage)",
"cost":"N/A",
"size":"S",
"weight":"*",
"damage":"1d3",
"description":"A source of light that can be used as an improvised weapon, dealing fire damage."
},
{
"name":"Punch",
"cost":"N/A",
"size":"N/A",
"weight":"N/A",
"damage":"1d3",
"description":"An unarmed attack"
},
{
"name":"Kick",
"cost":"N/A",
"size":"N/A",
"weight":"N/A",
"damage":"1d4",
"description":"An unarmed attack"
},
{
"name":"Gauntlet/Pommel",
"cost":"N/A",
"size":"N/A",
"weight":"N/A",
"damage":"1d3",
"description":"An unarmed attack using a gauntlet or the pommel of a weapon"
},
{
"name":"Cestus/Spiked Gauntlet",
"cost":"1",
"size":"S",
"weight":"2",
"damage":"1d3",
"description":"A gauntlet with spikes on it."
}
],
"general": [
{
"name": "Backpack (Standard or Halfling)",
"weight": "*",
"cost": "4"
},
{
"name": "Belt Pouch",
"weight": "*",
"cost": "1"
},
{
"name": "Bit and bridle",
"weight": "3",
"cost":"1.5"
},
{
"name":"Candles, 12",
"weight": "*",
"cost": "1"
},
{
"name":"Chalk, small bag of pieces",
"weight": "*",
"cost": "2"
},
{
"name": "Cloak",
"weight": "1",
"cost": "2"
},
{
"name": "Clothing, common outfit",
"weight": "1",
"cost": "4"
},
{
"name":"Glass bottle or vial",
"weight":"*",
"cost":"1"
},
{
"name": "Grappling Hook",
"weight": "4",
"cost": "2"
},
{
"name":"Holy Symbol",
"weight":"*",
"cost":"25"
},
{
"name":"Holy Water, per vial",
"weight":"*",
"cost":"10"
},
{
"name":"Horseshoes & shoeing",
"weight":"10",
"cost":"1"
},
{
"name":"Ink, per jar",
"weight":"½",
"cost":"8"
},
{
"name":"Iron Spikes, 12",
"weight":"1",
"cost":"1"
},
{
"name":"Ladder, 10 ft.",
"weight":"20",
"cost":"1"
},
{
"name":"Lantern",
"weight":"2",
"cost":"5"
},
{
"name":"Lantern, Bullseye",
"weight":"3",
"cost":"14"
},
{
"name":"Lantern, Hooded",
"weight":"2",
"cost":"8"
},
{
"name":"Manacles (without padlock)",
"weight":"4",
"cost":"6"
},
{
"name": "Map or scroll case",
"weight": "½",
"cost": "1"
},
{
"name": "Mirror, small metal",
"weight":"*",
"cost": "7"
},
{
"name":"Oil (per flask)",
"weight":"1",
"cost":"1"
},
{
"name":"Padlock (with 2 keys)",
"weight":"1",
"cost":"12"
},
{
"name":"Paper (per sheet)",
"weight":"**",
"cost":"1"
},
{
"name":"Pole, 10' wooden",
"weight":"10",
"cost":"1"
},
{
"name": "Quill",
"weight": "**",
"cost": "0.1"
},
{
"name":"Quill Knife",
"weight":"*",
"cost":"1"
},
{
"name": "Quiver or Bolt case",
"weight": "1",
"cost": "1"
},
{
"name":"Rope, Hemp (per 50 ft.)",
"weight":"5",
"cost":"1"
},
{
"name": "Rope, Silk (per 50 ft.)",
"weight": "2",
"cost": "10"
},
{
"name":"Sack, Large",
"weight":"*",
"cost":"1"
},
{
"name":"Sack, Small",
"weight":"*",
"cost":"0.5"
},
{
"name": "Saddle, Pack",
"weight":"15",
"cost": "5"
},
{
"name": "Saddle, Riding",
"weight":"35",
"cost": "10"
},
{
"name":"Saddlebags, pair",
"weight":"7",
"cost":"4"
},
{
"name": "Spellbook (128 pages)",
"weight":"1",
"cost": "25"
},
{
"name": "Tent, Large (ten men)",
"weight":"20",
"cost": "25"
},
{
"name": "Tent, Small (one man)",
"weight":"10",
"cost": "5"
},
{
"name": "Thieves' picks and tools",
"weight": "1",
"cost":"25"
},
{
"name":"Tinderbox, flint and steel",
"weight":"1",
"cost":"3"
},
{
"name":"Torches, 6",
"weight":"1",
"cost":"1"
},
{
"name":"Whetstone",
"weight":"1",
"cost":"1"
},
{
"name":"Whistle",
"weight":"**",
"cost":"1"
},
{
"name": "Wineskin/Waterskin",
"weight":"2",
"cost": "1"
},
{
"name": "Winter blanket",
"weight":"3",
"cost": "1"
}
],
"armor":[
{
"name": "No Armor",
"cost": 0,
"weight": 0,
"AC": 11,
"description": "Unarmored."
},
{
"name": "Padded or Quilted",
"cost": 15,
"weight": 10,
"AC": 12,
"description": "Created from layers of cloth. Often ceremonial, offers minimal protection. Good insulation for winter, but requires frequent laundering. Used as undergarment for metal armors."
},
{
"name": "Hide",
"cost": 10,
"weight": 30,
"AC": 13,
"description": "Made from cured beast hide sewn to clothing. Common in remote or barbaric areas. Hot and itchy, but offers protection similar to leather."
},
{
"name": "Leather",
"cost": 20,
"weight": 15,
"AC": 13,
"description": "Made of hardened and/or layered leather pieces sewn to a cloth undergarment. Offers flexibility and moderate protection."
},
{
"name": "Studded Leather",
"cost": 30,
"weight": 25,
"AC": 14,
"description": "Leather armor with metal studs or small plates riveted to it. Offers added protection at slight cost of mobility."
},
{
"name": "Ring Mail",
"cost": 25,
"weight": 30,
"AC": 14,
"description": "Steel rings sewn directly to a soft, supple leather undergarment. Offers great flexibility and decent protection."
},
{
"name": "Brigandine",
"cost": 80,
"weight": 30,
"AC": 15,
"description": "Cloth or leather garment lined with small steel plates, riveted to the fabric. Typically worn over padded undergarment. AC 14 and weight 20 lbs if worn without undergarment."
},
{
"name": "Chain Mail",
"cost": 60,
"weight": 40,
"AC": 15,
"description": "Interwoven metal rings worn over padded undergarment. Very flexible and durable. AC 14 and weight 30 lbs if worn without undergarment."
},
{
"name": "Scale Mail",
"cost": 80,
"weight": 55,
"AC": 16,
"description": "Metal scales woven to an undergarment. Offers flexibility and moderate protection. Includes Lamellar armor."
},
{
"name": "Splint Mail",
"cost": 100,
"weight": 45,
"AC": 16,
"description": "Chain mail with small strips of thick metal interwoven. Offers better protection than regular chain mail but heavier and less flexible."
},
{
"name": "Banded Mail",
"cost": 200,
"weight": 35,
"AC": 16,
"description": "Laminar armor with overlapping metal strips. Includes vambraces, greaves, and/or armored sleeves. Lighter than other armors in its category but may be more difficult to maintain."
},
{
"name": "Plate Mail",
"cost": 300,
"weight": 50,
"AC": 17,
"description": "Large metal plates covering torso, arms, and legs, attached to chain mail. Worn over padded undergarment. AC 16 and weight 40 lbs if worn without undergarment."
},
{
"name": "Field Plate Mail",
"cost": 500,
"weight": 70,
"AC": 18,
"description": "Solid plate armor pieces with sliding parts, hinges, and straps. Small chain mail pieces cover joints. Must be custom fitted. AC 17 and weight 60 lbs if worn without undergarment."
},
{
"name": "Full Plate Mail",
"cost": 1500,
"weight": 80,
"AC": 19,
"description": "Superior design of field plate armor. Covers wearer more fully, generally without chain mail. Deflects weapon strikes from vulnerable joints. -1 penalty to attack rolls due to limited mobility. Requires assistance to put on, takes at least 1 turn to don."
}
],
"clothing":[
{"name": "Baldric, Belt Sash", "cost": "0.8", "weight": 1, "description": "A Baldric or Belt Sash is a belt worn across the torso with attachment for a scabbard. Typically this rests the weapon at the hip, but a scabbard could easily be attached to the back of the baldric for an over-the-shoulder draw. Small pouches or weapon scabbards may be attached to a baldric strap. This includes Bandoleers."},
{"name": "Belt", "cost": "0.6", "weight": "*", "description": "A Belt is a strip of leather worn around the waist to help hold up a person's trousers or pants. A scabbard could also be hung from it."},
{"name": "Belt Hook or Ring", "cost": "0.1", "weight": 1, "description": "A Hook or Ring is a weapon attachment for a belt or strap, to hold an axe, hammer, or mace. It is effectively a scabbard for a hafted weapon."},
{"name": "Belt, Money Belt", "cost": "4", "weight": 1, "description": "A Money belt is a broad leather belt including one or two slim, hidden pouches for hiding coins or other small goods It has a maximum capacity of about 50 coins."},
{"name": "Belt, Weapon Belt", "cost": "1", "weight": 2, "description": "A Weapon belt is a large, heavy belt designed to distribute the weight of a weapon across the hips, while holding it in position for easy retrieval."},
{"name": "Bracers", "cost": "0.6", "weight": "½", "description": "Bracers are strips of leather that wrap around the lower arm between the elbow and wrist, providing protection to archers from the bowstring striking the inside of the lower arm while firing a bow."},
{"name": "Bustle", "cost": "3", "weight": 1, "description": "A Bustle is similar to a skirt and actually fits under a skirt to give it a fuller shape."},
{"name": "Corset", "cost": "1", "weight": 1, "description": "A Corset is a support garment commonly worn to hold and train the torso into a desired shape. It is usually either boned cloth or leather."},
{"name": "Corset, Leather", "cost": "5", "weight": 2, "description": ""},
{"name": "Girdle", "cost": "1", "weight": 1, "description": "A Girdle is a strip of cloth that is wrapped and tied around a person's midsection and provides some relief to back pain from riding in a saddle over long distances. A Gorget is a band of cloth worn around the neck without the knot showing."},
{"name": "Gorget", "cost": "3", "weight": 2, "description": ""},
{"name": "Sash", "cost": "0.2", "weight": "*", "description": "A Sash is a cloth or silk version of a belt that is usually used to hold a robe, surcoat, or toga tightly to the body. A Scabbard covers the blade of a knife or sword, and may be readily attached to a belt or harness to safely carry the weapon."},
{"name": "Sash, Silk", "cost": "10", "weight": "*", "description": ""},
{"name": "Scabbard Suspenders", "cost": "0.7", "weight": "½", "description": ""},
{"name": "Scabbard, Medium", "cost": "0.3", "weight": 1, "description": ""},
{"name": "Scabbard, Small", "cost": "1 sp", "weight": "*", "description": ""},
{"name": "Suspenders / Braces", "cost": "4 sp", "weight": "*", "description": "Suspenders/Braces are strips of cloth that connect to trousers or pants and go over the shoulders to hold the trousers/pants up."},
{"name": "Cap", "cost": "0.1", "weight": "*", "description": "A Cap is a soft fabric headcover with no real shape, usually without a brim. Woolen Caps are the traditional beanie cap."},
{"name": "Cap, Woolen", "cost": "0.2", "weight": "*", "description": "A Cap is a soft fabric headcover with no real shape, usually without a brim. Woolen Caps are the traditional beanie cap."},
{"name": "Hat, Cloth", "cost": "0.5", "weight": 1, "description": "A Hat is a shaped head covering with a brim. A Headband is a leather band to keep the wearer's hair out of their eyes."},
{"name": "Hat, Fur", "cost": "1", "weight": 2, "description": "A Hat is a shaped head covering with a brim. A Headband is a leather band to keep the wearer's hair out of their eyes."},
{"name": "Hat, Straw", "cost": "0.02", "weight": 1, "description": "A Hat is a shaped head covering with a brim. A Headband is a leather band to keep the wearer's hair out of their eyes."},
{"name": "Headband", "cost": "0.07", "weight": "*", "description": "A Headband, Tooled is a finely tooled and decorated version of the headband."},
{"name": "Headband, Tooled", "cost": "0.2", "weight": "*", "description": "A Headband, Tooled is a finely tooled and decorated version of the headband."},
{"name": "Hood or Cowl, Wool or Linen", "cost": "0.2", "weight": 1, "description": "A Hood is a detachable piece of clothing to wear with a cape that covers the wearers head. A Cowl is a hood with a very short cape piece that covers the shoulders."},
{"name": "Scarf", "cost": "0.5", "weight": 1, "description": "A Scarf is a square of cloth that is folded on the diagonal and then tied under the wearer's chin."},
{"name": "Turban", "cost": "0.3", "weight": 2, "description": "A Turban is a length of cloth that is wrapped around the wearer's head, usually in arid or desert settings. During dust storms, a portion of the turban can be brought down over the wearer's eyes and mouth to prevent sand from getting in the wearer's face."},
{"name": "Veil, Silk", "cost": "1", "weight": "*", "description": "A Veil is a short piece of cloth that is hung over the wearer's face for religious ceremonies or to cover a disfigurement. A Thief may want to wear one as part of a disguise."},
{"name": "Wig", "cost": "1", "weight": 1, "description": "A Wig is a close-fitting cloth with either human or animal hair that is styled, and many times worn by members of government or law. A Thief may try to style one as part of a disguise."},
{"name": "Cape, Full", "cost": "0.7", "weight": 1, "description": "A Full Cape is a section of cloth that extends from the neck to thefloor, and is attached at the neck by a brooch or clasp. A hood can be attached to cover the wearer's head during inclement weather or to hide one's appearance."},
{"name": "Cape, Half", "cost": "0.4", "weight": "½", "description": "A Half Cape is a section of cloth that extends from the neck to the waist, and is attached at the neck by a brooch or clasp. A hood can be attached to cover the wearer's head during inclement weather or to hide one's appearance."},
{"name": "Cloak, Adventurers", "cost": "2", "weight": 1, "description": "A Cloak is similar to a cape, but includes a hood to cover the wearer's head. Adventurer's Cloaks are full-length with a long hood that can be used to stash valuables."},
{"name": "Cloak, Fur", "cost": "4", "weight": 2, "description": "A Cloak is similar to a cape, but includes a hood to cover the wearer's head. Fur Cloaks are full length hooded cloaks made of tanned furs."},
{"name": "Cloak, Fur trimmed", "cost": "10", "weight": 1, "description": "A Cloak is similar to a cape, but includes a hood to cover the wearer's head. Fur Trimmed Cloaks are plain cloaks, with strips of fur trimming the edges. They are also usually more decorated and colorful."},
{"name": "Cloak, Leather", "cost": "4", "weight": 2, "description": "A Cloak is similar to a cape, but includes a hood to cover the wearer's head. Leather Cloaks are full length hooded cloaks made of leather instead of wool."},
{"name": "Cloak, Plain", "cost": "0.5", "weight": 1, "description": "A Cloak is similar to a cape, but includes a hood to cover the wearer's head. A Plain Cloak can be either short or full-length, and has a closer-fitting hood."},
{"name": "Cloak, Traveling", "cost": "0.8", "weight": 1, "description": "A Cloak is similar to a cape, but includes a hood to cover the wearer's head. Traveling Cloaks are half-length and have a slit to allow the cloak to be draped over either side of a rider's horse. "},
{"name": "Coat, Long", "cost": "0.8", "weight": 1, "description": "A Coat, Long is a long sleeved coat that falls to about the mid-shins, and is made of wool, felt, serge or canvas."},
{"name": "Coat, Leather", "cost": "2", "weight": 1, "description": "Leather Coats are the same cut, but made of soft leather."},
{"name": "Coat, Fur", "cost": "8", "weight": 2, "description": "Fur Coats are full length coats, well tanned with the fur on the outside."},
{"name": "Jacket", "cost": "1", "weight": 1, "description": "A Jacket is a long-sleeved covering for a shirt. It can either be pulled over the head or buttoned."},
{"name": "Jacket, Leather", "cost": "2", "weight": 1, "description": "A Jacket is a long-sleeved covering for a shirt. It can either be pulled over the head or buttoned."},
{"name": "Surcoat", "cost": "6 sp", "weight": "*", "description": "A Surcoat is a section of cloth with a hole cut out that fits over the wearer's head. It is generally worn by knights as a cover over armor and may have the knight's heraldry embroidered upon it, though an embroidered version will cost twice as much."},
{"name": "Tabards", "cost": "2", "weight": "*", "description": "A Tabard is similar to a Surcoat, but is meant for royal courts with even fancier embroidery that is related to the king's heraldry."},
{"name": "Toga", "cost": "1", "weight": 1, "description": "A Toga is a lightweight length of material that is wrapped around the body and is draped over one shoulder."},
{"name": "Apron, Canvas", "cost": "1", "weight": 1, "description": "An Apron is a loose piece of material that has a loop that goes over the wearer's head with two long strings at the sides that are either tied in the back or are wrapped around the waist and tied at the front.Canvas is used for covering where the user isn't exposed to heat very often. Tavern keeps, cooks, butchers, potters, and artists are the most common users. "},
{"name": "Apron, Leather", "cost": "2", "weight": 2, "description": "An Apron is a loose piece of material that has a loop that goes over the wearer's head with two long strings at the sides that are either tied in the back or are wrapped around the waist and tied at the front. Leather is used where there is a chance of something that could go through a canvas apron for such professions as smithies (any), coopers (barrel makers), armorers, weapon makers, and masons."},
{"name": "Blouse, Linen", "cost": "0.1", "weight": "*", "description": "A Blouse is a loose-fitting shirt buttoned down the front. This is the upper clothing worn by many commoners and craftspeople."},
{"name": "Breeches", "cost": "0.1", "weight": "*", "description": "Breeches are short pants ending just below the knee. A Doublet is a long-sleeved jacket that is fitted down to the waist."},
{"name": "Doublet", "cost": "1", "weight": 1, "description": ""},
{"name": "Gown or Dress, common", "cost": "1.2", "weight": 1, "description": ""},
{"name": "Hose", "cost": "5 sp", "weight": "*", "description": "A Hose is a tight-fitting footed legging that comes up to the crotch."},
{"name": "Hose Supporter/Garter", "cost": "0.5", "weight": "**", "description": "Hose Supporters comes in two types; a garter that fits around the leg, and a garter belt that fits around the body and has several thongs hanging down that attach to the top of the hose."},
{"name": "Jerkin, Leather", "cost": "2", "weight": 1, "description": "A Jerkin is a sleeveless jacket that may be worn over a doublet."},
{"name": "Jerkin, Wool or Linen", "cost": "1", "weight": "*", "description": "A Jerkin is a sleeveless jacket that may be worn over a doublet."},
{"name": "Leggings", "cost": "0.9", "weight": "*", "description": "Leggings are tight cloth or leather pants that use a heavier material than hose."},
{"name": "Leggings, Leather", "cost": "2", "weight": "*", "description": ""},
{"name": "Loincloth", "cost": "0.02", "weight": "**", "description": "A Loincloth is usually made from leather or animal skins and just covers the wearer's private parts. It is mostly used by barbarians, ogres, and trolls."},
{"name": "Robe, Common", "cost": "0.9", "weight": 2, "description": "A Robe is a garment that extends to the floor, and is usually worn by royalty, Magic-Users, and Clerics. The Common version is not adorned and is used for daily wear."},
{"name": "Robe, Embroidered", "cost": "10", "weight": 3, "description": "A Robe is a garment that extends to the floor, and is usually worn by royalty, Magic-Users, and Clerics. An Embroidered robe is for formal occasions. "},
{"name": "Robe, Lounging", "cost": "2", "weight": 2, "description": "A Robe is a garment that extends to the floor, and is usually worn by royalty, Magic-Users, and Clerics. The Lounging version isn't made for heavy use, and is usually of a light material."},
{"name": "Tunic", "cost": "0.8", "weight": "*", "description": "A Tunic is a loose garment draped over the shoulders and going at least to the wearer's knees if not the floor. A Shirt or Chemise is a loose-fitting garment similar to a blouse that is pulled over the head."},
{"name": "Shirt or Chemise", "cost": "0.8", "weight": "*", "description": ""},
{"name": "Shirt or Chemise, Silk", "cost": "15", "weight": "*", "description": ""},
{"name": "Skirt or Kilt", "cost": "0.8", "weight": "*", "description": "A Skirt or Kilt is a form of garment that covers the wearers mid-section and extends at least to the knees. Skirts are usually floor length. Kilts are a kind of skirt specifically worn by men. The pattern of the plaid on a kilt is an indication of the tribe that a man is from."},
{"name": "Skirt or Kilt, Leather", "cost": "2", "weight": "*", "description": "A Skirt or Kilt is a form of garment that covers the wearers mid-section and extends at least to the knees. Skirts are usually floor length."},
{"name": "Trousers or Trews", "cost": "0.8", "weight": "*", "description": "Trousers or Trews are garments with two legs and covering the waist. Trousers are looser-fitting than leggings. Trews are tighter fitting than trousers but still looser than leggings and are typically plaid like kilts. The plaid pattern is again an indication of the tribe to which the wearer belongs."},
{"name": "Trousers or Trews, Leather", "cost": "2", "weight": "*", "description": "Trousers or Trews are garments with two legs and covering the waist."},
{"name": "Vest, Cloth w/Pockets", "cost": "0.8", "weight": "*", "description": "Vests are sleeveless garments worn over a shirt."},
{"name": "Vest, Fur / Leather", "cost": "2", "weight": "*", "description": "Vests are sleeveless garments worn over a shirt."},
{"name": "Boots, High", "cost": "2", "weight": 2, "description": "Boots are a kind of shoe with a top that covers the ankle or higher. High boots go up to the wearer's knee, but the upper portion is loose. Since boots have a harder sole that the leather is attached to, they make a lot of noise on tile floors. A Thief trying to Move Silently while wearing them has a 10% penalty."},
{"name": "Boots,Swash-topped", "cost": "2", "weight": 2, "description": "Boots are a kind of shoe with a top that covers the ankle or higher. Swash-topped boots go up to the wearer's knee, but the upper portion is loose and have a section that is folded over from the top. Since boots have a harder sole that the leather is attached to, they make a lot of noise on tile floors. A Thief trying to Move Silently while wearing them has a 10% penalty. "},
{"name": "Boots, Low", "cost": "1", "weight": 1, "description": "Boots are a kind of shoe with a top that covers the ankle or higher. Low boots come up just over the wearer's ankles. Since boots have a harder sole that the leather is attached to, they make a lot of noise on tile floors. A Thief trying to Move Silently while wearing them has a 10% penalty."},
{"name": "Boots, Riding", "cost": "3", "weight": 2, "description": "Boots are a kind of shoe with a top that covers the ankle or higher. Riding boots are knee-high with a tight-fitting upper portion. Since boots have a harder sole that the leather is attached to, they make a lot of noise on tile floors. A Thief trying to Move Silently while wearing them has a 10% penalty."},
{"name": "Foot wraps", "cost": "0.03", "weight": "*", "description": "Foot wraps are long pieces of cloth that are wrapped around the feet to prevent cuts or scrapes while walking in the cold or over rough ground, and are usually worn by peasants. Thieves could use these with a bonus of 10% when Moving Silently. "},
{"name": "Sandals", "cost": "0.05", "weight": "*", "description": "Sandals are hard-soled footwear with leather straps to fasten them."},
{"name": "Shoes", "cost": "0.8", "weight": "½", "description": "Shoes are footwear that doesn't go above the user's ankles. They have a hard sole and can be noisy on tiled floors."},
{"name": "Shoes, Moccasins", "cost": "2", "weight": "*", "description": " Moccasins have a soft sole which allow a Thief a 5% better chance of Moving Silently."},
{"name": "Slippers", "cost": "1.5", "weight": "*", "description": "Slippers are like moccasins without a back portion, but there is a chance that they could fall off while walking or running. "},
{"name": "Snowshoes", "cost": "20", "weight": 2, "description": "Snowshoes are a loop of wood with a mesh of leather thongs across it. It is tied onto a pair of shoes to allow the wearer to walk on top of snow, but at 1/3 of their movement rate."},
{"name": "Gloves", "cost": "0.7", "weight": "**", "description": "Gloves are hand coverings with each finger separated. Use a -2 modifier to Dexterity if a character is wearing gloves and tries to do an action requiring a DEX roll."},
{"name": "Gloves, Fur Lined", "cost": "4", "weight": "*", "description": "Gloves are hand coverings with each finger separated. Use a -2 modifier to Dexterity if a character is wearing gloves and tries to do an action requiring a DEX roll."},
{"name": "Mittens", "cost": "0.3", "weight": "**", "description": " Mittens are hand coverings where the fingers are all together. Use a -4 modifier to Dexterity if a character is wearing mittens and attempts an action involving that ability score."}
],
"packs":[
{"name": "Bag Option 1", 
"cost": 7, 
"weight": 2.2, 
"description": "Backpack (normal or Halfling), Weapon Belt, Large Pouch. Capacity: 45 lb (35 lb for Halflings."},
{"name": "Bag Option 2", 
"cost": 11.8, 
"weight": 3.4, 
"description": "Oilskin Satchel, Baldric, Weapon Belt, Large Pouch, Belt Pouch(2). Capacity: 24 lb."
},
{"name": "Bag Option 2", 
"cost": 11.8, 
"weight": 3.4, 
"description": "Oilskin Satchel, Baldric, Weapon Belt, Large Pouch, Belt Pouch(2). Capacity: 24 lb."
},
{
"name": "Adventurer Pack 2",
"cost": 10.0,
"weight": 12.0,
"description": "Glass bottle; Iron Spikes, 12; Pole, 10 ft wooden; Map or scroll case; Mirror, small metal. Ready for anything."
},
{
"name": "Cleric Pack",
"cost": 60.0,
"weight": 18.3,
"description": "Bandages (10), Holy symbol, holy water (1), parchment (2), ink and quill, 1 week rations, tinderbox, waterskin. Protect and spread the faith."
},
{
"name": "Fighter Pack",
"cost": 21.0,
"weight": 22.8,
"description": "Bandages (5), Oil, cooking pot, 1 week rations, 3 large sacks, tinderbox, torches (6), waterskin, whetstone. Camp and battle basics."
},
{
"name": "Magic-User Pack",
"cost": 37.0,
"weight": 18.7,
"description": "Writing ink and quill, parchment (5), scroll case(2), spellbook*, hand mirror, 1 week rations, Torches (6), Tinderbox, glass vial. Scholar & Spellcaster. *The spell book is free for beginning Magic-Users; weight figure assumes a travel spellbook (½ lb)."
},
{
"name": "Thief Pack",
"cost": 58.0,
"weight": 31.2,
"description": "Candles (12), crowbar, grappling hook, mallet, iron spikes (12), 1 wk rations, large sack, small lens, Thieves' tools, tinderbox, waterskin, whetstone. Tools of the trade."
},
{
"name": "Dungeon Mapper",
"cost": 17.0,
"weight": 1.2,
"description": "10 sheets paper, ink, quill & quill knife, writing board, bag of chalk pieces."
},
{
"name": "Camp Cook Kit",
"cost": 24.0,
"weight": 23.0,
"description": "Iron pan, iron pot, Fire grate, mess kit, common spices, dried meat (2lb), standard rations (5 days), teapot."
}
],
"containers":[
{
"name": "Beltpouch",
"cost": 1.0,
"weight": 0.0,
"description": "Volume held: 1/4 cu ft. Weight held: 2 pounds."
},
{
"name": "Large Pouch or Purse",
"cost": 2.0,
"weight": 0.0,
"description": "Volume held: 1/2 cu ft. Weight held: 5 pounds. Pouches are small bags or pockets attached to a belt, tucked in a pocket, or hung from a cord. "
},
{
"name": "Backpack, Adventurer's",
"cost": 4.0,
"weight": 0.0,
"description": "Volume held: 3 cu ft. Weight held: 40 pounds. Backpacks are assumed to be of heavy canvas or leather."
},
{
"name": "Backpack, Halfling",
"cost": 4.0,
"weight": 0.0,
"description": "Volume held: 1 1/2 cu ft. Weight held: 30 pounds. Backpacks are assumed to be of heavy canvas or leather."
},
{
"name": "Backpack, Knapsack",
"cost": 3.0,
"weight": 0.0,
"description": "Volume held: 2 cu ft. Weight held: 25 pounds. A Knapsack is a small cloth backpack, basically a sack with shoulder straps."
},
{
"name": "Backpack, Wicker",
"cost": 0.07,
"weight": 0.0,
"description": "Volume held: 2 cu ft. Weight held: 15 pounds. A Wicker backpack is essentially an inexpensive and not very sturdy basket with shoulder straps."
},
{
"name": "Pack Vest",
"cost": 10.0,
"weight": 1.0,
"description": "Volume held: 2 cu ft. Weight held: 15 pounds. A Packvest is a leather vest set with multiple pouches and pockets on the front, sides, and inside, and a thin pouch set into the back. While it does not have the capacity of a full backpack, it is less cumbersome, fitting closer to the body and putting various tools and items within easy reach."
},
{
"name": "Satchel / Haversack",
"cost": 0.6,
"weight": 0.0,
"description": "Volume held: 1 cu ft. Weight held: 10 pounds. A Satchel or Haversack is a cloth or canvas shoulder- slung bag, designed to rest on the hip or slung behind. Generally a satchel is easier to access than a backpack, but displaces most hip weapons (anything larger than a dagger or handaxe). It is not uncommon to attach a Haversack to a Baldric, giving it a sturdier and more useful strap. These bags are large enough to hold a fair- sized book (such as a spellbook), making them popular among Magic-Users. These bags may be built with internal compartments. The Oilskin Satchel is made from waterproofed leather, providing better protection to its contents."
},
{
"name": "Satchel, Oilskin",
"cost": 6.0,
"weight": 0.0,
"description": "Water resistant. Volume held: 1 cu ft. Weight held: 15 pounds. A Satchel or Haversack is a cloth or canvas shoulder- slung bag, designed to rest on the hip or slung behind. Generally a satchel is easier to access than a backpack, but displaces most hip weapons (anything larger than a dagger or handaxe). It is not uncommon to attach a Haversack to a Baldric, giving it a sturdier and more useful strap. These bags are large enough to hold a fair- sized book (such as a spellbook), making them popular among Magic-Users. These bags may be built with internal compartments. The Oilskin Satchel is made from waterproofed leather, providing better protection to its contents."
},
{
"name": "Bag, Cloth",
"cost": 0.04,
"weight": 0.0,
"description": "Volume held: 1/4 cu ft. Weight held: 5 pounds."
},
{
"name": "Bag, Cloth, tiny",
"cost": 0.02,
"weight": 0.0,
"description": "Volume and weight held not specified."
},
{
"name": "Sack, Large",
"cost": 1.0,
"weight": 0.0,
"description": "Volume held: 4 cu ft. Weight held: 40 pounds. Sacks are made from burlap (a rough hemp fiber material), cotton, or leather, and are basically a tube- shaped.  Burlap is used mostly for large grains and small vegetables like corn (maize), beans, peppers, and hard- rind fruits like apples, oranges, and other citrus. Cotton material is used for small grains like rice, oats, or barley and for dry powdery material like flour and sugar."
},
{
"name": "Sack, Large Leather",
"cost": 2.0,
"weight": 0.0,
"description": "Volume held: 4 cu ft. Weight held: 60 pounds. Leather will provide a waterproof protection for dry powdery material and anything else stored in a sack. "
},
{
"name": "Sack, Small",
"cost": 0.5,
"weight": 0.0,
"description": "Volume held: 2 cu ft. Weight held: 20 pounds. Sacks are made from burlap (a rough hemp fiber material), cotton, or leather, and are basically a tube- shaped.  Burlap is used mostly for large grains and small vegetables like corn (maize), beans, peppers, and hard- rind fruits like apples, oranges, and other citrus. Cotton material is used for small grains like rice, oats, or barley and for dry powdery material like flour and sugar."
},
{
"name": "Sack, Small Leather",
"cost": 1.0,
"weight": 0.0,
"description": "Volume held: 2 cu ft. Weight held: 30 pounds. Leather will provide a waterproof protection for dry powdery material and anything else stored in a sack. "
},
{
"name": "Saddle Bags, Large",
"cost": 4.0,
"weight": 7.0,
"description": "Volume held: 1 cu ft. Weight held: 10 pounds. Saddle bags are leather bags designed to fit over the back of a riding saddle and provide some storage on a ridden animal. The bags are tied to the saddle to prevent them from falling off. A person can throw them over their shoulder to make sure any valuables that are in the saddlebags are not stolen while the rider is off their mount. The size is in relation to the size of the riding animal."
},
{
"name": "Saddle Bags, Small",
"cost": 3.0,
"weight": 5.0,
"description": "Volume held: 1/2 cu ft. Weight held: 5 pounds. Saddle bags are leather bags designed to fit over the back of a riding saddle and provide some storage on a ridden animal. The bags are tied to the saddle to prevent them from falling off. A person can throw them over their shoulder to make sure any valuables that are in the saddlebags are not stolen while the rider is off their mount. The size is in relation to the size of the riding animal."
}
],
"tools": [
{
"name": "Bell, small",
"cost": 1.0,
"weight": 0.0,
"description": "A small bell."
},
{
"name": "Bellows",
"cost": 10.0,
"weight": 3.0,
"description": "A Bellows is a fire tending tool that is about a foot long with a leather air bag between two wooden handles. When the handles are squeezed together, air will blow out the nozzle of the air bag, increasing the heat of a fire as well as clearing dust or ash."
},
{
"name": "Block and tackle",
"cost": 5.0,
"weight": 2.0,
"description": "A Block and tackle is a system of two or more pulleys with a rope threaded between them to reduce the weight of loads that are being lifted. The effective weight is reduced by ¼ with one pulley (lifting at load up 50 feet with 100 feet of rope), ½ with two pulleys (with 200 feet of rope), and by with three pulleys (with 400 feet of rope).⅔"
},
{
"name": "Bucket",
"cost": 0.5,
"weight": 2.0,
"description": "Holds up to 5 gallons. Weight when full: 15 pounds."
},
{
"name": "Canvas",
"cost": 0.4,
"weight": 5.0,
"description": "Per square yard."
},
{
"name": "Chain, Heavy",
"cost": 4.0,
"weight": 10.0,
"description": "Per foot of heavy chain."
},
{
"name": "Chain, Light",
"cost": 3.0,
"weight": 5.0,
"description": "Per foot of light chain."
},
{
"name": "Chisel",
"cost": 2.0,
"weight": 2.0,
"description": "A tool for carving or cutting hard materials."
},
{
"name": "Crowbar",
"cost": 2.0,
"weight": 10.0,
"description": "A Crowbar a bar of iron that curves at one end in a kind of hook shape. The end itself is flattened with a narrow split on the tip to help pull nails out of a board. The other end is flattened without a split to help pry one piece of wood from another or force open a jammed or locked door, or heavy objects such as a stone coffin lid. In game terms, add one to the die roll range when forcing a door with this tool. For example, a character with 16 Strength would open doors on 1-3 on 1d6; with a crowbar, the range becomes 1-4 on 1d6."
},
{
"name": "Fishing net",
"cost": 4.0,
"weight": 1.0,
"description": "10 feet square."
},
{
"name": "Grease Pot",
"cost": 5.0,
"weight": 5.0,
"description": "Grease is a thick, slippery lubricant made from made from animal fat, or oil from the ground. It is sold in a tin or jar, and is useful for cooking or lubrication. Not all forms are flammable or edible."
},
{
"name": "Hammer or Mallet",
"cost": 3.0,
"weight": 2.0,
"description": "A tool for striking or pounding."
},
{
"name": "Hand Drill",
"cost": 10.0,
"weight": 3.0,
"description": "A tool for making holes."
},
{
"name": "Hourglass",
"cost": 25.0,
"weight": 3.0,
"description": "Measures one hour."
},
{
"name": "Ladder",
"cost": 1.0,
"weight": 20.0,
"description": "10 feet long."
},
{
"name": "Marbles, Bag",
"cost": 0.8,
"weight": 1.0,
"description": "A bag of marbles."
},
{
"name": "Needle, sewing",
"cost": 0.5,
"weight": 0.0,
"description": "A small needle for sewing."
},
{
"name": "Paint, per gallon",
"cost": 1.5,
"weight": 4.0,
"description": "Cost ranges from 1-2 gp per gallon."
},
{
"name": "Paint, small pot",
"cost": 0.2,
"weight": 1.0,
"description": "A small pot of paint."
},
{
"name": "Pick Axe, Mining",
"cost": 4.0,
"weight": 7.0,
"description": "A Pick Axe is a 'T' shaped tool with a wooden handle, and a combination metal hammer and pick at the end. It is designed for breaking up stones and soil or prying things open. It is also used for prospecting or ice climbing. It deals 1d3 points of damage if used as a weapon."
},
{
"name": "Pliers",
"cost": 1.0,
"weight": 1.0,
"description": "A hand tool used to hold objects firmly."
},
{
"name": "Pole, 10 ft Collapsing",
"cost": 50.0,
"weight": 15.0,
"description": " Collapsing Pole is a handy invention consisting of ten 1- foot wood sections, and two metal end caps. Each piece is threaded so that the pieces can be combined to make a pole of any needed length. Collapsing poles from the same maker may be combined for longer reach.  "
},
{
"name": "Pole, 10 ft wooden",
"cost": 1.0,
"weight": 10.0,
"description": "A standard 10-foot wooden pole."
},
{
"name": "Scissors",
"cost": 0.5,
"weight": 1.0,
"description": "A cutting instrument."
}
],
"dungeon":[
{
"name": "Candles",
"cost": 1.0,
"weight": 0.0,
"description": "12 candles. A Candle will shed light over a 5 foot radius, with dim light extending a further 5 feet. A normal candle will burn about 3 turns per inch of height."
},
{
"name": "Chalk",
"cost": 2.0,
"weight": 0.0,
"description": "Small bag of chalk pieces. Chalk is useful for 'blazing a trail' through a dungeon or ruin to ensure that the adventurers can find their way back out again."
},
{
"name": "Charcoal sticks",
"cost": 1.0,
"weight": 0.0,
"description": "Sticks of charcoal for writing or drawing. Charcoal consists of pieces of carbonized wood, which can be used like chalk (making black markings), or may be added to tinder."
},
{
"name": "Coal Keeper",
"cost": 2.0,
"weight": 1.0,
"description": "A small, lined ceramic pot designed to hold and keep a small coal or ember lit for several hours. While this will resist moisture and wind, immersion will extinguish the coal immediately."
},
{
"name": "Cord/Strap",
"cost": 0.1,
"weight": 1.0,
"description": "Per 3 feet of cord or strap. A short length of thin rope, leather, or a short belt for tying something to an arm, leg, or other accessories. This can secure a scabbard to an arm or leg, or attach a pouch to a baldric, or the strap of a backpack."
},
{
"name": "Flask, Silver",
"cost": 20.0,
"weight": 1.0,
"description": "A silver flask for holding liquids. Flasks are metal containers with stoppers that hold between 8 and 12 oz of liquid."
},
{
"name": "Flask, Steel",
"cost": 2.0,
"weight": 1.0,
"description": "A steel flask for holding liquids. Flasks are metal containers with stoppers that hold between 8 and 12 oz of liquid."
},
{
"name": "Iron Spikes",
"cost": 1.0,
"weight": 1.0,
"description": "12 iron spikes. Iron Spikes are useful for spiking doors closed (or spiking them open) and may be used as crude pitons in appropriate situations."
},
{
"name": "Jar or Bottle, Ceramic",
"cost": 0.4,
"weight": 1.0,
"description": "A ceramic container for liquids or small items. Jars include lids or stoppers and have a volume of 8-16 oz (double or halve price for larger/smaller volumes). They are good for wet or dry materials, but prone to breakage."
},
{
"name": "Jar or Bottle, Glass",
"cost": 1.2,
"weight": 1.0,
"description": "A glass container for liquids or small items. Jars include lids or stoppers and have a volume of 8-16 oz (double or halve price for larger/smaller volumes). They are good for wet or dry materials, but prone to breakage."
},
{
"name": "Ladder, Rope",
"cost": 3.0,
"weight": 10.0,
"description": "25 feet of rope ladder. A Rope Ladder is a regularly knotted rope, or two lengths of rope, strung with rungs, with a single line at top for a hook. It typically has an 850 lb capacity."
},
{
"name": "Lantern, Bullseye",
"cost": 14.0,
"weight": 3.0,
"description": "A lantern with a focused beam of light. A Lantern (Bulls-eye) is similar to a hooded lantern, only it is closed on all but one lensed side. This lamp projects light up to 30 feet, and 30 feet at its widest, and includes a shutter."
},
{
"name": "Lantern, Hooded",
"cost": 8.0,
"weight": 2.0,
"description": "A lantern with an adjustable hood. A Hooded Lantern has a shutter mechanism to close off the light and prevent it from being seen."
},
{
"name": "Lens, small",
"cost": 8.0,
"weight": 0.0,
"description": "A small magnifying lens. A Lens enlarges the image of an object; a bare lens is smaller and is limited to 2-3x magnification. Both can be used to attempt to start fires using strong sunlight."
},
{
"name": "Magnifying glass",
"cost": 100.0,
"weight": 0.0,
"description": "A tool for viewing small objects or text. A Magnifying Glass consists of a large lens held in a frame with a handle. It is of higher quality with a minimum of 5x magnification. Can be used to attempt to start fires using strong sunlight."
},
{
"name": "Mirror, small metal",
"cost": 7.0,
"weight": 0.0,
"description": "A small metal mirror. A Mirror is useful in a dungeon environment for many reasons. For instance, it is the only way to look at a medusa without being turned to stone. Mirrors are also useful for looking around corners, and can be used outdoors to send signals using reflected sunlight."
},
{
"name": "Mirror, small silver",
"cost": 25.0,
"weight": 0.0,
"description": "A small silver mirror. A Mirror is useful in a dungeon environment for many reasons. For instance, it is the only way to look at a medusa without being turned to stone. Mirrors are also useful for looking around corners, and can be used outdoors to send signals using reflected sunlight."
},
{
"name": "Paper or Parchment",
"cost": 1.0,
"weight": 0.0,
"description": "Per sheet of paper or parchment. Paper of decent quality, refined papyrus, cotton, cloth, or wood pulp, or parchment – depending on the setting & availability."
},
{
"name": "Fine Paper or Vellum",
"cost": 4.0,
"weight": 0.0,
"description": "Per sheet of fine paper or vellum. High quality paper and vellum is not necessarily more durable, but will take ink better, and is required for magic writing (both books and scrolls)."
},
{
"name": "Rope, Hemp",
"cost": 1.0,
"weight": 5.0,
"description": "Per 50 feet of hemp rope. Hemp Rope is ½ inch in diameter and has a breaking strength of 1,600 pounds. A safe working load for a rope is normally one-quarter of the breaking strength. One or more knots in a rope cut the breaking strength in half."
},
{
"name": "Rope, Silk",
"cost": 10.0,
"weight": 2.0,
"description": "Per 50 feet of silk rope. Silk Rope is about 3/8 inch in diameter and has a breaking strength of 1,600 pounds, although it weighs considerably less than hemp rope. The notes regarding rope strength given for hemp rope apply here also."
},
{
"name": "String/Twine",
"cost": 0.2,
"weight": 1.0,
"description": "100 feet of string or twine. String / Twine holds up to 30 lb."
},
{
"name": "Wax, beeswax",
"cost": 0.3,
"weight": 1.0,
"description": "A block of beeswax. Wax, beeswax is a softer wax, useful for making impressions, hasty patches, stuffing in ears, etc."
}
],
"provisions":[
{
"name":"Rations, Dry, one week",
"weight":"14",
"cost":"10"
},
{
"name": "Pickled fish, 5 gal barrel",
"cost": 3.0,
"weight": 30
},
{
"name": "Pickled vegetables, quart",
"cost": 1.0,
"weight": 1
},
{
"name": "Sugar",
"cost": 1.0,
"weight": 1
},
{
"name": "Fruit, dried",
"cost": 0.2,
"weight": 1
},
{
"name": "Nuts",
"cost": 1.0,
"weight": 1
},
{
"name": "Fresh fruits, common (per lb)",
"cost": 1.0,
"weight": 1
},
{
"name": "Fresh fruits, rare/imported (per lb)",
"cost": 10.0,
"weight": 1
},
{
"name": "Candied fruit/herbs (oz)",
"cost": {
"min": 0.5,
"max": 5.0
},
"weight": 0
},
{
"name": "Cured meats (salted, smoked, dried, etc)",
"cost": 4.0,
"weight": 1
},
{
"name": "Carcass, Game Animal",
"cost": "1.0 per HD",
"weight": "varies"
},
{
"name": "Herbs / Spices, common",
"cost": 0.5,
"weight": 1
},
{
"name": "Herbs / Spices, uncommon",
"cost": 1.0,
"weight": 1
},
{
"name": "Herbs / Spices, Rare",
"cost": 2.0,
"weight": 1
},
{
"name": "Herbs / Spices, Exotic",
"cost": 15.0,
"weight": 1
},
{
"name": "Garlic, 1 bulb",
"cost": 0.05,
"weight": 0
},
{
"name": "Salt (1lb)",
"cost": 1.0,
"weight": 1
},
{
"name": "Grain (raw)",
"cost": 0.01,
"weight": 1
},
{
"name": "Meal (rough)",
"cost": 0.02,
"weight": 1
},
{
"name": "Flour (fine)",
"cost": 0.03,
"weight": 1
},
{
"name": "Wood (lumber), 1 cord (128 cubic feet)",
"cost": 50.0,
"weight": 5000
},
{
"name": "Firewood (per day)",
"cost": 0.01,
"weight": 20
},
{
"name": "Tobacco, per pouch",
"cost": 0.5,
"weight": 1
},
{
"name": "Tobacco, high quality",
"cost": 1.0,
"weight": 1
},
{
"name": "Halfling pipeweed",
"cost": 2.0,
"weight": 1
}
],
"meals":[
{
"name": "Meal, Poor",
"cost": 0.05,

"description": "Includes dark or rough bread, butter or hard cheese, porridge, broth soups or simple stew, and 'Chef's specials'."
},
{
"name": "Meal, Common",
"cost": 0.1,

"description": "Includes good bread & cheese, hearty stew, roast fowl or small game, cured meats, fruits and vegetables in season."
},
{
"name": "Meal, Merchant's (Good quality)",
"cost": 0.2,

"description": "Includes roast meats, cheeses, light breads, fruits and vegetables, soups, and more 'prepared' dishes. Preserved fruits are offered as well."
},
{
"name": "Meal, Rich",
"cost": 1.0,

"description": "Offers a few courses of different foods like those listed in the Merchant listing, of exceptional quality."
},
{
"name": "Meal, Banquet (per person)",
"cost": 10.0,

"description": "Includes multiple courses and a variety of offerings. The price includes personnel for service, but does not cover entertainment."
}
],
"booze": [
{
"name": "Small Beer",
"cost": 0.05,
"weight": "pint",
"description": "Small Beer is a low-alcohol beer. This lightly-fermented brew is almost a liquid snack, and keeps clean better than water. Suitable for adventuring, though it may turn ‘dank’ if left in a wineskin for too long. Beers are brewed or fermented from grains that use yeast to make the alcohol content. These are generally not as potent as spirits and are usually produced at monasteries."
},
{
"name": "Small Beer",
"cost": 0.4,
"weight": "gallon pitcher",
"description": "Beers are brewed or fermented from grains that use yeast to make the alcohol content. These are generally not as potent as spirits and are usually produced at monasteries. Small Beer is a low-alcohol beer. This lightly-fermented brew is almost a liquid snack, and keeps clean better than water. Suitable for adventuring, though it may turn ‘dank’ if left in a wineskin for too long."
},
{
"name": "Applejack",
"cost": 0.05,
"weight": "pint",
"description": "Applejack is a strong and cheap brandy produced from apples."
},
{
"name": "Applejack",
"cost": 0.4,
"weight": "gallon pitcher",
"description": "Applejack is a strong and cheap brandy produced from apples."
},
{
"name": "Beer, common",
"cost": 0.05,
"weight": "pint",
"description": "Beers are brewed or fermented from grains that use yeast to make the alcohol content. These are generally not as potent as spirits and are usually produced at monasteries. Common drinks are the cheapest, and are a passable- quality offering."
},
{
"name": "Beer, common",
"cost": 0.4,
"weight": "bottle",
"description": "Beers are brewed or fermented from grains that use yeast to make the alcohol content. These are generally not as potent as spirits and are usually produced at monasteries. Common drinks are the cheapest, and are a passable- quality offering."
},
{
"name": "Beer, quality",
"cost": 0.2,
"weight": "pitcher",
"description": "Beers are brewed or fermented from grains that use yeast to make the alcohol content. These are generally not as potent as spirits and are usually produced at monasteries. Quality drinks are among the best local brews or vintages. These will be pleasing to more refined tastes."
},
{
"name": "Beer, quality",
"cost": 1.6,
"weight": "bottle",
"description": "Beers are brewed or fermented from grains that use yeast to make the alcohol content. These are generally not as potent as spirits and are usually produced at monasteries. Quality drinks are among the best local brews or vintages. These will be pleasing to more refined tastes."
},
{
"name": "Ale, common",
"cost": 0.1,
"weight": "pint",
"description": "Ales are brewed or fermented from grains that use yeast to make the alcohol content. These are generally not as potent as spirits and are usually produced at monasteries. Common drinks are the cheapest, and are a passable- quality offering."
},
{
"name": "Ale, common",
"cost": 0.8,
"weight": "gallon pitcher",
"description": "Ales are brewed or fermented from grains that use yeast to make the alcohol content. These are generally not as potent as spirits and are usually produced at monasteries. Common drinks are the cheapest, and are a passable- quality offering."
},
{
"name": "Ale, quality",
"cost": 0.4,
"weight": "pint",
"description": "Ales are brewed or fermented from grains that use yeast to make the alcohol content. These are generally not as potent as spirits and are usually produced at monasteries. Quality drinks are among the best local brews or vintages. These will be pleasing to more refined tastes."
},
{
"name": "Ale, quality",
"cost": 3.0,
"weight": "gallon pitcher",
"description": "Ales are brewed or fermented from grains that use yeast to make the alcohol content. These are generally not as potent as spirits and are usually produced at monasteries. Quality drinks are among the best local brews or vintages. These will be pleasing to more refined tastes."
},

{
"name": "Ale, exceptional",
"cost": 1,
"weight": "pint",
"description": "Ales are brewed or fermented from grains that use yeast to make the alcohol content. These are generally not as potent as spirits and are usually produced at monasteries. Exceptional drinks are the best available, including rare brews, good vintages, or imports such as Elvish Wines and Dwarven Spirits. The prices given are minimum."
},

{
"name": "Ale, exceptional",
"cost": 8,
"weight": "gallon pitcher",
"description": "Ales are brewed or fermented from grains that use yeast to make the alcohol content. These are generally not as potent as spirits and are usually produced at monasteries. Exceptional drinks are the best available, including rare brews, good vintages, or imports such as Elvish Wines and Dwarven Spirits. The prices given are minimum."
},
{
"name": "Cider, common",
"cost": 0.1,
"weight": "pint",
"description": "Cider is generally made from non-citrus fermented fruit juices like apples, pears, peaches, and many different berries. Citruses like oranges, limes, and lemons have acids that kill the yeast used to ferment the juice."
},
{
"name": "Cider, common",
"cost": 0.8,
"weight": "bottle",
"description": "Cider is generally made from non-citrus fermented fruit juices like apples, pears, peaches, and many different berries. Citruses like oranges, limes, and lemons have acids that kill the yeast used to ferment the juice."
},
{
"name": "Cider, quality",
"cost": 0.4,
"weight": "pint",
"description": "Cider is generally made from non-citrus fermented fruit juices like apples, pears, peaches, and many different berries. Citruses like oranges, limes, and lemons have acids that kill the yeast used to ferment the juice. Quality drinks are among the best local brews or vintages. These will be pleasing to more refined tastes."
},
{
"name": "Cider, quality",
"cost": 3,
"weight": "gallon pitcher",
"description": "Cider is generally made from non-citrus fermented fruit juices like apples, pears, peaches, and many different berries. Citruses like oranges, limes, and lemons have acids that kill the yeast used to ferment the juice. Quality drinks are among the best local brews or vintages. These will be pleasing to more refined tastes."
},
{
"name": "Cider, exceptional",
"cost": 1,
"weight": "pint",
"description": "Cider is generally made from non-citrus fermented fruit juices like apples, pears, peaches, and many different berries. Citruses like oranges, limes, and lemons have acids that kill the yeast used to ferment the juice. Exceptional drinks are the best available, including rare brews, good vintages, or imports such as Elvish Wines and Dwarven Spirits. The prices given are minimum."
},
{
"name": "Cider, exceptional",
"cost": 8,
"weight": "gallon pitcher",
"description": "Cider is generally made from non-citrus fermented fruit juices like apples, pears, peaches, and many different berries. Citruses like oranges, limes, and lemons have acids that kill the yeast used to ferment the juice. Exceptional drinks are the best available, including rare brews, good vintages, or imports such as Elvish Wines and Dwarven Spirits. The prices given are minimum."
},
{
"name": "Wine, common",
"cost": 0.2,
"weight": "glass",
"description": "Wine is made from fermented grape juices (or sometimes other berries or fruits). The type of grapes determine the color and flavor of the wine. Monasteries often produce the best wines. Common drinks are the cheapest, and are a passable- quality offering."
},
{
"name": "Wine, common",
"cost": 1.6,
"weight": "bottle",
"description": "Wine is made from fermented grape juices (or sometimes other berries or fruits). The type of grapes determine the color and flavor of the wine. Monasteries often produce the best wines. Common drinks are the cheapest, and are a passable- quality offering."
},
{
"name": "Wine, common",
"cost": 1,
"weight": "gallon pitcher",
"description": "Wine is made from fermented grape juices (or sometimes other berries or fruits). The type of grapes determine the color and flavor of the wine. Monasteries often produce the best wines. Common drinks are the cheapest, and are a passable- quality offering."
},
{
"name": "Wine, quality",
"cost": 1,
"weight": "glass",
"description": "Wine is made from fermented grape juices (or sometimes other berries or fruits). The type of grapes determine the color and flavor of the wine. Monasteries often produce the best wines. Quality drinks are among the best local brews or vintages. These will be pleasing to more refined tastes."
},
{
"name": "Wine, quality",
"cost": 5,
"weight": "bottle",
"description": "Wine is made from fermented grape juices (or sometimes other berries or fruits). The type of grapes determine the color and flavor of the wine. Monasteries often produce the best wines. Quality drinks are among the best local brews or vintages. These will be pleasing to more refined tastes."
},
{
"name": "Wine, quality",
"cost": 10,
"weight": "gallon pitcher",
"description": "Wine is made from fermented grape juices (or sometimes other berries or fruits). The type of grapes determine the color and flavor of the wine. Monasteries often produce the best wines. Quality drinks are among the best local brews or vintages. These will be pleasing to more refined tastes."
},
{
"name": "Wine, exceptional",
"cost": 6,
"weight": "glass",
"description": "Wine is made from fermented grape juices (or sometimes other berries or fruits). The type of grapes determine the color and flavor of the wine. Monasteries often produce the best wines. Exceptional drinks are the best available, including rare brews, good vintages, or imports such as Elvish Wines and Dwarven Spirits. The prices given are minimum."
},
{
"name": "Wine, exceptional",
"cost": 30,
"weight": "bottle",
"description": "Wine is made from fermented grape juices (or sometimes other berries or fruits). The type of grapes determine the color and flavor of the wine. Monasteries often produce the best wines. Exceptional drinks are the best available, including rare brews, good vintages, or imports such as Elvish Wines and Dwarven Spirits. The prices given are minimum."
},
{
"name": "Mead, common",
"cost": 0.1,
"weight": "pint",
"description": "Mead is made with honey diluted with water or apple juice, and fermented with wine yeast. It is a potent drink popular in northern climates. Common drinks are the cheapest, and are a passable- quality offering."
},
{
"name": "Mead, common",
"cost": 0.5,
"weight": "bottle",
"description": "Mead is made with honey diluted with water or apple juice, and fermented with wine yeast. It is a potent drink popular in northern climates. Common drinks are the cheapest, and are a passable- quality offering."
},

{
"name": "Mead, quality",
"cost": 0.1,
"weight": "pint",
"description": "Mead is made with honey diluted with water or apple juice, and fermented with wine yeast. It is a potent drink popular in northern climates. Quality drinks are among the best local brews or vintages. These will be pleasing to more refined tastes."
},
{
"name": "Mead, quality",
"cost": 0.5,
"weight": "bottle",
"description": "Mead is made with honey diluted with water or apple juice, and fermented with wine yeast. It is a potent drink popular in northern climates. Quality drinks are among the best local brews or vintages. These will be pleasing to more refined tastes."
},

{
"name": "Spirits, rotgut",
"cost": 0.03,
"weight": "shot",
"description": "Spirits are fermented alcohols that are boiled again to remove the water and increase the alcohol content. The type of spirit is dependent on the grain, grape, fruit, or berry used as a base. These are generally made by a local farmer. Quality depends on the experience of the person making the spirit and the quality of the crop. Spirits are generally mixed or ‘cut’ with water to make the bottle last longer. Rotgut is a poorly-fermented drink mixed with more water than alcohol. "
},
{
"name": "Spirits, rotgut",
"cost": 0.6,
"weight": "bottle",
"description": "Spirits are fermented alcohols that are boiled again to remove the water and increase the alcohol content. The type of spirit is dependent on the grain, grape, fruit, or berry used as a base. These are generally made by a local farmer. Quality depends on the experience of the person making the spirit and the quality of the crop. Spirits are generally mixed or ‘cut’ with water to make the bottle last longer. Rotgut is a poorly-fermented drink mixed with more water than alcohol. "
},
{
"name": "Spirits, common",
"cost": 0.1,
"weight": "shot",
"description": "Spirits are fermented alcohols that are boiled again to remove the water and increase the alcohol content. The type of spirit is dependent on the grain, grape, fruit, or berry used as a base. These are generally made by a local farmer. Quality depends on the experience of the person making the spirit and the quality of the crop. Spirits are generally mixed or ‘cut’ with water to make the bottle last longer. Common spirits are half water and half alcohol and have an acceptable taste."
},
{
"name": "Spirits, common",
"cost": 2,
"weight": "bottle",
"description": "Spirits are fermented alcohols that are boiled again to remove the water and increase the alcohol content. The type of spirit is dependent on the grain, grape, fruit, or berry used as a base. These are generally made by a local farmer. Quality depends on the experience of the person making the spirit and the quality of the crop. Spirits are generally mixed or ‘cut’ with water to make the bottle last longer. Common spirits are half water and half alcohol and have an acceptable taste."
},
{
"name": "Spirits, quality",
"cost": 1,
"weight": "shot",
"description": "Spirits are fermented alcohols that are boiled again to remove the water and increase the alcohol content. The type of spirit is dependent on the grain, grape, fruit, or berry used as a base. These are generally made by a local farmer. Quality depends on the experience of the person making the spirit and the quality of the crop. Spirits are generally mixed or ‘cut’ with water to make the bottle last longer. Quality spirits are cut with 25% water and have a very good taste. "
},
{
"name": "Spirits, quality",
"cost": 20,
"weight": "bottle",
"description": "Spirits are fermented alcohols that are boiled again to remove the water and increase the alcohol content. The type of spirit is dependent on the grain, grape, fruit, or berry used as a base. These are generally made by a local farmer. Quality depends on the experience of the person making the spirit and the quality of the crop. Spirits are generally mixed or ‘cut’ with water to make the bottle last longer. Quality spirits are cut with 25% water and have a very good taste. "
},
{
"name": "Spirits, exceptional",
"cost": 5,
"weight": "shot",
"description": "Spirits are fermented alcohols that are boiled again to remove the water and increase the alcohol content. The type of spirit is dependent on the grain, grape, fruit, or berry used as a base. These are generally made by a local farmer. Quality depends on the experience of the person making the spirit and the quality of the crop. Spirits are generally mixed or ‘cut’ with water to make the bottle last longer. Exceptional spirits are not cut and usually are not mixed with any other liquids. The prices given are minimum."
},
{
"name": "Spirits, exceptional",
"cost": 100,
"weight": "bottle",
"description": "Spirits are fermented alcohols that are boiled again to remove the water and increase the alcohol content. The type of spirit is dependent on the grain, grape, fruit, or berry used as a base. These are generally made by a local farmer. Quality depends on the experience of the person making the spirit and the quality of the crop. Spirits are generally mixed or ‘cut’ with water to make the bottle last longer. Exceptional spirits are not cut and usually are not mixed with any other liquids. The prices given are minimum."
}

],
"services":[
{
"name": "Grain and stabling for horse (daily)",
"cost": 0.5,
"description": "Usually done at a Livery or Stable. Liveries offer comprehensive services including farrier service and tack. Stables associated with inns may require owners to feed their own horses."
},
{
"name": "Inn lodging, Private Room (per day)",
"cost": 2.0,
"description": "Includes a room and a day's meals. Room cleaned daily, good-quality meals, and no sharing of room or bed."
},
{
"name": "Inn lodging, Private Room (per week)",
"cost": 8.0,
"description": "Includes a room and a week's meals. Room cleaned daily, good-quality meals, and no sharing of room or bed."
},
{
"name": "Inn lodging, Common (per day)",
"cost": 0.5,
"description": "Includes a room and a day's meals. Room shared with another person, common meals provided. Rooms cleaned about 3 times a week."
},
{
"name": "Inn lodging, Common (per week)",
"cost": 3.0,
"description": "Includes a room and a week's meals. Room shared with another person, common meals provided. Rooms cleaned about 3 times a week."
},
{
"name": "Inn lodging, Poor (per day)",
"cost": 0.05,
"description": "Includes a room and a day's meals. Lackluster meals, room and bed shared with 3 others. Room cleaned about once a week."
},
{
"name": "Inn lodging, Poor (per week)",
"cost": 0.2,
"description": "Includes a room and a week's meals. Lackluster meals, room and bed shared with 3 others. Room cleaned about once a week."
},
{
"name": "Separate latrine for rooms (per month)",
"cost": 2.0,
"description": "A separate room or shed for a latrine, available for more expensive lodgings. Common and poor accommodations typically have shared latrines."
}
],
"mounts": [

{
"name": "Donkey",
"cost": "40",
"description": "Donkeys are hoofed mammals in the same family as the horse. They are smaller, but are strong and hardy. Burros are a similar species, and the statistics herein can be used for either; both varieties are capable of being taken into dungeons as pack animals. A light load for a donkey is up to 70 pounds; a heavy load, up to 140 pounds."
},
{
"name": "Mule",
"cost": "40",
"description": "Mules are a domestic equine hybrid between a donkey and a horse. Mules vary widely in size, and may be of any color. They are more patient, hardier and longer- lived than horses, and are perceived as less obstinate and more intelligent than donkeys. Like donkeys, they are capable of being taken into dungeons as pack animals. A light load for a mule is up to 300 pounds; a heavy load, up to 600 pounds."
},
{
"name": "Horse, Draft",
"cost": "120",
"description": "Draft Horses are large horses bred to be working animals doing hard tasks such as plowing and other farm labor. There are a number of breeds, with varying characteristics, but all share common traits of strength, patience, and a docile temperament. A light load for a draft horse is up to 350 pounds; a heavy load, up to 700 pounds."
},
{
"name": "Horse, Riding",
"cost": "75",
"description": "Riding Horses are smaller horses bred and trained for riding. They cannot effectively fight while the rider is mounted. A light load for a riding horse is up to 250 pounds; a heavy load, up to 500 pounds."
},
{
"name": "Horse, War",
"cost": "200",
"description": "War Horses are large, powerful horses which are both bred for their size, strength, and combat ability and trained to tolerate the sounds and stresses of battle. They are able to attack while the rider is mounted due to their training. A light load for a warhorse is up to 350 pounds; a heavy load, up to 700 pounds."
},
{
"name": "Pony",
"cost": "40",
"description": "A Pony is a variety of small horse. Compared to a larger horse, a pony may have a thicker coat, mane and tail, with proportionally shorter legs, a wider barrel, heavier bone, a thicker neck and a shorter, broader head. Ponies can be trained for war, and the morale in parentheses above is for a war pony; this does not allow them to fight while a rider is mounted, however. A light load for a pony is up to 275 pounds; a heavy load, up to 550 pounds."
},

]
},

"People":[],

},

"system":{

"classes":[

//Fighter
{

"name": "Fighter",
"description": "<div>Fighters include soldiers, guardsmen, barbarian warriors, and anyone else for whom fighting is a way of life.<br><br>They train in combat, and they generally approach problems head on, weapon drawn.</div><div><br></div><div>Not surprisingly, Fighters are best at fighting of all the classes.<br><br>They are also the hardiest, able to take more punishment than any other class.<br><br>Although they are not skilled in the ways of magic, Fighters can nonetheless use many magic items, including but not limited to magical weapons and armor.</div><div><br></div><div>The Prime Requisite for Fighters is Strength; a character must have a Strength score of 9 or higher to become a Fighter.<br><br>Members of this class may wear any armor and use any weapon.</div>",
"levels": {
"1": { "XP": 0,      "hitDice": "1d8",      "attackBonus": 1 },
"2": { "XP": 2000,   "hitDice": "2d8",      "attackBonus": 2 },
"3": { "XP": 4000,     "hitDice": "3d8",      "attackBonus": 2 },
"4": { "XP": 8000,     "hitDice": "4d8",      "attackBonus": 3 },
"5": { "XP": 16000,    "hitDice": "5d8",      "attackBonus": 4 },
"6": { "XP": 32000,    "hitDice": "6d8",      "attackBonus": 4 },
"7": { "XP": 64000,    "hitDice": "7d8",      "attackBonus": 5 },
"8": { "XP": 120000,   "hitDice": "8d8",      "attackBonus": 6 },
"9": { "XP": 240000,   "hitDice": "9d8",      "attackBonus": 6 },
"10": { "XP": 360000,  "hitDice": "9d8+2",    "attackBonus": 6 },
"11": { "XP": 480000,  "hitDice": "9d8+4",    "attackBonus": 7 },
"12": { "XP": 600000,  "hitDice": "9d8+6",    "attackBonus": 7 },
"13": { "XP": 720000,  "hitDice": "9d8+8",    "attackBonus": 8 },
"14": { "XP": 840000,  "hitDice": "9d8+10",   "attackBonus": 8 },
"15": { "XP": 960000,  "hitDice": "9d8+12",   "attackBonus": 8 },
"16": { "XP": 1080000, "hitDice": "9d8+14",   "attackBonus": 9 },
"17": { "XP": 1200000, "hitDice": "9d8+16",   "attackBonus": 9 },
"18": { "XP": 1320000, "hitDice": "9d8+18",   "attackBonus": 10 },
"19": { "XP": 1440000, "hitDice": "9d8+20",   "attackBonus": 10 },
"20": { "XP": 1560000, "hitDice": "9d8+22",   "attackBonus": 10 }
},

"savingThrows": {
"0":  { "DR": 13, "MW": 14, "PP": 15, "DB": 16, "S": 18 },
"1":  { "DR": 12, "MW": 13, "PP": 14, "DB": 15, "S": 17 },
"2":  { "DR": 11, "MW": 12, "PP": 14, "DB": 15, "S": 16 },
"3":  { "DR": 11, "MW": 11, "PP": 13, "DB": 14, "S": 15 },
"4":  { "DR": 10, "MW": 11, "PP": 12, "DB": 14, "S": 15 },
"5":  { "DR": 10, "MW": 10, "PP": 11, "DB": 13, "S": 14 },
"6":  { "DR": 9,  "MW": 9,  "PP": 10, "DB": 12, "S": 14 },
"7":  { "DR": 9,  "MW": 9,  "PP": 10, "DB": 12, "S": 14 },
"8":  { "DR": 8,  "MW": 8,  "PP": 9,  "DB": 13, "S": 13 },
"9":  { "DR": 8,  "MW": 8,  "PP": 9,  "DB": 13, "S": 13 },
"10": { "DR": 7,  "MW": 7,  "PP": 8,  "DB": 12, "S": 12 },
"11": { "DR": 7,  "MW": 7,  "PP": 8,  "DB": 12, "S": 12 },
"12": { "DR": 6,  "MW": 6,  "PP": 7,  "DB": 11, "S": 11 },
"13": { "DR": 6,  "MW": 6,  "PP": 7,  "DB": 11, "S": 11 },
"14": { "DR": 5,  "MW": 5,  "PP": 6,  "DB": 10, "S": 10 },
"15": { "DR": 5,  "MW": 5,  "PP": 6,  "DB": 10, "S": 10 },
"16": { "DR": 4,  "MW": 4,  "PP": 5,  "DB": 9,  "S": 9 },
"17": { "DR": 4,  "MW": 4,  "PP": 5,  "DB": 9,  "S": 9 },
"18": { "DR": 3,  "MW": 3,  "PP": 4,  "DB": 8,  "S": 8 },
"19": { "DR": 3,  "MW": 3,  "PP": 4,  "DB": 8,  "S": 8 },
"20": { "DR": 2,  "MW": 2,  "PP": 3,  "DB": 7,  "S": 7 }
}

},

//Ranger
{
"name": "Ranger",
"description": "Experience and hit dice for each ranger level.",
"levels": {
"1":  { "XP": 0,       "hitDice": "1d8" },
"2":  { "XP": 2200,    "hitDice": "2d8" },
"3":  { "XP": 4400,    "hitDice": "3d8" },
"4":  { "XP": 8800,    "hitDice": "4d8" },
"5":  { "XP": 17600,   "hitDice": "5d8" },
"6":  { "XP": 35200,   "hitDice": "6d8" },
"7":  { "XP": 70400,   "hitDice": "7d8" },
"8":  { "XP": 132000,  "hitDice": "8d8" },
"9":  { "XP": 264000,  "hitDice": "9d8" },
"10": { "XP": 396000,  "hitDice": "9d8+2" },
"11": { "XP": 528000,  "hitDice": "9d8+4" },
"12": { "XP": 660000,  "hitDice": "9d8+6" },
"13": { "XP": 792000,  "hitDice": "9d8+8" },
"14": { "XP": 924000,  "hitDice": "9d8+10" },
"15": { "XP": 1056000, "hitDice": "9d8+12" },
"16": { "XP": 1188000, "hitDice": "9d8+14" },
"17": { "XP": 1320000, "hitDice": "9d8+16" },
"18": { "XP": 1452000, "hitDice": "9d8+18" },
"19": { "XP": 1584000, "hitDice": "9d8+20" },
"20": { "XP": 1716000, "hitDice": "9d8+22" }
},      

"savingThrows": {
"0":  { "DR": 13, "MW": 14, "PP": 15, "DB": 16, "S": 18 },
"1":  { "DR": 12, "MW": 13, "PP": 14, "DB": 15, "S": 17 },
"2":  { "DR": 11, "MW": 12, "PP": 14, "DB": 15, "S": 16 },
"3":  { "DR": 11, "MW": 11, "PP": 13, "DB": 14, "S": 15 },
"4":  { "DR": 10, "MW": 11, "PP": 12, "DB": 14, "S": 15 },
"5":  { "DR": 10, "MW": 10, "PP": 11, "DB": 13, "S": 14 },
"6":  { "DR": 9,  "MW": 9,  "PP": 10, "DB": 12, "S": 14 },
"7":  { "DR": 9,  "MW": 9,  "PP": 10, "DB": 12, "S": 14 },
"8":  { "DR": 8,  "MW": 8,  "PP": 9,  "DB": 13, "S": 13 },
"9":  { "DR": 8,  "MW": 8,  "PP": 9,  "DB": 13, "S": 13 },
"10": { "DR": 7,  "MW": 7,  "PP": 8,  "DB": 12, "S": 12 },
"11": { "DR": 7,  "MW": 7,  "PP": 8,  "DB": 12, "S": 12 },
"12": { "DR": 6,  "MW": 6,  "PP": 7,  "DB": 11, "S": 11 },
"13": { "DR": 6,  "MW": 6,  "PP": 7,  "DB": 11, "S": 11 },
"14": { "DR": 5,  "MW": 5,  "PP": 6,  "DB": 10, "S": 10 },
"15": { "DR": 5,  "MW": 5,  "PP": 6,  "DB": 10, "S": 10 },
"16": { "DR": 4,  "MW": 4,  "PP": 5,  "DB": 9,  "S": 9 },
"17": { "DR": 4,  "MW": 4,  "PP": 5,  "DB": 9,  "S": 9 },
"18": { "DR": 3,  "MW": 3,  "PP": 4,  "DB": 8,  "S": 8 },
"19": { "DR": 3,  "MW": 3,  "PP": 4,  "DB": 8,  "S": 8 },
"20": { "DR": 2,  "MW": 2,  "PP": 3,  "DB": 7,  "S": 7 }
},

"skills": {
"1":  { "moveSilently": 25, "hide": 10, "tracking": 40 },
"2":  { "moveSilently": 30, "hide": 15, "tracking": 44 },
"3":  { "moveSilently": 35, "hide": 20, "tracking": 48 },
"4":  { "moveSilently": 40, "hide": 25, "tracking": 52 },
"5":  { "moveSilently": 45, "hide": 30, "tracking": 56 },
"6":  { "moveSilently": 50, "hide": 35, "tracking": 60 },
"7":  { "moveSilently": 55, "hide": 40, "tracking": 64 },
"8":  { "moveSilently": 60, "hide": 45, "tracking": 68 },
"9":  { "moveSilently": 65, "hide": 50, "tracking": 72 },
"10": { "moveSilently": 68, "hide": 53, "tracking": 75 },
"11": { "moveSilently": 71, "hide": 56, "tracking": 78 },
"12": { "moveSilently": 74, "hide": 59, "tracking": 81 },
"13": { "moveSilently": 77, "hide": 62, "tracking": 84 },
"14": { "moveSilently": 80, "hide": 65, "tracking": 87 },
"15": { "moveSilently": 83, "hide": 68, "tracking": 90 },
"16": { "moveSilently": 85, "hide": 69, "tracking": 91 },
"17": { "moveSilently": 87, "hide": 70, "tracking": 92 },
"18": { "moveSilently": 89, "hide": 71, "tracking": 93 },
"19": { "moveSilently": 91, "hide": 72, "tracking": 94 },
"20": { "moveSilently": 93, "hide": 73, "tracking": 95 }
}


},

//Cleric
{
"name": "Cleric",
"description": "<div>Clerics are those who have devoted themselves to the service of a deity, pantheon or other belief system.<br><br>Most Clerics spend their time in mundane forms of service such as preaching and ministering in a temple; but there are those who are called to go abroad from the temple and serve their deity in a more direct way, smiting undead monsters and aiding in the battle against evil and chaos.<br><br>Player character Clerics are assumed to be among the latter group.</div><div><br></div><div>Clerics fight about as well as Thieves, but not as well as Fighters.<br><br>They are hardier than Thieves, at least at lower levels, as they are accustomed to physical labor that the Thief would deftly avoid.<br><br>Clerics can cast spells of divine nature starting at 2nd level, and they have the power to Turn the Undead, that is, to drive away undead monsters by means of faith alone (see the Encounter section for details).</div><div><br></div><div>The Prime Requisite for Clerics is Wisdom; a character must have a Wisdom score of 9 or higher to become a Cleric.<br><br>They may wear any armor, but may only use blunt weapons (specifically including warhammer, mace, maul, club, quarterstaff, and sling).</div><div><br></div><div>Cuibrar&nbsp;<span style=\"font-family: elvish; white-space-collapse: preserve; background-color: transparent; color: var(--mode-color);\">Cuibrar</span></div><hr><br><div>Clerics are the members of society whom can take and give Cuibri.&nbsp;</div><div><br></div><div>They organise the ultimate collection of the life tithe from their local parish, and this cuibri moves spreads through a network or clerics who then administer it to the neey.</div><div><br></div><div>This means that most clerics are half-Elfs, professionaly associated with the flow of many lifetimes that pass through them on the way to somewhere else.</div><div><br></div><div>Evil Clerics are those who take cuibri for their own devices and objectives; for example, Lareth the Beautiful.&nbsp;</div>",

"levels": {
"1":  { "XP": 0,       "hitDice": "1d6",    "spells": [0,0,0,0,0,0], "attackBonus": 1 },
"2":  { "XP": 1500,    "hitDice": "2d6",    "spells": [1,0,0,0,0,0], "attackBonus": 1 },
"3":  { "XP": 3000,    "hitDice": "3d6",    "spells": [2,0,0,0,0,0], "attackBonus": 2 },
"4":  { "XP": 6000,    "hitDice": "4d6",    "spells": [2,1,0,0,0,0], "attackBonus": 2 },
"5":  { "XP": 12000,   "hitDice": "5d6",    "spells": [2,2,0,0,0,0], "attackBonus": 3 },
"6":  { "XP": 24000,   "hitDice": "6d6",    "spells": [2,2,1,0,0,0], "attackBonus": 3 },
"7":  { "XP": 48000,   "hitDice": "7d6",    "spells": [3,2,2,0,0,0], "attackBonus": 4 },
"8":  { "XP": 90000,   "hitDice": "8d6",    "spells": [3,2,2,1,0,0], "attackBonus": 4 },
"9":  { "XP": 180000,  "hitDice": "9d6",    "spells": [3,3,2,2,0,0], "attackBonus": 5 },
"10": { "XP": 270000,  "hitDice": "9d6+1",  "spells": [3,3,2,2,1,0], "attackBonus": 5 },
"11": { "XP": 360000,  "hitDice": "9d6+2",  "spells": [4,3,3,2,2,0], "attackBonus": 5 },
"12": { "XP": 450000,  "hitDice": "9d6+3",  "spells": [4,4,3,2,2,1], "attackBonus": 6 },
"13": { "XP": 540000,  "hitDice": "9d6+4",  "spells": [4,4,3,3,2,2], "attackBonus": 6 },
"14": { "XP": 630000,  "hitDice": "9d6+5",  "spells": [4,4,4,3,2,2], "attackBonus": 6 },
"15": { "XP": 720000,  "hitDice": "9d6+6",  "spells": [4,4,4,3,3,2], "attackBonus": 7 },
"16": { "XP": 810000,  "hitDice": "9d6+7",  "spells": [5,4,4,3,3,2], "attackBonus": 7 },
"17": { "XP": 900000,  "hitDice": "9d6+8",  "spells": [5,5,4,3,3,2], "attackBonus": 7 },
"18": { "XP": 990000,  "hitDice": "9d6+9",  "spells": [5,5,4,4,3,3], "attackBonus": 8 },
"19": { "XP": 1080000, "hitDice": "9d6+10", "spells": [6,5,4,4,3,3], "attackBonus": 8 },
"20": { "XP": 1170000, "hitDice": "9d6+11", "spells": [6,5,5,4,3,3], "attackBonus": 8 }
},

"savingThrows": {
"1":  { "DR": 11, "MW": 12, "PP": 14, "DB": 16, "S": 15 },
"2":  { "DR": 10, "MW": 11, "PP": 13, "DB": 15, "S": 14 },
"3":  { "DR": 9,  "MW": 10, "PP": 13, "DB": 15, "S": 14 },
"4":  { "DR": 9,  "MW": 10, "PP": 12, "DB": 14, "S": 13 },
"5":  { "DR": 8,  "MW": 9,  "PP": 12, "DB": 14, "S": 13 },
"6":  { "DR": 8,  "MW": 9,  "PP": 11, "DB": 13, "S": 12 },
"7":  { "DR": 7,  "MW": 8,  "PP": 11, "DB": 13, "S": 12 },
"8":  { "DR": 7,  "MW": 8,  "PP": 10, "DB": 12, "S": 11 },
"9":  { "DR": 6,  "MW": 7,  "PP": 10, "DB": 12, "S": 11 },
"10": { "DR": 6,  "MW": 7,  "PP": 9,  "DB": 11, "S": 10 },
"11": { "DR": 5,  "MW": 6,  "PP": 9,  "DB": 11, "S": 10 },
"12": { "DR": 5,  "MW": 6,  "PP": 8,  "DB": 10, "S": 9 },
"13": { "DR": 4,  "MW": 5,  "PP": 8,  "DB": 10, "S": 9 },
"14": { "DR": 4,  "MW": 5,  "PP": 7,  "DB": 9,  "S": 8 },
"15": { "DR": 3,  "MW": 4,  "PP": 7,  "DB": 9,  "S": 8 },
"16": { "DR": 3,  "MW": 4,  "PP": 6,  "DB": 8,  "S": 7 },
"17": { "DR": 2,  "MW": 3,  "PP": 6,  "DB": 8,  "S": 7 },
"18": { "DR": 2,  "MW": 3,  "PP": 5,  "DB": 7,  "S": 6 },
"19": { "DR": 1,  "MW": 2,  "PP": 5,  "DB": 7,  "S": 6 },
"20": { "DR": 1,  "MW": 2,  "PP": 4,  "DB": 6,  "S": 5 }
},

"skills": {
"1":  { "Skeleton": 13, "Zombie": 17, "Ghoul": 19, "Wight": "No", "Wraith": "No", "Mummy": "No", "Spectre": "No", "Vampire": "No", "Ghost": "No" },
"2":  { "Skeleton": 11, "Zombie": 15, "Ghoul": 18, "Wight": 20, "Wraith": "No", "Mummy": "No", "Spectre": "No", "Vampire": "No", "Ghost": "No" },
"3":  { "Skeleton": 9,  "Zombie": 13, "Ghoul": 17, "Wight": 19, "Wraith": "No", "Mummy": "No", "Spectre": "No", "Vampire": "No", "Ghost": "No" },
"4":  { "Skeleton": 7,  "Zombie": 11, "Ghoul": 15, "Wight": 18, "Wraith": 20, "Mummy": "No", "Spectre": "No", "Vampire": "No", "Ghost": "No" },
"5":  { "Skeleton": 5,  "Zombie": 9,  "Ghoul": 13, "Wight": 17, "Wraith": 19, "Mummy": "No", "Spectre": "No", "Vampire": "No", "Ghost": "No" },
"6":  { "Skeleton": 3,  "Zombie": 7,  "Ghoul": 11, "Wight": 15, "Wraith": 18, "Mummy": 20, "Spectre": "No", "Vampire": "No", "Ghost": "No" },
"7":  { "Skeleton": 2,  "Zombie": 5,  "Ghoul": 9,  "Wight": 13, "Wraith": 17, "Mummy": 19, "Spectre": "No", "Vampire": "No", "Ghost": "No" },
"8":  { "Skeleton": "Automatic", "Zombie": 3, "Ghoul": 7, "Wight": 11, "Wraith": 15, "Mummy": 18, "Spectre": 20, "Vampire": "No", "Ghost": "No" },
"9":  { "Skeleton": "Automatic", "Zombie": 2, "Ghoul": 5, "Wight": 9, "Wraith": 13, "Mummy": 17, "Spectre": 19, "Vampire": "No", "Ghost": "No" },
"10": { "Skeleton": "Automatic", "Zombie": "Automatic", "Ghoul": 3, "Wight": 7, "Wraith": 11, "Mummy": 15, "Spectre": 18, "Vampire": 20, "Ghost": "No" },
"11": { "Skeleton": "Damaged", "Zombie": "Automatic", "Ghoul": 2, "Wight": 5, "Wraith": 9, "Mummy": 13, "Spectre": 17, "Vampire": 19, "Ghost": "No" },
"12": { "Skeleton": "Damaged", "Zombie": "Automatic", "Ghoul": "Automatic", "Wight": 3, "Wraith": 7, "Mummy": 11, "Spectre": 15, "Vampire": 18, "Ghost": 20 },
"13": { "Skeleton": "Damaged", "Zombie": "Damaged", "Ghoul": "Automatic", "Wight": 2, "Wraith": 5, "Mummy": 9, "Spectre": 13, "Vampire": 17, "Ghost": 19 },
"14": { "Skeleton": "Damaged", "Zombie": "Damaged", "Ghoul": "Automatic", "Wight": "Automatic", "Wraith": 3, "Mummy": 7, "Spectre": 11, "Vampire": 15, "Ghost": 18 },
"15": { "Skeleton": "Damaged", "Zombie": "Damaged", "Ghoul": "Damaged", "Wight": "Automatic", "Wraith": 2, "Mummy": 5, "Spectre": 9, "Vampire": 13, "Ghost": 17 },
"16": { "Skeleton": "Damaged", "Zombie": "Damaged", "Ghoul": "Damaged", "Wight": "Automatic", "Wraith": "Automatic", "Mummy": 3, "Spectre": 7, "Vampire": 11, "Ghost": 15 },
"17": { "Skeleton": "Damaged", "Zombie": "Damaged", "Ghoul": "Damaged", "Wight": "Damaged", "Wraith": "Automatic", "Mummy": 2, "Spectre": 5, "Vampire": 9, "Ghost": 13 },
"18": { "Skeleton": "Damaged", "Zombie": "Damaged", "Ghoul": "Damaged", "Wight": "Damaged", "Wraith": "Automatic", "Mummy": "Automatic", "Spectre": 3, "Vampire": 7, "Ghost": 11 },
"19": { "Skeleton": "Damaged", "Zombie": "Damaged", "Ghoul": "Damaged", "Wight": "Damaged", "Wraith": "Damaged", "Mummy": "Automatic", "Spectre": 2, "Vampire": 5, "Ghost": 9 },
"20": { "Skeleton": "Damaged", "Zombie": "Damaged", "Ghoul": "Damaged", "Wight": "Damaged", "Wraith": "Damaged", "Mummy": "Automatic", "Spectre": "Automatic", "Vampire": 3, "Ghost": 7 }
}


},

//Thief
{
"name": "Thief",
"description": "<div>Thieves are those who take what they want or need by stealth, disarming traps and picking locks to get to the gold they crave; or “borrowing” money from pockets, beltpouches, etc.<br><br>right under the nose of the “mark” without the victim ever knowing.</div><div><br></div><div>Thieves fight better than Magic-Users but not as well as Fighters.<br><br>Avoidance of honest work leads Thieves to be less hardy than the other classes, though they do pull ahead of the Magic-Users at higher levels.</div><div><br></div><div>The Prime Requisite for Thieves is Dexterity; a character must have a Dexterity score of 9 or higher to become a Thief.<br><br>They may use any weapon, but may not wear metal armor as it interferes with stealthy activities, nor may they use shields of any sort.<br><br>Leather armor is acceptable, however.</div><div><br></div><div>Thieves have a number of special abilities, described below.<br><br>One Turn must generally be spent to use any of these abilities, though the GM may amend this as he or she sees fit.<br><br>The GM may choose to make any of these rolls on behalf of the player, at his or her option, to help maintain the proper state of uncertainty.<br><br>Also note that the GM may apply situational adjustments (plus or minus percentage points) as he or she sees fit; for instance, it’s obviously harder to climb a wall slick with slime than one that is dry, so the GM might apply a penalty of 20% for the slimy wall.</div><div><br></div><div><h3 style=\"font-family: SoutaneBlack;\">Open Locks</h3></div><div><br></div><div><div>Open Locks&nbsp;allows the Thief to unlock a lock without a proper key.<br><br>It may only be tried once per lock.<br><br>If the attempt fails, the Thief must wait until he or she has gained another level of experience before trying again.</div><div><br></div><div><h3 style=\"font-family: SoutaneBlack;\">Remove Traps</h3></div><div></div><br><div>Remove Traps&nbsp;is generally rolled twice: first to detect the trap, and second to disarm it.<br><br>The GM will make these rolls as the player won’t know for sure if the character is successful or not until someone actually tests the trapped (or suspected) area.</div><div><br></div><div><h3 style=\"font-family: SoutaneBlack;\">Pick Pockets</h3></div><div><br></div><div>Pick Pockets allows the Thief to lift the wallet, cut the purse, etc of a victim without the victim noticing.<br><br>Obviously, if the roll is failed, the Thief didn’t get what he or she wanted; but further, the intended victim (or an onlooker, at the GM’s option) will notice the attempt if the die roll is more than two times the target number (or if the die roll is 00).</div><div><br></div><div><h3 style=\"font-family: SoutaneBlack;\">Move Silently</h3></div><div><span style=\"font-weight: normal;\"><br></span></div><div>Move Silently, like Remove Traps, is always rolled by the GM.<br><br>The Thief will usually believe he or she is moving silently regardless of the die roll, but those he or she is trying to avoid will hear the Thief if the roll is failed.</div><div><br></div><div><h3 style=\"font-family: SoutaneBlack;\">Climb Walls</h3></div><div><br></div><div>Climb Walls&nbsp;permits the Thief to climb sheer surfaces with few or no visible handholds.<br><br>This ability should normally be rolled by the player.<br><br>If the roll fails, the Thief falls from about halfway up the wall or other vertical surface.<br><br>The GM may require multiple rolls if the distance climbed is more than 100 feet.<br><br>See Falling Damage.</div><div><br></div><div><h3 style=\"font-family: SoutaneBlack;\">Hide</h3></div><div><br></div><div>Hide&nbsp;permits the Thief to hide in any shadowed area large enough to contain his or her body.<br><br>Like Move Silently, the Thief always believes he or she is being successful, so the GM makes the roll.<br><br>A Thief hiding in shadows must remain still for this ability to work.</div><div><br></div><div><h3><span style=\"font-weight: normal;\">Listen</span></h3></div><div><br></div><div>Listen&nbsp;is generally used to listen at a door, or to try to listen for distant sounds in a dungeon.<br><br>The GM must decide what noises the Thief might hear; a successful roll means only that a noise could have been heard.<br><br>The GM should always make this roll for the player.<br><br>Note that the Thief and his or her party must try to be quiet in order for the Thief to use this ability.</div><div><br></div><div><h3><br></h3></div></div><h2 style=\"font-family:'SoutaneBlack'\"><br></h2><h3 style=\"font-family:'SoutaneBlack'\"><br></h3>",
"levels": {
"1":  { "XP": 0,       "hitDice": "1d4",    "attackBonus": 1 },
"2":  { "XP": 1250,    "hitDice": "2d4",    "attackBonus": 1 },
"3":  { "XP": 2500,    "hitDice": "3d4",    "attackBonus": 2 },
"4":  { "XP": 5000,    "hitDice": "4d4",    "attackBonus": 2 },
"5":  { "XP": 10000,   "hitDice": "5d4",    "attackBonus": 3 },
"6":  { "XP": 20000,   "hitDice": "6d4",    "attackBonus": 3 },
"7":  { "XP": 40000,   "hitDice": "7d4",    "attackBonus": 4 },
"8":  { "XP": 75000,   "hitDice": "8d4",    "attackBonus": 4 },
"9":  { "XP": 150000,  "hitDice": "9d4",    "attackBonus": 5 },
"10": { "XP": 225000,  "hitDice": "9d4+2",  "attackBonus": 5 },
"11": { "XP": 300000,  "hitDice": "9d4+4",  "attackBonus": 5 },
"12": { "XP": 375000,  "hitDice": "9d4+6",  "attackBonus": 6 },
"13": { "XP": 450000,  "hitDice": "9d4+8",  "attackBonus": 6 },
"14": { "XP": 525000,  "hitDice": "9d4+10", "attackBonus": 6 },
"15": { "XP": 600000,  "hitDice": "9d4+12", "attackBonus": 7 },
"16": { "XP": 675000,  "hitDice": "9d4+14", "attackBonus": 7 },
"17": { "XP": 750000,  "hitDice": "9d4+16", "attackBonus": 7 },
"18": { "XP": 825000,  "hitDice": "9d4+18", "attackBonus": 8 },
"19": { "XP": 900000,  "hitDice": "9d4+20", "attackBonus": 8 },
"20": { "XP": 975000,  "hitDice": "9d4+22", "attackBonus": 8 }
},
"savingThrows": {
"1":  { "DR": 13, "MW": 14, "PP": 13, "DB": 16, "S": 15 },
"2":  { "DR": 12, "MW": 14, "PP": 12, "DB": 15, "S": 14 },
"3":  { "DR": 12, "MW": 14, "PP": 12, "DB": 15, "S": 14 },
"4":  { "DR": 11, "MW": 13, "PP": 12, "DB": 14, "S": 13 },
"5":  { "DR": 11, "MW": 13, "PP": 11, "DB": 13, "S": 13 },
"6":  { "DR": 10, "MW": 12, "PP": 11, "DB": 12, "S": 12 },
"7":  { "DR": 10, "MW": 12, "PP": 11, "DB": 12, "S": 12 },
"8":  { "DR": 9,  "MW": 12, "PP": 10, "DB": 11, "S": 11 },
"9":  { "DR": 9,  "MW": 10, "PP": 10, "DB": 10, "S": 11 },
"10": { "DR": 8,  "MW": 10, "PP": 9,  "DB": 9,  "S": 10 },
"11": { "DR": 7,  "MW": 9,  "PP": 9,  "DB": 8,  "S": 9 },
"12": { "DR": 7,  "MW": 9,  "PP": 8,  "DB": 7,  "S": 9 },
"13": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"14": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"15": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"16": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"17": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"18": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"19": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"20": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 }
},
"skills": {
"1":  { "openLocks": 25, "removeTraps": 20, "pickPockets": 30, "moveSilently": 25, "climbWalls": 80, "hide": 10, "listen": 30 },
"2":  { "openLocks": 30, "removeTraps": 25, "pickPockets": 35, "moveSilently": 30, "climbWalls": 81, "hide": 15, "listen": 34 },
"3":  { "openLocks": 35, "removeTraps": 30, "pickPockets": 40, "moveSilently": 35, "climbWalls": 82, "hide": 20, "listen": 38 },
"4":  { "openLocks": 40, "removeTraps": 35, "pickPockets": 45, "moveSilently": 40, "climbWalls": 83, "hide": 25, "listen": 42 },
"5":  { "openLocks": 45, "removeTraps": 40, "pickPockets": 50, "moveSilently": 45, "climbWalls": 84, "hide": 30, "listen": 46 },
"6":  { "openLocks": 50, "removeTraps": 45, "pickPockets": 55, "moveSilently": 50, "climbWalls": 85, "hide": 35, "listen": 50 },
"7":  { "openLocks": 55, "removeTraps": 50, "pickPockets": 60, "moveSilently": 55, "climbWalls": 86, "hide": 40, "listen": 54 },
"8":  { "openLocks": 60, "removeTraps": 55, "pickPockets": 65, "moveSilently": 60, "climbWalls": 87, "hide": 45, "listen": 58 },
"9":  { "openLocks": 65, "removeTraps": 60, "pickPockets": 70, "moveSilently": 65, "climbWalls": 88, "hide": 50, "listen": 62 },
"10": { "openLocks": 68, "removeTraps": 63, "pickPockets": 74, "moveSilently": 68, "climbWalls": 89, "hide": 53, "listen": 65 },
"11": { "openLocks": 71, "removeTraps": 66, "pickPockets": 78, "moveSilently": 71, "climbWalls": 90, "hide": 56, "listen": 68 },
"12": { "openLocks": 74, "removeTraps": 69, "pickPockets": 82, "moveSilently": 74, "climbWalls": 91, "hide": 59, "listen": 71 },
"13": { "openLocks": 77, "removeTraps": 72, "pickPockets": 86, "moveSilently": 77, "climbWalls": 92, "hide": 62, "listen": 74 },
"14": { "openLocks": 80, "removeTraps": 75, "pickPockets": 90, "moveSilently": 80, "climbWalls": 93, "hide": 65, "listen": 77 },
"15": { "openLocks": 83, "removeTraps": 78, "pickPockets": 94, "moveSilently": 83, "climbWalls": 94, "hide": 68, "listen": 80 },
"16": { "openLocks": 84, "removeTraps": 79, "pickPockets": 95, "moveSilently": 85, "climbWalls": 95, "hide": 69, "listen": 83 },
"17": { "openLocks": 85, "removeTraps": 80, "pickPockets": 96, "moveSilently": 87, "climbWalls": 96, "hide": 70, "listen": 86 },
"18": { "openLocks": 86, "removeTraps": 81, "pickPockets": 97, "moveSilently": 89, "climbWalls": 97, "hide": 71, "listen": 89 },
"19": { "openLocks": 87, "removeTraps": 82, "pickPockets": 98, "moveSilently": 91, "climbWalls": 98, "hide": 72, "listen": 92 },
"20": { "openLocks": 88, "removeTraps": 83, "pickPockets": 99, "moveSilently": 93, "climbWalls": 99, "hide": 73, "listen": 95 }
}
},

//Assassin
{
"name": "Assassin",
"description": "Fighters hit things.",

"levels": {
"1":  { "XP": 0,       "hitDice": "1d4" },
"2":  { "XP": 1375,    "hitDice": "2d4" },
"3":  { "XP": 2750,    "hitDice": "3d4" },
"4":  { "XP": 5500,    "hitDice": "4d4" },
"5":  { "XP": 11000,   "hitDice": "5d4" },
"6":  { "XP": 22000,   "hitDice": "6d4" },
"7":  { "XP": 44000,   "hitDice": "7d4" },
"8":  { "XP": 82500,   "hitDice": "8d4" },
"9":  { "XP": 165000,  "hitDice": "9d4" },
"10": { "XP": 247500,  "hitDice": "9d4+2" },
"11": { "XP": 330000,  "hitDice": "9d4+4" },
"12": { "XP": 412500,  "hitDice": "9d4+6" },
"13": { "XP": 495000,  "hitDice": "9d4+8" },
"14": { "XP": 577500,  "hitDice": "9d4+10" },
"15": { "XP": 660000,  "hitDice": "9d4+12" },
"16": { "XP": 742500,  "hitDice": "9d4+14" },
"17": { "XP": 825000,  "hitDice": "9d4+16" },
"18": { "XP": 907500,  "hitDice": "9d4+18" },
"19": { "XP": 990000,  "hitDice": "9d4+20" },
"20": { "XP": 1072500, "hitDice": "9d4+22" }
},

"savingThrows": {
"1":  { "DR": 13, "MW": 14, "PP": 13, "DB": 16, "S": 15 },
"2":  { "DR": 12, "MW": 14, "PP": 12, "DB": 15, "S": 14 },
"3":  { "DR": 12, "MW": 14, "PP": 12, "DB": 15, "S": 14 },
"4":  { "DR": 11, "MW": 13, "PP": 12, "DB": 14, "S": 13 },
"5":  { "DR": 11, "MW": 13, "PP": 11, "DB": 13, "S": 13 },
"6":  { "DR": 10, "MW": 12, "PP": 11, "DB": 12, "S": 12 },
"7":  { "DR": 10, "MW": 12, "PP": 11, "DB": 12, "S": 12 },
"8":  { "DR": 9,  "MW": 12, "PP": 10, "DB": 11, "S": 11 },
"9":  { "DR": 9,  "MW": 10, "PP": 10, "DB": 10, "S": 11 },
"10": { "DR": 8,  "MW": 10, "PP": 9,  "DB": 9,  "S": 10 },
"11": { "DR": 7,  "MW": 9,  "PP": 9,  "DB": 8,  "S": 9 },
"12": { "DR": 7,  "MW": 9,  "PP": 8,  "DB": 7,  "S": 9 },
"13": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"14": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"15": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"16": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"17": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"18": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"19": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 },
"20": { "DR": 6,  "MW": 8,  "PP": 8,  "DB": 6,  "S": 8 }
},


"skills": {
"1":  { "openLocks": 15, "pickPockets": 20, "moveSilently": 20, "climbWalls": 70, "hide": 5, "listen": 25, "poison": 25 },
"2":  { "openLocks": 19, "pickPockets": 25, "moveSilently": 25, "climbWalls": 72, "hide": 10, "listen": 29, "poison": 30 },
"3":  { "openLocks": 23, "pickPockets": 30, "moveSilently": 30, "climbWalls": 74, "hide": 15, "listen": 33, "poison": 35 },
"4":  { "openLocks": 27, "pickPockets": 35, "moveSilently": 35, "climbWalls": 76, "hide": 20, "listen": 37, "poison": 40 },
"5":  { "openLocks": 31, "pickPockets": 40, "moveSilently": 40, "climbWalls": 78, "hide": 25, "listen": 41, "poison": 45 },
"6":  { "openLocks": 35, "pickPockets": 45, "moveSilently": 45, "climbWalls": 80, "hide": 30, "listen": 45, "poison": 50 },
"7":  { "openLocks": 39, "pickPockets": 50, "moveSilently": 50, "climbWalls": 82, "hide": 35, "listen": 49, "poison": 55 },
"8":  { "openLocks": 43, "pickPockets": 55, "moveSilently": 55, "climbWalls": 84, "hide": 40, "listen": 53, "poison": 60 },
"9":  { "openLocks": 47, "pickPockets": 60, "moveSilently": 60, "climbWalls": 86, "hide": 45, "listen": 57, "poison": 65 },
"10": { "openLocks": 50, "pickPockets": 63, "moveSilently": 63, "climbWalls": 87, "hide": 48, "listen": 60, "poison": 69 },
"11": { "openLocks": 53, "pickPockets": 66, "moveSilently": 66, "climbWalls": 88, "hide": 51, "listen": 63, "poison": 73 },
"12": { "openLocks": 56, "pickPockets": 69, "moveSilently": 69, "climbWalls": 89, "hide": 54, "listen": 66, "poison": 77 },
"13": { "openLocks": 59, "pickPockets": 72, "moveSilently": 72, "climbWalls": 90, "hide": 57, "listen": 69, "poison": 81 },
"14": { "openLocks": 62, "pickPockets": 75, "moveSilently": 75, "climbWalls": 91, "hide": 60, "listen": 72, "poison": 85 },
"15": { "openLocks": 65, "pickPockets": 78, "moveSilently": 78, "climbWalls": 92, "hide": 63, "listen": 75, "poison": 89 },
"16": { "openLocks": 66, "pickPockets": 79, "moveSilently": 80, "climbWalls": 93, "hide": 64, "listen": 77, "poison": 91 },
"17": { "openLocks": 67, "pickPockets": 80, "moveSilently": 82, "climbWalls": 94, "hide": 65, "listen": 79, "poison": 93 },
"18": { "openLocks": 68, "pickPockets": 81, "moveSilently": 84, "climbWalls": 95, "hide": 66, "listen": 81, "poison": 95 },
"19": { "openLocks": 69, "pickPockets": 82, "moveSilently": 86, "climbWalls": 96, "hide": 67, "listen": 83, "poison": 97 },
"20": { "openLocks": 70, "pickPockets": 83, "moveSilently": 88, "climbWalls": 97, "hide": 68, "listen": 85, "poison": 99 }
}

},

//Magic User
{
"name": "Mage",
"description": "<div>Magic-Users are those who seek and use knowledge of the arcane.<br><br>They do magic not as the Cleric does, by faith in a greater power, but rather through insight and understanding.</div><div><br></div><div>Magic-Users are the worst of all the classes at fighting; hours spent studying massive tomes of magic do not lead a character to become strong or adept with weapons.<br><br>They are the least hardy, equal to Thieves at lower levels but quickly falling behind.</div><div><br></div><div>The Prime Requisite for Magic-Users is Intelligence; a character must have an Intelligence score of 9 or higher to become a Magic-User.<br><br>The only weapons they become proficient with are the dagger and the walking staff (or cudgel).<br><br>Magic-Users may not wear armor of any sort nor use a shield as such things interfere with spellcasting.</div><div><br></div><div>A first level Magic-User begins play knowing read magic and one other spell of first level.<br><br>These spells are written in a spellbook provided by his or her master.<br><br>The GM may roll for the spell, assign it as he or she sees fit, or allow the player to choose it, at his or her option.<br><br>Casting magic uses up Cuibri at the following rates:</div><div><br></div><div><table border=\"1\" class=\"table\" style=\"width: 95%; white-space-collapse: preserve; border-collapse: collapse;\"><tbody><tr><td tabindex=\"0\" class=\"tableCell tableHeader\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">Spell Level</td><td tabindex=\"0\" class=\"tableCell tableHeader\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">Cuibri Cost</td><td tabindex=\"0\" class=\"tableCell tableHeader\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">Coin Cost</td></tr><tr><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">1</td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">1 Week</td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">1 Evdo</td></tr><tr><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">2</td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">2 Week </td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">2 Evdo</td></tr><tr><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">3</td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">3 Week</td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">3 Evdo</td></tr><tr><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">4</td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">1 Month </td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">1 Zoti</td></tr><tr><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">5</td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">2 Month</td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">2 Zoti</td></tr><tr><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">6</td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">3 Month</td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">3 Zoti</td></tr><tr><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">Greater</td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">6 Months/Level</td><td tabindex=\"0\" class=\"tableCell\" style=\"border-color: var(--mode-color);\" contenteditable=\"false\">1 Examin/Level</td></tr></tbody></table><br></div><div>Therefore, casting magic can often render magic users to appear older; especially where they are engaged in the concentrated casting of greater magic: ritual magic that takes time to research, set up, and cast.&nbsp;</div>",

"levels": {
"1":  { "XP": 0,       "hitDice": "1d4",    "spells": [1, 0, 0, 0, 0, 0], "attackBonus": 1 },
"2":  { "XP": 2500,    "hitDice": "2d4",    "spells": [2, 0, 0, 0, 0, 0], "attackBonus": 1 },
"3":  { "XP": 5000,    "hitDice": "3d4",    "spells": [2, 1, 0, 0, 0, 0], "attackBonus": 1 },
"4":  { "XP": 10000,   "hitDice": "4d4",    "spells": [2, 2, 0, 0, 0, 0], "attackBonus": 2 },
"5":  { "XP": 20000,   "hitDice": "5d4",    "spells": [2, 2, 1, 0, 0, 0], "attackBonus": 2 },
"6":  { "XP": 40000,   "hitDice": "6d4",    "spells": [3, 2, 2, 0, 0, 0], "attackBonus": 3 },
"7":  { "XP": 80000,   "hitDice": "7d4",    "spells": [3, 2, 2, 1, 0, 0], "attackBonus": 3 },
"8":  { "XP": 150000,  "hitDice": "8d4",    "spells": [3, 3, 2, 2, 0, 0], "attackBonus": 3 },
"9":  { "XP": 300000,  "hitDice": "9d4",    "spells": [3, 3, 2, 2, 1, 0], "attackBonus": 4 },
"10": { "XP": 450000,  "hitDice": "9d4+1",  "spells": [4, 3, 3, 2, 2, 0], "attackBonus": 4 },
"11": { "XP": 600000,  "hitDice": "9d4+2",  "spells": [4, 4, 3, 2, 2, 1], "attackBonus": 4 },
"12": { "XP": 750000,  "hitDice": "9d4+3",  "spells": [4, 4, 3, 3, 2, 2], "attackBonus": 4 },
"13": { "XP": 900000,  "hitDice": "9d4+4",  "spells": [4, 4, 4, 3, 2, 2], "attackBonus": 5 },
"14": { "XP": 1050000, "hitDice": "9d4+5",  "spells": [4, 4, 4, 3, 3, 2], "attackBonus": 5 },
"15": { "XP": 1200000, "hitDice": "9d4+6",  "spells": [5, 4, 4, 3, 3, 2], "attackBonus": 5 },
"16": { "XP": 1350000, "hitDice": "9d4+7",  "spells": [5, 5, 4, 3, 3, 2], "attackBonus": 6 },
"17": { "XP": 1500000, "hitDice": "9d4+8",  "spells": [5, 5, 4, 4, 3, 3], "attackBonus": 6 },
"18": { "XP": 1650000, "hitDice": "9d4+9",  "spells": [6, 5, 4, 4, 3, 3], "attackBonus": 6 },
"19": { "XP": 1800000, "hitDice": "9d4+10", "spells": [6, 5, 5, 4, 3, 3], "attackBonus": 7 },
"20": { "XP": 1950000, "hitDice": "9d4+11", "spells": [6, 5, 5, 4, 4, 3], "attackBonus": 7 }
},

"savingThrows": {
"1":  { "DR": 13, "MW": 14, "PP": 13, "DB": 16, "spells": 15 },
"2":  { "DR": 13, "MW": 14, "PP": 13, "DB": 15, "spells": 14 },
"3":  { "DR": 13, "MW": 14, "PP": 13, "DB": 15, "spells": 14 },
"4":  { "DR": 12, "MW": 13, "PP": 12, "DB": 15, "spells": 13 },
"5":  { "DR": 12, "MW": 12, "PP": 11, "DB": 14, "spells": 13 },
"6":  { "DR": 11, "MW": 11, "PP": 10, "DB": 14, "spells": 12 },
"7":  { "DR": 11, "MW": 11, "PP": 10, "DB": 13, "spells": 12 },
"8":  { "DR": 10, "MW": 10, "PP": 9,  "DB": 13, "spells": 11 },
"9":  { "DR": 10, "MW": 9,  "PP": 9,  "DB": 13, "spells": 11 },
"10": { "DR": 9,  "MW": 9,  "PP": 8,  "DB": 12, "spells": 10 },
"11": { "DR": 9,  "MW": 8,  "PP": 7,  "DB": 12, "spells": 11 },
"12": { "DR": 8,  "MW": 7,  "PP": 6,  "DB": 11, "spells": 11 },
"13": { "DR": 8,  "MW": 7,  "PP": 6,  "DB": 11, "spells": 10 },
"14": { "DR": 7,  "MW": 6,  "PP": 5,  "DB": 10, "spells": 10 },
"15": { "DR": 7,  "MW": 6,  "PP": 5,  "DB": 10, "spells": 9 },
"16": { "DR": 6,  "MW": 5,  "PP": 4,  "DB": 9,  "spells": 9 },
"17": { "DR": 6,  "MW": 5,  "PP": 4,  "DB": 9,  "spells": 8 },
"18": { "DR": 5,  "MW": 4,  "PP": 3,  "DB": 8,  "spells": 8 },
"19": { "DR": 5,  "MW": 4,  "PP": 3,  "DB": 8,  "spells": 7 },
"20": { "DR": 4,  "MW": 3,  "PP": 2,  "DB": 7,  "spells": 6 }
}

},

],

"races": {
"Halfling" : { race: 'halfling', DR: 4, MW: 4, PP: 4, DB: 3, spells: 4 },
"Human" : { race: 'human', DR: 0, MW: 0, PP: 0, DB: 0, spells: 0 },
"Elf" : { race: 'elf', DR: 0, MW: 2, PP: 1, DB: 0, spells: 2  },
"Dwarf" : { race: 'dwarf', DR: 4, MW: 4, PP: 4, DB: 3, spells: 4 },
},

"modifiers": [
{ range: { min: 1, max: 3 }, bonus: -3 },
{ range: { min: 4, max: 5 }, bonus: -2 },
{ range: { min: 6, max: 8 }, bonus: -1 },
{ range: { min: 9, max: 12 }, bonus: 0 },
{ range: { min: 13, max: 15 }, bonus: 1 },
{ range: { min: 16, max: 17 }, bonus: 2 },
{ range: { min: 18, max: 18 }, bonus: 3 }
],


"currency" : {
'Etos': 8064, //Hours in a Year
'Examino': 672, //Hours in a Month
'Zoti': 168, //Hours in a Week
'Evdo': 24, //Hours in a Day
'Ora': 1
},

"spells" :{
"Mage": [
{
"name": "Animate Dead",
"Range": "touch",
"Duration": "special",
"class": "Mage",
"level": "5",
"description": "This spell turns the bones or bodies of dead creatures into undead skeletons or zombies that follow the caster's spoken commands. They remain animated until they are destroyed. The caster may animate a number of hit dice of undead equal to twice his or her caster level, and no more. Animated skeletons have hit dice equal to the number the creature had in life; for skeletons of humans or demi-humans, this means one hit die, regardless of the character level of the deceased. Zombies have one more hit die than the creature had in life. An animated skeleton can be created only from a mostly intact skeleton; a zombie can be created only from a mostly intact corpse. The caster must touch the remains to be animated. No character may normally control more hit dice of undead than 4 times his or her level, regardless of how many times this spell is cast. "
},
{
"name": "Anti-Magic Shell",
"Range": "10' radius",
"Duration": "1 turn/level",
"class": "Mage",
"level": "6",
"description": "This spellWithin a 10' radius around the caster, all magic is negated for the full duration of the spell. Magical attacks will not affect the caster, magic items and spells within the radius are suppressed, and the caster cannot perform further magic until the spell has expired. "
},
{
"name": "Charm Monster",
"Range": "30'",
"Duration": "special",
"class": "Mage",
"level": "4",
"description": "This spell functions like charm person, except that the effect is not restricted by creature type or size. Undead monsters are unaffected. This spell can affect 3d6 hit dice of creatures of 3 or fewer hit dice, or one creature of more than 3 hit dice. Saving throws are made just as for charm person. "
},
{
"name": "Charm Person",
"Range": "30'",
"Duration": "special",
"class": "Mage",
"level": "1",
"description": "This spell makes a humanoid creature of 4 hit dice or less regard the caster as its trusted friend and ally. Humans and demi-humans may be affected, regardless of level of ability. A save vs Spells will negate the effect. If the creature is currently being threatened or attacked by the caster or his or her allies, it receives a +5 bonus on its saving throw. The spell does not enable the caster to control the charmed person as if it were an automaton; rather, it perceives his or her words and actions in the most favorable way. The caster can try to give the subject orders, but it will not do anything it wouldn't ordinarily do, and further may receive an additional saving throw to overcome the magic (at the GM's discretion). The caster must speak the target's language to communicate any commands, or else be good at pantomiming; of course, if the caster is attacked, the charmed creature will act to protect its \"friend\" (though that could mean attacking the caster's enemies, or attempting to carry off the caster to a \"safe\" place). The target receives a new saving throw each day if it has an Intelligence of 13 or greater, every week if its Intelligence is 9-12, or every month if its Intelligence is 8 or less. "
},
{
"name": "Clairvoyance",
"Range": "60'",
"Duration": "12 turns",
"class": "Mage",
"level": "3",
"description": "This spell enables the caster to see into another area through the eyes of a living creature in that area. The caster must specify the direction and approximate distance, up to a maximum of 60' away. If there is no appropriate creature in that area, the spell fails. No saving throw is allowed, and the target creature is unaware that it is being so used. The caster may choose another subject creature after at least a turn has passed, enabling multiple locations to be viewed. If the subject creature moves out of range, contact is lost, though the caster may be able to choose another target in this case. "
},
{
"name": "Cloudkill",
"Range": "100'+10'/level",
"Duration": " 6 rounds/level",
"class": "Mage",
"level": "5",
"description": "This spell creates a 20'x20'x20' cloud of poison gas which moves at a rate of 10' per round under the control of the caster (so long as he or she concentrates on it). The gas kills outright any creatures of 3 or fewer hit dice or levels it comes in contact with; creatures having 4 or more hit dice or levels must save vs Poison or die. The cloud persists for the entire duration even if the caster ceases to concentrate upon it. "
},
{
"name": "Confusion",
"Range": "360'",
"Duration": "2 rounds+1/level",
"class": "Mage",
"level": "4",
"description": "This spell causes up to 3d6 living creatures within a 30' radius circle around the target point to become confused, making them unable to independently determine what they will do. A saving throw vs Spells is allowed to resist the effect. Roll on the following table on each subject's Initiative number each round to see what the subject does. A confused character who can't carry out the indicated action does nothing but babble incoherently. Attackers are not at any special advantage when attacking a confused character. Any confused character who is attacked automatically retaliates on its next turn, as long as it is still confused when its turn comes. "
},
{
"name": "Conjure Elemental",
"Range": "240'",
"Duration": "special",
"class": "Mage",
"level": "5",
"description": "A portal to one of the Elemental Planes of Air, Earth, Fire, or Water is opened, allowing the Mage to summon an elemental from that plane. At most one elemental of each type may be summoned by the caster in a given day. Once the elemental appears, it serves the conjurer indefinitely, provided the caster concentrates on nothing but controlling the creature; spell casting, combat, or movement over half the normal rate results in loss of concentration. The conjurer, while in control of an elemental, can dismiss it to its native plane at will (doing so on his or her Initiative if in combat). If the Mage loses concentration, control of the summoned Elemental is lost and cannot be regained. The creature then seeks to attack the conjurer and all others in its path. Only dispel magic or dispel evil will banish the elemental once control has been lost. An elemental may, of course, choose to return to its home plane on its own; such creatures will not choose to remain on the material plane for long. "
},
{
"name": "Continual Light*",
"Range": "360'",
"Duration": "1 year/level",
"class": "Mage",
"level": "2",
"description": "This spell creates a spherical region of light, as bright as full daylight up to a 30' radius, with light of lesser intensity to a radius of 60'. Continual light can be cast on an object, into the air, or at a creature, just as with the light spell, up to a maximum range of 360' from the caster. The spell remains in effect for one year per level of the caster. As with light, this spell can be used to blind a creature if cast on its visual organs. Creatures targeted by this spell are allowed a save vs Death Ray; if the save is made, the spell is cast into the air just behind the target creature. A penalty of -4 is applied to the blinded creature's attack rolls if the saving throw fails. The reversed spell, continual darkness, causes complete absence of light in the area of effect, overpowering normal light sources. Continual darkness may be used to blind in the same way as continual light. "
},
{
"name": "Darkvision",
"Range": "touch",
"Duration": "1 hour/level",
"class": "Mage",
"level": "3",
"description": "The subject receives Darkvision with a range of 60' for the duration of the spell. (See page 37 for details.) "
},
{
"name": "Death Spell",
"Range": "240'",
"Duration": "instantaneous",
"class": "Mage",
"level": "6",
"description": "This spell will kill 3d12 hit dice or levels of creatures in a 30' radius sphere centered wherever the caster wishes (within the range limit). Excess levels of effectiveness are lost. Each creature affected is allowed to save vs Death Ray; those that fail the save die immediately. Creatures of 8 or more hit dice or levels are immune to the spell, as are undead monsters, golems, and any other \"creature\" that is not truly alive. "
},
{
"name": "Detect Evil*",
"Range": "60'",
"Duration": "1 round/level",
"class": "Mage",
"level": "2",
"description": "This spell allows the caster to detect evil; specifically, the caster can detect creatures with evil intentions, magic items with evil enchantments, and possibly extraplanar creatures of evil nature. Normal characters, even \"bad\" characters, cannot be detected by this spell, as only overwhelming evil is detectable. The caster sees the \"evil\" creatures or objects with a definite glow around them, but the glow cannot be seen by anyone else. The exact definition of evil is left for the GM to decide. Note that items such as ordinary traps or poisons are not \"evil,\" and thus not detectable by this spell. Reversed, this spell becomes detect good, which works just as described above with respect to detecting \"good\" enchantments, angelic creatures, and so on. "
},
{
"name": "Detect Invisible",
"Range": "60'",
"Duration": "1 turn/level",
"class": "Mage",
"level": "2",
"description": "By means of this spell the caster is able to see invisible characters, creatures or objects within the given range, seeing them as translucent shapes. "
},
{
"name": "Detect Magic",
"Range": "60'",
"Duration": "2 turns",
"class": "Mage",
"level": "1",
"description": "The caster of this spell is able to detect enchanted or enspelled objects or creatures within the given range by sight, seeing them surrounded by a pale glowing light. Only the caster sees the glow. Invisible creatures or objects are not detected by this spell, but the emanations of the invisibility magic will be seen as an amorphous glowing fog, possibly allowing the caster (only) to attack the invisible creature at an attack penalty of only -2. "
},
{
"name": "Dimension Door",
"Range": "10'",
"Duration": "instantaneous",
"class": "Mage",
"level": "4",
"description": "The caster of this spell instantly transfers himself or herself, or any single target creature within range, to any spot within 200' plus 20' per caster level. The caster or target creature always arrives at exactly the spot desired, whether the caster visualizes the area or states direction and distance. An unwilling target may save vs Spells to avoid being transported. Anything worn or carried by the caster or target creature will be transported also, including another character or creature if the transportee can lift it. If the target area is within a solid object, the spell fails automatically. "
},
{
"name": "Disintegrate",
"Range": "60'",
"Duration": "instantaneous",
"class": "Mage",
"level": "6",
"description": "This spell causes a thin, green ray to spring from the caster's pointing finger. Any single creature or object (up to a 10x10x10 foot cube of material) is entirely disintegrated, leaving behind only a trace of fine dust. A disintegrated creature's equipment is unaffected. A creature that makes a successful save vs Spells is unaffected. The ray can target only one creature per casting, if that target saves, the spell is wasted. "
},
{
"name": "Dispel Magic",
"Range": "120'",
"Duration": "instantaneous",
"class": "Mage",
"level": "3",
"description": "The caster can use dispel magic to end ongoing spells that have been cast on a creature or object, or to end ongoing spells (or at least their effects) within a cubic area 20' on a side. The caster must choose whether to dispel magic on a creature or object, or to affect an area. If dispel magic is targeted at a creature, all spell effects (including ongoing potion effects) may be canceled. If cast upon an area, all such effects within the area may be canceled. Any spell or effect having a caster level equal to or less than the dispel magic caster's level is ended automatically. Those created by higher level casters might not be canceled; there is a 5% chance the dispel magic will fail for each level the spell effect exceeds the caster level. For example, a 10th level caster dispelling magic created by a 14th level caster has a 20% chance of failure. Some spells cannot be ended by dispel magic; this specifically includes any curse, including those created by bestow curse (the reverse of remove curse) as well as by cursed items. "
},
{
"name": "ESP",
"Range": "60'",
"Duration": "1 turn/level",
"class": "Mage",
"level": "2",
"description": "This spell permits the caster to detect the surface thoughts of one or more targets within range. The caster must designate a direction, and then concentrate for a turn in order to \"hear\" the thoughts. Each turn the caster may choose to \"listen\" in a different direction. The caster may stop listening, then resume again later, so long as the duration has not expired. The target creature is not normally aware of being spied upon in this way. Rock more than 2 inches thick or a thin coating of lead or gold will block the spell. All undead creatures are immune to this effect, as are mindless creatures such as golems. "
},
{
"name": "Feeblemind",
"Range": "180'",
"Duration": "permanent",
"class": "Mage",
"level": "5",
"description": "If the target creature fails a saving throw vs Spells, its Intelligence and Charisma scores each drop to 1. The affected creature is unable to cast spells, understand language, or communicate coherently. The victim does remember who its friends are and can follow and protect them from harm. The subject remains in this state until a heal spell is used to cancel the effect. A target creature that can cast Mage spells suffers a penalty of -4 on its saving throw against this spell. "
},
{
"name": "Fireball",
"Range": "100'+10'/level",
"Duration": "instantaneous",
"class": "Mage",
"level": "3",
"description": "A fireball spell creates an explosion of flame that detonates with a low roar and deals 1d6 points of fire damage per caster level to every creature within a spherical volume having a 20' radius. A save vs Spells for half damage is allowed. The explosion creates almost no pressure. The caster points a finger and determines the range (distance and height) at which the fireball is to burst. A glowing, pea-sized bead streaks from the pointing digit and, unless it impacts upon a material body or solid barrier prior to attaining the prescribed range, blossoms into the fireball at that point. (An early impact results in an early detonation.) If the caster attempts to send the bead through a narrow passage, such as through an arrow slit, he or she must roll a missile attack (without range adjustments) to hit the opening, or else the bead strikes the barrier and detonates prematurely. The fireball sets fire to combustibles and damages objects in the area. It can melt metals with low melting points, such as lead, gold, copper, silver, and bronze. If the damage caused to an interposing barrier shatters or breaks through it, the fireball may continue beyond the barrier in order to attain its full volume. "
},
{
"name": "Flesh to Stone*",
"Range": "30'/level",
"Duration": "permanent",
"class": "Mage",
"level": "6",
"description": "This spell causes the subject, along with all its carried gear, to turn into a mindless, inert statue. A saving throw vs Petrification is allowed to resist the spell. If the statue resulting from this spell is broken or damaged, the subject (if ever returned to its original state) suffers equivalent damage or deformities. Only creatures made of flesh are affected by this spell. The reverse spell, stone to flesh, acts as a counterspell for flesh to stone, restoring the creature just as it was when it was petrified. It does nothing if applied to stone that is not the result of flesh to stone or similar petrification effects (such as a medusa's gaze). "
},
{
"name": "Floating Disc",
"Range": "0",
"Duration": "5 turns +1/level",
"class": "Mage",
"level": "1",
"description": "This spell creates an invisible, slightly concave circular plane of force for carrying loads. It is about the size of a shield, being 3 feet in diameter and 1 inch deep at its center. It can hold a maximum of 500 pounds of weight. (Note that water weighs about 8 pounds per gallon.) The disc must be loaded so that the items placed upon it are properly supported, or they will (of course) fall off. For example, the disc can support just over 62 gallons of water, but the water must be in a barrel or other reasonable container that can be placed upon the disc. Similarly, a pile of loose coins will tend to slip and slide about, and some will fall off with every step the caster takes; but a large sack full of coins, properly tied, will remain stable. The disc floats level to the ground, at about the height of the caster's waist. It remains still when within 10' of the caster, and follows at the caster's movement rate if he or she moves away from it. The floating disc can be pushed as needed to position it but will be dispelled if somehow moved more than 10' from the caster. When the spell duration expires, the disc disappears from existence and drops whatever was supported to the surface beneath. "
},
{
"name": "Fly",
"Range": "touch",
"Duration": "1 turn/level",
"class": "Mage",
"level": "3",
"description": "The subject of this spell can fly at a speed equal to his or her normal ground movement rate (as adjusted by encumbrance). The subject can ascend at half speed and descend at double speed, with the same maneuverability as the subject has when moving on the ground. Flying under the effect of this spell requires only as much concentration as walking, so the subject can attack or cast spells normally. The subject of a fly spell can neither charge nor run, nor carry aloft more weight than his or her maximum load. Should the spell duration expire while the subject is still aloft, the magic fails slowly. The subject floats downward 120' per round for 1d10 rounds. If the subject reaches the ground in that amount of time, he or she lands safely. If not, the subject falls the rest of the distance, taking normal falling damage. Since dispelling a spell effectively ends it, the subject also descends in this way if the fly spell is dispelled. "
},
{
"name": "Geas*",
"Range": "5' per level",
"Duration": "special",
"class": "Mage",
"level": "6",
"description": "Geas places a magical command on a creature to carry out some service or to refrain from some action or course of activity, as desired by the caster. The target creature must be able to understand the caster for this spell to take effect. While a geas cannot compel a creature to kill itself or perform acts that would result in certain death, it can cause almost any other course of activity. A saving throw vs Spells will allow an unwilling target to resist a geas when it is first cast. However, the target may choose to accept the geas, typically as part of a bargain with the caster to perform some service. The geased creature must follow the given instructions until the geas is completed, no matter how long it takes. If the instructions involve some open-ended task that the recipient cannot complete through his or her own actions, the spell remains in effect for a maximum of one day per caster level. A clever recipient can subvert some instructions, at the GM's discretion. For every 24 hours that the subject chooses not to obey the geas (or is prevented from obeying it), it suffers a -2 penalty to each of its ability scores, up to a total of -8. No ability score can be reduced to less than 3 by this effect. The ability score penalties are removed 24 hours after the subject resumes obeying the geas. A geas (and all effects thereof) can be ended by a remove curse spell, or by a wish, or by the reverse of this spell. Dispel magic does not affect a geas. "
},
{
"name": "Growth of Plants*",
"Range": "120'",
"Duration": "permanent",
"class": "Mage",
"level": "4",
"description": "This spell causes normal vegetation (grasses, briars, bushes, creepers, thistles, trees, vines, etc.) within range to become thick and overgrown. The dimensions of the growth are determined by the caster, but cannot exceed 1000 sq. feet (a 10'x100' area or equivalent) per 5 caster levels. The plants entwine to form a thicket or jungle that creatures must hack or force a way through. All movement within the affected area is reduced to no more than 5' per round for less than giant sized creatures; giant sized creatures are reduced to half normal movement rate. The area must have brush and/or trees in it for this spell to take effect. The reverse form, shrink plants, may be used to render overgrown areas passable. The area of effect is identical to the normal version. Growth of plants and its reverse are permanent until countered, either by the opposite form or by dispel magic. This spell has no effect on animated plant creatures of any sort. "
},
{
"name": "Hallucinatory Terrain",
"Range": "400'+40'/level",
"Duration": "12 turns/level",
"class": "Mage",
"level": "4",
"description": "This spell makes one 10 yard cube per level of outdoor terrain appear like a different type (i.e. field into forest, grassland into desert, or the like). This spell requires a full turn to cast. The affected terrain looks, sounds, and smells like another sort of natural terrain. Structures, equipment, and creatures within the area are not hidden or changed in appearance. A save vs Spells is allowed to see through the illusion, but only if the creatures or characters affected actively attempt to do so. "
},
{
"name": "Haste*",
"Range": "30'+10'/level",
"Duration": "1 round/level",
"class": "Mage",
"level": "3",
"description": "This spell accelerates the actions of 1 creature per caster level. The affected creatures move and act twice as quickly as normal, having double their normal movement rates and making twice the normal attacks per round, for the duration of the spell. Spellcasting is not accelerated, nor is the use of magic items such as wands, which may still be used just once per round. Multiple haste or speed effects don't combine; only apply the most powerful or longest lasting effect. Reversed, haste becomes slow; affected creatures move at half speed, attacking half as often (generally, every other round) and making half a normal move each round. Naturally, target creatures may save vs Spells to avoid the effect. Haste and slow counter and dispel each other. "
},
{
"name": "Hold Monster",
"Range": "180'",
"Duration": "2d8 turns",
"class": "Mage",
"level": "5",
"description": "This spell functions like hold person, except that it affects any living creature that fails its save vs Spells. "
},
{
"name": "Hold Person",
"Range": "180'",
"Duration": "2d8 turns",
"class": "Mage",
"level": "3",
"description": "This spell will render any living (not undead) human, demi-human or humanoid creature paralyzed. Creatures larger than ogres will not be affected by this spell. Targets of the spell are aware, and breathe normally, but cannot take any actions, including speech. A successful save vs Spells will negate the effect. The spell may be cast at a single person, who makes his or her save at -2, or at a group, in which case 1d4 of the creatures in the group may be affected. A winged creature which is paralyzed cannot flap its wings and falls (if in flight at the time). A paralyzed swimmer can't swim and may drown. "
},
{
"name": "Hold Portal",
"Range": "100'+10'/level",
"Duration": "1 round/level",
"class": "Mage",
"level": "1",
"description": "This spell magically holds shut a door, gate, window, or shutter of wood, metal, or stone. The magic affects the portal just as if it were securely closed and normally locked. A knock spell or a successful dispel magic spell can negate a hold portal spell. "
},
{
"name": "Ice Storm",
"Range": "300'+30'/level",
"Duration": "1 round",
"class": "Mage",
"level": "4",
"description": "This spell causes great magical hailstones to pound down for 1 full round, dealing 5d6 points of damage to every creature in a 20' radius around the target spot; a successful save vs Spells will reduce damage by half. The ice storm fills a vertical volume of 40', so creatures higher than that distance above the target spot are unaffected. A -20% penalty applies to each Listen roll made within the ice storm's effect, and all land movement within its area is at half speed. At the end of the duration, the hail disappears, leaving no aftereffects (other than the damage dealt). Any creature naturally resistant to cold takes half damage (or one-quarter damage if it makes its save). "
},
{
"name": "Invisibility",
"Range": "touch",
"Duration": "special",
"class": "Mage",
"level": "2",
"description": "The creature or object touched becomes invisible, vanishing from sight, including Darkvision. If the recipient is a creature carrying gear, that vanishes, too. If the spell is cast on someone else, neither the caster nor his or her allies can see the subject, unless they can normally see invisible things or employ magic to do so. Items dropped or put down by an invisible creature become visible; items picked up disappear if tucked into the clothing or pouches worn by the creature. Light, however, never becomes invisible, although a source of light can become so (thus, the effect is that of a light with no visible source). Any part of an item that the subject carries but that extends more than 10 feet from it becomes visible. Of course, the subject is not magically silenced, and certain other conditions can render the recipient detectable (such as stepping in a puddle). The spell ends if the subject attacks any creature or casts any spell. Actions (other than spellcasting) directed at unattended objects do not break the spell. Causing harm indirectly is not an attack. The spell lasts at most 24 hours. "
},
{
"name": "Invisibility 10' Radius",
"Range": "touch",
"Duration": "1 turn/level",
"class": "Mage",
"level": "3",
"description": "This spell functions like invisibility, except that this spell confers invisibility upon all creatures within 10 feet of the recipient. The center of the effect is mobile with the recipient. Those affected by this spell can see each other and themselves as if unaffected by the spell. Affected creatures (other than the recipient) who attack negate the invisibility only for themselves, but if the spell recipient attacks, the invisibility ends for all affected creatures. Any affected creature moving out of the area becomes visible, but creatures moving into the area after the spell is cast do not become invisible (including any previously affected creatures who have become visible as described above). "
},
{
"name": "Invisible Stalker",
"Range": "0",
"Duration": "special",
"class": "Mage",
"level": "6",
"description": "The caster summons an invisible stalker to do his or her bidding (see the Monsters section, below, for details). The spell persists until dispel evil is cast on the creature, it is slain, or the task is fulfilled. The GM is advised to review the monster entry for the invisible stalker when this spell is used, as they may not always be reliable servants. "
},
{
"name": "Knock",
"Range": "30'",
"Duration": "special",
"class": "Mage",
"level": "2",
"description": "The knock spell opens stuck, barred, locked, held, or wizard locked doors. It opens secret doors, as well as locked or trick-opening boxes or chests. It also loosens welds, shackles, or chains (provided they serve to hold shut something which can be opened). If used to open a wizard locked door, the spell does not remove the wizard lock but simply suspends its functioning for one turn. In all other cases, the door does not relock itself or become stuck again on its own. Knock will not raise a portcullis or operate any other similar mechanism, nor will it affect ropes, vines, and the like. Each spell can undo a single means of preventing access. "
},
{
"name": "Levitate",
"Range": "touch",
"Duration": "1 turn/level",
"class": "Mage",
"level": "2",
"description": "Levitate allows the caster to move himself or herself, another creature, or an object up and down as desired. A creature must be willing to be levitated, and an object must be unattended or possessed by a willing creature. The caster can mentally direct the recipient to move up or down as much as 20 feet each round, by concentration. The caster cannot move the recipient horizontally, but the recipient could clamber along the face of a cliff, for example, or push against a ceiling to move laterally (generally at half its normal land speed). A levitating creature that attacks with a weapon finds itself increasingly unstable; the first attack has a -1 attack penalty, the second -2, and so on, to a maximum penalty of -5. A full round spent stabilizing allows the creature to begin again at -1. "
},
{
"name": "Light*",
"Range": "120'",
"Duration": "6 turns + 1/level",
"class": "Mage",
"level": "1",
"description": "This spell creates a light equal to torchlight which illuminates a 30' radius area (and provides dim light for an additional 20') around the target location or object. The effect is immobile if cast into an area, but it can be cast on a movable object. Light taken into an area of magical darkness does not function. Reversed, light becomes darkness, creating an area of darkness just as described above. This darkness blocks out Darkvision and negates mundane light sources. A light spell may be cast to counter and dispel the darkness spell of an equal or lower level caster (and vice versa). Doing so causes both spells to instantly cease, restoring the existing ambient light level. Either version of this spell may be used to blind an opponent by means of casting it on the target's ocular organs. The target is allowed a saving throw vs Death Ray to avoid the effect, and if the save is made, the spell does not take effect at all. A light or darkness spell cast to blind does not have the given area of effect (that is, no light or darkness is shed around the victim). "
},
{
"name": "Lightning Bolt",
"Range": "50'+10'/level",
"Duration": "instantaneous",
"class": "Mage",
"level": "3",
"description": "This spell releases a powerful stroke of electrical energy that deals 1d6 points of electricity damage per caster level to each creature within its area. A save vs Spells for half damage is allowed. The bolt begins at the caster's fingertips and extends to the range given. The caster may choose to limit the range of the spell, but the minimum range is 60 feet. The lightning bolt passes through an area 5' wide, arcing and jumping, so that, while it is not actually 5' wide, for game purposes treat it as if it is so. The lightning bolt sets fire to combustibles and damages objects in its path. It can melt metals with a low melting point, such as lead, gold, copper, silver, or bronze. If the damage caused to an interposing barrier shatters or breaks through it, the bolt may continue beyond the barrier if the spell's range permits; otherwise, it may reflect from the barrier back toward the caster, or in a random direction at the GM's option. Creatures already affected by the lightning bolt do not take additional damage if struck by the reflection of the same bolt. "
},
{
"name": "Locate Object",
"Range": "360'",
"Duration": "1 round/level",
"class": "Mage",
"level": "2",
"description": "This spell allows the caster to sense the direction of a well-known or clearly visualized object. He or she can search for general items, in which case the nearest one of its kind is located if more than one is within range. The caster cannot specify a unique item unless he or she has observed that particular item firsthand (not through divination). The spell is blocked by even a thin sheet of lead or gold. Creatures cannot be found by this spell. "
},
{
"name": "Lower Water",
"Range": "360'",
"Duration": "1 turn/level",
"class": "Mage",
"level": "6",
"description": "This spell causes water or similar liquid to reduce its depth by as much as 2 feet per caster level (to a minimum depth of 1 inch). The water is lowered within a more or less square-shaped depression whose sides are up to 10 feet long per caster level. In extremely large and deep bodies of water, such as a deep ocean, the spell creates a whirlpool that sweeps ships and similar craft downward, putting them at risk and rendering them unable to leave by normal movement for the duration of the spell. When cast on water elementals and other water-based creatures, this spell acts as a slow spell (the reverse of haste); a save vs Spells is allowed, with success negating the effect. The spell has no effect on other creatures. "
},
{
"name": "Magic Jar",
"Range": "60'",
"Duration": "special",
"class": "Mage",
"level": "5",
"description": "By casting magic jar, the caster places his or her soul in a gem or large crystal within spell range (known as the magic jar), leaving the body lifeless. The caster may then attempt to take control of a nearby living creature within spell range, forcing its soul into the magic jar. The caster may move back to the jar (thereby returning the trapped soul to its body) and attempt to possess another body. The spell ends when the caster's soul returns to his or her own body, leaving the receptacle empty. To cast the spell, the magic jar must be within spell range and the caster must know where it is, though he or she does not need to be able to see it. When the caster transfers his or her soul upon casting, the caster's body is, as near as anyone can tell, dead, but does not undergo decay as a normal dead body would. Possession of a creature by means of this spell is blocked by protection from evil or a similar ward. The subject is allowed a save vs Spells to resist. Failure to take over the host leaves the caster's life force in the magic jar, and that target creature is immune to further attempts for the duration of the spell. If the caster is successful, his or her life force occupies the host body, and the host's life force is imprisoned in the magic jar. The caster keeps his or her Intelligence, Wisdom, Charisma, level, class, attack bonus, saving throws, and mental abilities (including spellcasting ability). The body retains its Strength, Dexterity, Constitution, hit points, and natural abilities. A body with extra limbs does not allow the caster to make more attacks than normal. The caster does not have access to any extraordinary or supernatural abilities of the body. If the caster's spirit is in the magic jar, and the jar is broken (whether by dispel magic or physical damage): If the jar is in range of the caster's body, the caster's spirit returns to its body. Otherwise, the caster's spirit departs (the caster dies). In either case, the spell ends. If the caster's spirit is driven from the host body by dispel evil: If the magic jar is in range of the host body, the caster's spirit returns to the jar, and the host's spirit returns to its body. The caster will not be able to possess the same host again for the remaining duration of the spell. If the magic jar is not in range of the host body, the caster's spirit departs, the host's spirit is freed from the jar (and departs), and the host's body dies. If the host's spirit is in the magic jar, and the jar is broken: If the jar is in range of the host's body, the caster's spirit departs, the host's spirit returns to its body, and the spell ends. Otherwise, the host's spirit departs, and the caster's spirit is stranded in the host body. Note here that the spell has not ended. Dispel evil can still be used to drive the caster's spirit from the body, which departs as noted, ending the spell. In any case where the spell ends with the caster's body unoccupied by a spirit, that body does truly die. "
},
{
"name": "Magic Missile",
"Range": "100'+10'/level",
"Duration": "instantaneous",
"class": "Mage",
"level": "1",
"description": "This spell causes a missile of magical energy to dart forth from the caster's fingertip and strike its target, which must be at least partially visible to the caster, dealing 1d6+1 points of damage. The missile strikes unerringly. Specific parts of a creature can't be singled out. Inanimate objects are not damaged by the spell. For every three caster levels beyond 1st, an additional missile is fired - two at 4th level, three at 7th, four at 10th, and the maximum of five missiles at 13th level or higher. If the caster fires multiple missiles, he or she can target a single creature or several creatures. A single missile can strike only one creature. Targets must be designated before damage is rolled. "
},
{
"name": "Magic Mouth",
"Range": "30'",
"Duration": "special",
"class": "Mage",
"level": "1",
"description": "This spell imbues the chosen non-living object with an enchanted mouth that suddenly appears and speaks its message the next time a specified event occurs. The message, which may be up to three words per caster level long, can be in any language known by the caster and can be delivered over a period of 10 minutes, at any volume from a whisper to a yell. The voice will resemble the caster's, but will not be identical. The mouth cannot use command words or activate magical effects. It does, however, move according to the words articulated; if it were placed upon a statue, the mouth of the statue would move and appear to speak. Of course, magic mouth can be placed upon a tree, rock, or any other object. The spell functions when specific conditions are fulfilled according to the caster's command as set in the spell. Commands can be as general or as detailed as desired, although only visual and audible triggers can be used. Triggers react to what appears to be the case. Disguises and illusions can fool them. Normal darkness does not defeat a visual trigger, but magical darkness or invisibility does. Silent movement or magical silence defeats audible triggers. Audible triggers can be keyed to general types of noises or to a specific noise or spoken word. Actions can serve as triggers if they are visible or audible. A magic mouth cannot distinguish level, hit dice, or class except by external garb. The range limit of a trigger is 10 feet per caster level, so a 6th-level caster can command a magic mouth to respond to triggers as far as 60 feet away. Regardless of range, the mouth can respond only to visible or audible triggers and actions in line of sight or within hearing distance. "
},
{
"name": "Massmorph",
"Range": "100'+10'/level",
"Duration": "1 hour/level",
"class": "Mage",
"level": "4",
"description": "With this spell the caster causes 1d4+1 man-sized (or smaller) creatures per four caster levels to appear as if they are natural effects of the terrain (for example, trees in a forest, stalagmites in a cave, coral underwater, boulders in a cavern, etc.). All creatures to be affected must be within a 120' radius of the caster at the time the spell is cast. Only those creatures the caster wishes to hide are affected, and then only if they are willing to be concealed. The caster may include himself or herself among the affected creatures. Those affected are thus concealed from other creatures passing through the area for so long as they remain still. If an affected creature chooses to move or attack, the illusion is dispelled for that creature, but those who remain still continue to be hidden. The caster may end the spell early if he or she wishes by speaking a single word. The illusion can also be ended by dispel magic. "
},
{
"name": "Mirror Image",
"Range": "self",
"Duration": "1 turn/level",
"class": "Mage",
"level": "2",
"description": "This spell creates several illusory duplicates of the caster. The images move through each other as well as the real caster more or less constantly, making it impossible for most creatures to determine which is real. A total of 1d4 images plus one image per three caster levels (maximum eight images total) are created. These figments separate from the caster and remain in a cluster around him or her. The figments mimic the caster's actions, pretending to cast spells, drink potions, levitate, and so on, just as the caster does. Figments always look exactly like the caster. Enemies attempting to attack or cast spells upon the caster will always hit a figment instead. Any attack against an image destroys it, whether the attack roll is successful or not; likewise, attack spells cast directly upon a figment will destroy it, with no saving throw allowed. Area-effect spells are not cast directly on the caster, and thus appear to affect all figments exactly as they affect the caster; for instance, if the caster is subjected to a fireball, all figments will appear to be injured just as the caster was. "
},
{
"name": "Passwall",
"Range": "30'",
"Duration": "3 turns",
"class": "Mage",
"level": "5",
"description": "Passwall creates a passage through wooden, plaster, or stone walls, but not through metal or other harder materials. The passage is up to 10 feet deep plus an additional 10 feet deep per three caster levels above 9th (20 feet at 12th, 30 feet deep at 15th, 40 feet deep at 18th). If the wall's thickness is more than the depth of the passage created, then a single passwall simply makes a niche or short tunnel. Several passwall spells can then form a continuing passage to breach very thick walls. When passwall ends (due to duration, dispel magic, or caster's choice), creatures within the passage are ejected out the nearest exit. "
},
{
"name": "Phantasmal Force",
"Range": "180'",
"Duration": "concentration",
"class": "Mage",
"level": "2",
"description": "This spell creates the visual illusion of an object, creature (or small group of creatures), or other effect, as visualized by the caster up to a maximum size of 20'x20'x20'. The illusion does not create sound, smell, texture, or temperature. The caster can animate the image within the limits of the area of effect. The image persists so long as the caster concentrates upon it. If used to create the illusion of one or more creatures, they will have an Armor Class of 11 and will disappear if hit in combat. Damage done by monsters, spells, etc. simulated by this spell is not real; those \"killed\" or otherwise apparently disabled will wake up uninjured (at least from this spell) after 2d8 rounds. The illusory damage done will be equivalent to the normal damage for any attack form simulated. Attempting to animate more creatures than the caster's level grants viewing creatures with at least average Intelligence an immediate save vs Spells to recognize the creatures as illusions; those making the save will be unaffected by any actions taken by the illusions from that point on. A similar save may be granted by the GM any time he or she feels the illusion is likely to be seen through, especially if the player describes an illusion which seems improbable or otherwise poorly conceived. "
},
{
"name": "Polymorph Other",
"Range": "30'",
"Duration": "permanent",
"class": "Mage",
"level": "4",
"description": "This spell allows the caster to change one target into another form of living creature. The assumed form can't have more hit dice than caster's level, or be incorporeal or gaseous. Unlike polymorph self, the transformed target also gains the behavioral and mental traits, any physical attacks, special, supernatural or spell-like abilities of the new form, in addition to the physical capabilities and statistics of such. If the new form is substantially less intelligent, the target may not remember its former life. The target creature will have the same number of hit points it previously had, regardless of the hit dice of the form assumed. Incorporeal or gaseous creatures are immune to this spell, as noted above. A creature with shape changing abilities such as a doppleganger can revert to its natural form in one round. Unwilling targets that successfully save against Polymorph are not affected. The spell is permanent until dispelled or the creature is slain, at which time the target reverts to his or her original form. "
},
{
"name": "Polymorph Self",
"Range": "self",
"Duration": "1 hour/level",
"class": "Mage",
"level": "4",
"description": "This spell allows the caster to change into another form of living creature. The assumed form can't have more hit dice than the caster's level. The caster can't assume an incorporeal or gaseous form. If slain, the caster reverts to his or her original form. The caster gains the physical capabilities and statistics of the new form but retains his or her own mental abilities. He or she also gains all physical attacks possessed by the form but does not gain any special, supernatural or spell-like abilities. Dragon breath is a special ability, for instance, so were the caster to assume the form of a dragon he or she could use the dragon's normal claw, bite, and tail swipe attacks, but not the dragon's breath. The caster can remain transformed up to one hour per level of ability, or may choose to end the spell whenever he or she desires (up to one hour per level, of course). "
},
{
"name": "Projected Image",
"Range": "240'",
"Duration": "6 turns",
"class": "Mage",
"level": "6",
"description": "This spell creates a quasi-real, illusory version of the caster. The intangible projected image looks, sounds, and smells like the caster, in addition to mimicking gestures and actions (including speech). Any further spells cast seem to originate from the illusion, not the actual caster. A line of sight between the caster and his or her illusory self must be maintained or the spell ends. Dimension door, teleport, or any similar spell that breaks the line of sight dispels the image, as does the illusionary caster being struck in combat. Note that this spell grants no special sensory powers to the caster; for example, if the illusory self is positioned so as to be able to see something the caster can't directly see, the caster does not see it. Also, all spell ranges are still figured from the caster's actual position, not the illusory self's position. "
},
{
"name": "Protection from Evil*",
"Range": "touch",
"Duration": "1 turn/level",
"class": "Mage",
"level": "1",
"description": "This spell wards a creature from attacks by evil creatures, from mental control, and from summoned creatures. It creates a magical barrier around the subject at a distance of 1 foot. The barrier moves with the subject and has three major effects. First, the subject gains a +2 bonus to AC and a +2 bonus on saves. Both these bonuses apply against attacks made or effects created by evil creatures. Note that the definition of \"evil\" is left to the individual GM to decide. Second, the barrier blocks any attempt to possess the warded creature (by a magic jar attack, for example) or to exercise mental control over the creature (including charm spells or effects). The protection does not prevent such effects from targeting the protected creature, but it suppresses the effect for the duration of the protection from evil effect. If the protection from evil effect ends before the effect granting control does, the would-be controller would then be able to command the controlled creature. Likewise, the barrier keeps out a possessing life force but does not expel one if it is in place before the spell is cast. Third, the spell prevents bodily contact by summoned creatures (regardless of whether they are \"evil\" or not). This causes the natural weapon attacks of such creatures to fail and the creatures to recoil if such attacks require touching the warded creature. The protection against contact by summoned creatures ends if the warded creature makes an attack against or tries to force the barrier against the blocked creature. Reversed, this spell becomes protection from good. It functions in all ways as described above, save that \"good\" creatures are kept away, rather than \"evil\" creatures. "
},
{
"name": "Protection from Evil 10' Radius*",
"Range": "touch",
"Duration": "1 turn/level",
"class": "Mage",
"level": "3",
"description": "This spell functions exactly as protection from evil, but with a 10' radius rather than a 1' radius. All within the radius receive the protection; those who leave and then re-enter, or who enter after the spell is cast, receive the protection as well. Reversed, this spell becomes protection from good 10' radius, and functions exactly as the reversed form of protection from evil, except that it covers a 10' radius around the target rather than the normal 1' radius. "
},
{
"name": "Protection from Normal Missiles",
"Range": "self",
"Duration": "1 turn/level",
"class": "Mage",
"level": "3",
"description": "The caster is completely protected from small sized, non-magical missile attacks. Therefore, magic arrows, hurled boulders, or other such are not blocked, but any number of normal arrows, sling bullets, crossbow bolts, thrown daggers, etc. will be fended off. Note that normal missiles projected by magic bows count as magical missiles for the purposes of this spell. "
},
{
"name": "Read Languages",
"Range": "0",
"Duration": "special",
"class": "Mage",
"level": "1",
"description": "This spell grants the caster the ability to read almost any written language. It may be cast in one of three modes: In the first mode, the spell allows the caster to read any number of written works in a variety of languages. This mode lasts for 1 turn per caster level. In the second mode, the spell allows the caster to read any one book or tome; this mode lasts 3 hours per caster level. In the third mode, the spell allows the caster to read any one scroll (other than a spell scroll; for instance, a protection scroll or a treasure map); this mode is permanent. This spell does not work on magical texts, such as scrolls or spellbooks; see Read Magic, below, for the correct spell to use in such cases. The spell grants the ability to read the texts, but does not in any way hasten the reading nor grant understanding of concepts the caster doesn't otherwise have the ability to understand. Also, for this spell to function, there must be at least one living creature that can read the given language somewhere on the same plane. The knowledge is not copied from that creature's mind; rather, it is the existence of the knowledge that enables the spell to function. "
},
{
"name": "Read Magic",
"Range": "0",
"Duration": "permanent",
"class": "Mage",
"level": "1",
"description": "When cast upon any magical text, such as a spellbook or Mage spell scroll, Read Magic enables the caster to read that text. Casting this spell on a cursed text will generally trigger the curse. "
},
{
"name": "Reincarnate",
"Range": "touch",
"Duration": "instantaneous",
"class": "Mage",
"level": "6",
"description": "With this spell, the caster brings back a dead character (or humanoid creature) in another body, provided that its death occurred no more than one week before the casting of the spell and the subject's soul is free and willing to return. If the subject's soul is not willing to return, the spell does not work. Roll on the following table to determine what sort of creature the character becomes. Since the dead character is returning in a new body, all physical ills and afflictions are repaired. The condition of the remains is not a factor. So long as some small portion of the character's body still exists, it can be reincarnated, but the portion receiving the spell must have been part of the character's body at the time of death. The magic of the spell creates an entirely new young adult body for the soul to inhabit from the natural elements at hand. This process takes one hour to complete. When the body is ready, the subject is reincarnated. A reincarnated character recalls the majority of its former life and form. Its class is unchanged, as are the character's Intelligence, Wisdom, and Charisma. Strength, Dexterity, and Constitution scores should be rerolled. (If the character's ability scores are outside the allowable range for the new form, they should be adjusted up or down by the GM as needed.) The subject's level (or Hit Dice) is reduced by 1; this is a real reduction, not a negative level, and is not subject to magical restoration. Roll one hit die and subtract the total from the character's original hit point total; this is the new form's hit points. If the subject was 1st level, instead of a hit point reduction, its new Constitution score is reduced by 2. A character that has been turned into an undead creature or killed by a death effect can't be returned to life by this spell. Constructs, elementals, and undead creatures can't be reincarnated. The spell cannot bring back a creature who has died of old age. The reincarnated creature gains all abilities associated with its new form, including forms of movement and speeds, natural armor, natural attacks, extraordinary abilities, and the like, but it doesn't automatically speak the language of the new form. "
},
{
"name": "Remove Curse*",
"Range": "30'",
"Duration": "instantaneous",
"class": "Mage",
"level": "4",
"description": "Remove curse instantaneously removes all curses on an object or a creature. Remove curse does not remove the curse from a cursed shield, weapon, or suit of armor, although the spell typically enables the creature afflicted with any such cursed item to remove and get rid of it. Certain special curses may not be countered by this spell or may be countered only by a caster of a certain level or higher. The reverse of this spell, bestow curse, allows the caster to place a curse on the subject. A save vs Spells is allowed to resist. The caster must choose one of the following three effects: -4 decrease to an ability score (minimum 1). -4 penalty on attack rolls and saves. Each round of combat, the target has a 50% chance to act normally; otherwise, it takes no action. The caster may also invent his or her own curse, but it should be no more powerful than those described above. The curse thus bestowed cannot be dispelled, but it can be removed with a remove curse spell. "
},
{
"name": "Shield",
"Range": "self",
"Duration": "5 rounds+1/level",
"class": "Mage",
"level": "1",
"description": "Shield creates an invisible, shield-like mobile disk of force that hovers in front of the caster. It negates magic missile attacks directed at the caster, and improves the caster's Armor Class by +3 vs melee attacks and +6 vs missile weapons. The Armor Class benefits do not apply to attacks originating from behind the caster, but magic missiles are warded off from all directions. "
},
{
"name": "Sleep",
"Range": "90'",
"Duration": "5 rounds/level",
"class": "Mage",
"level": "1",
"description": "This spell puts several creatures of 3 or fewer hit dice into a magical slumber. Creatures of 4 or more hit dice are not affected. The caster chooses a point of origin for the spell (within the given range, of course), and those creatures within 30' of the chosen point may be affected. Each creature in the area of effect is allowed a save vs Spells to resist the effect. Sleeping creatures are helpless. Slapping or wounding awakens an affected creature, but normal noise does not. Sleep does not affect unconscious creatures, constructs, or undead creatures, and such creatures in the area of effect are ignored. When the duration elapses, the sleeping creatures normally wake up immediately; however, if they are made very comfortable and the surroundings are quiet, the affected creatures may continue sleeping normally, at the GM's option. "
},
{
"name": "Telekinesis",
"Range": "self",
"Duration": "3 turns",
"class": "Mage",
"level": "5",
"description": "This spell permits the caster to move objects or creatures by concentration alone. An object weighing no more than 50 pounds per caster level can be moved up to 20 feet per round. A creature can negate the effect on itself or an object it holds or has on its body with a successful save vs Death Ray. In order to use this power, the caster must maintain concentration, moving no more than normal movement (no running), making no attacks and casting no spells. If concentration is lost (whether intentional or not), the power may be used again on the next round, but the subject of the effect is allowed a new saving throw. "
},
{
"name": "Teleport",
"Range": "self",
"Duration": "instantaneous",
"class": "Mage",
"level": "5",
"description": "This spell instantly transports the caster to a designated destination, which may be as distant as 100 miles per caster level. Interplanar travel is not possible. The caster can bring along objects or creatures, not to exceed 300 pounds plus 100 pounds per level above 10th. The caster must be in contact with all objects and/or creatures to be transported (although creatures to be transported may be in contact with one another, with at least one of those creatures in contact with the caster). Unwilling creatures are allowed a saving throw vs Spells to resist the spell, and the caster may need to make an attack roll to make contact with such a creature. Likewise, a creature's save vs Spells prevents items in its possession from being teleported. The caster must have some clear idea of the location and layout of the destination. The clearer the mental image, the more likely it is that the teleportation will work. Areas of strong magical energy may make teleportation more hazardous or even impossible. To see how well the teleportation works, roll d% and consult the table below. Refer to the following information for definitions of the terms on the table. Familiarity: \"Very familiar\" is a place where the caster has been very often and feels at home. \"Studied carefully\" is a place the caster knows well, either because it can currently be seen, the caster has been there often, or other means (such as scrying) have been used to study the place for at least one hour. \"Seen casually\" is a place that the caster has seen more than once but with which he or she is not very familiar. \"Viewed once\" is a place that the caster has seen once, possibly using magic. \"False destination\" is a place that does not truly exist or if the caster is teleporting to an otherwise familiar location that no longer exists as such or has been so completely altered as to no longer be familiar. When rolling on this row, use 1d20+80. On Target: The caster appears exactly where desired. Off Target: The caster appears safely a random distance away from the destination in a random direction. Distance off target is 1d10x1d10% of the distance that was to be traveled. The direction off target is determined randomly. Similar Area: The caster winds up in an area that's visually or thematically similar to the target area. This means that the caster appears in the closest similar place within range. If no such area exists within the spell's range, the spell simply fails instead. Mishap: The caster and anyone else teleporting with the caster have gotten \"scrambled.\" Each takes 1d10 points of damage; then reroll on the chart to see where they wind up. For these rerolls, roll 1d20+80. Each time \"Mishap\" comes up, the characters take more damage and must reroll. "
},
{
"name": "Ventriloquism",
"Range": "60'",
"Duration": "1 turn/level",
"class": "Mage",
"level": "1",
"description": "This spell allows the caster to cause his or her voice to sound from someplace else within range, for example, from a dark alcove or statue. "
},
{
"name": "Wall of Fire",
"Range": "180'",
"Duration": "1 round/level",
"class": "Mage",
"level": "4",
"description": "(or special) An immobile, blazing curtain of shimmering violet fire springs into existence. One side of the wall, selected by the caster, sends forth waves of heat, dealing 2d4 points of fire damage to creatures within 10 feet and 1d4 points of fire damage to those beyond 10 feet but within 20 feet. The wall deals this damage when it appears and on the caster's turn each round to all creatures in the area. In addition, the wall deals 2d6 points +1 point per caster level of fire damage to any creature passing through it. The wall deals double damage to undead creatures. The wall is either a sheet of flame up to 20' in length per caster level, or a ring with a radius up to 5' per caster level. The caster may choose to make the wall smaller if desired. The wall may be up to 20' tall (as desired by the caster and/or constrained by the ceiling). If the caster evokes the wall so that it appears where creatures are, each creature takes damage as if passing through the wall; a save vs Spells is allowed, with success indicating that damage is rolled as if the creature is within 10' of the wall. The caster may choose to maintain the spell indefinitely (within reasonable limits of endurance) by concentration, or may cast it with the standard duration of 1 round per level, at his or her option. "
},
{
"name": "Wall of Iron",
"Range": "90'",
"Duration": "permanent",
"class": "Mage",
"level": "6",
"description": "This spell causes a flat, vertical iron wall to spring into being. The wall is composed of up to one 10'x10' square section, one inch thick, per caster level. If the caster so desires, the wall can bond itself into any surrounding nonliving material if its area is sufficient to do so. The wall cannot be conjured so that it occupies the same space as a creature or another object. The wall must always be a flat plane, though the edges can be shaped to fit the available space, and it must always be conjured in contact with the ground. The caster can increase the thickness of the wall with a proportionate reduction in the area; for example, doubling the thickness halved the area. The wall may not be made less than one inch thick. The caster can create the wall vertically resting on a flat surface but not attached to the surface, so that it can be tipped over to fall on and crush creatures beneath it. The wall is 50% likely to tip in either direction if left un-pushed. Creatures can push the wall in one direction rather than letting it fall randomly. A creature with 13 Strength (or 4 or more Hit Dice) can push the wall over; or several creatures can work together to do so. (If the optional Ability Roll rule is being used, a Strength roll at -3 is sufficient to topple the wall.) Creatures with room to flee the falling wall may do so by making successful saves vs Death Ray (with Dexterity bonus added). Any creature of Ogre-size or smaller that fails the save takes 10d6 points of damage. The wall cannot crush larger creatures. Like any iron wall, this wall is subject to rust, perforation, and other natural phenomena. "
},
{
"name": "Wall of Stone",
"Range": "15' per level",
"Duration": "permanent",
"class": "Mage",
"level": "5",
"description": "This spell creates a wall of rock that merges into adjoining rock surfaces. The wall is composed of up to one 10'x10' square section, 1' thick, per caster level. The caster can double the wall's area by halving its thickness. The wall cannot be conjured so that it occupies the same space as a creature or another object. The caster can create a wall of stone in almost any shape he or she desires. The wall created need not be vertical, nor rest upon any firm foundation; however, it must merge with and be solidly supported by existing stone. It can be used to bridge a chasm, for instance, or as a ramp. For this use, if the span is more than 20 feet, the wall must be arched and buttressed, reducing the spell's area by half. The wall can also be crudely shaped to create crenelations, battlements, and so forth by similarly reducing the area. Like any other stone wall, this one can be destroyed by a disintegrate spell or by normal means such as breaking and chipping. It is possible, but difficult, to trap mobile opponents within or under a wall of stone, provided the wall is shaped so it can hold the creatures. Creatures can avoid entrapment with successful saves vs Death Ray. "
},
{
"name": "Water Breathing",
"Range": "touch",
"Duration": "2 hours/level",
"class": "Mage",
"level": "3",
"description": "The affected creatures can breathe water freely. Divide the duration evenly among all the creatures the caster touches. The spell does not make creatures unable to breathe air. "
},
{
"name": "Web",
"Range": "10' per level",
"Duration": "2 turns/level",
"class": "Mage",
"level": "2",
"description": "Web creates a many-layered mass of strong, sticky strands, filling a volume of 8,000 cubic feet (equivalent to eight 10'x10'x10' cubes). The strands are similar to spider webs but far larger and tougher. These masses must be anchored to two or more solid and diametrically opposed points or else the web collapses upon itself and disappears; within this limitation, the caster may choose any arrangement of webs he or she wishes, up to the limit of range and the given 8,000 cubic foot volume. The caster may choose to create a smaller volume if he or she wishes. Creatures caught within a web become entangled among the gluey fibers. Attacking a creature in a web won't cause the attacker to become entangled, but moving through the affected area will. Anyone in the area of effect when the spell is cast must make a save vs Death Ray. If this save succeeds, the creature is entangled, but not prevented from moving, though moving is reduced to one-half normal movement rate. Such entangled creatures may not cast spells or perform normal attacks; whether other actions are possible is left to the GM to decide. Once an entangled creature leaves the area of effect of the web, it will be able to act normally again. If the save fails, the creature is entangled and can't move or perform any other physical action. Speech remains possible, however. Creatures with Strength of 13 or higher (or 4 or more hit dice) may be able to break loose, however; each round, such creatures are allowed another save vs Death Ray with results as given above. Creatures failing the initial save and having Strength of 12 or less (or fewer than 4 hit dice) are trapped until the duration expires or the webs are otherwise removed. The strands of a web spell are flammable. Any fire can set the webs alight and burn away a 10' cube in 1 round; the fire will spread to adjacent 10' cubes each round until all the webbing is consumed (or the fire is put out by some means). All creatures within flaming webs take 2d4 points of fire damage from the flames, but if they survive they are completely free afterwards. "
},
{
"name": "Wizard Eye",
"Range": "240'",
"Duration": "6 turns",
"class": "Mage",
"level": "4",
"description": "With this spell the caster creates an invisible magical \"eye\" through which he or she can see. The eye has Darkvision, but otherwise sees exactly as the caster would. It can be created in any place the caster can see, up to a range of 240' away, and thereafter can move at a rate of 40' per round as directed by the caster. The eye will not move more than 240' feet away from the caster under any circumstances. The eye cannot pass through solid objects, but as it is exactly the size of a normal human's eye, it can pass through holes as small as 1 inch in diameter. The caster must concentrate to use the eye. "
},
{
"name": "Wizard Lock",
"Range": "20'",
"Duration": "permanent",
"class": "Mage",
"level": "2",
"description": "A wizard lock spell cast upon a door, chest, or portal magically locks it. The caster can freely pass his or her own wizard lock without affecting it, as can any Mage 3 or more levels higher than the caster of the wizard lock; otherwise, a door or object secured with this spell can be opened only by breaking in or with a successful dispel magic or knock spell. "
}
],

"Cleric": [
{
"name": "Animate Dead",
"Range": "touch",
"Duration": "special",
"class": "Cleric",
"level": "4",
"description": "This spell turns the bones or bodies of dead creatures into undead skeletons or zombies that follow the caster's spoken commands. They remain animated until they are destroyed. The caster may animate a number of hit dice of undead equal to twice his or her caster level, and no more. Animated skeletons have hit dice equal to the number the creature had in life; for skeletons of humans or demi-humans, this means one hit die, regardless of the character level of the deceased. Zombies have one more hit die than the creature had in life. An animated skeleton can be created only from a mostly intact skeleton; a zombie can be created only from a mostly intact corpse. The caster must touch the remains to be animated. No character may normally control more hit dice of undead than 4 times his or her level, regardless of how many times this spell is cast. "
},
{
"name": "Animate Objects",
"Range": "100'+10'/level",
"Duration": "1 round/level",
"class": "Cleric",
"level": "6",
"description": "This spell imbues inanimate objects with mobility and a semblance of life. The animated objects then attack whomever or whatever the caster designates. This spell cannot animate objects carried or worn by a creature. An animated object can be of any non-magical material. The caster can animate one object per level, up to a maximum of 25 lbs. per caster level (i.e. 300 lbs. at 12th level, 325 lbs. at 13th level, and so on). The GM must rule on the effectiveness of animated objects in combat. In general, animated objects attack using the same attack bonus as the caster. Small or lightweight objects do no more than 1d4 damage per hit, while larger and/or heavier objects do 1d6 or 1d8 (at the GM's discretion). As a special case, weapons which are animated do damage using the normal die roll for the type, but only up to a maximum 1d8. Animated objects have a movement rate of 10', and generally must move in contact with the ground (walking, hopping, slithering, or bouncing, however seems most appropriate to the GM). "
},
{
"name": "Blade Barrier",
"Range": "90'",
"Duration": "1 round/level",
"class": "Cleric",
"level": "6",
"description": "This spell creates a wall of whirling blades up to 20' long per caster level, or a ringed wall of whirling blades with a radius of up to 5' per two levels. Either form will be up to 20 ft. high (as allowed by available space). Any creature passing through the wall takes 1d6 points of damage per caster level (maximum 15d6), with a save vs Death Ray reducing damage to half. If the caster evokes the barrier so that it appears where creatures are, each creature takes damage as if passing through the wall. Each such creature can avoid the wall (ending up on the side of its choice) and thus take no damage by making a successful save vs Death Ray. A blade barrier provides cover (+4 bonus to Armor Class) against attacks made through it. "
},
{
"name": "Bless*",
"Range": "50' radius",
"Duration": "1 minute/level",
"class": "Cleric",
"level": "2",
"description": "This spell gives the caster and his or her allies (within a 50' radius of the caster) a bonus of +1 on attack rolls, morale checks (for monsters or NPCs allied with the caster), and saving throws against magical fear. The reverse of bless is called bane. It fills the caster's enemies (within a 50' radius) with fear and doubt, causing each affected creature to suffer a -1 penalty on attack rolls, morale checks, and saving throws against magical fear. "
},
{
"name": "Charm Animal",
"Range": "60'",
"Duration": "level+1d4 rounds",
"class": "Cleric",
"level": "2",
"description": "This spell allows the caster to charm one or more animals, in much the same fashion as charm person, at a rate of 1 hit die per caster level. The caster may decide which individual animals out of a mixed group are to be affected first; excess hit dice of effect are ignored. No saving throw is allowed, either for normal or giant-sized animals, but creatures of more fantastic nature (as determined by the GM) are allowed a save vs Spells to resist. When the duration expires, the animals will resume normal activity immediately. This spell does not grant the caster any special means of communication with the affected animals; if combined with speak with animals, this spell becomes significantly more useful. "
},
{
"name": "Commune",
"Range": "self",
"Duration": "1 round/level",
"class": "Cleric",
"level": "5",
"description": "This spell puts the caster in contact with his patron deity or an extraplanar servant thereof, who answers one yes-or-no question per caster level. The ritual to cast this spell takes 1 turn to complete. The being contacted may or may not be omniscient, and further, though the being is technically allied with the caster, it may still not answer questions clearly or completely. These details are left to the GM's discretion. "
},
{
"name": "Continual Light*",
"Range": "360'",
"Duration": "1 year/level",
"class": "Cleric",
"level": "3",
"description": "This spell creates a spherical region of light, as bright as full daylight up to a 30' radius, with light of lesser intensity to a radius of 60'. Continual light can be cast on an object, into the air, or at a creature, just as with the light spell, up to a maximum range of 360' from the caster. The spell remains in effect for one year per level of the caster. As with light, this spell can be used to blind a creature if cast on its visual organs. Creatures targeted by this spell are allowed a save vs Death Ray; if the save is made, the spell is cast into the air just behind the target creature. A penalty of -4 is applied to the blinded creature's attack rolls if the saving throw fails. The reversed spell, continual darkness, causes complete absence of light in the area of effect, overpowering normal light sources. Continual darkness may be used to blind in the same way as continual light. "
},
{
"name": "Create Food",
"Range": "10'",
"Duration": "permanent",
"class": "Cleric",
"level": "5",
"description": "The food that this spell creates is simple fare of the caster's choice, highly nourishing, but rather bland. Up to 3 men or one horse per caster level can be fed for one day with this spell. Food so created decays and becomes inedible within 24 hours, although it can be kept fresh for another 24 hours by casting purify food and water on it. "
},
{
"name": "Create Water",
"Range": "10'",
"Duration": "permanent",
"class": "Cleric",
"level": "4",
"description": "This spell creates one gallon of water per caster level. Note that one or more vessels to contain the water must be available at the time of casting. The water created by this spell is just like clean rain water. Note: Water weighs about 8 pounds per gallon, and one cubic foot of water is roughly 8 gallons. "
},
{
"name": "Cure Blindness",
"Range": "touch",
"Duration": "instantaneous",
"class": "Cleric",
"level": "3",
"description": "With this spell the caster can cure a creature suffering blindness (whether caused by injury or by magic, including light or continual light). Blindness caused by a curse cannot be cured by this spell. "
},
{
"name": "Cure Disease*",
"Range": "touch",
"Duration": "instantaneous",
"class": "Cleric",
"level": "3",
"description": "Cure disease cures all diseases that the subject is suffering from. The spell also kills parasites afflicting the target creature. Certain special diseases may not be countered by this spell or may be countered only by a caster of a certain level or higher. Note: This spell does not prevent reinfection after a new exposure to the same disease. "
},
{
"name": "Cure Light Wounds*",
"Range": "touch",
"Duration": "instantaneous",
"class": "Cleric",
"level": "1",
"description": "With this spell the caster heals 1d6+1 hit points of damage by laying his or her hand upon the injured creature. The reverse form of this spell, cause light wounds, causes 1d6+1 damage to the creature affected by it. A successful attack roll is required in this case. Undead are affected by this spell and its reverse in opposite fashion; they are injured by cure light wounds and healed by cause light wounds. "
},
{
"name": "Cure Serious Wounds*",
"Range": "touch",
"Duration": "instantaneous",
"class": "Cleric",
"level": "4",
"description": "This spell works exactly like cure light wounds, save that it heals 2d6 points of damage, plus 1 point per caster level. The reverse, cause serious wounds, also works exactly like cause light wounds, except that it inflicts 2d6 + caster level in damage. "
},
{
"name": "Detect Evil*",
"Range": "60'",
"Duration": "1 round/level",
"class": "Cleric",
"level": "1",
"description": "This spell allows the caster to detect evil; specifically, the caster can detect creatures with evil intentions, magic items with evil enchantments, and possibly extraplanar creatures of evil nature. Normal characters, even \"bad\" characters, cannot be detected by this spell, as only overwhelming evil is detectable. The caster sees the \"evil\" creatures or objects with a definite glow around them, but the glow cannot be seen by anyone else. The exact definition of evil is left for the GM to decide. Note that items such as ordinary traps or poisons are not \"evil,\" and thus not detectable by this spell. Reversed, this spell becomes detect good, which works just as described above with respect to detecting \"good\" enchantments, angelic creatures, and so on. "
},
{
"name": "Detect Magic",
"Range": "60'",
"Duration": "2 turns",
"class": "Cleric",
"level": "1",
"description": "The caster of this spell is able to detect enchanted or enspelled objects or creatures within the given range by sight, seeing them surrounded by a pale glowing light. Only the caster sees the glow. Invisible creatures or objects are not detected by this spell, but the emanations of the invisibility magic will be seen as an amorphous glowing fog, possibly allowing the caster (only) to attack the invisible creature at an attack penalty of only -2. "
},
{
"name": "Dispel Evil",
"Range": "touch",
"Duration": "1 round/level",
"class": "Cleric",
"level": "5",
"description": "This powerful spell aids the caster in dealing with creatures from the nether planes, hereafter called \"evil creatures.\" First, the caster gains a +4 bonus to Armor Class against attacks by evil creatures. Second, the caster can choose to drive an evil creature back to its home plane by touch (requiring a successful attack roll). The creature can negate the effects with a successful save vs Spells. This use discharges and ends the spell, even if the saving throw succeeds. Third, with a touch the caster can automatically dispel any one spell cast by an evil creature. Exception: Spells that can't be dispelled by dispel magic also can't be dispelled by dispel evil. Saving throws do not apply to this effect. This use also ends the spell. The exact definition of evil is left for the GM to decide; however, extraplanar creatures that oppose the caster should almost always qualify. "
},
{
"name": "Dispel Magic",
"Range": "120'",
"Duration": "instantaneous",
"class": "Cleric",
"level": "4",
"description": "The caster can use dispel magic to end ongoing spells that have been cast on a creature or object, or to end ongoing spells (or at least their effects) within a cubic area 20' on a side. The caster must choose whether to dispel magic on a creature or object, or to affect an area. If dispel magic is targeted at a creature, all spell effects (including ongoing potion effects) may be canceled. If cast upon an area, all such effects within the area may be canceled. Any spell or effect having a caster level equal to or less than the dispel magic caster's level is ended automatically. Those created by higher level casters might not be canceled; there is a 5% chance the dispel magic will fail for each level the spell effect exceeds the caster level. For example, a 10th level caster dispelling magic created by a 14th level caster has a 20% chance of failure. Some spells cannot be ended by dispel magic; this specifically includes any curse, including those created by bestow curse (the reverse of remove curse) as well as by cursed items. "
},
{
"name": "Find Traps",
"Range": "30'",
"Duration": "3 turns",
"class": "Cleric",
"level": "2",
"description": "This spell permits the caster to detect a variety of traps, both mechanical and magical. When the caster moves within 30' of a trap, he or she will see it glow with a faint greenish-blue aura. The caster is not, however, able to detect certain natural hazards such as quicksand, a sinkhole, or unsafe walls of natural rock. The spell also does not bestow the caster with the knowledge needed to disarm the trap, nor any details about its type or nature. "
},
{
"name": "Find the Path",
"Range": "touch",
"Duration": "1 turn/level",
"class": "Cleric",
"level": "6",
"description": "The recipient of this spell can find the shortest, most direct physical route to a specified destination. The caster must have some knowledge about the location; any location the caster has ever visited can be so located, as well as locations described to the caster. Even knowing the name of a location (if it has a name) is enough for this spell to function. The locale can be outdoors or underground. Find the path works with respect to locations, not objects or creatures. The location must be on the same plane as the caster at the time of casting. The spell enables the subject to sense the correct direction that will eventually lead it to its destination, indicating at appropriate times the exact path to follow or physical actions to take. For example, the spell enables the subject to detect secret doors and to know any passwords required. The spell ends when the destination is reached or the duration expires, whichever comes first. "
},
{
"name": "Growth of Animals",
"Range": "60'+10'/level",
"Duration": "1 turn/level",
"class": "Cleric",
"level": "3",
"description": "This spell causes an animal to grow to twice its normal size and eight times its normal weight. The affected creature will do double normal damage with all physical attacks, and its existing natural Armor Class increases by 2. The animal's carrying capacity is also doubled. Unfriendly animals may save vs Spells to resist this spell; normally, domesticated animals will not attempt to resist it, though they may become confused or panicky afterward (at the GM's discretion). All equipment worn or carried by an animal is similarly enlarged by the spell, though this change has no effect on the magical properties of any such equipment. Any enlarged item that leaves the enlarged creature's possession instantly returns to its normal size. The spell gives no means of command or influence over the enlarged animals. "
},
{
"name": "Heal*",
"Range": "touch",
"Duration": "permanent",
"class": "Cleric",
"level": "6",
"description": "Heal enables the caster to wipe away injury and afflictions. It immediately ends any and all of the following adverse conditions affecting the target: ability damage, blindness, confusion, deafness, disease, exhaustion or fatigue, feeblemind, insanity, nausea, and poison. It also restores all but 1d4 of the target's hit points. Heal does not remove negative levels or restore permanently drained ability score points. The reversed spell, harm, injures the creature touched so horribly that it is left with only 1d4 hit points. The caster must succeed at a normal attack roll in this case; failure means the spell is wasted. Note that, if the victim has fewer hit points remaining than the number rolled, he or she will take at least one point of damage (and this is the only case in which harm may kill a creature). Generally, both heal and harm only affect living creatures. If used against an undead creature, heal instead acts like harm; likewise, harm affects undead like heal. Constructs such as golems are unaffected by either spell. "
},
{
"name": "Hold Person",
"Range": "180'",
"Duration": "2d8 turns",
"class": "Cleric",
"level": "2",
"description": "This spell will render any living (not undead) human, demi-human or humanoid creature paralyzed. Creatures larger than ogres will not be affected by this spell. Targets of the spell are aware, and breathe normally, but cannot take any actions, including speech. A successful save vs Spells will negate the effect. The spell may be cast at a single person, who makes his or her save at -2, or at a group, in which case 1d4 of the creatures in the group may be affected. A winged creature which is paralyzed cannot flap its wings and falls (if in flight at the time). A paralyzed swimmer can't swim and may drown. "
},
{
"name": "Insect Plague",
"Range": "300'+30'/level",
"Duration": "1 round/level",
"class": "Cleric",
"level": "5",
"description": "This spell summons one swarm of locusts per three caster levels, to a maximum of six swarms at 18th level. See Insect Swarm in the Monsters section for the effects of a swarm. The swarms must be summoned so that each one is adjacent to at least one other swarm (that is, the swarms must fill one contiguous area). The caster may summon the locust swarms so that they share the area of other creatures. Each swarm attacks any creatures occupying its area. The swarms are stationary after being summoned. "
},
{
"name": "Light*",
"Range": "120'",
"Duration": "6 turns + 1/level",
"class": "Cleric",
"level": "1",
"description": "This spell creates a light equal to torchlight which illuminates a 30' radius area (and provides dim light for an additional 20') around the target location or object. The effect is immobile if cast into an area, but it can be cast on a movable object. Light taken into an area of magical darkness does not function. Reversed, light becomes darkness, creating an area of darkness just as described above. This darkness blocks out Darkvision and negates mundane light sources. A light spell may be cast to counter and dispel the darkness spell of an equal or lower level caster (and vice versa). Doing so causes both spells to instantly cease, restoring the existing ambient light level. Either version of this spell may be used to blind an opponent by means of casting it on the target's ocular organs. The target is allowed a saving throw vs Death Ray to avoid the effect, and if the save is made, the spell does not take effect at all. A light or darkness spell cast to blind does not have the given area of effect (that is, no light or darkness is shed around the victim). "
},
{
"name": "Locate Object",
"Range": "360'",
"Duration": "1 round/level",
"class": "Cleric",
"level": "3",
"description": "This spell allows the caster to sense the direction of a well-known or clearly visualized object. He or she can search for general items, in which case the nearest one of its kind is located if more than one is within range. The caster cannot specify a unique item unless he or she has observed that particular item firsthand (not through divination). The spell is blocked by even a thin sheet of lead or gold. Creatures cannot be found by this spell. "
},
{
"name": "Neutralize Poison*",
"Range": "touch",
"Duration": "instantaneous",
"class": "Cleric",
"level": "4",
"description": "This spell detoxifies any sort of venom in the creature or object touched. A poisoned creature suffers no additional effects from the poison; if cast upon a creature slain by poison in the last 10 rounds, the creature is revived with 1 hit point. If cast upon a poisonous object (weapon, trap, etc.) the poison is rendered permanently ineffective. Reversed, this spell becomes poison. The caster must make a successful attack roll; if the attack is a success, the target must save vs Poison or die. The caster's touch remains poisonous for 1 round per level of ability, or until discharged (i.e. only one creature can be affected by the reversed spell). "
},
{
"name": "Protection from Evil*",
"Range": "touch",
"Duration": "1 turn/level",
"class": "Cleric",
"level": "1",
"description": "This spell wards a creature from attacks by evil creatures, from mental control, and from summoned creatures. It creates a magical barrier around the subject at a distance of 1 foot. The barrier moves with the subject and has three major effects. First, the subject gains a +2 bonus to AC and a +2 bonus on saves. Both these bonuses apply against attacks made or effects created by evil creatures. Note that the definition of \"evil\" is left to the individual GM to decide. Second, the barrier blocks any attempt to possess the warded creature (by a magic jar attack, for example) or to exercise mental control over the creature (including charm spells or effects). The protection does not prevent such effects from targeting the protected creature, but it suppresses the effect for the duration of the protection from evil effect. If the protection from evil effect ends before the effect granting control does, the would-be controller would then be able to command the controlled creature. Likewise, the barrier keeps out a possessing life force but does not expel one if it is in place before the spell is cast. Third, the spell prevents bodily contact by summoned creatures (regardless of whether they are \"evil\" or not). This causes the natural weapon attacks of such creatures to fail and the creatures to recoil if such attacks require touching the warded creature. The protection against contact by summoned creatures ends if the warded creature makes an attack against or tries to force the barrier against the blocked creature. Reversed, this spell becomes protection from good. It functions in all ways as described above, save that \"good\" creatures are kept away, rather than \"evil\" creatures. "
},
{
"name": "Protection from Evil 10' Radius*",
"Range": "touch",
"Duration": "1 turn/level",
"class": "Cleric",
"level": "4",
"description": "This spell functions exactly as protection from evil, but with a 10' radius rather than a 1' radius. All within the radius receive the protection; those who leave and then re-enter, or who enter after the spell is cast, receive the protection as well. Reversed, this spell becomes protection from good 10' radius, and functions exactly as the reversed form of protection from evil, except that it covers a 10' radius around the target rather than the normal 1' radius. "
},
{
"name": "Purify Food and Water",
"Range": "10'",
"Duration": "instantaneous",
"class": "Cleric",
"level": "1",
"description": "This spell makes spoiled, rotten, poisonous, or otherwise contaminated food and water pure and suitable for eating and drinking. This spell does not prevent subsequent natural decay or spoilage. Unholy water and similar food and drink of significance is spoiled by purify food and drink, but the spell has no effect on creatures of any type nor upon magic potions. "
},
{
"name": "Quest*",
"Range": "5'/level",
"Duration": "special",
"class": "Cleric",
"level": "5",
"description": "Quest places a magical command on a creature to carry out some service or to refrain from some action or course of activity, as desired by the caster. The target creature must be able to understand the caster for this spell to take effect. While a quest cannot compel a creature to kill itself or perform acts that would result in certain death, it can cause almost any other course of activity. A saving throw vs Spells will allow an unwilling target to resist a quest when it is first cast. However, the target may choose to accept the quest, typically as part of a bargain with the caster to perform some service. The affected creature must follow the given instructions until the quest is completed, no matter how long it takes. If the instructions involve some open-ended task that the recipient cannot complete through his own actions the spell remains in effect for a maximum of one day per caster level. A clever recipient can subvert some instructions. If the subject is prevented from obeying the quest for 24 hours, it takes 3d6 points of damage each day. A quest (and all effects thereof) can be ended by a remove curse spell from a caster two or more levels higher than the caster of the quest, or by a wish, or by the reverse of this spell. Dispel magic does not affect a quest spell. "
},
{
"name": "Raise Dead*",
"Range": "touch",
"Duration": "instantaneous",
"class": "Cleric",
"level": "5",
"description": "This spell restores life to a deceased human, demi-human or humanoid. The caster can raise a creature that has been dead for no longer than one day per caster level. In addition, the subject's soul must be free and willing to return. If the subject's soul is not willing to return, the spell does not work. Coming back from the dead is an ordeal. The subject of the spell loses one level (or 1 hit die) when it is raised, permanently (i.e. it does not accrue a negative level, but rather loses an actual level, being reduced to the minimum number of experience points required for the previous level). If the subject is 1st level, it loses 1 point of Constitution instead (if this would reduce its Constitution to 0 or less, it can't be raised). This level, hit dice, or Constitution loss cannot be repaired by any means, though of course the character may gain levels and hit dice in the normal fashion. Also note, a character who died with spells prepared has none prepared upon being raised. A raised creature has a number of hit points equal to its current hit dice. Normal poison and normal disease are cured in the process of raising the subject, but magical diseases and curses are not undone. While the spell closes mortal wounds and repairs lethal damage of most kinds, the body of the creature to be raised must be whole. Otherwise, missing parts are still missing when the creature is brought back to life. None of the dead creature's equipment or possessions are affected in any way by this spell. A creature which has become undead can't be raised by this spell. Constructs and elementals cannot be raised. The spell cannot bring back a creature that has died of old age. The reverse of this spell, slay living, will kill instantly the creature touched (which may be of any sort, not just a human, demi-human or humanoid) unless a save vs Spells is made. If the saving throw is successful, 2d6 damage is dealt to the victim instead. An attack roll is required to apply this spell in combat. "
},
{
"name": "Regenerate",
"Range": "touch",
"Duration": "permanent",
"class": "Cleric",
"level": "6",
"description": "This spell causes the subject's severed body members (fingers, toes, hands, feet, arms, legs, tails, or even heads of multiheaded creatures), broken bones, and ruined organs to grow back. After the spell is cast, the physical regeneration is complete in 1 round if the severed members are present and touching the creature. Otherwise, a full turn is required for the regeneration to complete. This spell also heals 3d8 points of damage. Regenerate has no effect on nonliving creatures or constructs (including undead). "
},
{
"name": "Remove Curse*",
"Range": "30'",
"Duration": "instantaneous",
"class": "Cleric",
"level": "3",
"description": "Remove curse instantaneously removes all curses on an object or a creature. Remove curse does not remove the curse from a cursed shield, weapon, or suit of armor, although the spell typically enables the creature afflicted with any such cursed item to remove and get rid of it. Certain special curses may not be countered by this spell or may be countered only by a caster of a certain level or higher. The reverse of this spell, bestow curse, allows the caster to place a curse on the subject. A save vs Spells is allowed to resist. The caster must choose one of the following three effects: -4 decrease to an ability score (minimum 1). -4 penalty on attack rolls and saves. Each round of combat, the target has a 50% chance to act normally; otherwise, it takes no action. The caster may also invent his or her own curse, but it should be no more powerful than those described above. The curse thus bestowed cannot be dispelled, but it can be removed with a remove curse spell. "
},
{
"name": "Remove Fear*",
"Range": "touch (120')",
"Duration": "instantaneous (2 turns)",
"class": "Cleric",
"level": "1",
"description": "This spell will calm the creature touched. If the target creature is currently subject to any sort of magical fear, it is allowed a new save vs Spells to resist that fear, at a bonus of +1 per level of the caster. The reverse of this spell, cause fear, causes one target creature within 120' to become frightened; if the target fails to save vs Spells, it flees for 2 turns. Creatures with 6 or more hit dice are immune to this effect. "
},
{
"name": "Resist Cold",
"Range": "touch",
"Duration": "1 round/level",
"class": "Cleric",
"level": "1",
"description": "This abjuration grants a creature temporary immunity to cold. Minor cold (such as exposure to winter weather in inadequate clothing) is ignored by the affected creature. Against more significant cold (such as the breath of a White Dragon), the affected creature gains a bonus of +3 on saving throws, and all damage from such attacks is reduced by half (round up). "
},
{
"name": "Resist Fire",
"Range": "touch",
"Duration": "1 round/level",
"class": "Cleric",
"level": "2",
"description": "This abjuration grants a creature temporary immunity to fire and heat. Minor heat or fire (such as exposure to normal flames) is ignored by the affected creature. Against more significant heat or fire (such as a fireball), the affected creature gains a bonus of +3 on saving throws, and all damage from such attacks is reduced by half (round up). "
},
{
"name": "Restoration",
"Range": "touch",
"Duration": "permanent",
"class": "Cleric",
"level": "6",
"description": "Each casting of the spell removes a single negative level from a creature who has suffered energy drain. At 16th level, two negative levels may be removed. See the rules for Energy Drain (in the Encounter section) for more details. Alternately, this spell can be used to restore drained ability score points. If applied to a character who has suffered temporary loss of ability points, it will restore up to 1d4 lost points to any one drained ability immediately. If applied to a character who has suffered permanent loss of ability points, 1 point can be restored. Restoration does not restore levels lost due to death (as described for the spell raise dead). "
},
{
"name": "Silence 15' Radius",
"Range": "360'",
"Duration": "2 rounds/level",
"class": "Cleric",
"level": "2",
"description": "Upon the casting of this spell, complete silence prevails within a 15' radius around the target. All sound is stopped: Conversation is impossible, spells cannot be cast, and no noise whatsoever issues from, enters, or passes through the area. The spell can be cast on a point in space, making the effect stationary, or it may be cast on a mobile object. The spell can be centered on a creature, and the effect then radiates from the creature and moves as it moves. An unwilling creature receives a save vs Spells to negate the spell. If an item in another creature's possession is targeted, that creature also receives a save vs Spells to negate. This spell provides a defense against sonic or language-based attacks or spells. "
},
{
"name": "Speak with Animals",
"Range": "special",
"Duration": "1 turn/4 levels",
"class": "Cleric",
"level": "2",
"description": "The caster can comprehend and communicate with any one animal (normal or giant sized, but not magical or monstrous) that is in sight of the caster and able to hear him or her. The caster may change which animal he or she is speaking with at will, once per round. The spell doesn't alter the animal's reaction or attitude towards the caster; a standard reaction roll should be made to determine this. Furthermore, more intelligent animals are likely to be terse and evasive, while less intelligent ones make inane comments. However, if an animal is friendly toward the caster, it may be willing to grant some favor or service. "
},
{
"name": "Speak with Monsters",
"Range": "special",
"Duration": "1 turn/5 levels",
"class": "Cleric",
"level": "6",
"description": "The caster can comprehend and communicate with any one monster that is in sight of the caster and able to hear him or her. The caster may change which monster he or she is speaking with at will, once per round. Others able to understand the language spoken by the target monster (if any) will be able to understand the caster. The spell doesn't alter the monster's reaction or attitude towards the caster. Furthermore, more intelligent monsters are likely to be terse and evasive, while less intelligent ones make inane comments. If a monster is friendly toward the caster, it may decide to do some favor or service for him or her. Mindless monsters, plant creatures and undead are unaffected by this spell. "
},
{
"name": "Speak with Plants",
"Range": "20'",
"Duration": "1 turn",
"class": "Cleric",
"level": "4",
"description": "The caster can comprehend and communicate with both normal plants and plant creatures. A normal plant's sense of its surroundings is limited, so it won't be able to give (or recognize) detailed descriptions of creatures or answer questions about events outside its immediate vicinity. The spell doesn't alter the plant's reaction or attitude towards the caster; however, normal plants will generally communicate freely with the caster, as they have nothing else of importance to do. Intelligent plant creatures are more likely to be terse and evasive, behaving in much the same fashion as any other monster. If a plant creature is friendly toward the caster, it may decide to do some favor or service for him or her. Normal plants are usually not animate, and thus cannot generally perform \"services\" other than to answer questions. "
},
{
"name": "Speak with Dead",
"Range": "10'",
"Duration": "3 rounds/level",
"class": "Cleric",
"level": "3",
"description": "This spell grants the semblance of life and intellect to a corpse, allowing it to answer several questions that the caster puts to it. The caster may ask one question per two caster levels. Unasked questions are wasted if the duration expires. The corpse's knowledge is limited to what the creature knew during life, including the languages it spoke (if any). Answers are often brief, cryptic, or repetitive. If the corpse has been subject to speak with dead within the past week, the new spell fails. The caster can cast this spell on a corpse that has been deceased for any amount of time, but the body must be mostly intact to be able to respond. A damaged corpse may be able to give partial answers or partially correct answers, but it must at least have a mouth in order to speak at all. This spell does not let the caster actually speak to the person (whose soul has departed). It instead draws on the imprinted knowledge \"stored\" in the corpse. The partially animated body retains the imprint of the soul that once inhabited it, and thus it can speak with all the knowledge that the creature had while alive. The corpse, however, cannot learn new information. Indeed, it can't even remember being questioned. This spell does not affect a corpse that has been turned into an undead creature. "
},
{
"name": "Spiritual Hammer",
"Range": "30'",
"Duration": "1 round/level",
"class": "Cleric",
"level": "2",
"description": "This spell causes a warhammer made of pure force to spring into existence, attacking any foe chosen by the Cleric within range once per round. It deals 1d6 hit points of damage per strike, +1 point per three caster levels (maximum of +5). It uses the caster's normal attack bonus, striking as a magical weapon, and thus can inflict damage upon creatures that are only hit by magic weapons. If the hammer goes beyond the spell range, the Cleric loses sight of it, or the caster ceases to direct it, the hammer disappears. The hammer cannot be attacked or harmed by physical attacks, but dispel magic, disintegrate, or a rod of cancellation will dispel it. "
},
{
"name": "Sticks to Snakes",
"Range": "120'",
"Duration": "6 turns",
"class": "Cleric",
"level": "4",
"description": "This spell transforms normal wooden sticks into 1d4 hit dice worth of normal (not giant) snakes per every four caster levels. (See the Monsters section for details on types of snakes.) The snakes follow the commands of the caster. When slain, dispelled, or the spell expires, the snakes return to their original stick form. Magical \"sticks\" such as enchanted staves cannot be affected. "
},
{
"name": "Striking",
"Range": "touch",
"Duration": "1 round/level",
"class": "Cleric",
"level": "3",
"description": "This spell bestows upon one weapon the ability to deal 1d6 points of additional damage. This extra damage is applied on each successful attack for the duration of the spell. It provides no attack bonus, but if cast on a normal weapon, the spell allows monsters only hit by magical weapons to be affected; only the 1d6 points of magical damage applies to such a monster, however. "
},
{
"name": "True Seeing",
"Range": "touch",
"Duration": "1 round/level",
"class": "Cleric",
"level": "5",
"description": "This spell confers on the target the ability to see all things as they actually are. The subject sees through normal and magical darkness, notices secret doors, sees the exact locations of displaced creatures or objects, sees through normal or magical disguises, sees invisible creatures or objects normally, sees through illusions, and sees the true form of polymorphed, changed, or transmuted things. The range of true seeing conferred is 120 feet. True seeing, however, does not penetrate solid objects. It in no way confers X-ray vision or its equivalent. It does not negate concealment, including that caused by fog and the like. In addition, the spell effects cannot be further enhanced with known magic, so one cannot use true seeing through a crystal ball or in conjunction with clairvoyance. "
},
{
"name": "Wall of Fire",
"Range": "180'",
"Duration": "1 round/level",
"class": "Cleric",
"level": "5",
"description": "(or special) An immobile, blazing curtain of shimmering violet fire springs into existence. One side of the wall, selected by the caster, sends forth waves of heat, dealing 2d4 points of fire damage to creatures within 10 feet and 1d4 points of fire damage to those beyond 10 feet but within 20 feet. The wall deals this damage when it appears and on the caster's turn each round to all creatures in the area. In addition, the wall deals 2d6 points +1 point per caster level of fire damage to any creature passing through it. The wall deals double damage to undead creatures. The wall is either a sheet of flame up to 20' in length per caster level, or a ring with a radius up to 5' per caster level. The caster may choose to make the wall smaller if desired. The wall may be up to 20' tall (as desired by the caster and/or constrained by the ceiling). If the caster evokes the wall so that it appears where creatures are, each creature takes damage as if passing through the wall; a save vs Spells is allowed, with success indicating that damage is rolled as if the creature is within 10' of the wall. The caster may choose to maintain the spell indefinitely (within reasonable limits of endurance) by concentration, or may cast it with the standard duration of 1 round per level, at his or her option. "
},
{
"name": "Word of Recall",
"Range": "self (special)",
"Duration": "instantaneous",
"class": "Cleric",
"level": "6",
"description": "Word of recall teleports the caster instantly back to his or her sanctuary when a single word is uttered. The caster must designate the sanctuary when he or she prepares the spell, and it must be a very familiar place. The actual point of arrival is a designated area no larger than 10 feet by 10 feet. The caster can be transported any distance within a plane but cannot travel between planes. The caster can bring along objects or creatures, not to exceed 300 pounds plus 100 pounds per level above 10th. The caster must be in contact with all objects and/or creatures to be transported (although creatures to be transported may be in contact with one another, with at least one of those creatures in contact with the caster). An unwilling creature can't be teleported by word of recall. Likewise, a creature's save vs Spells prevents items in its possession from being teleported. "
}
]
},

"monsters": [
{
"armourClass": "17",
"damage": "2d6",
"description": "Giant ants are among the hardiest and most adaptable vermin. Soldiers and workers are about 5 to 6 feet long, while queens can grow to a length of 9 feet. Giant ants may be red or black; there is no statistical difference between them. Though relatively shy when first encountered, once combat begins they will fight to the death. They are known to collect shiny things, and so will sometimes have a small amount of treasure in their lair.\n\n Giant ants may occasionally mine shiny metals such as gold or silver; one in three (1-2 on 1d6) giant ant lairs will contain 1d100 x 1d100 gp value in relatively pure nuggets.",
"hit": "4",
"morale": "7 on first sighting, 12 after engaged",
"move": "60' (10')",
"name": "Ant, Giant",
"appearing": "2d6, Wild 2d6, Lair 4d6",
"attacks": "1 bite",
"savingThrows": "Fighter: 4",
"treasure": "U or special",
"experience": "240"
},
{
"armourClass": "13",
"damage": "1d4 or 1d6 or 1d8",
"description": "The statistics above represent common sorts of wild herd animals, including deer (1 hit die), aurochs (2 hit dice), elk or moose (3 hit dice) and bison (4 hit dice). Such creatures are often skittish and likely to flee if provoked, but males are more aggressive in the presence of females (the parenthesized morale applies in this case).",
"hit": "1 to 4",
"morale": "5 (7)",
"move": "80' (10')",
"name": "Antelope",
"appearing": "Wild 3d10",
"attacks": "1 butt",
"savingThrows": "Fighter: 1 to 4 ",
"treasure": "None",
"experience": "25 - 240"
},
{
"armourClass": "14",
"damage": "1d4/1d4",
"description": "These powerful creatures resemble gorillas but are far more aggressive; though they are actually omnivores, they prefer meat, and they kill and eat anything they can catch. An adult male carnivorous ape is 5-1/2 to 6 feet tall and weighs 300 to 400 pounds.",
"hit": "4",
"morale": "7",
"move": "40'",
"name": "Ape, Carnivorous",
"appearing": "1d6, Wild 2d4, Lair 2d4",
"attacks": "2 claws",
"savingThrows": "Fighter: 4",
"treasure": "None",
"experience": "240"
},
{
"armourClass": "15",
"damage": "1d8 + special",
"description": "The assassin vine is a semi-mobile plant found in temperate forests that collects its own grisly fertilizer by grabbing and crushing animals and depositing the carcasses near its roots.\n\nBecause it can lie very still indeed, an assassin vine surprises on a roll of 1-4 on 1d6. A successful hit inflicts 1d8 points of damage, and the victim becomes entangled, suffering an additional 1d8 points of damage thereafter. A victim may attempt to escape by rolling a saving throw vs Death Ray with Strength bonus added; this is a full action, so the victim may not attempt this and also perform an attack. The plant will continue to crush its victim until one or the other is dead or the victim manages to escape.\n\nAn assassin vine can move about, albeit very slowly, but generally only does so to seek new hunting grounds. They have no visual organs but can sense foes within 30 feet by sound and vibration.\n\nA mature plant consists of a main vine, about 20 feet long. Smaller vines up to 5 feet long branch off from the main vine about every 6 inches. These small vines bear clusters of leaves, and in late summer they produce bunches of small fruits that resemble wild grapes. The fruit is tough and has a hearty but bitter flavor. Assassin vine berries make a heady wine.\n\nA subterranean version of the assassin vine grows near hot springs, volcanic vents, and other sources of thermal energy. These plants have thin, wiry stems and gray leaves shot through with silver, brown, and white veins so that they resemble mineral deposits. An assassin vine growing underground usually generates enough offal to support a thriving colony of mushrooms and other fungi, which spring up around the plant and help conceal it.\n\n",
"hit": "6",
"morale": "12",
"move": "5'",
"name": "Assassin Vine",
"appearing": "1d4+1",
"attacks": "1 + special",
"savingThrows": "Fighter: 6",
"treasure": "U",
"experience": "500"
},
{
"armourClass": "16",
"damage": "1d10/petrification",
"description": "A basilisk is an eight-legged reptilian monster that petrifies living creatures with a mere gaze. A basilisk usually has a dull brown body with a yellowish underbelly. Some specimens sport a short, curved horn atop the nose. An adult basilisk’s body grows to about 6 feet long, not including its tail, which can reach an additional length of 5 to 7 feet. The creature weighs about 300 pounds.\n\n Any living creature which meets the gaze of the basilisk must save vs Petrification or be turned to stone instantly. In general, any creature surprised by the basilisk will meet its gaze. Those who attempt to fight the monster while averting their eyes suffer penalties of -4 to attack and -2 to AC. It is possible to use a mirror to fight the monster, in which case the penalties are -2 to attack and no penalty to AC. If a basilisk sees its own reflection in a mirror it must save vs Petrification or be turned to stone; a petrified basilisk loses its power to petrify. Basilisks instinctively avoid mirrors or other reflective surfaces, even drinking with their eyes closed, but if an attacker can manage to surprise the monster with a mirror it may see its reflection.",
"hit": "6**",
"morale": "9",
"move": "20' (10')",
"name": "Basilisk",
"appearing": "1d6, Wild 1d6, Lair 1d6",
"attacks": "1 bite/1 gaze",
"savingThrows": "Fighter: 6",
"treasure": "F",
"experience": "610"
},
{
"armourClass": "14",
"damage": "Confusion",
"description": "Bats are nocturnal flying mammals. The statistics presented here describe small, insectivorous bats. They have a natural sonar that allows them to operate in total darkness; for game purposes, treat this ability as Darkvision.\n\nA group of normal-sized bats has no effective attack (at least in terms of doing damage) but can confuse those in the area, flying around apparently randomly. For every ten bats in the area, one creature can be confused; such a creature will suffer a penalty of -2 on all attack and saving throw rolls while the bats remain in the area.\n\n A giant bat has a wingspan of 15 feet and weighs about 200 pounds. They have the same sensory abilities as normal-sized bats, but being much larger, they are able to attack adventurers; many are carnivorous, making such attacks likely.\n\nBears attack by rending opponents with their claws, dragging them in and biting them. A successful hit with both paws indicates a hug attack for additional damage (as given for each specific bear type). All bears are very tough to kill, and are able to move and attack for one round after losing all hit points.",
"hit": "1 Hit Point",
"morale": "6",
"move": "30' Fly 40'",
"name": "Bat (and Bat, Giant)",
"appearing": "1d100,\n\t\t\tWild 1d100,\n\t\t\tLair 1d100",
"attacks": "1 special",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "10"
},
{
"armourClass": "14",
"damage": "1d4/1d4/1d6 + 2d6 hug",
"description": "The black bear is a forest-dwelling omnivore that usually is not dangerous unless an interloper threatens its cubs or food supply.\n\nBlack bears may actually be pure black, blond, or cinnamon in color. They are rarely more than 5 feet long.",
"hit": "4",
"morale": "7",
"move": "40'",
"name": "Bear, Black",
"appearing": "1d4, Wild 1d4, Lair 1d4",
"attacks": "2 claws/1 bite + hug",
"savingThrows": "Fighter: 4",
"treasure": "None",
"experience": "240"
},
{
"armourClass": "15",
"damage": "1d8/1d8/2d6 + 2d8 hug",
"description": "These monstrous bears are even larger than grizzly bears. They are ferocious killers, attacking almost anything of equal or smaller size.\n\n Bear, Grizzly (or Brown)\n\nThese massive carnivores weigh more than 1,800 pounds and stand nearly 9 feet tall when they rear up on their hind legs. They are bad-tempered and territorial.",
"hit": "7",
"morale": "9",
"move": "40'",
"name": "Bear, Cave",
"appearing": "1d2, Wild 1d2, Lair 1d2",
"attacks": "2 claws/1 bite + hug",
"savingThrows": "Fighter: 7",
"treasure": "None",
"experience": "670"
},
{
"armourClass": "14",
"damage": "1d6/1d6/1d10 + 2d8 hug",
"description": "These long, lean carnivores are slightly taller than grizzly bears, and just as hostile.",
"hit": "6",
"morale": "8",
"move": "40'",
"name": "Bear, Polar",
"appearing": "1, Wild 1d2, Lair 1d2",
"attacks": "2 claws/1 bite + hug",
"savingThrows": "Fighter: 6",
"treasure": "None",
"experience": "500"
},
{
"armourClass": "13",
"damage": "1d4 + poison",
"description": " Although many times larger, growing to a length of about a foot, giant bees behave generally the same as their smaller cousins. Giant bees are usually not aggressive except when defending themselves or their hive. Those stung by a giant bee must save vs Poison or die. A giant bee that successfully stings another creature pulls away, leaving its stinger in the creature. The bee then dies.",
"hit": "1d4hp*",
"morale": "9",
"move": "10' Fly 50'",
"name": "Bee, Giant",
"appearing": "1d6, Wild 1d6, Lair 5d6",
"attacks": "1 sting",
"savingThrows": "Fighter: 1",
"treasure": "Special",
"experience": "13"
},
{
"armourClass": "16",
"damage": "1d6 + special",
"description": "Giant bombardier beetles have red head and thorax sections and black abdomens. They are 3 to 4 feet long. In combat, a giant bombardier beetle bites opponents in front of it, and sprays a cone of very hot and noxious gases from a nozzle in the rearmost tip of the abdomen. This toxic blast causes 2d6 points of damage to all within a cone 10' long and 10' wide at the far end (a save vs Death Ray for half damage is allowed). A giant bombardier beetle can use this spray attack up to five times per day, but no more often than once per three rounds. Faced with opponents attacking from just one direction, a giant bombardier beetle may choose to turn away and use the spray attack rather than biting.\n\nGiant bombardier beetles, like most beetles, have more or less the same visual acuity in all directions, and thus suffer no penalty to Armor Class when attacked from behind.",
"hit": "2*",
"morale": "8",
"move": "40'",
"name": "Beetle, Giant Bombardier",
"appearing": "1d8, Wild 2d6, Lair 2d6",
"attacks": "1 bite + special",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "100"
},
{
"armourClass": "16",
"damage": "2d4",
"description": "These luminous nocturnal insects are prized by miners and adventurers. They have two glands, one above each eye, that produce a red glow. The glands’ luminosity persists for 1d6 days after removal from the beetle, illuminating a roughly circular area with a 10-foot radius.\n\nGiant fire beetles are about 2 feet long. They are normally timid but will fight if cornered. Like most beetles, they have more or less the same visual acuity in all directions, and thus suffer no penalty to Armor Class when attacked from behind.",
"hit": "1+2",
"morale": "7",
"move": "40'",
"name": "Beetle, Giant Fire",
"appearing": "1d8, Wild 2d6, Lair 2d6",
"attacks": "1 bite",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "25"
},
{
"armourClass": "17",
"damage": "2d6",
"description": "Giant tiger beetles are predatory monsters around 5 feet long. Their carapaces tend to be dark brown with lighter brown striped or spotted patterns, but there are many variations.\n\nThey are fast runners, depending on their speed to run down prey, and they willingly prey on any creature of man size or smaller. Like most beetles, they have more or less the same visual acuity in all directions, and thus suffer no penalty to Armor Class when attacked from behind.",
"hit": "3+1",
"morale": "9",
"move": "60' (10')",
"name": "Beetle, Giant Tiger",
"appearing": "1d6, Wild 2d4, Lair 2d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 3",
"treasure": "U",
"experience": "145"
},
{
"armourClass": "14",
"damage": "3d8",
"description": "Black puddings are amorphous creatures that live only to eat. They inhabit underground areas throughout the world, scouring caverns, ruins, and dungeons in search of organic matter, living or dead. They attack any creatures they encounter, lashing out with pseudopods or simply engulfing opponents with their bodies, which secrete acids that help them catch and digest their prey.\n\nIf attacked with normal or magical weapons, or with lightning or electricity, a black pudding suffers no injury, but will be split into two puddings; the GM should divide the original black pudding's hit dice between the two however he or she sees fit, with the limitation that neither pudding may have less than two hit dice. A two hit die black pudding is simply unharmed by such attacks, but cannot be split further.\n\nCold or ice based attacks do not harm a black pudding, but such an attack will paralyze the pudding for one round per die of damage the attack would normally cause. Other attack forms will affect a black pudding normally; the preferred method of killing one usually involves fire.\n\nThe typical black pudding measures 10 feet across and 2 feet thick, and weighs about 10,000 pounds. Black puddings of smaller sizes may be encountered, possibly as a result of the splitting described above.",
"hit": "10* (+9)",
"morale": "12",
"move": "20'",
"name": "Black Pudding*",
"appearing": "1",
"attacks": "1 pseudopod",
"savingThrows": "Fighter: 10",
"treasure": "None",
"experience": "1,390"
},
{
"armourClass": "15",
"damage": "1d6",
"description": "The blink dog is an intelligent canine that has a limited teleportation ability; they are able to teleport up to 120' at will. Blink dogs may teleport immediately after attacking, thus possibly avoiding being attacked. In particular, a blink dog may teleport next to an opponent, attack, and teleport away in the same round; the victim would need to strike on the same Initiative number as the blink dog in order to attack it in melee.\n\nBlink dogs hunt in packs, teleporting in a seemingly random fashion until they surround their prey, allowing some of them to get the bonus for attacking from behind.\n\nBlink dogs are medium-sized dogs, typically light brown in color and short haired, though other varieties are rumored to exist. They have their own language, a mixture of barks, yaps, whines, and growls that can transmit complex information. They are usually shy, avoiding a fight if possible, but they hate displacers and will generally attack them on sight.",
"hit": "4*",
"morale": "6",
"move": "40'",
"name": "Flicker Beast",
"appearing": "1d6, Wild 1d6, Lair 1d6",
"attacks": "1 bite",
"savingThrows": "Fighter: 4",
"treasure": "C",
"experience": "280"
},
{
"armourClass": "13",
"damage": "1d6",
"description": "Blood roses appear to be normal rose bushes, but are actually animated plants, dimly aware of their surroundings. These plants are always in bloom, bearing beautiful flowers that are normally white (or rarely, yellow) in color.\n\nThe fragrance of the flowers is detectable up to 30' from the plant in ideal conditions. Blood roses can move about slowly, and will try to find locations sheltered from the wind in order to achieve those ideal conditions. Living creatures who smell the fragrance must save vs Poison or become befuddled, dropping anything carried and approaching the plant. Each round such a creature or character is within the affected area, this save must be made. Befuddled characters will not resist the plant-creature's attacks; if affected creatures are removed from the area, the effect of the fragrance will expire 2d4 rounds later. Undead monsters, constructs, etc. are not affected.\n\nEach blood rose plant will have 1, 2 or 3 whiplike canes studded with thorns with which it can attack. When a cane hits, it wraps around the victim and begins to drain blood, doing 1d6 points of damage per round. A blood rose which has recently (within one day) “eaten” this way will have flowers ranging from pink to deep wine red in color, which will fade slowly back to white or yellow as the plant digests the blood it has consumed.",
"hit": "2* to 4*",
"morale": "12",
"move": "1'",
"name": "Blood Rose",
"appearing": "Wild 1d8",
"attacks": "1 to 3 plus blood drain",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "100 - 280"
},
{
"armourClass": "13",
"damage": "2d4",
"description": "Though not carnivores, these wild swine are bad-tempered and usually charge anyone who disturbs them. Note that “boar” refers specifically to the male of the species, but females are equally large and fierce.\n\nA boar is covered in coarse, grayish-black fur. Adults are about 4 feet long and 3 feet high at the shoulder.",
"hit": "3",
"morale": "9",
"move": "50' (10')",
"name": "Boar, Wild",
"appearing": "Wild 1d6",
"attacks": "1 tusk",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "145"
},
{
"armourClass": "15 (13)",
"damage": "1d8+1 or by weapon +1",
"description": "Bugbears look like huge, hairy goblins, standing about 6 feet tall. Their eyes are usually a darkish brown color and they move very quietly. They are wild and relatively fearless, and bully smaller humanoids whenever possible.\n\nBugbears prefer to ambush opponents if they can. When hunting, they often send scouts ahead of the main group. Bugbear attacks are coordinated, and their tactics are sound if not brilliant. They are able to move in nearly complete silence, surprising opponents on 1-3 on 1d6. In order to remain silent, they must wear only leather or hide armor, as indicated in the Armor Class scores above. Bugbears receive a +1 bonus on damage due to their great Strength. As with most goblinoid monsters, they have Darkvision with a 30' range.\n\nOne out of every eight bugbears will be a hardened warrior of 4+4 Hit Dice (240 XP), with a +2 bonus to damage. In lairs of 16 or more bugbears, there will be a chieftain of 6+6 Hit Dice (500 XP), with a +3 bonus to damage. Bugbears gain a +1 bonus to their morale if they are led by a hardened warrior or chieftain. In the lair, bugbears never fail a morale check as long as the chieftain is alive. In addition, there is a 2 in 6 chance that a shaman will be present in a lair. A shaman is equal to an ordinary bugbear statistically, but possesses 1d4+1 levels of Clerical abilities.",
"hit": "3+1",
"morale": "9",
"move": "30' Unarmored 40'",
"name": "Bugbear",
"appearing": "2d4, Wild 5d4, Lair 5d4",
"attacks": "1 weapon",
"savingThrows": "Fighter: 3",
"treasure": "Q, R each; B, L, M in lair",
"experience": "145"
},
{
"armourClass": "14",
"damage": "1d8 + 1d8/round if swallowed",
"description": "Caecilia are carnivorous, legless amphibians; they strongly resemble earthworms, but they have bony skeletons and sharp teeth. Caecilia live entirely underground. The giant variety grows up to 30' long and frequently are found in caverns or dungeons. They are nearly blind, but caecilia are very sensitive to sound and vibrations, and are able to find their prey regardless of light or the absence thereof.\n\nA caecilia can swallow a single small humanoid or demi-human (such as a goblin or halfling) whole. On a natural attack roll of 19 or 20, such a victim has been swallowed (assuming that roll does actually hit the victim). A swallowed victim suffers 1d8 damage per round, and may only attack from the inside with a small cutting or stabbing weapon such as a dagger. While the inside of the caecilia is easier for the victim to hit, fighting while swallowed is more difficult, so no modifiers to the attack roll are applied.\n\nOnce a caecilia has swallowed an opponent, it will generally attempt to disengage from combat, going to its lair to rest and digest its meal.",
"hit": "6*",
"morale": "9",
"move": "20' (10')",
"name": "Caecilia, Giant",
"appearing": "1d3, Lair 1d3",
"attacks": "1 bite + swallow on 19/20",
"savingThrows": "Fighter: 3",
"treasure": "B",
"experience": "555"
},
{
"armourClass": "16",
"damage": "1d2 or 1d4* or special",
"description": "Giant cave locusts are pale, cricket-like creatures that live underground. An average giant cave locust is 2 to 4 feet long. They are eyeless, depending on their sound-sensitive antennae, vibration-sensitive feet and a variety of touch-sensitive “hairs” on their legs to sense the environment around them.\n\nThese creatures eat subterranean fungus (including shriekers) as well as carrion; they are not predators, but if disturbed they will attack, shrieking loudly, biting, jumping wildly around, or spitting nasty goo.\n\nAll giant cave locusts in a group will shriek when disturbed, attracting wandering monsters. The GM should roll a wandering monster check each round that one or more cave locusts are attacking; if wandering monsters are indicated, they will arrive in 1d4 rounds.\n\nAny giant cave locust that is engaged (adjacent to an opponent) will attempt to bite, doing 1d2 damage on a successful hit. This does not interrupt the monster's shrieking.\n\nA giant cave locust can leap up to 60' horizontally, or up to 30' up. If one of these creatures is not engaged at the beginning of the round, it will leap toward one of the opponent creatures; roll a normal attack roll, and if the attack hits, the target creature takes 1d4 points of non-lethal damage from the impact.\n\nFinally, a giant cave locust can spray a greenish-brown goo (its digestive juices) up to 10' away. Each giant cave locust can perform this attack just once per encounter. This spit attack will usually be reserved until they fail a morale check, in which case all remaining giant cave locusts will spit at their nearest opponent, and then all will attempt to flee in the next round. To spit on an opponent, the giant cave locust rolls an attack against Armor Class 11 (plus Dexterity and magical bonuses, but no normal armor value applies). If the attack hits, the target must save vs Poison or be unable to do anything for 3d6 rounds due to the horrible smell.",
"hit": "2**",
"morale": "5",
"move": "20' Fly 60' (15')",
"name": "Cave Locust, Giant",
"appearing": "2d10, Wild 1d10",
"attacks": "1 bite or 1 bump or 1 spit",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "125"
},
{
"armourClass": "12",
"damage": "1d8 or weapon + 1",
"description": " Cavemen are a species closely related to humans; they are shorter and stockier, and much more heavily muscled. They do not all actually live in caves. Whether they are actually less intelligent than “normal” humans or not is a matter of debate, but it is true that they do not have the facility for language as other human, demi-human and humanoid races.",
"hit": "2",
"morale": "7",
"move": "40'",
"name": "Caveman",
"appearing": "1d10, Wild 10d4, Lair 10d4",
"attacks": "1 weapon",
"savingThrows": "Fighter: 2",
"treasure": "C",
"experience": "75"
},
{
"armourClass": "15 (13)",
"damage": "1d6/1d6/1d6 or by weapon",
"description": "Centaurs appear to be half man, half horse, having the torso, arms and head of a man in the position a horse's head would otherwise occupy. A centaur is as big as a heavy horse, but much taller and slightly heavier; average males are about 7 feet tall and weigh about 2,100 pounds, and females are just a bit smaller. Centaurs may charge with a spear or lance just as a man on horseback, with the same bonuses. They typically wear leather armor when prepared for combat.\n\nCentaurs are generally haughty and aloof, but very honorable. Most would rather die than allow humans, demi-humans, or humanoids to ride on their backs.\n\n",
"hit": "4",
"morale": "8",
"move": "50' Unarmored 60' (10')",
"name": "Centaur",
"appearing": "Wild 2d10",
"attacks": "2 hooves/1 weapon",
"savingThrows": "Fighter: 4",
"treasure": "A",
"experience": "240"
},
{
"armourClass": "11",
"damage": "poison",
"description": "Giant centipedes are larger versions of the normal sort, being 2 to 3 feet long. Centipedes are fast-moving, predatory, venomous arthropods, having long segmented bodies with exoskeletons. They prefer to live in underground areas, shadowy forested areas, and other places out of direct sunlight; however, there are desert-dwelling varieties that hide under the sand waiting for prey to wander by.\n\nGiant centipedes tend to attack anything that resembles food, biting with their jaws and injecting their poison. Those bitten by a giant centipede must save vs Poison at +2 or die.",
"hit": "1d4 Hit Points*",
"morale": "7",
"move": "40'",
"name": "Centipede, Giant",
"appearing": "2d4, Wild 2d4, Lair 2d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "13"
},
{
"armourClass": "14",
"damage": "1d4/1d4/2d4",
"description": " A Cheetah is one of the fastest land animals - a large (about 100 pounds) cat capable of reaching up to 75 miles per hour when running. It hunts alone or in small groups (usually composed of siblings). It will rarely attack humans unless compelled to do so, but a female will ferociously defend her young.",
"hit": "2",
"morale": "7",
"move": "100'",
"name": "Cheetah",
"appearing": "Wild 1d3, Lair 1d3",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "16",
"damage": "1d4/1d4/2d4/2d4/3d4 + special",
"description": "Chimeras are strange creatures having a lion's body with the heads of a lion, a goat, and a dragon, and the wings of a dragon. A chimera is about 5 feet tall at the shoulder, nearly 10 feet long, and weighs about 4,000 pounds. A chimera’s dragon head might be black, blue, green, red, or white, and has the same type of breath weapon as that sort of dragon. Regardless of type, the dragon's head breathes a 50' long cone with a 10' wide end, for 3d6 points of damage; victims may save vs Dragon Breath for one-half damage.\n\n Chimeras are cruel and voracious. They can speak Dragon but seldom bother to do so, except when toadying to more powerful creatures.",
"hit": "9** (+8)",
"morale": "9",
"move": "40' (10') Fly 60' (15')",
"name": "Chimera",
"appearing": "1d2, Wild 1d4, Lair 1d4",
"attacks": "2 claws/3 heads + special",
"savingThrows": "Fighter: 9",
"treasure": "F",
"experience": "1,225"
},
{
"armourClass": "14",
"damage": "1d6 + petrification",
"description": "A cockatrice is a strange creature, appearing to be a chicken (hen or rooster) with a long serpentine neck and tail; the neck is topped by a more or less normal looking chicken head.\n\nA male cockatrice has wattles and a comb, just like a rooster. Females, much rarer than males, differ only in that they have no wattles or comb. A cockatrice weighs about 25 pounds. A cockatrice is no more intelligent than any animal, but they are bad-tempered and prone to attack if disturbed.\n\n Anyone touched by a cockatrice, or who touches one (even if gloved), must save vs Petrification or be turned to stone.",
"hit": "5**",
"morale": "7",
"move": "30' Fly 60' (10')",
"name": "Cockatrice",
"appearing": "1d4, Wild 1d8, Lair 1d8",
"attacks": "1 beak + special",
"savingThrows": "Fighter: 5",
"treasure": "D",
"experience": "450"
},
{
"armourClass": "18",
"damage": "2d6/2d6",
"description": "Giant crabs naturally resemble the ordinary variety, but are much larger, averaging 5' in diameter (not counting their legs). These creatures are often found in water-filled caves, particularly those connected to a river, lake or sea, and are tolerant of both fresh and salt water. Also, they are able to live in stagnant water, though they prefer a better environment.\n\nGiant crabs carry their eyes on armored stalks, which means that no bonus is awarded for attacking them from behind.",
"hit": "3",
"morale": "7",
"move": "20' Swim 20'",
"name": "Crab, Giant",
"appearing": "1d2, Wild 1d6, Lair 1d6",
"attacks": "2 pincers",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "145"
},
{
"armourClass": "15",
"damage": "1d8",
"description": "Crocodiles are aggressive predators 11 to 12 feet long. They lie mostly submerged in rivers or marshes, with only their eyes and nostrils showing, waiting for prey to come within reach; when in their natural element, they surprise on 1-4 on 1d6.\n\nLarge Crocodiles: These huge creatures are from 12-20 feet long. Large crocodiles fight and behave like their smaller cousins.\n\nGiant Crocodiles: These huge creatures usually live in salt water and are generally more than 20 feet long. Giant crocodiles fight and behave like their smaller cousins.",
"hit": "2",
"morale": "7",
"move": "30' (10') Swim 30' (10')",
"name": "Crocodile",
"appearing": "Wild 1d8",
"attacks": "1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "15",
"damage": "1d8",
"description": "The Deinonychus (sometimes mistakenly called a \"Velociraptor\") is a medium-sized feathered dinosaur weighting approximately 150 pounds and reaching about 11 feet of length (tail included). It is an avid predator and a skilled pack-hunter; its warm blood, aerodynamic build and vicious maw allow it to feed on larger but more primitive dinosaurs.",
"hit": "3",
"morale": "8",
"move": "50'",
"name": "Dinosaur, Deinonychus",
"appearing": "1d3, Wild 2d3, Lair 2d6",
"attacks": "1 bite",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "145"
},
{
"armourClass": "12",
"damage": "1d4",
"description": "Pterodactyls are prehistoric winged reptilian creatures, having a wingspan of around 25 to 30 inches. Though they eat mostly fish, they may attack smaller characters or scavenge unguarded packs.\n\n Pteranodons are essentially giant-sized pterodactyls, having wingspans of 25 feet or more. They are predators, and may attack adventuring parties.",
"hit": "1",
"morale": "7",
"move": "Fly 60' (10')",
"name": "Dinosaur, Pterodactyl (and Pteranodon)",
"appearing": "Wild 2d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "25"
},
{
"armourClass": "17",
"damage": "2d8/1d6 or 2d8",
"description": "Although fearsome looking, the stegosaurus is actually a peaceable creature and will only fight in self-defense, either biting, trampling, or using its spiked tail, depending on where the opponent is standing in relation to the dinosaur. A stegosaurus can't use its tail and bite attacks against the same creature in the same round.",
"hit": "11 (+9)",
"morale": "7",
"move": "20' (15')",
"name": "Dinosaur, Stegosaurus",
"appearing": "Wild 1d4",
"attacks": "1 tail/1 bite or 1 trample",
"savingThrows": "Fighter: 6",
"treasure": "None",
"experience": "1,575"
},
{
"armourClass": "19",
"damage": "3d6 or 3d6 (special, see below)",
"description": "A triceratops is a three-horned herbivorous dinosaur. They are aggressive toward interlopers, attacking anyone who might appear to be a threat. These creatures are about 25 feet long and weigh about 20,000 pounds. A triceratops will usually attempt to trample smaller opponents. Up to two adjacent man-sized or up to four smaller opponents may be trampled simultaneously; the triceratops rolls a single attack roll which is compared to the Armor Class of each of the potential victims, and then rolls a separate damage roll for each one successfully hit. The gore attack may only be used against a single man-sized or larger creature, but may be used in the same round as the trample if the creature being gored is larger than man sized. Also note that a charging bonus may be applied to the gore attack.",
"hit": "11 (+9)",
"morale": "8",
"move": "30' (15')",
"name": "Dinosaur, Triceratops",
"appearing": "Wild 1d4",
"attacks": "1 gore or 1 trample",
"savingThrows": "Fighter: 7",
"treasure": "None",
"experience": "1,575"
},
{
"armourClass": "23",
"damage": "6d6",
"description": "The tyrannosaurus rex is a bipedal carnivorous dinosaur. Despite its enormous size and 6-ton weight, a tyrannosaurus is a swift runner. Its head is nearly 6 feet long, and its teeth are from 3 to 6 inches in length. It is slightly more than 30 feet long from nose to tail. A tyrannosaurus pursues and eats just about anything it sees. Its tactics are simple – charge in and bite.\n\n The statistics above can also be used to represent other large bipedal carnosaurs, such as the allosaurus.",
"hit": "18 (+12)",
"morale": "11",
"move": "40' (10')",
"name": "Dinosaur, Tyrannosaurus Rex",
"appearing": "Wild 1d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 9",
"treasure": "None",
"experience": "4,000"
},
{
"armourClass": "16",
"damage": "1d8/1d8",
"description": "Displacers are blue-black, catlike monsters with strange bladed winglike arms extending from their shoulders. The blades are carried folded back like wings, but the Displacer swings the blades around in front to attack.\n\nThe real power and danger of the Displacer is its power of displacement, which causes the monster's apparent location to shift around constantly over a range of 3' from the monster's true location. This is a form of illusion, but a powerful form that cannot be seen through even by those who know the secret.\n\n Any character fighting a Displacer for the first time will miss his or her first strike regardless of the die roll. Thereafter, all attacks against displacers will be at a penalty of -2 to the attack roll. This is not cumulative with the penalty for fighting blind. Some monsters, such as bats, do not depend on vision to fight and thus may be able to perceive the monster's true location and fight without penalty.",
"hit": "6*",
"morale": "8",
"move": "50'",
"name": "Displacer",
"appearing": "1d4, Wild 1d4",
"attacks": "2 blades",
"savingThrows": "Fighter: 6",
"treasure": "D",
"experience": "555"
},
{
"armourClass": "15 ‡",
"damage": "2d8 or 2d6",
"description": "The djinn (singular djinni) are humanoid creatures from the Elemental Plane of Air. A djinni in its natural form is about 10½ feet tall and weighs about 1,000 pounds.\n\n Djinn disdain physical combat, preferring to use their magical powers and aerial abilities against foes. A djinni overmatched in combat usually takes flight and becomes a whirlwind (see below) to harass those who follow; the 12 morale reflects a djinni's absolute control over its own fear, but does not indicate that the creature will throw its life away easily. Use the “8” figure to determine whether an outmatched djinn decides to leave a combat.\n\nDjinn have a number of magical powers, which can be used at will (that is, without needing magic words or gestures): create food and drink, creating tasty and nourishing food for up to 2d6 humans or similar creatures, once per day; become invisible, with unlimited uses per day; create normal items, creating up to 1,000 pounds of soft goods or wooden items of permanent nature or metal goods lasting at most a day, once per day; assume gaseous form, as the potion, up to one hour per day; and create illusions, as the spell phantasmal force but including sound as well as visual elements, three times per day.\n\nDjinn may assume the form of a whirlwind at will, with no limit as to the number of times per day this power may be used; a djinni in whirlwind form fights as if it were an air elemental.\n\nDue to their highly magical nature, djinn cannot be harmed by non-magical weapons. They are immune to normal cold, and suffer only half damage from magical attacks based on either cold or wind.",
"hit": "7+1**",
"morale": "12 (8)",
"move": "30' Fly 80'",
"name": "Djinni*",
"appearing": "1",
"attacks": "1 fist or 1 whirlwind",
"savingThrows": "Fighter: 12",
"treasure": "None",
"experience": "800"
},
{
"armourClass": "14",
"damage": "1d4 + hold",
"description": "Normal dogs include most medium and large breeds, including wild dogs. After biting an opponent, a dog can hold on, doing 1d4 damage automatically every round, until killed or until the victim spends an attack breaking free (which requires a save vs Death Ray, adjusted by the character's Strength bonus).\n\nRiding dogs are a large breed, used primarily by Halflings for transport. They may be trained for war, and equipped with barding to improve their Armor Class. They can maintain a hold in the same way that normal dogs do. A light load for a riding dog is up to 150 pounds; a heavy load, up to 300 pounds.",
"hit": "1+1",
"morale": "9",
"move": "50'",
"name": "Dog",
"appearing": "Wild 3d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "25"
},
{
"armourClass": "15",
"damage": "1d12 or by weapon",
"description": "Dopplegangers are strange beings that are able to take on the shapes of those they encounter; they can also read minds (as the spell, ESP, but with no limit of duration). In its natural form, the creature looks more or less humanoid, but slender and frail, with gangly limbs and half-formed features. The flesh is pale and hairless. Its large, bulging eyes are yellow with slitted pupils. A doppleganger is hardy, with a natural agility not in keeping with its frail appearance. In its natural form a doppleganger is about 5½ feet tall and weighs about 150 pounds.\n\nDopplegangers make excellent use of their natural mimicry to stage ambushes, bait traps, and infiltrate humanoid society. Although not usually evil, they are interested only in themselves and regard all others as playthings to be manipulated and deceived.\n\nWhen in its natural form, a doppleganger strikes with its powerful fists. In the shape of a warrior or some other armed person, it attacks with whatever weapon is appropriate. In such cases, it uses its mind reading power to employ the same tactics and strategies as the person it is impersonating.\n\n Dragons are large (sometimes very large) winged reptilian monsters. Unlike wyverns, dragons have four legs as well as two wings; this is how experts distinguish “true” dragons from other large reptilian monsters. All dragons are long-lived, and they grow slowly for as long as they live. For this reason, they are described as having seven “age categories,” ranging from 3 less to 3 more hit dice than the average. For convenience, a table is provided following the description of each dragon type; this table shows the variation in hit dice, damage from their various attacks, and other features peculiar to dragons.\n\nIf one dragon is encountered, it is equally likely to be a male or female ranging from -2 to +3 hit dice (1d6-3); two are a mated pair ranging from -1 to +2 hit dice (1d4-2). If three or four are encountered, they consist of a mated pair plus one or two young of -3 hit dice in size. If this is the case, the parents receive a Morale of 12 in combat since they are protecting their young.\n\nA dragon attacks with its powerful claws and bite, its long, whiplike tail, and most famously with its breath weapon. It prefers to fight on the wing, staying out of reach until it has worn down the enemy with the breath weapon (or possibly with spells, if the dragon can cast any). Older, more intelligent dragons are adept at sizing up the opposition and eliminating the most dangerous foes first (or avoiding them while picking off weaker enemies).\n\nEach dragon can use its breath weapon as many times per day as it has hit dice, except that dragons of the lowest age category do not yet have a breath weapon. The breath may be used no more often than every other round, and the dragon may use its claws and tail at the same time. The tail swipe attack may only be used if there are opponents behind the dragon, while the claws may be used only on those opponents in front of the creature. Due to their serpentine necks, dragons may bite in any direction, even behind them.\n\nThe breath weapon of a dragon does 1d8 points of damage per hit die (so, a 7 hit die dragon does 7d8 points of damage with its breath). Victims may make a save vs Dragon Breath for half damage. The breath weapon may be projected in any direction around the dragon, even behind, for the same reason that the dragon can bite those behind it.\n\nThere are three shapes (or areas of effect) which a dragon's breath weapon can cover. Each variety has a “normal” shape, which that type of dragon can use from the second age category (-2 hit dice) onward. Upon reaching the sixth age category (+2 hit dice), a dragon learns to shape its breath weapon into one of the other shapes (GM's option); at the seventh age category (+3 hit dice), the dragon is competent at producing all three shapes.\n\nThe shapes are:\n\nCone Shaped: The breath weapon begins at the dragon's mouth, and is about 2' wide at that point; it extends up to the maximum length (based on the dragon type and age) and is the maximum width at that point (again, as given for the dragon's type and age).\n\nLine Shaped: The breath weapon is 5' wide and extends the given length in a straight line.\n\nCloud Shaped: The breath weapon covers an area up to the maximum given width (based on the dragon type and age) in both length and width (that is, the length figure given for the dragon type and age is ignored). A cloud-shaped breath weapon is, at most, 20' deep or high.\n\nAll dragons save for those of the lowest age category are able to speak Dragon. Each type has a given chance of “talking;” this is the chance that the dragon will know Common or a demi-human or humanoid language. Many who talk choose to learn Elvish. If the first roll for “talking” is successful, the GM may roll again, with each additional roll adding another language which the dragon may speak.\n\nSome dragons learn to cast spells; the odds that a dragon can cast spells are the same as the odds that a dragon will learn to speak to lesser creatures, but each is rolled for separately.\n\nAlthough goals and ideals vary among varieties, all dragons are covetous. They like to hoard wealth, collecting mounds of coins and gathering as many gems, jewels, and magic items as possible. Those with large hoards are loath to leave them for long, venturing out of their lairs only to patrol the immediate area or to get food. For dragons, there is no such thing as enough treasure. It's pleasing to look at, and they bask in its radiance. Dragons like to make beds of their hoards, shaping nooks and mounds to fit their bodies. Note that, for most monsters, the Treasure Type given is for a lair of average numbers; for dragons, the Treasure Type is for a single individual of average age. Note also that mated pairs do not share treasure! Rather than adjusting the treasure amounts for the number of monsters, adjust for the age of the dragon; a dragon of the highest age category would have about double the given amount, while one of the next to lowest age category would have perhaps a tenth that amount (hatchlings have no treasure).",
"hit": "4*",
"morale": "10",
"move": "30'",
"name": "Doppleganger",
"appearing": "1d6, Wild 1d6, Lair 1d6",
"attacks": "1 fist",
"savingThrows": "Fighter: 4",
"treasure": "E",
"experience": "280"
},

{
"name": "Dragon, Yellow",
"armourClass": "16",
"hit": "5**",
"attacks": "2 claws, 1 bite or breath, 1 tail",
"damage": "1d6 claw, 2d10 or breath, 1d8 tail",
"move": "50' Fly 80' (10')",
"appearing": "1, Wild 1, Lair 1d6",
"savingThrows": "Fighter: 5",
"morale": "8",
"treasure": "H",
"experience": "450",
"description": "Plains dragons are the smallest of the true dragons. They have yellow skin dappled with light green patches, spots, or sometimes thin stripes. The color dulls and darkens with age until it reaches an almost uniform tan color at the oldest age category. They have long sinuous bodies and unusually long legs, giving them the fastest land movement rate of any dragon, but they are also accomplished fliers, as fast and maneuverable as any dragon. Plains dragons may hunt on the wing, attacking suddenly from above and surprising on 1-3 on 1d6; or, they may lie in wait in tall grass or a copse of trees, using their coloration as camouflage. As one ages and its colors dull, this ability improves; when lying in wait, they gain surprise on 1-3 on 1d6 at age categories 2 and 3, on 1-4 in age categories 4 through 6, and on 1-5 at age category 7. The breath weapon of the plains dragon is a scorching, shimmering cone of heat, barely visible to the naked eye; at night, however, a glow like steel being forged can be seen streaming from the dragon's open mouth."
},
{
"name": "Dragon, Cloud",
"armourClass": "22",
"hit": "11** (+9)",
"attacks": "2 claws, 1 bite or breath, 1 tail",
"damage": "2d4 claw, 6d6 bite or breath, 2d4 tail",
"move": "30' Fly 80' (20')",
"appearing": "1, Wild 1, Lair 1d4",
"savingThrows": "Fighter: 11",
"morale": "10",
"treasure": "H",
"experience": "1765",
"description": "Cloud dragons have the most varied appearance of all the true dragons. In an indoor environment or when underground, a cloud dragon appears to be a bright metallic color, while outdoors their coloration is brighter and less metallic, and may take on a reddish or bluish cast reminiscent of a sunrise or sunset. Hatchlings have a coppery skin tone, brightening to silver at the second age category, then to gold at the fourth before fading to a platinum tone by age category 6. While most true dragons become duller in color and sheen as they age, cloud dragons do not. Cloud dragons are not cruel and do not seek to kill for pleasure. Many tales are told of cloud dragons offering assistance to adventurers, though they are every bit as avaricious as any dragon; adventurers in need of gold need not bother asking for a loan. Another way in which cloud dragons differ from other types is that they do not have fixed breath weapons. Upon reaching the second age category, a cloud dragon acquires the breath weapon of a randomly-chosen (or GM assigned) dragon type; upon reaching the fourth age category, they acquire a second breath weapon type. Cloud dragons possess the same immunities as the dragons whose breath weapons they reproduce. All cloud dragons have the power to assume the form of any type of humanoid (as described in the spell charm person) at will in a manner otherwise equivalent to the spell polymorph self."
},  
{
"armourClass": "18",
"damage": "1d6/1d6/2d10 or breath/1d6",
"description": "Black dragons prefer to ambush their targets, using their surroundings as cover. When fighting in heavily forested swamps and marshes, they try to stay in the water or on the ground; trees and leafy canopies limit their aerial maneuverability. When outmatched, a black dragon attempts to fly out of sight, so as not to leave tracks, and hide in a deep pond or bog. Black dragons are more cruel than white dragons, but are still motivated mostly by the urge to live, breed and collect valuable items.\n\nBlack dragons often choose to hide underwater, leaving only part of the head above the waterline, and leap up suddenly when prey comes within 100' (surprising on a roll of 1-4 on 1d6 in this case).\n\nBlack dragons are immune to all forms of acid. A black dragon may hold its breath up to three turns while lying in wait underwater.\n\nBlack Dragon Age Table",
"hit": "7**",
"morale": "8",
"move": "30' Fly 80' (15')",
"name": "Dragon, Black",
"appearing": "1, Wild 1, Lair 1d4",
"attacks": "2 claws/1 bite or breath/1 tail",
"savingThrows": "Fighter: 7 ",
"treasure": "H",
"experience": "800"
},
{
"armourClass": "20",
"damage": "1d8/1d8/3d8 or breath/1d8",
"description": "Blue dragons love to soar in the hot desert air, usually flying in the daytime when temperatures are highest. Some nearly match the color of the desert sky and use this coloration to their advantage. Their vibrant color makes blue dragons easy to spot in barren desert surroundings. However, they often burrow into the sand so only part of their heads are exposed, waiting until opponents come within 100 feet to spring out and attack (surprising on a roll of 1-4 on 1d6 in this case).\n\nBlue dragons lair in vast underground caverns, where they also store their treasure. Although they collect anything that looks valuable, they are most fond of gems, especially sapphires. Blue dragons are evil monsters, though not so fierce as red dragons. They particularly enjoy tricking intelligent prey into entering their lairs or passing by their hiding places to be ambushed and killed; usually one member of a party attacked by a blue dragon will be left alive for a while, and the dragon will play with that person as a cat plays with a mouse.\n\nBlue dragons are immune to normal lightning, and suffer only half damage from magical lightning.",
"hit": "9** (+8)",
"morale": "9",
"move": "30' Fly 80' (15')",
"name": "Dragon, Blue",
"appearing": "1, Wild 1, Lair 1d4",
"attacks": "2 claws/1 bite or breath/1 tail",
"savingThrows": "Fighter: 9 ",
"treasure": "H",
"experience": "1,225"
},
{
"armourClass": "22",
"damage": "2d4/2d4/6d6 or breath/2d4",
"description": "Gold dragons usually parley before fighting. Those having spellcasting ability make heavy use of spells in combat. Among their favorites are cloudkill, sleep, and slow.\n\nAll gold dragons have the power to assume human form at will (in a manner equivalent to the spell polymorph self, but performed at will).\n\nUnlike many other dragons, gold dragons are not cruel and do not seek to kill for pleasure. Many tales are told of gold dragons offering assistance to adventurers. They are, however, every bit as avaricious as any dragon; adventurers in need of gold need not bother asking for a loan.\n\nGold dragons are immune to all poisons, as well as normal fire. They suffer only half damage from magical fire.",
"hit": "11** (+9)",
"morale": "10",
"move": "30' Fly 80' (20')",
"name": "Dragon, Gold",
"appearing": "1, Wild 1, Lair 1d4",
"attacks": "2 claws/1 bite or breath/1 tail",
"savingThrows": "Fighter: 11 ",
"treasure": "H",
"experience": "1,765"
},
{
"armourClass": "19",
"damage": "1d6/1d6/3d8 or breath/1d6",
"description": "Green dragons initiate fights with little or no provocation, picking on creatures of any size. If the target is intriguing or seems formidable, the dragon stalks the creature to determine the best time to strike and the most appropriate tactics to use. If the target appears weak, the dragon makes its presence known quickly – it enjoys evoking terror.\n\nGreen dragons especially like to question adventurers to learn more about their society and abilities, what is going on in the countryside, and if there is treasure nearby. Adventurers may be allowed to live so long as they remain interesting… but woe to them when the dragon becomes bored.\n\nGreen dragons are immune to all poisons. Note that, despite their breath weapon being described as \"poison gas,\" damage done by it is exactly the same as with other dragons. More specifically, those in the area of effect do not have to \"save or die\" as with ordinary poison, but rather save vs Breath Weapon for half damage.",
"hit": "8**",
"morale": "8",
"move": "30' Fly 80' (15')",
"name": "Dragon, Green",
"appearing": "1, Wild 1, Lair 1d4",
"attacks": "2 claws/1 bite or breath/1 tail",
"savingThrows": "Fighter: 8 ",
"treasure": "H",
"experience": "1,015"
},
{
"armourClass": "21",
"damage": "1d8/1d8/4d8 or breath/1d8",
"description": "Because red dragons are so confident, they seldom pause to appraise an adversary. On spotting a target, they make a snap decision whether to attack, using one of many strategies worked out ahead of time. A red dragon lands to attack small, weak creatures with its claws and bite rather than obliterating them with its breath weapon, so as not to destroy any treasure they might be carrying.\n\nRed dragons are cruel monsters, actively seeking to hunt, torment, kill and consume intelligent creatures. They are often said to prefer women and elves, but in truth a red dragon will attack almost any creature less powerful than itself.\n\nRed dragons are immune to normal fire, and suffer only half damage from magical fire.",
"hit": "10** (+9)",
"morale": "8",
"move": "30' Fly 80' (20')",
"name": "Dragon, Red",
"appearing": "1, Wild 1, Lair 1d4",
"attacks": "2 claws/1 bite or breath/1 tail",
"savingThrows": "Fighter: 10 ",
"treasure": "H",
"experience": "1,480"
},
{
"armourClass": "19",
"damage": "1d6/1d6/3d8 or breath",
"description": "Though they live in the water and are somewhat adapted to it, Sea Dragons still must breathe air, similar to dolphins or whales. A Sea Dragon may hold its breath up to three turns while swimming or performing other moderate activity.\n\nThese dragons have much the same physical structure as other dragons, but their feet are webbed and their tails are short, flat and broad; these adaptations help the sea dragon swim efficiently, but severely limit their ability to walk on dry land. Unlike other dragons, sea dragons do not have a tail attack. The breath weapon of a sea dragon is a cloud of steam; they are immune to damage from non-magical steam (including the breath weapon of another sea dragon), and suffer only half damage from magical steam attacks.\n\nYoung sea dragons are light bluish-gray in color (similar to dolphins), darkening to a deep slate color in older individuals.\n\nSea dragons are neutral in outlook, in much the same way as white dragons. They often maintain lairs in air-filled undersea caverns.",
"hit": "8**",
"morale": "8",
"move": "10' Fly 60' (20') Swim 60' (15')",
"name": "Dragon, Sea",
"appearing": "1, Wild 1, Lair 1d4",
"attacks": "2 claws/1 bite or breath",
"savingThrows": "Fighter: 8 ",
"treasure": "H",
"experience": "1,015"
},
{
"armourClass": "17",
"damage": "1d4/1d4/2d8 or breath/1d4",
"description": "White Dragons prefer to live in cold regions, whether in the highest mountains or in the cold northern lands. They are the least intelligent of dragons, though this does not mean that they are stupid by any stretch of the imagination. They are motivated completely by a drive to live, to reproduce, and (of course) to accumulate treasure; they kill to live, not for pleasure.\n\nWhite dragons prefer sudden assaults, swooping down from aloft or bursting from beneath water, snow, or ice. Typically, a white dragon begins with its icy breath weapon, then tries to eliminate a single opponent with a follow-up attack.\n\nWhite dragons are immune to normal cold, and take only half damage from magical cold or ice.",
"hit": "6**",
"morale": "8",
"move": "30' Fly 80' (10')",
"name": "Dragon, White",
"appearing": "1, Wild 1, Lair 1d4",
"attacks": "2 claws/1 bite or breath/1 tail",
"savingThrows": "Fighter: 6 ",
"treasure": "H",
"experience": "610"
},
{
"armourClass": "22",
"damage": "2d8/2d8/10d6 or 30d8",
"description": "A dragon turtle's rough, deep green shell is much the same color as the deep water the monster favors, and the silver highlights that line the shell resemble light dancing on open water. The turtle’s legs, tail, and head are a lighter green, flecked with golden highlights. An adult dragon turtle can measure from 100 to 200 feet from snout to tail. They are occasionally mistaken for rocky outcroppings or even small islands.\n\nDragon turtles are fierce fighters and generally attack any creature that threatens their territory or looks like a potential meal. Though they are not true dragons, they do advance through the same sort of age categories as the true dragons do; however, each age category changes the dragon turtle's Hit Dice by 5.\n\nDue to their massive size, dragon turtles are immune to virtually all poisons.",
"hit": "30**",
"morale": "10",
"move": "10' (10') Swim 30' (15')",
"name": "Dragon Turtle",
"appearing": "Wild 1",
"attacks": "2 claws/1 bite or breath",
"savingThrows": "Fighter: 20 at +5",
"treasure": "H",
"experience": "13,650"
},
{
"armourClass": "15",
"damage": "1d4",
"description": "Dryads are female nature spirits; each is mystically bound to a single, enormous oak tree and must never stray more than 300 yards from it. Any who do become ill and die within 4d6 hours. A dryad’s oak does not radiate magic. A dryad lives as long as her tree, and dies when the tree dies; likewise, if the dryad is killed, her tree dies also.\n\nA dryad’s delicate features are much like a female elf's, though her flesh is like bark or fine wood, and her hair is like a canopy of leaves that changes color with the seasons. Although they are generally solitary, up to seven dryads have been encountered in one place on rare occasions.\n\nShy, intelligent, and resolute, dryads are as elusive as they are alluring -- they avoid physical combat and are rarely seen unless they wish to be. If threatened, or in need of an ally, a dryad can charm (as the spell charm person), attempting to gain control of the attacker(s) who could help the most against the rest. Any attack on her tree, however, provokes the dryad into a frenzied defense.",
"hit": "2*",
"morale": "6",
"move": "40'",
"name": "Dryad",
"appearing": "Lair 1d6",
"attacks": "1",
"savingThrows": "Magic-User: 4",
"treasure": "D",
"experience": "100"
},
{
"armourClass": "15",
"damage": "1d6/1d6/1d8",
"description": " A typical giant eagle stands about 10 feet tall, has a wingspan of up to 20 feet, and resembles its smaller cousins in nearly every way except size. It weighs about 500 pounds. Many giant eagles are intelligent creatures and speak Common.\n\nA giant eagle typically attacks from a great height, diving earthward at tremendous speed. When it cannot dive, it uses its powerful talons and slashing beak to strike at its target’s head and eyes.\n\nA solitary giant eagle is typically hunting or patrolling in the vicinity of its nest and generally ignores creatures that do not appear threatening. A mated pair attacks in concert, making repeated diving attacks to drive away intruders, and fights to the death to defend their nest or hatchlings.",
"hit": "4",
"morale": "7",
"move": "10' fly 90'",
"name": "Eagle, Giant",
"appearing": "2d6",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 4",
"treasure": "Nil",
"experience": "240"
},
{
"armourClass": "21 ‡",
"damage": "2d8 or special",
"description": "The efreet (singular efreeti) are humanoid creatures from the Elemental Plane of Fire. An efreeti in its natural form stands about 12 feet tall and weighs about 2,000 pounds. Efreet are malicious by nature. They love to mislead, befuddle, and confuse their foes. They do this for enjoyment as much as for tactical reasons.\n\nNote that the 12 morale reflects an efreeti's absolute control over its own fear, but does not indicate that the creature will throw its life away easily. Use the “9” figure to determine whether an outmatched efreeti decides to leave a combat.\n\nEfreet have a number of magical powers, which can be used at will (that is, without needing magic words or gestures): become invisible, with unlimited uses per day; assume gaseous form, as the potion, up to one hour per day; create illusions, as the spell phantasmal force but including sound as well as visual elements, three times per day; create flame, with unlimited uses; and create a wall of fire (as the spell), once per day. Create flame allows the efreet to cause a flame to appear in its hand or otherwise on its person at will; it behaves as desired by the efreet, becoming as large as a torchflame or as small as a candle, and ignites flammable material just as any ordinary flame does. The flame can be thrown as a weapon with a range of up to 60', causing 1d8 points of damage on a successful hit. The efreet can create another flame, and throw it as well if desired, once per round.\n\nEfreet may assume the form of a column of fire at will, with no limit as to the number of times per day this power may be used; an efreeti in flame-form fights as if it were a fire elemental.\n\nDue to their highly magical nature, efreet cannot be harmed by non-magical weapons. They are immune to normal fire, and suffer only half damage from magical fire attacks.\n\nElementals are incarnations of the elements that compose existence.\n\nIt is possible to summon an elemental by one of three means: By the use of a staff, or of a device, or by casting a spell. For each elemental type, separate statistics are provided for each of these three categories.\n\nDue to their highly magical nature, elementals cannot be harmed by non-magical weapons.",
"hit": "10* (+9)",
"morale": "12 (9)",
"move": "30' Fly 80' (10')",
"name": "Efreeti*",
"appearing": "1",
"attacks": "1",
"savingThrows": "Fighter: 15",
"treasure": "None",
"experience": "1,390"
},
{
"armourClass": "18 ‡",
"damage": "1d12",
"description": " Air elementals resemble “dust devils,” that is, small whirlwinds, but they are much more powerful. Air elementals take double damage when attacked by earth-based attacks (including by earth elementals). An air elemental may choose either to attack a single opponent, thus receiving one attack per round at the listed damage, or may choose to knock all opponents in a 5' radius to the ground; if the latter attack is used, all creatures of 2 hit dice or less must save vs Death Ray or fall prone. Creatures of 3 or more levels or hit dice are not so affected. Air elementals do an additional 1d8 points of damage against creatures or vehicles which are airborne.",
"hit": "8*",
"morale": "-- 10 --",
"move": "-- Fly 120' --",
"name": "Elemental, Air*",
"appearing": "-- special --",
"attacks": "-- special --",
"savingThrows": "Fighter: 8",
"treasure": "-- None --",
"experience": "945"
},
{
"armourClass": "18 ‡",
"damage": "1d12",
"description": " Earth elementals resemble crude, headless humanoid statues, with clublike hands and feet. They cannot cross a body of water wider than their own height. Earth elementals take double damage when attacked by fire (including fire elementals). They do an additional 1d8 points of damage against creatures, vehicles, or structures which rest on the ground.",
"hit": "8*",
"morale": "-- 10 --",
"move": "-- 20' (10') --",
"name": "Elemental, Earth*",
"appearing": "-- special --",
"attacks": "1",
"savingThrows": "Fighter: 8",
"treasure": "-- None --",
"experience": "945"
},
{
"armourClass": "18 ‡",
"damage": "1d12",
"description": "Fire elementals are simply flames, which may appear generally humanoid for brief moments when they attack. Fire elementals take double damage when attacked by water (including water elementals). They cannot cross a body of water wider than their own diameter. They do an additional 1d8 points of damage against creatures which are cold or icy in nature.\n\n Remember that a fire elemental is constantly burning; such a creature may easily start fires if it moves into an area containing items which burn easily, such as dry wood, paper, or oil. No specific rules are given for such fires, but the GM is directed to the rules for burning oil for an example of fire damage.",
"hit": "8*",
"morale": "-- 10 --",
"move": "-- 40' Fly 30' --",
"name": "Elemental, Fire*",
"appearing": "-- special --",
"attacks": "1",
"savingThrows": "Fighter: 8",
"treasure": "-- None --",
"experience": "945"
},
{
"armourClass": "18 ‡",
"damage": "1d12",
"description": " Water elementals resemble roiling waves of water, which seem to fall upon any creature attacked, only to reform the next round. They take double damage when attacked with air or wind attacks (including air elementals). A water elemental cannot move more than 60' from a body of water. They do an extra 1d8 points of damage against creatures, vehicles, or structures which are in the water.\n\n Elephant\n\nMassive herbivores of tropical lands, elephants are unpredictable creatures but nevertheless are sometimes used as mounts or beasts of burden. This entry describes an African elephant. Indian elephants are slightly smaller and weaker, but more readily trained.\n\nA light load for an African elephant is 7,500 pounds; a heavy load, up to 15,000 pounds. For an Indian elephant, a light load is up to 7,000 pounds, and a heavy load up to 14,000 pounds.\n\nAn elephant has no treasure as such, but the tusks of an elephant are worth 1d8 x 100 gp.",
"hit": "8*",
"morale": "-- 10 --",
"move": "-- 20' (15') Swim 60' --",
"name": "Elemental, Water*",
"appearing": "-- special --",
"attacks": "1",
"savingThrows": "Fighter: 8",
"treasure": "-- None --",
"experience": "945"
},
{
"armourClass": "16",
"damage": "2d6",
"description": "Barracuda are predatory fish found in salt water. Huge barracudas are about 12' long, while giant specimens can exceed 20'. They have elongated bodies, pointed heads and prominent jaws. Their bodies are covered with smooth scales, typically blue, gray or silver in color. They have extremely keen eyesight and are surprised only on a 1 on 1d6. Due to the quickness of their attack, barracudas are themselves capable of surprising on 1-3 on 1d6 and gain a +2 bonus to Initiative.\n\nGiant barracudas always appear singly and are 50% likely to break off the attack after 1d4 rounds if they haven't killed their prey. Both kinds are attracted to shiny objects.",
"hit": "5",
"morale": "8",
"move": "Swim 60'",
"name": "Fish, Giant Barracuda",
"appearing": "Wild 2d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 5",
"treasure": "None",
"experience": "360"
},
{
"armourClass": "13",
"damage": "1d6",
"description": "Giant bass are generally between 10' and 25' long. Most are greenish-grey, marked with dark lateral stripes, though some are almost completely black. They are generally found in lakes or rivers, as they are not adapted for salt water.\n\nGiant bass are predatory, and on a natural attack roll of 20 a giant bass will swallow whole a dwarf-sized or smaller creature, which then takes 2d4 damage per round until it is dead. Swallowed characters can attack only with daggers or similar short weapons. Note that each giant bass can swallow at most one character, and a giant bass which has swallowed a character will attempt to retreat (having achieved its goal).",
"hit": "2",
"morale": "8",
"move": "Swim 40' (10')",
"name": "Fish, Giant Bass",
"appearing": "Wild 1d6",
"attacks": "1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "16",
"damage": "2d8/1d4+poison/1d4+poison",
"description": "Giant catfish fins are edged with a natural poison that causes a painful burning sensation for 3d10 rounds if a save vs Poison is failed. The pain causes the affected character or creature to suffer a -1 penalty on all attack rolls and saving throws; further poisonings will increase this penalty by -1 each, down to a maximum penalty of -5 as well as adding 6 rounds to the duration of the poison effect.\n\nBecause of its large size (15 to 20 feet long) and body design, a giant catfish cannot target more than one of its attacks on any single creature; that is, it cannot bite and fin the same opponent, nor use both fins on one victim.\n\n Fish, Giant Piranha\n\nGiant piranha average 5' in length at adulthood, and are aggressive carnivores. They are able to sense blood in the water just as sharks do, and once they smell or taste blood in the water, their morale rises to the parenthesized figure.",
"hit": "8",
"morale": "8",
"move": "Swim 30' (10')",
"name": "Fish, Giant Catfish",
"appearing": "Wild 1d2",
"attacks": "1 bite/2 fins",
"savingThrows": "Fighter: 8",
"treasure": "None",
"experience": "875"
},
{
"armourClass": "14",
"damage": "1d8",
"description": "Giant flies look much like ordinary houseflies, but are about 3' long. Some are banded yellow and black, and are thus mistaken for giant bees. Giant flies are predators; after killing prey, they will sometimes lay eggs in the remains.",
"hit": "2",
"morale": "8",
"move": "30' Fly 60'",
"name": "Fly, Giant",
"appearing": "1d6, Wild 2d6",
"attacks": "1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "13",
"damage": "grab or 1d4+1",
"description": "Giant frogs are enlarged versions of the common frog; most resemble bullfrogs in appearance, but an adult giant frog is 3' long and weighs about 250 pounds. They are predators, but will normally only attack creatures smaller than themselves. Giant toads are statistically just like giant frogs; however, they are often found in “drier” areas as they do not have to maintain a wet skin surface.\n\n A giant frog can stretch its tongue out up to 15' and drag up to dwarf-sized prey to its mouth; on every subsequent round, the victim is hit automatically. On a natural 20 attack roll, the victim is swallowed whole, taking 1d6 damage per round thereafter. Each giant frog can swallow only one such victim.",
"hit": "2",
"morale": "6",
"move": "30' Swim 30'",
"name": "Frog, Giant (and Toad, Giant)",
"appearing": "1d4, Wild 1d4",
"attacks": "1 tongue or 1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "15 ‡",
"damage": "1d4/1d4/1d6/1d4",
"description": "Gargoyles are demonic-looking winged humanoid monsters with gray stone-like skin. They are often mistaken for winged stone statues, for they can remain still indefinitely without moving. Gargoyles use this disguise to ambush their foes, surprising on 1-4 on 1d6 if their foes do not otherwise suspect them. They are cruel monsters, inflicting pain on other creatures for the sole purpose of enjoyment.\n\n Gargoyles require no food, water, or air. Due to their highly magical nature, they can only be harmed by magical weapons.",
"hit": "4**",
"morale": "11",
"move": "30' Fly 50' (15')",
"name": "Gargoyle*",
"appearing": "1d6, Wild 2d4, Lair 2d4",
"attacks": "2 claws/1 bite/1 horn",
"savingThrows": "Fighter: 6",
"treasure": "C",
"experience": "320"
},
{
"armourClass": "12",
"damage": "2d4 + paralysis",
"description": "The nearly transparent gelatinous cube travels slowly along dungeon corridors and cave floors, absorbing carrion, creatures, and trash. Inorganic material remains trapped and visible inside the cube’s body. A typical gelatinous cube is ten feet on a side and weighs about 15,000 pounds; however, smaller specimens have been reported.\n\nA gelatinous cube attacks by slamming its body into its prey. It is capable of lashing out with a pseudopod, but usually engulfs foes. Any character hit by a gelatinous cube must save vs Paralyzation or be paralyzed for 2d4 turns.\n\nAny treasure indicated will be visible inside the creature, which must be slain if the treasure is to be recovered.",
"hit": "4*",
"morale": "12",
"move": "20'",
"name": "Gelatinous Cube",
"appearing": "1",
"attacks": "1",
"savingThrows": "Fighter: 2",
"treasure": "V",
"experience": "280"
},
{
"armourClass": "15",
"damage": "1d4/1d4/1d4 + paralysis + stench",
"description": "Although these creatures look just like their lesser kin, the ghoul, they are far more deadly and cunning. Those hit by a ghast’s bite or claw attack must save vs Paralyzation or be paralyzed for 2d8 turns. Elves are immune to this paralysis. Ghasts try to attack with surprise whenever possible, striking from behind tombstones and bursting from shallow graves; when these methods are employed, they are able to surprise opponents on 1-3 on 1d6. They are undead, and thus are immune to sleep, charm and hold magics. They may be Turned by Clerics using the same column as the ghoul. As they are superior to ghouls, in a mixed group of ghasts and ghouls the GM should apply Turning effects to the ordinary ghouls first.\n\nHumanoids bitten by ghasts may be infected with ghast fever. Each time a humanoid is bitten, there is a 10% chance of the infection being passed. The afflicted humanoid is allowed to save vs Death Ray; if the save is failed, the humanoid dies within a day.\n\nAn afflicted humanoid who dies of ghast fever rises as a ghast at the next midnight. A humanoid who becomes a ghast in this way retains none of the knowledge or abilities he or she possessed in life. The newly-risen ghast is not under the control of any other ghasts, but hungers for the flesh of the living and behaves like any other ghast in all respects.\n\nThe stink of death and corruption surrounding these creatures is overwhelming. Living creatures within 10 feet must succeed on a save vs Poison or be sickened for 2d6 rounds (-2 to attack rolls). A creature that successfully saves cannot be affected again by the same ghast’s stench for 24 hours. A neutralize poison spell removes the effect from a sickened creature.\n\nGhost*\n\nGhosts are the spectral remnants of intelligent beings who, for one reason or another, cannot rest easily in their graves. A ghost normally resembles the form it had in life, but sometimes the spiritual form is altered. For instance, the ghost of someone who believed he or she was evil might look a bit demonic. Because they are incorporeal, ghosts may be hit only by magical weapons.\n\nSeeing a ghost is so terrible that the victim must save vs Spells or flee for 2d6 rounds. A character or creature who successfully saves vs a given ghost's fear attack may not be so affected by that ghost again, but of course may still be affected by another.\n\nA ghost that hits a living target with its touch attack does 1d8 points of damage, and at the same time regenerates the same number of hit points. In addition, the victim loses 1 Constitution point. Elves and dwarves (and other long-lived creatures such as dragons) are allowed a saving throw vs Death Ray to resist this effect, which must be rolled on each hit. Characters who lose Constitution appear to have aged. If a ghost is fighting a living creature which does not have a Constitution score, the GM should assign whatever score he or she sees fit.\n\nLost Constitution can be regained at a rate of one point per casting of restoration; nothing else (except a wish) can restore Constitution lost to a ghost. If a character's Constitution falls to 0, he or she dies permanently and cannot be raised (but still may be reincarnated).\n\nOnce per turn, a ghost can use telekinesis (as the spell) as if it were a 10th level Magic-User.\n\nInstead of attacking, a ghost may attempt to possess a living creature. This ability is similar to a magic jar spell (as if cast by a 10th level Magic-User), except that it does not require a receptacle. To use this ability, the ghost must be able to move into the target (so it is possible to outrun it). The target can resist the attack with a successful save vs Spells. A creature that successfully saves is immune to being possessed by that ghost for 24 hours. If the save fails, the ghost enters the target's body and controls it; control may be maintained until the ghost chooses to leave the victim's body, or until it is driven out by means of a remove curse spell. While it is possessing a living creature, a ghost may not use any of its special abilities.",
"hit": "2**",
"morale": "9",
"move": "30'",
"name": "Ghast",
"appearing": "1d4 Wild/Lair 1d8",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 2",
"treasure": "B",
"experience": "125"
},
{
"armourClass": "14",
"damage": "1d4/1d4/1d4, all plus paralysis",
"description": "Ghouls are undeadmonsters which eat the flesh of dead humanoids to survive. They are vile, disgusting carrion-eaters, but are more than willing to kill for food. Those slain by ghouls will generally be stored until they begin to rot before the ghouls will actually eat them.\n\nThose hit by a ghoul’s bite or claw attack must save vs Paralyzation or be paralyzed for 2d8 turns. Elves are immune to this paralysis. Ghouls try to attack with surprise whenever possible, striking from behind tombstones and bursting from shallow graves; when these methods are employed, they are able to surprise opponents on 1-3 on 1d6. Like all undead, they may be Turned by Clerics and are immune to sleep, charm and hold magics.\n\nHumanoids bitten by ghouls may be infected with ghoul fever. Each time a humanoid is bitten, there is a 5% chance of the infection being passed. The afflicted humanoid is allowed to save vs Death Ray; if the save is failed, the humanoid dies within a day.\n\n An afflicted humanoid who dies of ghoul fever rises as a ghoul at the next midnight. A humanoid who becomes a ghoul in this way retains none of the knowledge or abilities he or she possessed in life. The newly-risen ghoul is not under the control of any other ghouls, but hungers for the flesh of the living and behaves like any other ghoul in all respects.",
"hit": "2*",
"morale": "9",
"move": "30'",
"name": "Ghoul",
"appearing": "1d6, Wild 2d8, Lair 2d8",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 2",
"treasure": "B",
"experience": "100"
},
{
"armourClass": "19 (13)",
"damage": "6d6 or 3d6",
"description": "Cloud giants’ skin ranges in color from milky white to light sky blue. They have hair of silvery white or brass, and their eyes are iridescent blue. Adult males are about 18 feet tall and weigh about 5,000 pounds. Females are slightly shorter and lighter. Cloud giants can live to be 400 years old.\n\nCloud giants dress in the finest clothing available and wear jewelry. To many, appearance indicates station: The better the clothes and the finer the jewelry, the more important the wearer. They also appreciate music, and most can play one or more instruments (the harp is a favorite). Like most giants, they are suspicious of the smaller races, but cloud giants do not usually prey upon them, preferring instead to demand tribute from humans, demi-humans, or humanoids living nearby.\n\n Cloud giants fight in well-organized units, using carefully developed battle plans. They prefer to fight from a position above their opponents. Cloud giants can throw large stones up to 200' for 3d6 points of damage each. Also, 5% of cloud giants have the abilities of a Magic-User of level 2 to 8 (2d4). A favorite tactic is to circle the enemies, barraging them with rocks while the giants with magical abilities confound them with spells. In battle, cloud giants wear finely crafted, intricately engraved plate mail.",
"hit": "12+3* (+10)",
"morale": "10",
"move": "20' Unarmored 40' (10')",
"name": "Giant, Cloud",
"appearing": "1d2, Wild 1d3, Lair 1d3",
"attacks": "1 giant weapon or 1 thrown rock",
"savingThrows": "Fighter: 12",
"treasure": "E plus 1d12x1000 gp",
"experience": "1,975"
},
{
"armourClass": "15 (13)",
"damage": "3d10 or 3d6",
"description": "A cyclops is a one-eyed giant. Huge and brutish, they most resemble hill giants, and even dress in the same “style,” layers of crudely prepared hides with the fur left on, unwashed and unrepaired.\n\nThey are reclusive and unfriendly to almost all of the smaller races.\n\n A cyclops can throw a large rock up to 200' for 3d6 points of damage, but they aim poorly and thus suffer an attack penalty of -2. Once per year, a cyclops can cast the spell bestow curse (the reverse of the spell remove curse).",
"hit": "13* (+10)",
"morale": "9",
"move": "20' Unarmored 30'",
"name": "Giant, Cyclops",
"appearing": "1, Wild 1d4, Lair 1d4",
"attacks": "1 giant club or 1 rock (thrown)",
"savingThrows": "Fighter: 13",
"treasure": "E plus 1d8x1000 gp",
"experience": "2,285"
},
{
"armourClass": "17 (13)",
"damage": "5d6 or 3d6",
"description": "An adult male fire giant is 14 feet tall, has a chest that measures 9 feet around, and weighs about 3,200 pounds. Females are slightly shorter and lighter. Fire giants can live to be 350 years old. Fire giants wear sturdy cloth or leather garments colored red, orange, yellow, or black. Warriors wear helmets and half-plate armor of blackened steel.\n\nFire giants are unfriendly to almost all other human, demi-human, and humanoid races, though they sometimes subjugate nearby humanoid races to act as their servants.\n\n A fire giant can throw large stones up to 200' for 3d6 damage. Fire giants are immune to all fire-based attacks.",
"hit": "11+2* (+9)",
"morale": "9",
"move": "20' Unarmored 40' (10')",
"name": "Giant, Fire",
"appearing": "1d2, Wild 1d3, Lair 1d3",
"attacks": "1 giant weapon or 1 thrown rock",
"savingThrows": "Fighter: 11",
"treasure": "E plus 1d10x1000 gp",
"experience": "1,670"
},
{
"armourClass": "17 (13)",
"damage": "4d6 or 3d6",
"description": " Frost giants have pale, almost white skin. A frost giant’s hair can be light blue or dirty yellow, and its eyes usually match its hair color. Frost giants dress in skins and pelts, along with any jewelry they own. Frost giant warriors add chain shirts and metal helmets decorated with horns or feathers.\n\nAn adult male is about 15 feet tall and weighs about 2,800 pounds. Females are slightly shorter and lighter, but otherwise identical with males. Frost giants can live to be 250 years old.\n\nFrost giants are, first and foremost, cunning. They dislike the smaller races as much as any giant, but rather than attacking outright they will try to use their advantages to convince those weaker than them to submit. If faced with a stronger force, frost giants will parley or withdraw if possible, attacking only if victory seems assured.\n\nA frost giant can throw large stones up to 200' for 3d6 damage. Frost giants are immune to all ice or cold-based attacks.",
"hit": "10+1* (+9)",
"morale": "9",
"move": "20' Unarmored 40' (10')",
"name": "Giant, Frost",
"appearing": "1d2, Wild 1d4, Lair 1d4",
"attacks": "1 giant weapon or 1 thrown rock",
"savingThrows": "Fighter: 10",
"treasure": "E plus 1d10x1000 gp",
"experience": "1,390"
},
{
"armourClass": "15 (13)",
"damage": "2d8",
"description": "The smallest of giants, adult hill giants stand between ten and twelve feet in height and weigh about 1,100 pounds. Hill giants can live to be 200 years old. Skin color among hill giants ranges from light tan to deep ruddy brown. They have brown or black hair and eyes the same color. They wear layers of crudely prepared hides, which they seldom wash or repair, preferring to simply add more hides as the old ones wear out.\n\nWhether attacking with a weapon or st, hill giants deal 2d8 damage. Hill giants are brutish and aggressive. They are sometimes found leading groups of ogres or bugbears. Hill giants often keep dire wolves as pets.",
"hit": "8",
"morale": "8",
"move": "30' Unarmored 40'",
"name": "Giant, Hill",
"appearing": "1d4, Wild 2d4, Lair 2d4",
"attacks": "1 giant weapon (club)",
"savingThrows": "Fighter: 8",
"treasure": "E plus 1d8x1000 gp",
"experience": "875"
},
{
"armourClass": "17 (15)",
"damage": "3d6 or 3d6",
"description": "Stone giants prefer thick leather garments, dyed in shades of brown and gray to match the stone around them. Adults are about 12 feet tall and weigh about 1,500 pounds. Stone giants can live to be 800 years old.\n\nA stone giant can throw large stones up to 300' for 3d6 damage.\n\n Stone giants are reclusive, but they will defend their territory (typically in rocky mountainous terrain) against any who trespass therein.",
"hit": "9 (+8)",
"morale": "9",
"move": "30' Unarmored 40'",
"name": "Giant, Stone",
"appearing": "1d2, Wild 1d6, Lair 1d6",
"attacks": "1 stone club or 1 thrown rock",
"savingThrows": "Fighter: 9",
"treasure": "E plus 1d8x1000 gp",
"experience": "1,075"
},
{
"armourClass": "19 (13)",
"damage": "8d6 or 15d6",
"description": "Adult storm giants are about 21 feet tall and weigh about 12,000 pounds. They can live to be 600 years old. Most storm giants have pale skin and dark hair. Very rarely, storm giants have violet skin. Violet-skinned storm giants have deep violet or blue-black hair with silvery gray or purple eyes.\n\nStorm giants generally dress in short, loose tunic belted at the waist, sandals or bare feet, and a headband. They wear a few pieces of simple but finely crafted jewelry, anklets (favored by barefoot giants), rings, or circlets being most common. They live quiet, reflective lives and spend their time musing about the world, composing and playing music, and tilling their land or gathering food.\n\n Storm giants prefer to attack first with their lightning bolts (which work just as the spell does, and can be used once per five rounds; a save vs Spells reduces damage to half). Also, 10% of storm giants have the abilities of a Magic-User of level 2 to 12 (2d6). In battle, they wear well-crafted and well-cared-for plate mail.\n\nUnlike most other giants, storm giants have been known to befriend humans, elves, or dwarves.",
"hit": "15** (+11)",
"morale": "10",
"move": "30' Unarmored 50' (10')",
"name": "Giant, Storm",
"appearing": "1, Wild 1d3, Lair 1d3",
"attacks": "1 giant weapon or 1 lightning bolt",
"savingThrows": "Fighter: 15",
"treasure": "E plus 1d20x1000 gp",
"experience": "3,100"
},
{
"armourClass": "15 (13)",
"damage": "2d4 or by weapon +1",
"description": " Gnolls are hyena-headed, evil humanoids that wander in loose tribes. Most gnolls have dirty yellow or reddish-brown fur. An adult male gnoll is about 7½ feet tall and weighs 300 pounds.\n\nGnolls are nocturnal, and have Darkvision with a 30' range. They are cruel carnivores, preferring intelligent creatures for food because they scream more. They show little discipline when fighting unless they have a strong leader.\n\nOne out of every six gnolls will be a hardened warrior of 4 Hit Dice (240 XP) having a +1 bonus to damage due to strength. Gnolls gain a +1 bonus to their morale if they are led by such a warrior. In lairs of 12 or greater, there will be a pack leader of 6 Hit Dice (500 XP) having a +2 bonus to damage. In the lair, gnolls never fail a morale check as long as the pack leader is alive. In addition, a lair has a chance equal to 1-2 on 1d6 of a shaman being present, and 1 on 1d6 of a witch or warlock. A shaman is equivalent to a hardened warrior statistically, and in addition has Clerical abilities at level 1d4+1. A witch or warlock is equivalent to a regular gnoll, and has Magic-User abilities of level 1d4.",
"hit": "2",
"morale": "8",
"move": "30' Unarmored 40'",
"name": "Gnoll",
"appearing": "1d6, Wild 3d6, Lair 3d6",
"attacks": "1 weapon",
"savingThrows": "Fighter: 2",
"treasure": "Q, S each; D, K in lair",
"experience": "75"
},
{
"armourClass": "15 (11)",
"damage": "1d6 or by weapon",
"description": "Gnomes stand 3 to 3½ feet tall and weigh 40 to 45 pounds. Their skin color ranges from dark tan to woody brown, their hair is fair, and their eyes can be any shade of blue. Males usually wear short, carefully trimmed beards.\n\nGnomes generally wear leather or earth tones, though they decorate their clothes with intricate stitching or fine jewelry. Gnomes reach adulthood at about age 40, and they live about 350 years. They have Darkvision with a 30' range. When attacked in melee by creatures larger than man-sized, gnomes gain a +1 bonus to their Armor Class. Outdoors in their preferred forest terrain, they are able to hide very effectively; so long as they remain still there is only a 20% chance they will be detected. If one or more gnomes who are successfully hiding attack from ambush, they surprise their foes on 1-4 on 1d6.\n\nGnomes speak their own language, Gnomish, and many know the language of the dwarves. Most gnomes who travel outside gnome lands (as traders or tinkers) know Common, while warriors in gnome settlements usually learn Goblin. Gnomes encountered in the wilderness are likely to be unfriendly, but not hostile. They tolerate dwarves but dislike most other humanoid races. When forced to interact with other races, a gnome will generally be recalcitrant, unless offered a significant amount of treasure.\n\n Most gnomes encountered outside their home are warriors; the statistics above are for such. In the lair, for every warrior there will be an average of three civilians having 1-1 Hit Dice and Armor Class 11; such gnomes have Morale of 7. One out of every eight gnome warriors will be a sergeant having 3 Hit Dice (145 XP). Gnomes gain a +1 bonus to their morale if they are led by a sergeant. Both warriors and sergeants commonly wear chainmail. In gnomish communities, one out of every sixteen warriors will be a captain of 5 Hit Dice (360 XP) with an Armor Class of 16 (11), adding a shield. In addition, in communities of 35 or greater, there will be a king of 7 Hit Dice (670 XP), with an Armor Class of 18 (11), in plate mail and carrying a shield, having a +1 bonus damage due to strength. In their community, gnomes never fail a morale check as long as the king is alive. There is a chance equal to 1-4 on 1d6 that a community will have a Cleric of level 1d6+1, and 1-2 on 1d6 of a Magic-User of level 1d6. Gnomish Clerics and Magic-Users are equivalent to regular gnomish warriors statistically.",
"hit": "1",
"morale": "8",
"move": "20' Unarmored 40'",
"name": "Gnome",
"appearing": "1d8, Wild 5d8, Lair 5d8",
"attacks": "1 weapon",
"savingThrows": "Fighter: 1 (with Dwarf bonuses)",
"treasure": "D",
"experience": "25"
},
{
"armourClass": "14 (11)",
"damage": "1d6 or by weapon",
"description": "Goblins are small, wicked humanoids that favor ambushes, overwhelming odds, dirty tricks, and any other edge they can devise. An adult goblin stands 3 to 3½ feet tall and weigh 40 to 45 pounds. Its eyes are usually bright and crafty-looking, varying in color from red to yellow. A goblin’s skin color ranges from yellow through any shade of orange to a deep red; usually all members of a single tribe are about the same color. Goblins wear clothing of dark leather, tending toward drab, soiled-looking colors. They have Darkvision with a 30' range.\n\nThe statistics given above are for a standard Goblin in leather armor with a shield; they have a natural Movement rate of 30' and a natural Armor Class of 11.\n\nSome goblins ride dire wolves into combat, and large groups of goblins will often employ them to track and attack their foes.\n\n One out of every eight goblins will be a warrior of 3-3 Hit Dice (145 XP). Goblins gain a +1 bonus to their morale if they are led by a warrior. In a lair or other settlement, one out of every fifteen will be a chieftain of 5-5 Hit Dice (360 XP) in chainmail with an Armor Class of 15 (11) and movement of 10' that gains a +1 bonus to damage due to strength. In lairs or settlements of 30 or more goblins, there will be a goblin king of 7-7 Hit Dice (670 XP), with an Armor Class of 16 (11), wearing chainmail and carrying a shield, with a movement of 10', and having a +1 bonus to damage. Goblins have a +2 bonus to morale while their king is present (this is not cumulative with the bonus given by a warrior leader). In addition, a lair has a chance equal to 1 on 1d6 of a shaman being present (or 1-2 on 1d6 if a goblin king is present). A shaman is equivalent to a regular goblin statistically, but has Clerical abilities at level 1d4+1.",
"hit": "1-1",
"morale": "7 or see below",
"move": "20' Unarmored 30'",
"name": "Goblin",
"appearing": "2d4 ,Wild 6d10, Lair 6d10",
"attacks": "1 weapon",
"savingThrows": "Fighter: 1",
"treasure": "R each; C in lair",
"experience": "10"
},
{
"armourClass": "21 ‡",
"damage": "2d6/2d6/2d10",
"description": "Amber golems are generally built to resemble lions or other great cats. They are able to detect invisible creatures or objects within 60', and can track with 95% accuracy through any terrain type.\n\nA magical attack that deals electricity damage heals 1 point of damage for every 3 full points of damage the attack would otherwise deal. For example, an amber golem hit by a lightning bolt for 20 points of damage is instead healed up to 6 points. If the amount of healing would cause the golem to exceed its full normal hit points, the excess is ignored.",
"hit": "10* (+9)",
"morale": "12",
"move": "60'",
"name": "Golem, Amber*",
"appearing": "1",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 5",
"treasure": "None",
"experience": "1,390"
},
{
"armourClass": "19 ‡",
"damage": "1d6/1d6/1d6/1d6 or by weapon",
"description": "Bone golems are huge four-armed monsters created from the skeletons of at least two dead humanoids. Though made of bone, they are not undead and cannot be turned.\n\nInstead of four one-handed weapons, a bone golem can be armed with two two-handed weapons, giving 2 attacks per round and a damage figure of 1d10/1d10 or by weapon.\n\nWhen a bone golem enters combat, there is a cumulative 1% chance each round that its elemental spirit breaks free and the golem goes berserk. The uncontrolled golem goes on a rampage, attacking the nearest living creature or smashing some object smaller than itself if no creature is within reach, then moving on to spread more destruction. The golem’s creator, if within 60 feet, can try to regain control by speaking firmly and persuasively to the golem; he or she must make a save vs Spells to succeed at this, and at least 1 round of time is required for each check. It takes 1 round of inactivity by the golem to reset the golem’s berserk chance to 0%.",
"hit": "8*",
"morale": "12",
"move": "40' (10')",
"name": "Golem, Bone*",
"appearing": "1",
"attacks": "4 weapons",
"savingThrows": "Fighter: 4",
"treasure": "None",
"experience": "945"
},
{
"armourClass": "20 ‡",
"damage": "3d10 + special",
"description": "These golems resemble statues made of bronze; unlike natural bronze statues, they never turn green from verdigris. A bronze golem is 10 feet tall and weighs about 4,500 pounds. A bronze golem cannot speak or make any vocal noise, nor does it have any distinguishable odor. It moves with a ponderous but smooth gait. Each step causes the floor to tremble unless it is on a thick, solid foundation.\n\nThe interior of a bronze golem is molten metal. Creatures hit by one in combat suffer an additional 1d10 damage from the heat (unless resistant to heat or fire). If one is hit in combat, molten metal spurts out, spraying the attacker for 2d6 damage. A save vs Death Ray is allowed to avoid the metal spray.\n\nWhen a bronze golem enters combat, there is a cumulative 1% chance each round that its elemental spirit will break free. Such a golem will go on a rampage, attacking the nearest living creature or smashing some object smaller than itself if no creature is within reach, then moving on to cause more destruction. The golem’s creator, if within 60 feet, can try to regain control by speaking firmly and persuasively to the golem; he or she must make a save vs Spells to succeed at this, and at least 1 round of time is required for each check. It takes 1 round of inactivity by the golem to reset the chance it will go berserk to 0%.",
"hit": "20** (+13)",
"morale": "12",
"move": "80' (10')",
"name": "Golem, Bronze*",
"appearing": "1",
"attacks": "1 fist + special",
"savingThrows": "Fighter:10",
"treasure": "None",
"experience": "5,650"
},
{
"armourClass": "22 ‡",
"damage": "3d10",
"description": "This golem has a humanoid body made from clay. A clay golem wears no clothing except for a metal or stiff leather garment around its hips. A clay golem cannot speak or make any vocal noise. It walks and moves with a slow, clumsy gait. It weighs around 600 pounds.\n\n When a clay golem enters combat, there is a cumulative 1% chance each round that its elemental spirit will break free. Such a golem will go on a rampage, attacking the nearest living creature or smashing some object smaller than itself if no creature is within reach, then moving on to cause more destruction. Once a clay golem goes berserk, no known method can reestablish control.\n\nThe damage a clay golem deals doesn’t heal naturally, and magical healing cures only 1 point per die rolled (but add all bonuses normally).",
"hit": "11** (+9)",
"morale": "12",
"move": "20'",
"name": "Golem, Clay*",
"appearing": "1",
"attacks": "1 fist",
"savingThrows": "Fighter: 6",
"treasure": "None",
"experience": "1,765"
},
{
"armourClass": "20 ‡",
"damage": "2d8/2d8",
"description": " A flesh golem is a ghoulish collection of stolen humanoid body parts, stitched together into a single composite form. No natural animal willingly tracks a flesh golem. The golem wears whatever clothing its creator desires, usually just a ragged pair of trousers. It has no possessions and no weapons. It stands 8 feet tall and weighs almost 500 pounds. A flesh golem cannot speak, although it can emit a hoarse roar of sorts. It walks and moves with a stiff-jointed gait, as if not in complete control of its body.\n\nWhen a flesh golem enters combat, there is a cumulative 1% chance each round that its elemental spirit will break free. Such a golem will go on a rampage, attacking the nearest living creature or smashing some object smaller than itself if no creature is within reach, then moving on to cause more destruction. The golem’s creator, if within 60 feet, can try to regain control by speaking firmly and persuasively to the golem; he or she must make a save vs Spells to succeed at this, and at least 1 round of time is required for each check. It takes 1 round of inactivity by the golem to reset the golem’s berserk chance to 0%.\n\nA magical attack that deals cold or fire damage slows a flesh golem (as the slow spell) for 2d6 rounds, with no saving throw. A magical attack that deals electricity damage breaks any slow effect on the golem and heals 1 point of damage for every 3 full points of damage the attack would otherwise deal. If the amount of healing would cause the golem to exceed its full normal hit points, the excess is ignored. For example, a flesh golem hit by a lightning bolt heals 3 points of damage if the attack would have dealt 11 points of damage.",
"hit": "9** (+8)",
"morale": "12",
"move": "30'",
"name": "Golem, Flesh*",
"appearing": "1",
"attacks": "2 fists",
"savingThrows": "Fighter: 5",
"treasure": "None",
"experience": "1,225"
},
{
"armourClass": "25 ‡",
"damage": "4d10 + special",
"description": "This golem has a humanoid body made from iron. An iron golem can be fashioned in any manner, just like a stone golem (see below), although it almost always displays armor of some sort. Its features are much smoother than those of a stone golem. Iron golems sometimes carry a short sword in one hand. An iron golem is 12 feet tall and weighs about 5,000 pounds. An iron golem cannot speak or make any vocal noise, nor does it have any distinguishable odor. It moves with a ponderous but smooth gait. Each step causes the floor to tremble unless it is on a thick, solid foundation.\n\nIron golems can exhale a cloud of poisonous gas which fills a 10-foot cube and persists for 1 round. Those within the area of effect must save vs Dragon Breath or die. This ability can be used up to 3 times per day.\n\nA magical attack that deals electricity damage slows an iron golem (as the slow spell) for 3 rounds, with no saving throw. A magical attack that deals fire damage breaks any slow effect on the golem and heals 1 point of damage for each 3 full points of damage the attack would otherwise deal. If the amount of healing would cause the golem to exceed its full normal hit points, the excess is ignored. For example, an iron golem hit by a fireball gains back 6 hit points if the damage total is 19 points. An iron golem is affected normally by rust attacks, such as that of a rust monster, suffering 2d6 points of damage for each hit (with no saving throw normally allowed).",
"hit": "17** (+12)",
"morale": "12",
"move": "20' (10')",
"name": "Golem, Iron*",
"appearing": "1",
"attacks": "1 + special",
"savingThrows": "Fighter: 9",
"treasure": "None",
"experience": "3,890"
},
{
"armourClass": "25 ‡",
"damage": "3d8 + special",
"description": "This golem has a humanoid body made from stone. A stone golem is 9 feet tall and weighs around 2,000 pounds. Its body is frequently stylized to suit its creator. For example, it might look like it is wearing armor, with a particular symbol carved on the breastplate, or have designs worked into the stone of its limbs.\n\nStone golems are formidable opponents, being physically powerful and difficult to harm. A stone golem can use a slow effect, as the spell, once every other round; a save vs Spells is allowed to resist. The effect has a range of 10 feet and a duration of 2d6 rounds.\n\nA stone to flesh spell may be used to weaken the monster. The spell does not actually change the golem’s structure, but for one full round after being affected, the golem is vulnerable to normal weapons. The stone golem is allowed a save vs Spells to resist this effect.",
"hit": "14** (+11)",
"morale": "12",
"move": "20' (10')",
"name": "Golem, Stone*",
"appearing": "1",
"attacks": "1 + special",
"savingThrows": "Fighter: 7",
"treasure": "None",
"experience": "2,730"
},
{
"armourClass": "13 ‡",
"damage": "1d8",
"description": "Wood golems are small constructs, not more than 4' in height, and are crudely made. Being made of wood makes them vulnerable to fire-based attacks; thus, wood golems suffer one extra point of damage per die from fire; any saving throws against such effects are at a penalty of -2. They move stiffly, suffering a -1 penalty to Initiative.",
"hit": "2+2*",
"morale": "12",
"move": "40'",
"name": "Golem, Wood*",
"appearing": "1",
"attacks": "1 fist",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "100"
},
{
"armourClass": "19",
"damage": "2d6 or petrification",
"description": "Gorgons are magical monsters resembling bulls made of iron. Their breath can turn living creatures to stone; it covers an area 60' long by 10' wide, and can be used as many times per day as the monster has hit dice, but no more often than every other round. A save vs Petrification is allowed to resist.\n\nA typical gorgon stands over 6 feet tall at the shoulder, measures 8 feet from snout to tail, and weighs about 4,000 pounds. Gorgons are nothing if not aggressive. They attack intruders on sight, attempting to gore or petrify them. There is no way to calm these furious creatures, and they are impossible to domesticate.",
"hit": "8*",
"morale": "8",
"move": "40' (10')",
"name": "Gorgon",
"appearing": "Wild 1d4",
"attacks": "1 gore or 1 breath",
"savingThrows": "Fighter: 8",
"treasure": "None",
"experience": "945"
},
{
"armourClass": "12",
"damage": "2d8",
"description": "Gray oozes are amorphous creatures that live only to eat. They inhabit underground areas, scouring caverns, ruins, and dungeons in search of organic matter, living or dead. A gray ooze can grow to a diameter of up to 10 feet and a thickness of about 6 inches. A typical specimen weighs about 700 pounds.\n\nA gray ooze secretes a digestive acid that quickly dissolves organic material and metal, but not stone. After a successful hit, the ooze will stick to the creature attacked, dealing 2d8 damage per round automatically. Normal (non-magical) armor or clothing dissolves and becomes useless immediately. A non-magical metal or wooden weapon that strikes a gray ooze also dissolves immediately. Magical weapons, armor, and clothing are allowed a saving throw (use the wearer's save vs Death Ray, adding any magical “plus” value to the roll if applicable).",
"hit": "3*",
"morale": "12",
"move": "1'",
"name": "Gray Ooze",
"appearing": "1",
"attacks": "1 pseudopod",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "175"
},
{
"armourClass": "hit only by fire or cold",
"damage": "special",
"description": "Green slime devours flesh and organic materials on contact and is even capable of dissolving metal given enough time. Bright green, wet, and sticky, it clings to walls, floors, and ceilings in patches, reproducing as it consumes organic matter. It drops from walls and ceilings when it detects movement (and possible food) below. Green slime cannot grow in sunlight; even the indirect sunlight of a dense forest will stunt it and prevent it from spreading, and direct sunlight will kill green slime outright within a turn.\n\nOn the first round of contact, the slime can be scraped off a creature (most likely destroying the scraping device), but after that it must be frozen, burned, or cut away (dealing the same damage to both the victim and the slime). A cure disease spell will destroy a patch of green slime. It does not harm stone or enchanted metal, but can dissolve normal metal or enchanted wood in a turn and normal wood in 2d4 rounds.\n\nIf not destroyed or scraped off within 6+1d4 rounds, the victim will be completely transformed into green slime; such a character or creature cannot be retrieved by any magic short of a wish.",
"hit": "2**",
"morale": "12",
"move": "1'",
"name": "Green Slime*",
"appearing": "1",
"attacks": "1 special",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "125"
},
{
"armourClass": "18",
"damage": "1d4/1d4/2d8",
"description": "Griffons are large carnivorous creatures resembling lions with the head, foreclaws and wings of eagles. From nose to tail, an adult griffon can measure as much as 8 feet. Neither males nor females are endowed with a mane. A pair of broad, golden wings emerge from the creature’s back and span 25 feet or more. An adult griffon weighs about 500 pounds.\n\nGriffons nest on high mountaintops, soaring down to feed on horses, the beast’s preferred prey. They hunt and travel in ocks. A Griffon will attack a horse over anything else, diving low to swipe with their claws. They are not above retreating and coming back later, when there may be less of a defense mounted.\n\nGriffons can be trained as mounts if raised in captivity, but even in this case they may try to attack horses if any come within about 120'. Roll a morale check in this case; if the check is failed, the griffon will try to attack immediately. A light load for a griffon is up to 400 pounds; a heavy load, up to 900 pounds.",
"hit": "7",
"morale": "8",
"move": "40' (10') Fly 120' (10')",
"name": "Griffon",
"appearing": "Wild 2d8, Lair 2d8",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 7",
"treasure": "E",
"experience": "670"
},
{
"armourClass": "16",
"damage": "1d6 per limb or strangle",
"description": "Hangman trees are horrible, semi-animate creatures that fertilize themselves with dead bodies. A hangman tree has four animated limbs that can wrap around the necks of living creatures that pass beneath, strangling for 1d6 points of damage per round. These limbs are arranged evenly around the tree in most cases, and generally no more than one limb can attack any single creature at a time.\n\n The roots of this tree are also animated; they do not attack, but they do pull dead bodies below the surface of the ground for “digestion.”",
"hit": "5",
"morale": "12",
"move": "0",
"name": "Hangman Tree",
"appearing": "Wild 1",
"attacks": "4 limbs plus strangle",
"savingThrows": "Fighter: 4",
"treasure": "None",
"experience": "360"
},
{
"armourClass": "13",
"damage": "1d4/1d4/1d6 or by weapon + special",
"description": " A harpy looks like a giant vulture bearing the torso and face of a human female. They are able to attack with their claws as well as with normal weapons, but their most insidious ability is their song. When a harpy sings, all creatures (other than harpies) within a 300' radius must succeed on a save vs Spells or become charmed. The same harpy’s song cannot affect a creature that successfully saves again for 24 hours. A charmed victim walks toward the harpy, taking the most direct route available. If the path leads into a dangerous area (through ame, off a cliff, or the like), that creature is allowed a second saving throw to resist the charm. Charmed creatures can take no actions other than to defend themselves. A victim within reach of the harpy offers no resistance to the monster’s attacks. The effect continues for as long as the harpy sings, and for one round thereafter.",
"hit": "2*",
"morale": "7",
"move": "20' Fly 50' (10')",
"name": "Harpy",
"appearing": "1d6, Wild 2d4, Lair 2d4",
"attacks": "2 claws/1 weapon + special",
"savingThrows": "Fighter: 2",
"treasure": "C",
"experience": "100"
},
{
"armourClass": "12",
"damage": "1d2",
"description": "Hawks are similar to eagles but slightly smaller, being 1 to 2 feet long with wingspans of 6 feet or less.\n\nGiant hawks are 4 to 6 feet long, with wingspans of 12 feet or more; they can carry off creatures of Halfling size or smaller.",
"hit": "1d4 Hit Points",
"morale": "7",
"move": "Fly 160'",
"name": "Hawk",
"appearing": "Wild 1d6, Lair 1d6",
"attacks": "1 claw or bite",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "10"
},
{
"armourClass": "14 to 18",
"damage": "1d6 or 1d6 per Hit Die",
"description": "Hellhounds are canine creatures sheathed in hellish flame. A typical hell hound stands 4½ feet high at the shoulder and weighs 120 pounds. They are native to another plane where they hunt in packs; sometimes powerful wizards or evil priests summon them for use as watchdogs. In addition to biting, each hellhound may breathe fire a number of times per day equal to its hit dice. In combat, one-third of the time (1-2 on 1d6) a hellhound will choose to breathe fire; otherwise it will attempt to bite. Roll each round to determine which attack form will be used.\n\nA hellhound's breath weapon is a cone of flame 10' wide at the far end which is 10' long for those with 3 or 4 hit dice, 20' long for those with 5 or 6 hit dice, and 30' long for the largest hellhounds. This breath weapon does 1d6 points of damage per each hit die of the hellhound to all within the area of effect; a successful saving throw vs Dragon Breath reduces damage to half normal.\n\nNote that hellhounds vary with regard to the number of hit dice each has. If generating a group randomly, roll 1d6+1 for the hit dice of each, reading a total of 2 as 3. A hellhound has an Armor Class equal to 11 plus its hit dice.",
"hit": "3** to 7**",
"morale": "9",
"move": "40'",
"name": "Hellhound",
"appearing": "2d4, Wild 2d4, Lair 2d4",
"attacks": "1 bite or 1 breath",
"savingThrows": "Fighter: 3 to 7 (same as Hit Dice)",
"treasure": "C",
"experience": "205 - 800"
},
{
"armourClass": "15",
"damage": "1d6/1d6/1d10",
"description": "Hippogriffs resemble large ying horses with the forefront of a bird of prey. A typical hippogriff is 9 feet long, has a wingspan of 20 feet, and weighs 1,000 pounds.\n\nA hippogriff avoids the territories and civilizations of other creatures, dwelling in extreme altitudes. Griffons sometimes prey upon them, and hippogriffs will generally attack griffons on sight if they have a numerical advantage.\n\nHippogriffs are omnivorous, entering combat only as defense, save for those times a griffon is met. They are prized as flying mounts since, unlike griffons, they are relatively safe around horses; note that it is still necessary to raise one in captivity in order to use it as a mount. A light load for a hippogriff is up to 400 pounds; a heavy load, up to 900 pounds.",
"hit": "3",
"morale": "8",
"move": "60' (10') Fly 120' (10')",
"name": "Hippogriff",
"appearing": "Wild 2d8",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "145"
},
{
"armourClass": "14 (11)",
"damage": "1d8 or by weapon",
"description": "Hobgoblins are larger cousins of goblins, being about the same size as humans. Their hair color ranges from dark reddish-brown to dark gray. They have dark orange or red-orange skin. Large males have blue or red noses. Hobgoblins' eyes are yellowish or dark brown, while their teeth are yellow. Their garments tend to be brightly colored, often blood red with black-tinted leather. Their weaponry is kept polished and in good repair. They wear toughened hides and carry wooden shields for armor. As with most goblinoids, they have Darkvision with a 30' range.\n\nHobgoblins are cruel and calculating warriors, always looking to exploit those weaker than themselves. They have a strong grasp of strategy and tactics and are capable of carrying out sophisticated battle plans. Under the leadership of a skilled strategist or tactician, their discipline can prove a deciding factor. Hobgoblins hate elves and attack them first in preference over other opponents.\n\nOne out of every six hobgoblins will be a warrior of 3 Hit Dice (145 XP). Regular hobgoblins gain a +1 bonus to their morale if they are led by a warrior. In hobgoblin lairs, one out of every twelve will be a chieftain of 5 Hit Dice (360 XP) in chainmail with an Armor Class of 15 (11) and a movement of 20', having a +1 bonus to damage due to strength. In lairs of 30 or greater, there will be a hobgoblin king of 7 Hit Dice (670 XP), adding a shield for an Armor Class of 16 (11) (movement is still 20') having a +2 bonus to damage. In the lair, hobgoblins never fail a morale check as long as the king is alive. In addition, a lair has a chance equal to 1-2 on 1d6 of a shaman being present (or 1-3 on 1d6 if a hobgoblin king is present), and 1 on 1d6 of a witch or warlock. A shaman is equivalent to a hobgoblin warrior statistically, but has Clerical abilities at level 1d6+1. A witch or warlock is equivalent to a regular hobgoblin, but has Magic-User abilities of level 1d6.",
"hit": "1",
"morale": "8",
"move": "30' Unarmored 40'",
"name": "Hobgoblin",
"appearing": "1d6, Wild 2d4, Lair 4d8",
"attacks": "1 weapon",
"savingThrows": "Fighter: 1",
"treasure": "Q, R each; D, K in lair",
"experience": "25"
},
{
"armourClass": "16 to 23",
"damage": "1d10 per bite",
"description": " Hydras are reptile-like monsters with multiple heads. They are gray-brown to dark brown, with a light yellow or tan underbelly. The eyes are amber and the teeth are yellow-white. Hydras are about 20 feet long and weigh about 4,000 pounds. They are bad-tempered and territorial, but not particularly cunning.\n\nA hydra may be slain by damage in the normal fashion; however, most who fight them choose to strike at their heads. If a character using a melee weapon chooses to strike at a particular head, and succeeds in doing 8 points of damage, that head is disabled (severed or severely damaged) and will not be able to attack anymore. Such damage also applies to the monster's total hit points, of course.\n\nSome hydras live in the ocean; use the given movement as a swimming rate rather than walking in this case. A very few hydras can breathe fire; those that have this ability can emit a flame 10' wide and 20' long one time per head per day. This attack will be used about one time in three (1-2 on 1d6) if it is available; roll for each head which is attacking. Each such attack does 3d6 damage, with a save vs Dragon Breath reducing the amount by half.",
"hit": "5 to 12 (+10)",
"morale": "9",
"move": "40' (10')",
"name": "Hydra",
"appearing": "1, Wild 1, Lair 1",
"attacks": "5 to 12 bites",
"savingThrows": "Fighter: 5 to 12",
"treasure": "B",
"experience": "360 - 1,875"
},
{
"name": "Giant Hawk",
"armourClass": 14,
"hit": "4 (4d8+2)",
"damage": "1d6 claw or bite",
"move": "10', Fly 150' (50')",
"appearing": "Wild 1d3, Lair 1d3",
"attacks": "1 claw or bite",
"savingThrows": "Fighter: 4",
"morale": 8,
"treasure": "None",
"experience": 240,
"description": "Giant hawks are 4 to 6 feet long, with wingspans of 12 feet or more. They can carry off creatures of Halfling size or smaller. Like normal hawks, they will shy away from combat with any creature of equal or greater size, unless forced or cornered or their eggs or offspring are threatened. Giant hawks are formidable predators with keen eyesight, sharp talons, and powerful wings, making them effective hunters in open country and prairies."
},
{
"armourClass": "13",
"damage": "1d6",
"description": "Hyenas are doglike carnivores who exhibit some of the behaviors of canines but are not related. They not only hunt but also scavenge and steal meals. A hungry hyena will chew on anything that is even remotely tainted by blood, meat or other food traces. They will mostly be found in the same savanna-like environments where lions and zebras may be found. They can live in clans of up to a hundred individuals, though smaller groups are more common. They are among the favorite pets of gnolls, who may take them into regions where they are not normally found.",
"hit": "2+1",
"morale": "8",
"move": "60'",
"name": "Hyena",
"appearing": "1d8",
"attacks": "1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "13",
"damage": "1d8",
"description": "These ancient four legged predators are named for their tooth shape, and while they are not technically prehistoric hyenas, the statistics work for the giant prehistoric varieties of hyenas as well. Many varieties of hyenodons were smallish, sometimes no bigger than a common hyena, and the statistics for standard hyenas may be used for them. The above statistics are for the larger types of Hyenodons or giant varieties of Hyena. A notable feature is that their massively built skull features a long jaw (similar to that of a crocodile) full of teeth, with four great fangs.",
"hit": "3+1",
"morale": "8",
"move": "40'",
"name": "Hyenodon",
"appearing": "1d6, 1d8 Wild Lair 1d8",
"attacks": "1 bite",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "145"
},
{
"armourClass": "Immune to normal weapons, including most magical types",
"damage": "1d3 (double against no armor)",
"description": "An insect swarm is not a single creature; rather, it is a large group of ordinary flying or crawling insects moving as a unit. In general, a swarm fills a volume equal to three 10' cubes, though it is possible for a swarm to become more compact in order to move through a small doorway or narrow corridor. If the swarm consists of crawling insects, it covers three 10' squares and the flying movement above is ignored.\n\nAny living creature within the volume or area of the swarm suffers 1d3 points of damage each round. Damage rolls are doubled if the victim is unarmored (for creatures which do not wear armor, any creature having less than Armor Class 15 is considered unarmored).\n\nDamage is reduced to a single point per round for three rounds if the character manages to exit the swarm. It is possible to “ward off” the insects by swinging a weapon, shield, or other similar-sized object around, and in this case also damage is reduced to 1 point per round. If a lit torch is used in this way, the swarm takes 1d4 damage per round. Weapons, even magic weapons, do not harm an insect swarm. An entire swarm can be affected by a sleep spell. Smoke can be used to drive a swarm away (if the swarm moves away from the victim(s) due to smoke, the damage stops immediately). Finally, a victim who dives into water will take damage for only one more round.",
"hit": "2* to 4*",
"morale": "11",
"move": "10' Fly 20'",
"name": "Insect Swarm",
"appearing": "1 swarm, Wild 1d3 swarms",
"attacks": "1 swarm",
"savingThrows": "N/A",
"treasure": "None",
"experience": "100 - 280"
},
{
"armourClass": "19",
"damage": "4d4",
"description": "Invisible stalkers are creatures native to the Elemental Plane of Air. They sometimes serve wizards and sorcerers, who summon them to perform specific tasks.\n\nA summoned invisible stalker undertakes whatever task the summoner commands, even if the task sends it hundreds or thousands of miles away. The creature follows a command until the task is completed and obeys only the summoner. However, it resents protracted missions or complex tasks and seeks to pervert its instructions accordingly.\n\nInvisible stalkers have an amorphous form. A detect invisible spell shows only a dim outline of a cloud. Don't forget to apply the standard penalty of -4 on the attack die when an invisible stalker is attacked by a creature which is unable to see it.",
"hit": "8*",
"morale": "12",
"move": "40'",
"name": "Invisible Stalker",
"appearing": "1 (special)",
"attacks": "1",
"savingThrows": "Fighter: 8",
"treasure": "None",
"experience": "945"
},
{
"armourClass": "16",
"damage": "1d4/1d4/2d4",
"description": "These great cats are about 8 to 9 feet long (from nose to tail-tip) and weigh about 165 pounds. Unlike other great cats, they enjoy swimming and often hunt near rivers or lakes. Jaguars kill with their powerful bite, preferring to deliver a fatal wound to the skull of their prey.",
"hit": "4",
"morale": "8",
"move": "70' Swim 30'",
"name": "Jaguar",
"appearing": "1d2, Wild 1d6",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 4",
"treasure": "None",
"experience": "240"
},
{
"armourClass": "13 (11)",
"damage": "1d4 or by weapon",
"description": " Kobolds are small, dog-faced reptilian humanoids. A kobold is 2 to 2½ feet tall and weighs 35 to 45 pounds. They prefer ranged combat, closing only when they can see that their foes have been weakened. Whenever they can, kobolds set up ambushes near trapped areas. They aim to drive enemies into the traps, where other kobolds wait to pour flaming oil over them, shoot them, or drop poisonous vermin onto them. Kobolds have Darkvision with a range of 60', and suffer a -1 penalty to attack rolls in bright sunlight or within the radius of light spells. Kobolds typically wear leather armor in battle.\n\nOne out of every six kobolds will be a warrior of 1 Hit Dice (25 XP). Kobolds gain a +1 bonus to their morale if they are led by a warrior. In kobold lairs, one out of every twelve will be a chieftain of 2 Hit Dice (75 XP) with an Armor Class of 14 (11) and having a +1 bonus to damage due to strength. In lairs of 30 or greater, there will be a kobold king of 3 Hit Dice (145 XP) who wears chain mail with an Armor Class of 15 (11) and a movement of 10', and who has a +1 bonus to damage. In the lair, kobolds never fail a morale check as long as the kobold king is alive. In addition, a lair has a chance equal to 1 on 1d6 of a shaman being present (or 1-2 on 1d6 if a kobold king is present). A shaman is equivalent to a regular kobold statistically, but has Clerical abilities at level 1d4+1.\n\nKobolds are cunning foes. They see all larger races as enemies, and are thus likely to be hostile when encountered. However, they are naturally cowardly, and prefer to avoid combat, leading enemies into ambushes or traps rather than facing them directly. Sometimes kobold tribes build and inhabit extensive dungeon areas filled with deadly traps which only they know how to avoid.",
"hit": "1d4 Hit Points",
"morale": "6",
"move": "20' Unarmored 30'",
"name": "Kobold",
"appearing": "4d4, Wild 6d10, Lair 6d10",
"attacks": "1 weapon",
"savingThrows": "Fighter: 1",
"treasure": "P, Q each; C in lair",
"experience": "10"
},
{
"armourClass": "17",
"damage": "1d6 + 1d6/round",
"description": "Giant leeches are slimy, segmented wormlike creatures which live in water. Salt or fresh, clean or stagnant, there are giant leech varieties for all wet environments. However, only a true leech expert can tell the various types apart. An average giant leech will be 4 to 6 feet long.\n\nOnce a giant leech hits in combat, it attaches to the victim and sucks blood, causing an additional 1d6 damage each round until the victim or the leech is dead. There is no way to remove the leech other than to kill it.",
"hit": "6",
"morale": "10",
"move": "30'",
"name": "Leech, Giant",
"appearing": "Wild 1d4",
"attacks": "1 bite + hold",
"savingThrows": "Fighter: 6",
"treasure": "None",
"experience": "500"
},
{
"armourClass": "14",
"damage": "1d6/1d6/1d10",
"description": "The statistics presented here describe a male African lion, which is 5 to 8 feet long and weighs 330 to 550 pounds. Females are slightly smaller but use the same statistics.\n\nLiving statues are magically animated. They are true automatons, unlike golems, which are animated by elemental spirits. While this means that living statues have no chance of going “berserk,” it also means that they may only perform simple programmed activities. They may not be commanded in any meaningful fashion. They make very effective guards for tombs, treasure rooms, and similar places.\n\nLiving statues can be crafted to resemble any sort of living creature, but most commonly are made to look like humans or demi-humans.",
"hit": "5",
"morale": "9",
"move": "50'",
"name": "Lion",
"appearing": "Wild 1d8",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 5",
"treasure": "None",
"experience": "360"
},
{
"armourClass": "16",
"damage": "1d6/1d6",
"description": "Crystal living statues have no particular special powers, unlike those made of iron or stone.",
"hit": "3",
"morale": "12",
"move": "30'",
"name": "Living Statue, Crystal",
"appearing": "1d6",
"attacks": "2 fists",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "145"
},
{
"armourClass": "18",
"damage": "1d8/1d8 + special",
"description": "If struck by a non-magical metal (even partially metal) weapon, the weapon may become stuck in the monster. If this happens, it cannot be removed until the statue is “killed.” The wielder is allowed a save vs Spells to avoid this.",
"hit": "4*",
"morale": "12",
"move": "10'",
"name": "Living Statue, Iron",
"appearing": "1d4",
"attacks": "2 fists",
"savingThrows": "Fighter: 4",
"treasure": "None",
"experience": "280"
},
{
"armourClass": "16",
"damage": "2d6/2d6",
"description": "A stone living statue attacks by spraying molten rock from its fingertips. The range of the spray is 5'.",
"hit": "5*",
"morale": "12",
"move": "20'",
"name": "Living Statue, Stone",
"appearing": "1d3",
"attacks": "2 lava sprays",
"savingThrows": "Fighter: 5",
"treasure": "None",
"experience": "405"
},
{
"armourClass": "15",
"damage": "1d10",
"description": "Giant draco lizards are able to extend their ribs and connected skin to form a sort of wing, allowing them to fly for short distances (no more than three rounds, and ascending is impossible). An average giant draco lizard is 8' long, including its nearly 3' long tail. They are fierce predators.",
"hit": "4+2",
"morale": "7",
"move": "40' Fly 70' (20', and see below)",
"name": "Lizard, Giant Draco",
"appearing": "1d4, Wild 1d8",
"attacks": "1 bite",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "240"
},
{
"armourClass": "15",
"damage": "1d8",
"description": "Giant gecko lizards range from 4' to 6' in length, and are generally green in color, though grey or white versions can be found underground. They can climb walls and even walk across ceilings at full movement rate due to their specialized toe pads. They are carnivores, typically attacking weaker prey from above.",
"hit": "3+1",
"morale": "7",
"move": "40' (special)",
"name": "Lizard, Giant Gecko",
"appearing": "1d6, Wild 1d10",
"attacks": "1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "145"
},
{
"armourClass": "18",
"damage": "grab or 2d6",
"description": "Giant horned chameleons average 8' to 10' in length. They are typically green, but can change color to blend into their surroundings, allowing them to surprise prey on 1-4 on 1d6. Giant horned chameleon have very long tongues, able to spring out up to 20' forward; the sticky muscular ball on the end grabs on to the chameleon's prey, and the chameleon then drags the prey to its mouth, doing bite damage automatically on the following round (and all subsequent rounds, until the chameleon is killed or fails a morale check, or until the prey is dead).\n\nThe horns of the giant horned chameleon are used only in mating rituals, not in combat.",
"hit": "5",
"morale": "7",
"move": "40' (10')",
"name": "Lizard, Giant Horned Chameleon",
"appearing": "1d3, Wild 1d6",
"attacks": "1 tongue or 1 bite",
"savingThrows": "Fighter: 4",
"treasure": "None",
"experience": "360"
},
{
"armourClass": "16",
"damage": "1d4/1d4/2d6",
"description": "Giant tuataras are large, being 10' to 12' long, and heavily built. They are predators with a powerful shearing bite. Giant tuataras are more resistant to cold than most lizards, and are thus sometimes found hunting deep underground. They are also known to hibernate in cold weather.",
"hit": "6",
"morale": "6",
"move": "40' (10')",
"name": "Lizard, Giant Tuatara",
"appearing": "1d2, Wild 1d4",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 5",
"treasure": "None",
"experience": "500"
},
{
"armourClass": "15 (12)",
"damage": "1d6+1 or by weapon +1",
"description": " A lizard man is usually 6 to 7 feet tall with green, gray, or brown scales. Its tail is used for balance and is 3 to 4 feet long. Adult males can weigh from 200 to 250 pounds. Due to their great Strength they always receive a +1 to damage done with melee weapons. They wear leather armor and carry shields in battle.\n\nLizard men are excellent swimmers and can hold their breath for an extended period of time (up to a full turn). They cannot swim while wearing armor; however, they often hide in the water even while armored, standing on the bottom with just nose and eyes exposed (similar to a crocodile). When they are able to employ this maneuver, lizard men surprise on 1-4 on 1d6.\n\nLizard men are largely indifferent to other races, being primarily interested in their own survival. If aroused, however, they are fearsome warriors, using simple but sound tactics.\n\nLycanthropes are humans who can transform themselves into animals. In its natural form, a lycanthrope looks like any other human, though those who have been afflicted for a long time tend to acquire features reminiscent of their animal forms. In animal form, a lycanthrope resembles a powerful version of the normal animal, but on close inspection, its eyes (which often glow red in the dark) show a faint spark of unnatural intelligence.\n\nLycanthropy is spread like a disease. Any human who loses half or more of his or her hit points due to lycanthrope bite and/or claw attacks will subsequently contract the same form of lycanthropy in 3d6 days. For demi-humans and humanoids, contracting the disease is fatal in the same time period. A cure disease cast before the onset is complete will stop the progress of the disease, but once the time has elapsed, the transformation is permanent.\n\nIn animal form, lycanthropes may be hit only by silver or magical weapons.",
"hit": "2",
"morale": "11",
"move": "20' Unarmored 30'\n\t\t\tSwim 40' (not in armor)",
"name": "Lizard Man",
"appearing": "2d4, Wild 2d4, Lair 6d6",
"attacks": "1 weapon",
"savingThrows": "Fighter: 2",
"treasure": "D",
"experience": "75"
},
{
"armourClass": "18 †",
"damage": "2d4/2d4/2d8 + 2d8",
"description": "Werebears are humans that can transform into large bears. When in human form, they typically appear as well-muscled, imposing figures, with an abundance of thick hair. Werebears typically dwell in deep forests, far from civilization. They are distrustful of those that they do not know, but will ferociously defend those that they have befriended.",
"hit": "6*",
"morale": "10",
"move": "40'",
"name": "Lycanthrope, Werebear*",
"appearing": "1d4, Wild 1d4, Lair 1d4",
"attacks": "2 claws/1 bite + hug",
"savingThrows": "Fighter: 6",
"treasure": "C",
"experience": "555"
},
{
"armourClass": "16 †",
"damage": "2d6",
"description": "Wereboars in human form tend to be a stocky, muscular individuals of average height. They dress in simple garments that are easy to remove, repair, or replace. In either form, wereboars are as aggressive and ferocious as normal boars.",
"hit": "4*",
"morale": "9",
"move": "50' Human Form 40'",
"name": "Lycanthrope, Wereboar*",
"appearing": "1d4, Wild 2d4, Lair 2d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 4",
"treasure": "C",
"experience": "280"
},
{
"armourClass": "13 †",
"damage": "1d4 or 1d6 or by weapon",
"description": " A wererat in human form tends to be a thin, wiry individual of shorter than average height, with eyes constantly darting around. A wererat's nose and mouth may twitch if he or she is excited. Males often wear thin, ragged mustaches.\n\nIn addition to assuming the form of a giant rat, wererats can assume an intermediate form (a “ratman”). The ratman form shares the animal form's immunity to normal weapons, and can deliver an identical bite, but in this form the wererat may use a normal weapon instead of biting. Note that the wererat in ratman form cannot bite and use a weapon in the same round.\n\nUnlike most lycanthropes, wererats prefer to inhabit civilized areas, particularly cities. They frequently lair in sewers or other underground areas, coming out by night to steal from or kill city folk.",
"hit": "3*",
"morale": "8",
"move": "40'",
"name": "Lycanthrope, Wererat*",
"appearing": "1d8, Wild 2d8, Lair 2d8",
"attacks": "1 bite or 1 weapon",
"savingThrows": "Fighter: 3",
"treasure": "C",
"experience": "175"
},
{
"armourClass": "17 †",
"damage": "1d6/1d6/2d6",
"description": "Weretigers are humans that can transform into tigers. In human form, they tend to be tall, trim, and very agile. They tend to live and hunt close to human settlements, and are excellent trackers (5 in 6 chance to track prey in either form). Weretigers will typically only attack if provoked.",
"hit": "5*",
"morale": "9",
"move": "50' Human Form 40'",
"name": "Lycanthrope, Weretiger*",
"appearing": "1d4, Wild 1d4, Lair 1d4",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 5",
"treasure": "C",
"experience": "405"
},
{
"armourClass": "15 †",
"damage": "2d4",
"description": "Werewolves in human form have no distinguishing traits. They may be found anywhere humans are found. They are ferocious predators, equally willing to eat animal or human flesh.",
"hit": "4*",
"morale": "8",
"move": "60' Human Form 40'",
"name": "Lycanthrope, Werewolf*",
"appearing": "1d6, Wild 2d6, Lair 2d6",
"attacks": "1 bite",
"savingThrows": "Fighter: 4",
"treasure": "C",
"experience": "280"
},
{
"armourClass": "18",
"damage": "1d4/1d4/2d4 or 1d6 per spike",
"description": "Manticores look like an overgrown lion with thick leathery wings and an ugly humanoid face, often like that of a human or bearded dwarf. Their tail ends in an assortment of spikes, which the beast may fire as projectiles; a maximum of 24 are available, and the manticore regrows 1d6 per day. A typical manticore is about 10 feet long and weighs about 1,000 pounds.\n\nManticores are vicious predators, having a preference for human flesh. They will use their ranged attacks to “soften up” potential prey before closing to melee.",
"hit": "6+1*",
"morale": "9",
"move": "40' Fly 60' (10')",
"name": "Manticore",
"appearing": "1d2, Wild 1d4, Lair 1d4",
"attacks": "2 claws/1 bite or 6 spikes (180' range)",
"savingThrows": "Fighter: 6",
"treasure": "D",
"experience": "555"
},
{
"armourClass": "18",
"damage": "2d6/2d6 or 4d8",
"description": "Mastodons (and mammoths, which can also be represented by the above statistics) are hairy relatives of the elephant found in cold “lost world” areas.\n\nA mastodon has no treasure as such, but the tusks of a mastodon are worth 2d4 x 100 gp.",
"hit": "15 *(+11)",
"morale": "8",
"move": "40' (15')",
"name": "Mastodon",
"appearing": "Wild 2d8",
"attacks": "2 tusks or 1 trample",
"savingThrows": "Fighter: 15",
"treasure": "special",
"experience": "2,975"
},
{
"armourClass": "12",
"damage": "1d6+poison + petrification",
"description": "A medusa appears to be a human female with vipers growing from her head instead of hair. The gaze of a medusa will petrify any creature who meets it unless a save vs Petrification is made. In general, any creature surprised by the medusa will meet its gaze. Those who attempt to fight the monster while averting their eyes suffer penalties of -4 on attack rolls and -2 to AC. It is safe to view a medusa's reflection in a mirror or other reflective surface; anyone using a mirror to fight a medusa suffers a penalty of -2 to attack and no penalty to AC. If a medusa sees its own reflection, it must save vs Petrification itself; a petrified medusa is no longer able to petrify others, but the face of a medusa continues to possess the power to petrify even after death otherwise. Medusae instinctively avoid mirrors or other reflective surfaces, even drinking with their eyes closed, but if an attacker can manage to surprise the monster with a mirror she may see her reflection.\n\nFurther, the snakes growing from her head are poisonous (save vs Poison or die in one turn). They attack as a group, not individually, once per round for 1d6 damage (plus the poison).\n\nA medusa often wears garments that enhance its body while hiding its face behind a hood or veil. A typical medusa is 5 to 6 feet tall and about the same weight as a human.\n\n Medusae are shy and reclusive, owing no doubt to the fact that, once the lair of one is found, any humans living nearby will not rest until she is slain. They are hateful creatures, however, and will seek to destroy as many humans as they can without being discovered.",
"hit": "4**",
"morale": "8",
"move": "30'",
"name": "Medusa",
"appearing": "1d3, Wild 1d4, Lair 1d4",
"attacks": "1 snakebite + gaze",
"savingThrows": "Fighter: 4",
"treasure": "F",
"experience": "320"
},
{
"armourClass": "12",
"damage": "1d6 or by weapon",
"description": "Mermaids have the upper bodies of women and the lower bodies of dolphins. Also called “sirens,” mermaids often attempt to lure sailors or other men found near the sea. They accomplish this by means of their enchanting songs.\n\nA mermaid's song will attract any man within 100 yards, but generally has no effect on women. Men within the area of effect must save vs Spells to resist, or else they will move toward the mermaid with amorous intent as directly as possible. If two mermaids are singing, apply a penalty of -4 to the save; more than two gives no extra benefit. Affected men will submit to anything the mermaid desires. When she tires of him, he might be freed or slain, depending on the mermaid's temperament.\n\nContrary to popular belief, mermaids are not fish (nor even half fish) and do not breathe water. They can hold their breath for up to an hour of light activity, or two turns (20 minutes) of strenuous action. However, being out of water more than two turns (20 minutes) causes the mermaid 1d4 points of damage per turn.\n\nMermaids can hear as well as dolphins, and can produce sounds ranging from the lowest frequency a normal human woman can produce up to the highest frequency of a dolphin. This means that mermaids can learn to communicate with dolphins and whales; at least 35% of mermaids will know the language of one or the other, and 10% can communicate with any such creature.\n\nThree-quarters of mermaid births are female. Of the quarter which are male, most have legs rather than tails. Such will either be slain or put ashore to be adopted by humans, depending on the temperament of the mother. Mermen (those born with tails) are raised to be subservient to the females. A small mermaid community (3d6 including the male) will often form around such a merman and his mother, who becomes their leader. Such a group is called a pod.\n\nOne-third of female mermaids are infertile. Other mermaids can sense this, but non-mermaids cannot tell. Infertile mermaids usually remain with a fertile sister (or more rarely a close friend) to help her ensnare men. This explains the first number appearing given; in any group of 2, one will be infertile.\n\nA mermaid with a child will not generally be encountered, as they remain in the deeper parts of the ocean and avoid the attention of men. Pods of mermaids do likewise, and in fact any pod includes 2d4-2 children/juveniles (over and above the number rolled for Number Appearing). Men generally meet mermaids only in groups of 1 or 2.\n\nMermaids arm themselves with spears or daggers. They hunt fish and harvest kelp for food. Mermaids sometimes possess more than 1 hit die, and about 3% have some Clerical abilities.",
"hit": "1*",
"morale": "8",
"move": "Swim 40'",
"name": "Mermaid",
"appearing": "Wild 1d2 or 3d6 (see below)",
"attacks": "1 weapon",
"savingThrows": "Fighter: 1",
"treasure": "A",
"experience": "37"
},
{
"armourClass": "14 (12)",
"damage": "1d6/1d6 or by weapon + 2",
"description": "Minotaurs are huge bull-headed humanoid monsters. A minotaur stands more than 7 feet tall and weighs about 700 pounds. Most minotaurs are very aggressive, and fly into a murderous rage if provoked or hungry. Although minotaurs are not especially intelligent, they possess innate cunning and logical ability. They never become lost, and can track enemies with 85% accuracy. They gain +2 to damage when using melee weapons due to their great Strength. Minotaurs often wear toughened hides for armor.",
"hit": "6",
"morale": "11",
"move": "30' Unarmored 40'",
"name": "Minotaur",
"appearing": "1d6, Wild 1d8, Lair 1d8",
"attacks": "1 gore/1 bite or 1 weapon",
"savingThrows": "Fighter: 6",
"treasure": "C",
"experience": "500"
},
{
"armourClass": "14",
"damage": "1d4/1d4/1d6",
"description": "These great cats are about 7 feet long (from nose to tail-tip) and weigh about 140 pounds. They see well in darkness and may be found hunting day or night.",
"hit": "3+2",
"morale": "8",
"move": "50'",
"name": "Mountain Lion",
"appearing": "Wild 1d4, Lair 1d4",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "145"
},
{
"armourClass": "17 ‡ (see below)",
"damage": "1d12 + disease",
"description": "Mummies are undead monsters, linen-wrapped preserved corpses animated through the auspices of dark desert gods best forgotten. Most mummies are 5 to 6 feet tall and weigh about 120 pounds.\n\nAs they are undead, mummies are immune to sleep, charm and hold magic. They can only be injured by spells, fire, or magical weapons; furthermore, magic weapons do only half damage, while any sort of fire-based attack does double damage. Those injured by mummy attacks will contract mummy rot, a disease that prevents normal or magical healing; a cure disease spell must be applied to the victim before he or she may again regain hit points.",
"hit": "5**",
"morale": "12",
"move": "20'",
"name": "Mummy*",
"appearing": "1d4, Lair 1d12",
"attacks": "1 touch + disease",
"savingThrows": "Fighter: 5",
"treasure": "D",
"experience": "450"
},
{
"armourClass": "16",
"damage": "1d4",
"description": "Nixies are small water fairies. As far as anyone knows, all nixies are female. Most nixies are slim and comely, with lightly scaled, pale green skin and dark green hair. They often twine shells and pearl strings in their hair and dress in wraps woven from colorful seaweed. Nixies prefer not to leave their lakes. A nixie stands about 4 feet tall and weighs about 45 pounds.\n\nTen or more nixies can work together to cast a powerful charm (similar to charm person). The charm lasts one year (unless dispelled). A save vs Spells is allowed to resist. Each nixie can cast water breathingonce per day, with a duration of one day. Finally, a group of nixies will often have a school of giant bass living nearby who can be called to their aid (see Fish, Giant Bass for details).\n\nNixies are fey creatures, and thus unpredictable. However, they are rarely malicious, attacking only when they feel threatened.",
"hit": "1*",
"morale": "6",
"move": "40' Swim 40'",
"name": "Nixie",
"appearing": "Wild 2d20, Lair 2d20",
"attacks": "1 dagger",
"savingThrows": "Fighter: 2",
"treasure": "B",
"experience": "37"
},
{
"armourClass": "12 (only hit by fire or cold)",
"damage": "2d6",
"description": "Ochre jellies are ochre-colored amorphous monsters, similar to the gray ooze in appearance. An ochre jelly can grow to a diameter of up to 10 feet and a thickness of about 6 inches. A typical specimen weighs about 700 pounds.\n\nOchre jellies can only be hit (damaged) by fire or cold. Attacks with weapons or electricity/lightning cause the creature to divide into 1d4+1 smaller jellies of 2 hit dice apiece. If divided, the resulting smaller jellies do 1d6 damage with each hit.",
"hit": "5*",
"morale": "12",
"move": "10'",
"name": "Ochre Jelly*",
"appearing": "1",
"attacks": "1 pseudopod",
"savingThrows": "Fighter: 5",
"treasure": "None",
"experience": "405"
},
{
"armourClass": "19",
"damage": "1d4 per tentacle/1d6",
"description": "These creatures are aggressive and territorial hunters, with arms reaching 10 feet or more in length. Their tentacles are studded with barbs and sharp-edged suckers. In order to bite a creature, the giant octopus must hit with at least two tentacles first.\n\nIf a giant octopus fails a morale check, it will squirt out a cloud of black “ink” 40' in diameter and then jet away at twice normal speed for 2d6 rounds.",
"hit": "8",
"morale": "7",
"move": "Swim 30'",
"name": "Octopus, Giant",
"appearing": "Wild 1d2",
"attacks": "8 tentacles/1 bite",
"savingThrows": "Fighter: 8",
"treasure": "None",
"experience": "875"
},
{
"armourClass": "15 (12)",
"damage": "2d6",
"description": "Ogres appear as large, very ugly humans. Adult ogres stand 9 to 10 feet tall and weigh 600 to 650 pounds. Their skin color ranges from dull yellow to dull brown. Their clothing consists of poorly cured furs and hides, which add to their naturally repellent odor. Ogres are brutish and aggressive, but inherently lazy. They employ direct attacks in combat, typically using large clubs, axes, or pole arms, generally causing 2d6 damage. If normal weapons are employed, an ogre has a +3 bonus to damage due to strength. If an ogre fights bare-handed, it does 1d8 subduing damage per hit.\n\n One out of every six ogres will be a pack leader of 6+1 Hit Dice (500 XP). Ogres gain a +1 bonus to their morale if they are led by a pack leader. In ogre lairs of 10 or greater, there will also be an ogre bully of 8+2 Hit Dice (875 XP), with an Armor Class of 17 (13) (movement 20') and having a +4 bonus to damage due to strength. Ogre bullies generally wire together pieces of chainmail to wear over their hides. Ogres gain +2 to morale so long as the ogre bully is present (and alive).",
"hit": "4+1",
"morale": "10",
"move": "30' Unarmored 40'",
"name": "Ogre",
"appearing": "1d6, Wild 2d6, Lair 2d6",
"attacks": "1 weapon",
"savingThrows": "Fighter: 4",
"treasure": "C + 1d20x100 gp",
"experience": "240"
},
{
"armourClass": "14 (11)",
"damage": "1d8 or by weapon",
"description": "Orcs are grotesque humanoids bent on war and domination. They have lupine ears, reddish eyes, truncated, upturned noses, and black hair (but very little body hair). An adult male orc is a little over 6 feet tall and weighs about 210 pounds; females are slightly smaller. Orcs prefer wearing vivid colors that many humans would consider unpleasant, such as blood red, mustard yellow, yellow-green, and deep purple. They utilize all manner of weapons and armor scavenged from battlefields.\n\nOrcs have Darkvision to a range of 60'. They suffer a -1 attack penalty in bright sunlight or within the radius of a spell causing magical light. They speak their own rough and simple language, but many also speak some common or goblin.\n\nOne out of every eight orcs will be a warrior of 2 Hit Dice (75 XP). Orcs gain a +1 bonus to their morale if they are led by a warrior. In orc lairs, one out of every twelve will be a chieftain of 4 Hit Dice (240 XP) in chainmail with an Armor Class of 15 (11), a movement 20', and having a +1 bonus to damage due to strength. In lairs of 30 or more, there will be an orc king of 6 Hit Dice (500 XP), with an Armor Class of 16 (11), in chainmail with a shield, movement 20', and having a +2 bonus to damage. In the lair, orcs never fail a morale check as long as the orc king is alive. In addition, a lair has a chance equal to 1-2 on 1d6 of a shaman being present. A shaman is equivalent to a warrior orc statistically, but has Clerical abilities at level 1d4+1.",
"hit": "1",
"morale": "8",
"move": "30' Unarmored 40'",
"name": "Orc",
"appearing": "2d4, Wild 3d6, Lair 10d6",
"attacks": "1 weapon",
"savingThrows": "Fighter: 1",
"treasure": "Q, R each; D in lair",
"experience": "25"
},
{
"armourClass": "15",
"damage": "1d8/1d8/1d8 + 2d8",
"description": "Owlbears appear to be bears with owlish faces, including a large, sharp beak. An owlbear’s coat ranges in color from brown-black to yellowish brown; its beak is a dull ivory color. A full-grown male can stand as tall as 8 feet and weigh up to 1,500 pounds. Adventurers who have survived encounters with the creature often speak of the bestial madness in its red-rimmed eyes.\n\n Owlbears fight much as do bears, but are more aggressive (as noted above). As with normal bears, an owlbear must hit with both claws in order to do the listed “hug” damage.",
"hit": "5",
"morale": "9",
"move": "40'",
"name": "Owlbear",
"appearing": "1d4, Wild 1d4, Lair 1d4",
"attacks": "2 claws/1 bite + 1 hug",
"savingThrows": "Fighter: 5",
"treasure": "C",
"experience": "360"
},
{
"armourClass": "15",
"damage": "1d6/1d6",
"description": " The pegasus is a magnificent winged horse. Though highly prized as aerial steeds, pegasi are wild and shy creatures not easily tamed. A typical pegasus stands 6 feet high at the shoulder, weighs 1,500 pounds, and has a wingspan of 20 feet. A light load for a pegasus is up to 400 pounds; a heavy load, up to 900 pounds.",
"hit": "4",
"morale": "8",
"move": "80' (10') Fly 160' (10')",
"name": "Pegasus",
"appearing": "Wild 1d12",
"attacks": "2 hooves",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "240"
},
{
"armourClass": "17",
"damage": "1d4",
"description": "Pixies are winged fairies often found in forested areas. They wear bright clothing, often including a cap and shoes with curled and pointed toes. A pixie stands about 2-1/2 feet tall and weighs about 30 pounds.\n\nA pixie can become invisible at will, as many times per day as it wishes, and can attack while remaining invisible. Anyone attacking an invisible pixie does so with an attack penalty of -4 unless the attacker can somehow detect invisible creatures. Pixies may ambush their foes while invisible; if they do so, they surprise on 1-5 on 1d6.\n\nPixies are whimsical, enjoying nothing so much as a good joke or prank, especially at the expense of a “big person” like a human or demi-human.\n\nPixies can only fly for 3 turns maximum before requiring rest of at least one turn, during which time the pixie may walk at normal speed but may not fly.",
"hit": "1*",
"morale": "7",
"move": "30' Fly 60'",
"name": "Pixie",
"appearing": "2d4, Wild 10d4, Lair 10d4",
"attacks": "1 dagger",
"savingThrows": "Fighter: 1 (with Elf bonuses)",
"treasure": "R, S",
"experience": "37"
},
{
"armourClass": "16",
"damage": "2d8/1d8+poison",
"description": "Purple worms are gigantic subterranean monsters; they are rarely found above ground. The body of a mature purple worm is 5-8 feet in diameter and 60-100 feet long, weighing about 40,000 pounds.\n\nThe creature has a poisonous stinger in its tail; those injured by it must save vs Poison or die. Note that the purple worm's movement is less than the monster's length, so that, if attacking from out of a tunnel, it might not be able to use the stinger for several rounds.\n\nAny time a purple worm successfully bites a man-sized or smaller opponent with a natural roll of 19 or 20, the opponent has been swallowed, and will suffer 3d6 damage per round afterward due to being digested. A character who has been swallowed can only effectively attack with small cutting or stabbing weapons such as dagger or shortsword.",
"hit": "11* (+9) to 20* (+13)",
"morale": "10",
"move": "20' (15')",
"name": "Purple Worm",
"appearing": "1d2, Wild 1d4",
"attacks": "1 bite/1 sting",
"savingThrows": "Fighter: 6 to 10 (½ of Hit Dice)",
"treasure": "None",
"experience": "1,670 – 5,450"
},
{
"armourClass": "11",
"damage": "1d6 + disease",
"description": "These omnivorous rodents thrive almost anywhere. Normal rats attack as a swarm; each point of damage done to the swarm reduces their numbers by one animal.\n\nGiant rats are scavengers, but will attack to defend their nests and territories. A giant rat can grow to be up to 4 feet long and weigh over 50 pounds. A single giant rat, or a small group of up to four, will generally be shy, but larger packs attack fearlessly, biting and chewing with their sharp incisors.\n\nAny rat bite has a 5% chance of causing a disease. A character who suffers one or more rat bites where the die roll indicates disease will sicken in 3d6 hours. The infected character will lose one point of Constitution per hour; after losing each point, the character is allowed a save vs Death Ray (adjusted by the current Constitution bonus or penalty) to break the fever and end the disease. Any character reduced to zero Constitution is dead. See Constitution Point Losses in the Encounter section for details on regaining lost Constitution.\n\n * Note: The XP award for normal rats is for driving away or killing an entire pack of normal size. If the adventurers are forced to flee, the GM should award 3 XP per rat slain.",
"hit": "1 Hit Point",
"morale": "5",
"move": "20' Swim 10'",
"name": "Rat",
"appearing": "5d10,\n\t\t\tWild 5d10,\n\t\t\tLair 5d10",
"attacks": "1 bite per pack",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "360*"
},
{
"armourClass": "16",
"damage": "grab/grab/2d8",
"description": "The rhagodessa is related to both spiders and scorpions, though it is not properly either. Rhagodessas have “pedipalps,” an elongated extra pair of legs in front that have sticky pads on them for capturing prey.\n\nGiant rhagodessas are the size of a pony. Those found in desert terrain are generally marked in yellow, red, and brown, while those found underground may be black or white in color (those found in the deepest caverns are always white). Like spiders, they can climb walls, but they are unable to cross ceilings or otherwise climb entirely upside down.\n\nA hit by a leg does no damage, but the victim is stuck fast, and will be drawn to the rhagodessa's mouth the next round and automatically hit for 2d8 damage. The rhagodessa will not use its bite attack against a foe it has not captured in this way, and neither will it attack more than one foe with its legs. If threatened, a rhagodessa which has captured a victim will attempt to withdraw to consume its prey in peace.",
"hit": "4",
"morale": "9",
"move": "50'",
"name": "Rhagodessa, Giant",
"appearing": "1d4, Wild 1d6, Lair 1d6",
"attacks": "2 legs/1 bite",
"savingThrows": "Fighter: 4",
"treasure": "U",
"experience": "240"
},
{
"armourClass": "17",
"damage": "2d6 or 2d8",
"description": "The rhinoceros is infamous for its bad temper and willingness to charge intruders.\n\nThe statistics presented here are based on the African black rhino, which is 6 to 14 feet long, 3 to 6 feet high at the shoulder, and weighs up to 6,000 pounds. These statistics can describe any herbivore of similar size and similar natural weapons (antlers, horns, tusks, or the like).\n\nThe woolly rhinoceros is a prehistoric beast with long fur, found in primitive “lost world” areas in colder territories. They behave much as the black rhino does.",
"hit": "8",
"morale": "6",
"move": "40' (15')",
"name": "Rhinoceros",
"appearing": "Wild 1d12",
"attacks": "1 butt or 1 trample",
"savingThrows": "Fighter: 6",
"treasure": "None",
"experience": "875"
},
{
"armourClass": "18",
"damage": "1d6/1d6/\n\t\t\t2d6",
"description": "Rocs are birds similar to eagles, but even a “normal” roc is huge, being about 9 feet long and having a wingspan of 24 feet. Large rocs are about 18 feet long and have wingspans of around 48 feet; giant rocs average 30 feet long and have massive wingspans of around 80 feet. A roc’s plumage is either dark brown or golden from head to tail. Like most birds, the males have the brighter plumage, with females being duller in color and thus more easily hidden (if anything so large can even be hidden, that is).\n\nA light load for a normal roc is 150 pounds, while a heavy load is 300 pounds. Obviously only the smallest characters can hope to ride upon a normal roc. For a large roc, a light load is up to 600 pounds and a heavy load up to 1200. Giant rocs can easily lift up to 3000 pounds, and are heavily loaded when carrying up to 6000 pounds. Tales of giant rocs carrying off full-grown elephants are somewhat exaggerated, but note that a young elephant would be reasonable prey for these monstrous birds.\n\nA roc attacks from the air, swooping earthward to snatch prey in its powerful talons and carry it off for itself and its young to devour. Any successful hit with both claw (talon) attacks against a single creature results in that creature being carried off, unless of course the creature is too large for the roc to carry. While being carried, the victim will not be further attacked, so as to be as “fresh” as possible when given to the hatchlings (or consumed by the roc itself if it is solitary). A solitary roc is typically hunting and will attack any man-sized or larger creature that appears edible. A mated pair of rocs attack in concert, fighting to the death to defend their nests or hatchlings.",
"hit": "6",
"morale": "8",
"move": "20' Fly 160' (10')",
"name": "Roc",
"appearing": "Wild 1d12",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 6",
"treasure": "I",
"experience": "500"
},
{
"armourClass": "14",
"damage": "1d6/1d4",
"description": "Rock baboons are a large, particularly intelligent variety of baboon. An adult male rock baboon is 4' to 5' tall and weighs 200 to 250 pounds, with females being a bit smaller and lighter.\n\nRock baboons are omnivorous, but prefer meat. They are aggressive, naturally cruel creatures. They will prepare ambushes in rocky or forested terrain and attack any party they outnumber.",
"hit": "2",
"morale": "8",
"move": "40'",
"name": "Rock Baboon",
"appearing": "2d6, Wild 2d6, Lair 5d6",
"attacks": "1 club/1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "10",
"damage": "special",
"description": "Rot grubs are 1-inch long vermin found in carrion, dung, and other such garbage and organic material. Their skin color is white or brown. When a living creature contacts an area (dung heap, offal, etc) infested with rot grubs, the grubs will attack if they can come in contact the victim’s skin. A rot grub secretes an anesthetic when it bites and will burrow into the flesh. A burrowing grub can be noticed if the victim succeeds at a Wisdom check. If successful, the victim sees strange rippling beneath his skin. If failed, the creature does not notice the grubs. During the first two rounds, a burrowing rot grub can be killed by applying fire to the infested skin or by cutting open the infested skin with any slashing weapon. Either method deals 2d6 points of damage to the victim, but kills the grubs. After the second round, only a cure disease can kill the grubs as they burrow to the victim’s heart and devour it in 1d3 turns.",
"hit": "1 hp",
"morale": "12",
"move": "5'",
"name": "Rot Grub",
"appearing": "5d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "10"
},
{
"armourClass": "18",
"damage": "special",
"description": "The hide of these creatures varies in color from a yellowish tan underside to a rust-red upper back. A rust monster’s prehensile antennae can rust metals on contact. The typical rust monster measures 5 feet long and 3 feet high, weighing 200 pounds.\n\nA rust monster's touch transforms metal objects into rust (or verdigris, or other oxides as appropriate). Non-magical metal attacked by a rust monster, or that touches the monster (such as a sword used to attack it), is instantly ruined. A non-magical metal weapon used to attack the monster does half damage before being destroyed. Magic weapons or armor lose one “plus” each time they make contact with the rust monster; this loss is permanent.\n\n The metal oxides created by this monster are its food; a substantial amount of metal dropped in its path may cause it to cease pursuit of metal-armored characters. Use a morale check to determine this.",
"hit": "5*",
"morale": "7",
"move": "40'",
"name": "Rust Monster*",
"appearing": "1d4",
"attacks": "1 antenna",
"savingThrows": "Fighter: 5",
"treasure": "None",
"experience": "405"
},
{
"armourClass": "14",
"damage": "1d6/1d6/2d8",
"description": "The sabre-tooth cat, or smilodon, is a prehistoric great cat with very large canine teeth. They behave much as do mountain lions or jaguars.",
"hit": "8",
"morale": "10",
"move": "50'",
"name": "Sabre-Tooth Cat",
"appearing": "Wild 1d4, Lair 1d4",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 8",
"treasure": "None",
"experience": "875"
},
{
"armourClass": "19 ‡",
"damage": "1d4/1d4/1d8\n\t\t\t+ 1d8/round",
"description": "Salamanders are large, lizard-like creatures from the elemental planes. They are sometimes found on the material plane; they can arrive through naturally-occurring dimensional rifts, or they may be summoned by high-level Magic-Users. Due to their highly magical nature, they cannot be harmed by non-magical weapons.\n\nFlame salamanders come from the Elemental Plane of Fire. They look like giant snakes, more than 12' long, with dragonlike heads and lizard forelimbs. Their scales are all the colors of flame, red and orange and yellow. A flame salamander is flaming hot, and all non-fire-resistant creatures within 20' of the monster suffer 1d8 points of damage per round from the heat. They are immune to damage from any fire or heat attack. Flame salamanders are intelligent; they speak the language of the Plane of Fire, and many will also know Elvish, Common, and/or Dragon.\n\nFrost salamanders come from the Elemental Plane of Water. They look like giant lizards with six legs. Their scales are the colors of ice, white, pale gray and pale blue. Frost salamanders are very cold, and all non-cold-resistant creatures within 20' suffer 1d8 points of damage per round from the cold. Frost salamanders are completely immune to all types of cold-based attacks. They are quite intelligent; all speak the language of the Plane of Water, and many also speak Common, Elvish, and/or Dragon.\n\nFlame and frost salamanders hate each other, and each type will attack the other on sight, in preference over any other foe. If summoned by a Magic-User, a salamander is often assigned to protect a location, doorway, or treasure hoard; in such a case, the salamander will attack anyone attempting to gain unauthorized access to the protected area. Those which arrive through natural rifts may have any goals or motivations the GM wishes, and thus may choose to parley, fight, or even ignore adventurers.",
"hit": "8*",
"morale": "8",
"move": "40'",
"name": "Salamander*",
"appearing": "1d4+1,\n\t\t\tWild 2d4,\n\t\t\tLair 2d4",
"attacks": "2 claws/1 bite\n\t\t\t+ heat",
"savingThrows": "Fighter: 8",
"treasure": "F",
"experience": "945"
},
{
"armourClass": "15",
"damage": "1d10/1d10/1d6 + poison",
"description": "Giant scorpions are quite large, sometimes as large as a donkey. They are aggressive predators and generally attack on sight. If a claw attack hits, the giant scorpion receives a +2 attack bonus with its stinger (but two claw hits do not give a double bonus). Those hit by the stinger must save vs Poison or die. Giant scorpions are most commonly found in desert areas or caverns.",
"hit": "4*",
"morale": "11",
"move": "50' (10')",
"name": "Scorpion, Giant",
"appearing": "1d6, Wild 1d6",
"attacks": "2 claws/1 stinger",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "280"
},
{
"armourClass": "17",
"damage": "2d6",
"description": "Sea serpents are, obviously, serpentine monsters which live in the sea. They range from 20' to 40' long. A sea serpent can choose to wrap around a ship and constrict; in this case, roll 2d10 for damage.",
"hit": "6",
"morale": "8",
"move": "Swim 50' (10')",
"name": "Sea Serpent",
"appearing": "Wild 2d6",
"attacks": "1 bite",
"savingThrows": "Fighter: 6",
"treasure": "None",
"experience": "500"
},
{
"armourClass": "13 ‡",
"damage": "1d4 + 1 point Strength loss",
"description": " A shadow can be difficult to see in dark or gloomy areas but stands out starkly in brightly illuminated places. They lurk in dark places, waiting for living prey to happen by. A shadow is 5 to 6 feet tall and is weightless. Shadows cannot speak intelligibly. Despite their strange nature and appearance, shadows are not undeadmonsters, and thus cannot be Turned by a Cleric.\n\nA shadow's attack does 1d4 damage (from cold) and drains 1 point of Strength from the victim. Victims reduced to 2 or fewer points of Strength collapse and become unable to move; those reduced to 0 Strength die and rise as shadows a day later (at nightfall). Otherwise, Strength points lost to shadows are recovered at a rate of 1 point per turn.\n\nDue to their incorporeal nature, shadows cannot be harmed by non-magical weapons.",
"hit": "2*",
"morale": "12",
"move": "30'",
"name": "Shadow*",
"appearing": "1d10, Wild 1d10, Lair 1d10",
"attacks": "1 touch",
"savingThrows": "Fighter: 2",
"treasure": "F",
"experience": "100"
},
{
"armourClass": "13",
"damage": "2d4",
"description": "Bull sharks are so named because of their stocky, broad build. Male bull sharks can grow up to 7' long and weigh around 200 pounds, while females have been known to be up to 12' long, weighing up to 500 pounds.\n\nBull sharks are able to tolerate fresh water, and often travel up rivers in search of prey.",
"hit": "2",
"morale": "7",
"move": "Swim 60' (10')",
"name": "Shark, Bull",
"appearing": "Wild 3d6",
"attacks": "1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "19",
"damage": "2d10",
"description": "Great white sharks range from 12' to 15' in length on the average, though specimens ranging up to 30' in length have been reported. They are apex predators. Great white sharks have the ability to sense the electromagnetic fields of living creatures, allowing them to find prey even when light or water clarity are poor, and are able to smell blood at great distances.",
"hit": "8",
"morale": "8",
"move": "Swim 60' (10')",
"name": "Shark, Great White",
"appearing": "Wild 1d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 8",
"treasure": "None",
"experience": "875"
},
{
"armourClass": "15",
"damage": "2d6",
"description": "Mako sharks are fast-moving predators found in temperate and tropical seas. They average 9' to 13' in length and weigh up to 1,750 pounds. Mako sharks are known for their ability to leap out of the water; they are able to leap up to 20' in the air.",
"hit": "4",
"morale": "7",
"move": "Swim 80'",
"name": "Shark, Mako",
"appearing": "Wild 2d6",
"attacks": "1 bite",
"savingThrows": "Fighter: 4",
"treasure": "None",
"experience": "240"
},
{
"armourClass": "16",
"damage": "1d6/1d6",
"description": "Giant shrews resemble giant rats, but are larger, being up to 6' long, and darker in color. They have a very fast metabolic rate and must eat almost constantly. Giant shrews are omnivorous, and aggressively defend their nests and the immediate territory around them.\n\nGiant shrews move so swiftly that they are able to bite twice per round, and they may attack two different adjacent opponents in this way.\n\nA few giant shrew species (generally no more than 5% of those encountered) are venomous. The bite of such a giant shrew will kill the victim unless a save vs Poison is made. A victim bitten twice in a round need only save once for that round, but of course will have to save again in subsequent rounds if bitten again. Venomous giant shrews are considered 1* with respect to hit dice.",
"hit": "1*",
"morale": "10",
"move": "60'",
"name": "Shrew, Giant",
"appearing": "1d4, Wild 1d8, Lair 1d8",
"attacks": "2 bites",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "37"
},
{
"armourClass": "13",
"damage": "None",
"description": "A shrieker is a large (3' to 5' tall and about the same size across), semi-mobile fungus that emits a loud noise as a defense mechanism when disturbed. Shriekers live in dark, subterranean places. They come in several shades of purple.\n\n A shrieker has no means of attack. Instead, it lures monsters to its vicinity by emitting a loud noise. Movement or a light source within 10 feet of a shrieker causes the fungus to emit a piercing sound that lasts for 1d3 rounds. The sound attracts nearby creatures that are disposed to investigate it. Some creatures that live near shriekers learn that the fungus’ noise means there is food nearby. In game terms, the GM should roll a wandering monster check each round that a shrieker shrieks.",
"hit": "3",
"morale": "12",
"move": "5'",
"name": "Shrieker",
"appearing": "1d8",
"attacks": "Special",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "145"
},
{
"armourClass": "13 (see below)",
"damage": "1d6 or by weapon",
"description": "Skeletons are mindless undead created by an evil Magic-User or Cleric, generally to guard a tomb or treasure hoard, or to act as guards for their creator. They take only ½ damage from edged weapons, and only a single point from arrows, bolts or sling stones (plus any magical bonus). As with all undead, they can be Turned by a Cleric, and are immune to sleep, charm or hold magic. As they are mindless, no form of mind reading is of any use against them. Skeletons never fail morale, and thus always fight until destroyed.",
"hit": "1",
"morale": "12",
"move": "40'",
"name": "Skeleton",
"appearing": "3d6, Wild 3d10",
"attacks": "1 weapon",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "25"
},
{
"armourClass": "15",
"damage": "1d8 + poison",
"description": "Giant rattlesnakes are simply much enlarged versions of the normal rattlesnake (see pit vipers, below, for details). They average 14' to 20' in length at adulthood.",
"hit": "2*",
"morale": "8",
"move": "40'",
"name": "Snake, Giant Rattlesnake",
"appearing": "1d2, Wild 1d2, Lair 1d2",
"attacks": "1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "100"
},
{
"armourClass": "14",
"damage": "1d4 + poison",
"description": "Pit vipers are highly venomous snakes. There are many varieties ranging in size from 2' to 12' at adulthood; the statistics above are for an “average” variety which reaches about 9' in length.\n\nThose bitten by a pit viper must save vs Poison or die.\n\nPit vipers are named for the thermally sensitive “pits” between their eyes and nostrils. These are used to detect birds, mammals, and lizards, the natural prey of these snakes. Note that, even though lizards are cold-blooded, pit vipers can still sense them because their temperature will often be slightly higher or lower than their surroundings.\n\nRattlesnakes are a variety of pit viper; in addition to the details given above, a rattlesnake has a rattle (from which it gets its name) at the end of its tail. The rattle is used to warn away larger creatures.",
"hit": "1*",
"morale": "7",
"move": "30'",
"name": "Snake, Pit Viper",
"appearing": "1d4, Wild 1d4, Lair 1d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "37"
},
{
"armourClass": "14",
"damage": "1d4/2d4",
"description": "After a successful bite attack, a python will wrap itself around the victim (in the same round), constricting for 2d4 damage plus an additional 2d4 per round thereafter. The hold may be broken on a roll of 1 on 1d6 (add the victim's Strength bonus to the range, so a Strength of 16 would result in a range of 1-3 on 1d6); breaking the hold takes a full round.",
"hit": "5*",
"morale": "8",
"move": "30'",
"name": "Snake, Python",
"appearing": "1d3, Wild 1d3, Lair 1d3",
"attacks": "1 bite/1 constrict",
"savingThrows": "Fighter: 5",
"treasure": "None",
"experience": "405"
},
{
"armourClass": "14",
"damage": "1 + poison",
"description": "Sea snakes are relatively small; the largest varieties rarely exceed 6' in length. They have relatively small heads, and are very stealthy in the water. Their bite does so little damage that the creature bitten has only a 50% chance to notice the attack, but their poison is terribly strong, such that any creature bitten must save vs Poison at a penalty of -4 or die.\n\nFortunately, sea snakes rarely attack; only if molested (grabbed, stepped on, etc.) will they do so. They are very clumsy when out of the water.",
"hit": "3*",
"morale": "7",
"move": "10' Swim 30'",
"name": "Snake, Sea",
"appearing": "Wild 1d8",
"attacks": "1 bite",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "175"
},
{
"armourClass": "13",
"damage": "1d4 + poison or blindness",
"description": "Spitting cobras average about 7' in length at adulthood. They use their spreading hood to warn other creatures not to bother them, and generally refrain from attacking if possible to allow larger creatures time to retreat. Failure to retreat from the spitting cobra will likely result in the cobra spitting venom; the cobra can project its venom up to 5', and any creature hit must roll a save vs Poison or be blinded permanently (though the cure blindness spell can be used to heal this injury). If the cobra cannot deter a creature by spitting, it will attack using its bite. In this case, those successfully hit must save vs Poison or die.",
"hit": "1*",
"morale": "7",
"move": "30'",
"name": "Snake, Spitting Cobra",
"appearing": "1d6, Wild 1d6, Lair 1d6",
"attacks": "1 bite or 1 spit",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "37"
},
{
"name": "Jelly, Green*",
"description": "Green jelly devours flesh and organic materials on contact and is even capable of dissolving metal given enough time. Bright green, wet, and sticky, it clings to walls, floors, and ceilings in patches, reproducing as it consumes organic matter. It drops from walls and ceilings when it detects movement (and possible food) below. Green jelly cannot grow in sunlight; even the indirect sunlight of a dense forest will stunt it and prevent it from spreading, and direct sunlight will kill it outright within a turn.",
"armourClass": "12 (only hit by fire or cold)",
"hit": "2**",
"attacks": "1 touch",
"damage": "Transform to green jelly",
"move": "1'",
"appearing": "1",
"savingThrows": "Fighter: 2",
"morale": "12",
"treasure": "None",
"experience": "125"
},
{
"armourClass": "17 ‡",
"damage": "Energy drain 2 levels/touch",
"description": "A spectre looks much as it did in life and can be easily recognized by those who knew the individual or have seen the individual’s face in a painting or a drawing. In many cases, the evidence of a violent death is visible on its body. A spectre is roughly human-sized and is weightless.\n\nLike all undead, they may be Turned by Clerics and are immune to sleep, charm and hold magics. Due to their incorporeal nature, they cannot be harmed by non-magical weapons.",
"hit": "6**",
"morale": "11",
"move": "Fly 100'",
"name": "Spectre*",
"appearing": "1d4, Lair 1d8",
"attacks": "1 touch",
"savingThrows": "Fighter: 6",
"treasure": "E",
"experience": "610"
},
{
"armourClass": "14",
"damage": "2d6 + poison",
"description": "The giant black widow spider is a much enlarged version of the ordinary black widow; a full-grown male has a leg-span of 2 feet, while an adult female will be 3' or more across. Despite the size difference, both genders are statistically equal. Both genders are marked with an orange “hourglass” on the abdomen.\n\nThe venom of the giant black widow is strong, such that those bitten must save vs Poison at a penalty of -2 or die. Giant black widow spiders spin strong, sticky, nearly invisible webs, usually across passageways or cave entrances, or sometimes between trees in the wilderness; those who stumble into these webs become stuck, and must roll to escape just as if opening a door. Any character stuck in such a web cannot effectively cast spells or use a weapon.",
"hit": "3*",
"morale": "8",
"move": "20' Web 40'",
"name": "Spider, Giant Black Widow",
"appearing": "1d3, Wild 1d3, Lair 1d3",
"attacks": "1 bite",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "175"
},
{
"armourClass": "13",
"damage": "1d8 + poison",
"description": "Crab spiders are ambush predators, hiding using various forms of camouflage and leaping out to bite their surprised prey. Giant crab spiders are horribly enlarged, being around 3' in length. They can change color slowly (over the course of a few days), taking on the overall coloration of their preferred lair or ambush location. After this change is complete, the spider is able to surprise potential prey on 1-4 on 1d6 when in that preferred location. Anyone bitten by a giant crab spider must save vs Poison or die.",
"hit": "2*",
"morale": "7",
"move": "40'",
"name": "Spider, Giant Crab",
"appearing": "1d4, Wild 1d4, Lair 1d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "100"
},
{
"armourClass": "15",
"damage": "1d8 + poison",
"description": "Giant tarantulas are huge, hairy spiders, about the size of a pony. They run down their prey much as wolves do. The bite of the giant tarantula is poisonous; those bitten must save vs Poison or be forced to dance wildly. The dance lasts 2d10 rounds, during which time the victim has a -4 penalty on attack and saving throw rolls. If the victim is a Thief, he or she cannot use any Thief abilities while dancing. Onlookers must save vs Spells or begin dancing themselves; such “secondary” victims suffer the same penalties as above, but they will only dance for 2d4 rounds.\n\nEach round the original victim dances, he or she must save vs Poison again or take 1d4 points of damage. Secondary victims do not suffer this effect.\n\nNeutralize poison will cure the original victim, and dispel magic will stop the dance for all victims in the area of effect, whether they are original or secondary.",
"hit": "4*",
"morale": "8",
"move": "50'",
"name": "Spider, Giant Tarantula",
"appearing": "1d3, Wild 1d3, Lair 1d3",
"attacks": "1 bite",
"savingThrows": "Fighter: 4",
"treasure": "None",
"experience": "280"
},
{
"armourClass": "15",
"damage": "1d4 or by spell",
"description": "Sprites are reclusive fey creatures, looking like tiny elves just a foot tall with dragonfly-like wings. They go out of their way to fight evil and ugliness and to protect their homelands. Sprites fight their opponents with spell-like abilities and pint-sized weaponry. They prefer ambushes and other trickery over direct confrontation.\n\nFive sprites acting together can cast remove curse, or its reversed form bestow curse, once per day. The latter spell is often used as an attack.",
"hit": "1d4 Hit Points *",
"morale": "7",
"move": "20' Fly 60'",
"name": "Sprite",
"appearing": "3d6, Wild 3d6, Lair 5d8",
"attacks": "1 dagger or 1 spell",
"savingThrows": "Magic-User: 4 (with Elf bonuses)",
"treasure": "S",
"experience": "13"
},
{
"armourClass": "17",
"damage": "1d4 per tentacle/1d10",
"description": "These voracious creatures can have bodies more than 20 feet long and attack almost anything they meet. Their tentacles are studded with barbs and sharp-edged suckers. In order to bite a creature, the giant squid must hit with at least two tentacles first.\n\nIf a giant squid fails a morale check, it will squirt out a cloud of black “ink” 30' in diameter and then jet away at twice normal speed for 3d8 rounds.",
"hit": "6",
"morale": "8",
"move": "Swim 40'",
"name": "Squid, Giant",
"appearing": "Wild 1d4",
"attacks": "8 tentacles/1 bite",
"savingThrows": "Fighter: 6",
"treasure": "None",
"experience": "500"
},
{
"armourClass": "13",
"damage": "1d4 + 1d4/round blood drain",
"description": "A stirge’s coloration ranges from rust-red to reddish-brown, with a dirty yellow underside. The proboscis is pink at the tip, fading to gray at its base. A stirge’s body is about 1 foot long, with a wingspan of about 2 feet. It weighs about 1 pound.\n\n If a stirge hits a creature, it attaches and drains blood equal to 1d4 damage per round (on its Initiative). The creature can only be removed by killing it; any attack on the creature receives an attack bonus of +2, but any attack that misses hits the victim instead.",
"hit": "1*",
"morale": "9",
"move": "10' Fly 60'",
"name": "Stirge",
"appearing": "1d10, Wild 3d12, Lair 3d12",
"attacks": "1 bite",
"savingThrows": "Fighter: 1",
"treasure": "D",
"experience": "37"
},
{
"armourClass": "13",
"damage": "paralysis",
"description": "Tentacle worms appear to be giant worms of some sort, averaging 6 to 8 feet long. Their heads are pasty white or grey, but their bodies vary from livid pink or purple to deep green in color. Their tentacles splay out from around the creature's “neck.” Some sages believe they are the larval form of some other monster, but this has never been proven.\n\nA tentacle worm can attack as many as three adjacent opponents. Those hit must save vs Paralysis or be paralyzed 2d4 turns. No matter how many of a tentacle worm's attacks hit an opponent in a given round, only one saving throw is required in each such round.\n\n If all opponents of a tentacle worm are rendered paralyzed, it will begin to feed upon the paralyzed victims, doing 1 point of damage every 1d8 rounds until the victim is dead; if other paralyzed victims are still alive, the worm is 50% likely to move on immediately to another still-living victim. Otherwise, it continues to eat the corpse of the slain victim for 1d4 turns.",
"hit": "3*",
"morale": "9",
"move": "40'",
"name": "Tentacle Worm",
"appearing": "1d3, Lair 1d3",
"attacks": "6 tentacles",
"savingThrows": "Fighter: 3",
"treasure": "B",
"experience": "175"
},
{
"armourClass": "14",
"damage": "1d6/1d6/2d6",
"description": "These great cats stand more than 3 feet tall at the shoulder and are about 9 feet long. They weigh from 400 to 600 pounds.",
"hit": "6",
"morale": "9",
"move": "50'",
"name": "Tiger",
"appearing": "Wild 1d3, Lair 1d3",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 6",
"treasure": "None",
"experience": "500"
},
{
"armourClass": "15",
"damage": "2d6 or 3d8",
"description": "A titanothere is a huge prehistoric animal that resembles the rhinoceros; adults average 10' tall and 13' long. They have large, forked horns rather than the pointed horns of rhinos. Like rhinos, they are herd animals, and males aggressively defend the herd; females only enter combat if the male(s) are defeated or the attackers are very numerous. If a single titanothere is encountered, it will be a rogue male; they are bad tempered and prone to attacking smaller creatures that enter their territory.",
"hit": "12 (+10)",
"morale": "7",
"move": "40' (10')",
"name": "Titanothere",
"appearing": "Wild 1d6",
"attacks": "1 butt or 1 trample",
"savingThrows": "Fighter: 8",
"treasure": "None",
"experience": "1,875"
},
{
"armourClass": "19",
"damage": "2d6/2d6",
"description": "A treant is a large, roughly humanoid tree-man. Treants have leaves of deep green in the spring and summer. In the fall and winter the leaves change to yellow, orange, or red, but they rarely fall out. A treant’s legs fit together when closed to look like the trunk of a tree, and a motionless treant is nearly indistinguishable from a tree. A treant is about 30 feet tall, with a “trunk” about 2 feet in diameter. It weighs about 4,500 pounds.\n\n Treants speak their own language, plus Common and Elvish. Most also can manage a smattering of just about all other humanoid tongues, at least enough to say “Get away from my trees!” Treants prefer to watch potential foes carefully before attacking. They often charge suddenly from cover to trample the despoilers of forests. If sorely pressed, they animate trees as reinforcements.\n\nA treant can animate trees within 180' at will, controlling up to two trees at a time. It takes one round for a normal tree to uproot itself. Thereafter it moves at a speed of 10' and fights as a treant in all respects. Such trees lose their ability to move if the treant that animated them is incapacitated or moves out of range.",
"hit": "8*",
"morale": "9",
"move": "20'",
"name": "Treant",
"appearing": "Wild 1d8, Lair 1d8",
"attacks": "2 fists",
"savingThrows": "Fighter: 8",
"treasure": "C",
"experience": "945"
},
{
"armourClass": "15",
"damage": "1d4/1d4/1d4",
"description": "Troglodytes are very intelligent lizardlike humanoid creatures. They have large red eyes and spiny “combs” on their legs, head, and arms. They normally stand 5 to 6 feet tall. They can change color at will, and 50% of the time a group can blend into the environment well enough to surprise on a roll of 1-5 on 1d6. Furthermore, they gain a +2 attack bonus during any surprise round due to their excellent ambush skills.\n\nTroglodytes secrete a smelly oil that keeps their scaly skin supple. All mammals (including, of course, all the standard character races) find the scent repulsive, and those within 10 feet of the Troglodyte must make a saving throw versus poison. Those failing the save suffer a -2 penalty to attack rolls while they remain within range of the Troglodyte. Getting out of range negates the penalty, but renewed exposure reinstates the penalty. The results of the original save last a full 24 hours, after which a new save must be rolled.\n\nTroglodytes are very hostile, attacking equal or weaker non-troglodyte groups on sight. They prefer to attack with surprise, depending on their color-changing ability for this.\n\n One out of every eight troglodytes will be a warrior of 4 Hit Dice (240 XP) that gains a +1 bonus to damage due to Strength. Troglodytes gain a +1 bonus to their morale if they are led by a warrior. In lairs of 24 or more, there will be a troglodyte leader of 6 Hit Dice (500 XP) with an Armor Class of 17 and having a +2 bonus to damage due to Strength. In the lair, troglodytes never fail a morale check as long as the leader is alive.",
"hit": "2",
"morale": "9",
"move": "40'",
"name": "Troglodyte",
"appearing": "1d8, Lair 5d8",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 2",
"treasure": "A",
"experience": "75"
},
{
"armourClass": "16",
"damage": "1d6/1d6/1d10",
"description": "A typical adult troll stands 9 feet tall and weighs 500 pounds. A troll’s rubbery hide is moss green, mottled green and gray, or putrid gray. The hair is usually greenish black or iron gray. They appear sexless if examined, and their method of reproduction is a mystery. Trolls walk upright but hunched forward with sagging shoulders. Their gait is uneven, and when they run, their arms dangle and drag along the ground. For all this seeming awkwardness, trolls are very agile.\n\nTrolls have the power of regeneration; they heal 1 hit point of damage each round after being injured. A troll reduced to 0 hit points is not dead, but only disabled for 2d6 rounds, at which point it will regain 1 hit point. Note that the troll may “play dead” until it has regenerated further. Damage from fire and acid cannot be regenerated, and must heal at the normal rate; a troll can only be killed by this sort of damage. The lower morale rating (in parentheses) is used when the troll faces attackers armed with fire or acid. If a troll loses a limb or body part, the lost portion regrows in one turn; or, the creature can reattach the severed member instantly by holding it to the stump.\n\nTrolls are hateful creatures, reveling in combat and bloodshed. Though trolls could easily use a variety of weapons, they much prefer the sensation of flesh being rent by their teeth and claws.",
"hit": "6*",
"morale": "10 (8)",
"move": "40'",
"name": "Troll",
"appearing": "1d8, Wild 1d8, Lair 1d8",
"attacks": "2 claws/1 bite",
"savingThrows": "Fighter: 6",
"treasure": "D",
"experience": "555"
},
{
"armourClass": "19",
"damage": "1d8/1d8/1d6+3",
"description": "Unicorns are horselike creatures having a single spirally-twisted horn in the middle of the forehead. A typical adult unicorn grows to 8 feet in length, stands 5 feet high at the shoulder, and weighs 1,200 pounds. Females are slightly smaller and slimmer than males. A unicorn has deep sea-blue, violet, brown, or fiery gold eyes. Males sport a white beard.\n\nUnicorns normally attack only when defending themselves or their forests. They either charge, impaling foes with their horns like lances, or strike with their hooves. The horn is a +3 magic weapon, though its power fades if removed from the unicorn.\n\nThree times per day a unicorn can cast cure light wounds by a touch of its horn. Once per day a unicorn can transport itself 360' (as the spell dimension door), and can carry a full load (possibly including a rider) while doing so. A light load for a unicorn is up to 300 pounds; a heavy load, up to 550 pounds.\n\nAn Alicorn resembles a unicorn in all details, save that they always have yellow, orange or red eyes, and (if one gets close enough to see) pronounced, sharp canine teeth. Alicorns are as evil as unicorns are good, using their razor-sharp horns and clawlike hooves as weapons. They attack any weaker creatures for the sheer pleasure of killing, but will try to avoid stronger parties.\n\n Alicorns cannot heal or transport themselves by magic as unicorns do. However, alicorns may become invisible at will, exactly as if wearing a ring of invisibility.",
"hit": "4*",
"morale": "7",
"move": "80'",
"name": "Unicorn (and Alicorn)",
"appearing": "Wild 1d6",
"attacks": "2 hooves/1 horn (+3 attack bonus)",
"savingThrows": "Fighter: 8",
"treasure": "None",
"experience": "280"
},
{
"armourClass": "14 (11)",
"damage": "1d8 or by weapon",
"description": "These creatures appear to be normal hobgoblins, but urgoblins are actually a mutant subspecies. Urgoblins are able to regenerate much as do trolls (with the same limitations). All urgoblins are male; if an urgoblin mates with a female hobgoblin, any offspring will also be male, but only one in four such offspring will share their father's gifts. Like hobgoblins, urgoblins wear toughened hides and carry wooden shields into battle, blending in perfectly.\n\nSome hobgoblin tribes consider urgoblins an abomination, and kill them whenever they can be identified. Other hobgoblin tribes employ them as bodyguards for the chieftain, and accord them great honor. There are even rumors of a tribe entirely made up of urgoblins, with kidnapped hobgoblin females as their mates; reportedly they slit the throats of all infants born to their mates, so that only those who have the power of regeneration survive.",
"hit": "2*",
"morale": "9",
"move": "30' Unarmored 40'",
"name": "Urgoblin",
"appearing": "Special",
"attacks": "1 weapon",
"savingThrows": "Fighter: 2",
"treasure": "Q, R, S each; special in lair",
"experience": "100"
},
{
"armourClass": "18 to 20 ‡",
"damage": "1d8 or by weapon or special",
"description": "Vampires appear just as they did in life, although their features are often hardened and feral, with the predatory look of wolves. They often embrace finery and decadence and may assume the guise of nobility. Despite their human appearance, vampires can be easily recognized, for they cast no shadows and throw no reflections in mirrors. They speak any languages they knew in life.\n\nA vampire can charm anyone who meets its gaze; a save vs Spells is allowed to resist, but at a penalty of -2 due to the power of the charm. This charm is so powerful that the victim will not resist being bitten by the vampire.\n\nThe bite inflicts 1d3 damage, then each round thereafter one energy level is drained from the victim. The vampire regenerates a 1d6 hit points (if needed) for each energy level drained. If the victim dies from the energy drain, he or she will arise as a vampire at the next sunset (but not less than 12 hours later). Vampires spawned in this way are under the permanent control of the vampire who created them.\n\nIf using the bite attack, the vampire suffers a penalty of -5 to Armor Class due to the vulnerable position it must assume. For this reason, the bite is rarely used in combat. Vampires have great Strength, gaining a bonus of +3 to damage when using melee weapons, and a vampire will generally choose to use a melee weapon (or even its bare hands) in combat rather than attempting to bite.\n\nVampires are unharmed by non-magical weapons, and like all undead are immune to sleep, charm and hold spells. If reduced to 0 hit points in combat, the vampire is not destroyed, though it may appear to be. The vampire will begin to regenerate 1d8 hours later, recovering 1 hit point per turn, and resuming normal activity as soon as the first point is restored.\n\nVampires command the lesser creatures of the night and once per day can call forth 10d10 rats, 5d4 giant rats, 10d10 bats, 3d6 giant bats, or a pack of 3d6 wolves (assuming any such creatures are nearby). These creatures arrive in 2d6 rounds and serve the vampire for up to 1 hour.\n\nA vampire can assume the form of a giant bator a dire wolf at will, requiring one round to complete the transformation. The flying movement listed is for the giant bat form. In animal form, the vampire can use the normal attacks for that form. It can't use its other powers while in animal form, except that creatures summoned are still controlled, and charms already in effect continue in effect.\n\nFor all their power, vampires have a number of weaknesses:\n\nRepelling a Vampire: Vampires cannot tolerate the strong odor of garlic and will not enter an area laced with it. Similarly, they recoil from a mirror or a strongly presented holy symbol. These things don’t harm the vampire – they merely keep it at bay. A recoiling vampire must stay at least 5 feet away from a creature holding the mirror or holy symbol and cannot touch or make melee attacks against the creature holding the item for the rest of the encounter.\n\nVampires are also unable to cross running water, although they can be carried over it while resting in their coffins or aboard a ship. They are utterly unable to enter a home or other building unless invited in by someone with the authority to do so. They may freely enter public places, since these are by definition open to all.\n\nSlaying a Vampire: Reducing a vampire’s hit points to 0 or lower incapacitates it but doesn’t always destroy it, as described above. However, certain attacks can slay vampires. Exposing any vampire to direct sunlight disorients it: It can act for only one round and is destroyed utterly in the next round if it cannot escape. Similarly, immersing a vampire in running water robs it of one-third of its hit points each round until it is destroyed at the end of the third round of immersion. Driving a wooden stake through a vampire’s heart instantly slays the monster. However, it returns to life if the stake is removed, unless the body is destroyed, by water or sunlight as described above, or by burning it completely in a funeral pyre.",
"hit": "7** to 9** (+8)",
"morale": "11",
"move": "40' Fly 60'",
"name": "Vampire*",
"appearing": "1d6, Wild 1d6, Lair 1d6",
"attacks": "1 weapon or special",
"savingThrows": "Fighter: 7 to 9 ",
"treasure": "F",
"experience": "800 - 1,225"
},
{
"armourClass": "13",
"damage": "Stun",
"description": "Giant water termites vary from 1' to 5' in length. They attack using a noxious spray with a range of 5' which stuns the target for a full turn on a hit; a save vs Poison is allowed to avoid the effect. A stunned character can neither move nor take action for the remainder of the current round and all of the next one.\n\nHowever, the primary concern regarding these monsters is the damage they can do to boats and ships. Each creature can do 2d4 points of damage to a ship's hull per round (no roll required) for a number of rounds equal to 1d4 plus the creature's hit dice total; after this time, the monster is full. They eat noisily.\n\nThese creatures are found in fresh and salt water as well as in swamps. The freshwater variety tend to be smaller, 1-2 hit dice, the saltwater variety 3-4 hit dice, and those found in swamps range from 2-3 hit dice.",
"hit": "1 to 4",
"morale": "10",
"move": "Swim 30'",
"name": "Water Termite, Giant",
"appearing": "Wild 1d4",
"attacks": "1 spray",
"savingThrows": "Fighter: 1 to 4 ",
"treasure": "None",
"experience": "25 - 240"
},
{
"armourClass": "17",
"damage": "2d4 + 2d4 per round",
"description": "Giant weasels resemble their more normally sized cousins, having long bodies, short legs, and pointed, toothy snouts. They are predatory animals, hunting those creatures smaller than themselves.\n\nWeasels of all sorts are cunning, crafty hunters, and surprise their prey on 1-3 on 1d6. Once a giant weasel bites a living creature, it hangs on, rending with its teeth each round until the victim or the weasel is dead, or until the weasel fails a morale check (rolled normally) in which case it will let go of its victim and flee.\n\nThere are many varieties of normal-sized weasel, including several which are called ferrets; in some territories, the giant weasel is thus called a giant ferret. The only distinction is that those which are tamed are always called ferrets, though not all giant ferrets are tame. Various humanoid races as well as some fairy creatures are known to tame giant ferrets for use as guards or war-animals.",
"hit": "5",
"morale": "8",
"move": "50'",
"name": "Weasel, Giant (or Ferret, Giant)",
"appearing": "1d4, Wild 1d6, Lair 1d6",
"attacks": "1 bite + hold",
"savingThrows": "Fighter: 5",
"treasure": "V",
"experience": "360"
},
{
"armourClass": "17",
"damage": "2d10",
"description": "These ferocious creatures are about 30 feet long. Killer whales, also called “orca” (both singular and plural), are strikingly marked in black and white, with prominent white patches that resemble eyes. Their real eyes are much smaller and located away from the fake eye-spots.\n\nKiller whales eat fish, squid, seals, and other whales, but are not above consuming a meal of human or demi-human fare.",
"hit": "6",
"morale": "10",
"move": "Swim 80' (10')",
"name": "Whale, Killer",
"appearing": "Wild 1d6",
"attacks": "1 bite",
"savingThrows": "Fighter: 6",
"treasure": "None",
"experience": "500"
},
{
"armourClass": "19",
"damage": "2d6",
"description": "Narwhals are aquatic mammals resembling large dolphins with a single (or rarely, double) tusk protruding straight forward from the mouth. The tusk is helical in shape, and they are sometimes cut short and sold as “unicorn horns.” However, they have no particular magical value. Narwhals are found in cold northern seas. They are not particularly aggressive.",
"hit": "12 (+10)",
"morale": "8",
"move": "Swim 60'",
"name": "Whale, Narwhal",
"appearing": "Wild 1d4",
"attacks": "1 horn",
"savingThrows": "Fighter: 6",
"treasure": "Special",
"experience": "1,875"
},
{
"armourClass": "22",
"damage": "3d20",
"description": "These creatures can be up to 60 feet long. They prey on giant squid. Sperm whales can emit an invisible focused beam of sound 5' wide up to a 50' range underwater. This blast of sound disorients target creatures, leaving them effectively stunned for 1d4 rounds. A stunned character can neither move nor take action for the indicated duration. No attack roll is required, but a save vs Death Ray is allowed to resist. A sperm whale can emit as many such blasts of sound as it desires, once per round, instead of biting.",
"hit": "36* (+16)",
"morale": "7",
"move": "Swim 60' (20')",
"name": "Whale, Sperm",
"appearing": "Wild 1d3",
"attacks": "1 bite or special",
"savingThrows": "Fighter: 8",
"treasure": "None",
"experience": "17,850"
},
{
"armourClass": "15 †",
"damage": "Energy drain (1 level)",
"description": "A wight’s appearance is a weird and twisted reflection of the form it had in life. A wight is about the height and weight of a human. Wights do not possess any of the abilities they had in life.\n\nIf a wight touches (or is touched by) a living creature, that living creature suffers one level of energy drain (as described in the Encounter section). No saving throw is allowed. Striking a wight with a weapon does not count as “touching” it.\n\nAny humanoid slain by a wight becomes a wight by the next sunset (but not less than 12 hours later). Wight spawn are under the command of the wight that created them and remain enslaved until its death.\n\nLike all undead, wights may be Turned by Clerics and are immune to sleep, charm and hold magics. Wights are harmed only by silver or magical weapons, and take only half damage from burning oil.",
"hit": "3*",
"morale": "12",
"move": "30'",
"name": "Wight*",
"appearing": "1d6, Wild 1d8, Lair 1d8",
"attacks": "1 touch",
"savingThrows": "Fighter: 3",
"treasure": "B",
"experience": "175"
},
{
"armourClass": "13",
"damage": "1d6",
"description": "Wolves are pack hunters known for their persistence and cunning. They prefer to surround and flank a foe when they can.",
"hit": "2",
"morale": "8",
"move": "60'",
"name": "Wolf",
"appearing": "2d6,\n\t\t\tWild 3d6,\n\t\t\tLair 3d6",
"attacks": "1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "14",
"damage": "2d5",
"description": "Dire wolves are huge relatives of the ordinary wolves, being as large as horses. They live and hunt in packs, and are sometimes tamed by smaller humanoids as battle steeds or by larger ones as pets.\n\nDire wolves are efficient pack hunters that will kill anything they can catch. Dire wolves are generally mottled gray or black, about 9 feet long and weighing some 800 pounds. ",
"hit": "4",
"morale": "9",
"move": "50'",
"name": "Wolf, Dire",
"appearing": "1d4,\n\t\t\tWild 2d4,\n\t\t\tLair 2d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 4",
"treasure": "None",
"experience": "240"
},
{
"armourClass": "15 ‡",
"damage": "1d6 + energy drain (1 level)",
"description": "Wraiths are incorporeal creatures born of evil and darkness. In some cases, the grim silhouette of a wraith might appear armored or outfitted with weapons. This appearance does not affect the creature’s AC or combat abilities but only reflects the shape it had in life.\n\nLike all undead, they may be Turned by Clerics and are immune to sleep, charm and hold magics. Due to their incorporeal nature, they cannot be harmed by non-magical weapons.",
"hit": "4**",
"morale": "12",
"move": "Fly 80'",
"name": "Wraith*",
"appearing": "1d4, Lair 1d6",
"attacks": "1 touch",
"savingThrows": "Fighter: 4",
"treasure": "E",
"experience": "320"
},
{
"armourClass": "18",
"damage": "2d8/1d6 + poison\n\t\t\tor 1d10/1d10/1d6 + poison",
"description": "A distant cousin to the true dragons, the wyvern is a huge flying lizard with a poisonous stinger in its tail. A wyvern’s body is 15 feet long, and dark brown to gray; half that length is tail. Its wingspan is about 20 feet. A wyvern weighs about one ton. They are built more like bats than lizards, having two legs and two wings; contrast this with true dragons, which have four legs and two wings.\n\nWyverns are of animal intelligence, but are excellent predators with good hunting abilities. When attacking they will make a loud hiss, or sometimes a deep-throated growl much like that of a bull alligator.\n\nWyverns attack nearly anything that isn’t obviously more powerful than themselves. A wyvern dives from the air, clawing at its opponent with its talons and stinging it to death. Any living creature hit by the wyvern's stinger must save vs Poison or die. A wyvern can slash with its talons only when making a flyby attack or when landing.\n\nIf a wyvern hits with both its talons, it may attempt to carry off its victim; only victims weighing 300 pounds or less can be carried off, and the wyvern can only carry a victim for at most 6 rounds. While flying with a victim, the wyvern cannot make any further attacks against it, but of course if the victim makes a nuisance of itself (such as by injuring the wyvern), it may be dropped.",
"hit": "7*",
"morale": "9",
"move": "30' (10') Fly 80' (15')",
"name": "Wyvern",
"appearing": "Wild 1d6, Lair 1d6",
"attacks": "1 bite/1 stinger or 2 talons/1 stinger",
"savingThrows": "Fighter: 7",
"treasure": "E",
"experience": "735"
},
{
"armourClass": "Can always be hit",
"damage": "See below",
"description": "If disturbed, a patch of this mold bursts forth with a cloud of poisonous spores. Each patch covers from 10 to 25 square feet; several patches may grow adjacent to each other, and will appear to be a single patch in this case. Each patch can emit a cloud of spores once per day. All within 10 feet of the mold will be affected by the spores and must save vs Death Ray or take 1d8 points of damage per round for 6 rounds. Sunlight renders yellow mold dormant.",
"hit": "2*",
"morale": "N/A",
"move": "0",
"name": "Yellow Mold",
"appearing": "1d8",
"attacks": "Special",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "100"
},
{
"armourClass": "12 (see below)",
"damage": "1d8 or by weapon",
"description": " Zombies are the undead corpses of humanoid creatures. They are deathly slow, but they move silently, are very strong and must be literally hacked to pieces to “kill” them. They take only half damage from blunt weapons, and only a single point from arrows, bolts or sling stones (plus any magical bonus). A zombie never has Initiative and always acts last in any given round. Like all undead, they may be Turned by Clerics and are immune to sleep, charm and hold magics. As they are mindless, no form of mind reading is of any use against them. Zombies never fail morale checks, and thus always fight until destroyed.",
"hit": "2",
"morale": "12",
"move": "20'",
"name": "Zombie",
"appearing": "2d4, Wild 4d6",
"attacks": "1 weapon",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "13",
"damage": "1 point bite, 1d4 hoof",
"description": "",
"hit": "2",
"morale": "7",
"move": "50' (10') [ 40' (10') ]",
"name": "Camel",
"appearing": "Wild 2d4",
"attacks": "1 bite, 1 hoof",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "13",
"damage": "1d2 bite",
"description": "Donkeys are hoofed mammals in the same family as the horse. They are smaller, but are strong and hardy. Burros are a similar species, and the statistics herein can be used for either; both varieties are capable of being taken into dungeons as pack animals. A light load for a donkey is up to 70 pounds; a heavy load, up to 140 pounds.",
"hit": "2",
"morale": "7",
"move": "40' (10')",
"name": "Donkey",
"appearing": "Wild 2d4",
"attacks": "1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "13",
"damage": "1d4 hoof",
"description": "Draft Horses are large horses bred to be working animals doing hard tasks such as plowing and other farm labor. There are a number of breeds, with varying characteristics, but all share common traits of strength, patience, and a docile temperament. A light load for a draft horse is up to 350 pounds; a heavy load, up to 700 pounds.",
"hit": "3",
"morale": "7",
"move": "60' (10')",
"name": "Horse, Draft",
"appearing": "domestic only",
"attacks": "2 hooves",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "145"
},
{
"armourClass": "13",
"damage": "1d4 hoof",
"description": "Riding Horses are smaller horses bred and trained for riding. They cannot effectively fight while the rider is mounted. A light load for a riding horse is up to 250 pounds; a heavy load, up to 500 pounds.",
"hit": "2",
"morale": "7",
"move": "80' (10')",
"name": "Horse, Riding",
"appearing": "Wild 10d10",
"attacks": "2 hooves",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "13",
"damage": "1d6 hoof",
"description": "War Horses are large, powerful horses which are both bred for their size, strength, and combat ability and trained to tolerate the sounds and stresses of battle. They are able to attack while the rider is mounted due to their training. A light load for a warhorse is up to 350 pounds; a heavy load, up to 700 pounds.",
"hit": "3",
"morale": "9",
"move": "60' (10')",
"name": "Horse, War",
"appearing": "domestic only",
"attacks": "2 hooves",
"savingThrows": "Fighter: 3",
"treasure": "None",
"experience": "145"
},
{
"armourClass": "13",
"damage": "1d4 kick, 1d2 bite",
"description": "Mules are a domestic equine hybrid between a donkey and a horse. Mules vary widely in size, and may be of any color. They are more patient, hardier and longer- lived than horses, and are perceived as less obstinate and more intelligent than donkeys. Like donkeys, they are capable of being taken into dungeons as pack animals. A light load for a mule is up to 300 pounds; a heavy load, up to 600 pounds.",
"hit": "2",
"morale": "7",
"move": "40' (10')",
"name": "Mule",
"appearing": "domestic only",
"attacks": "1 kick or 1 bite",
"savingThrows": "Fighter: 2",
"treasure": "None",
"experience": "75"
},
{
"armourClass": "13",
"damage": "1d4 bite",
"description": "A Pony is a variety of small horse. Compared to a larger horse, a pony may have a thicker coat, mane and tail, with proportionally shorter legs, a wider barrel, heavier bone, a thicker neck and a shorter, broader head. Ponies can be trained for war, and the morale in parentheses above is for a war pony; this does not allow them to fight while a rider is mounted, however. A light load for a pony is up to 275 pounds; a heavy load, up to 550 pounds.",
"hit": "1",
"morale": "6 (9)",
"move": "40' (10')",
"name": "Pony",
"appearing": "domestic only",
"attacks": "1 bite",
"savingThrows": "Fighter: 1",
"treasure": "None",
"experience": "25"
}
],
},

"sounds":{

},

"state":{

scrollData:{X: 0, Y:0, Z:1},
lastCell:{},
regionObj:{},
season: "Spring",
weather: null,
nextEncounter: `<div class="noSave randomEncounter"><i>Press space bar at the start of each turn to roll for random encounters, etc. Random encounter settings can be changed in the Journal (Esc) entry for the region you are currently in.</i><br><br><hr><br></div>`

},

"map":{
data: [{
id: "0.0",
symbol: "🌎",
name: "Your World",
desc: "Welcome to <i> your </i> world. Hit Tab to edit what it says here. Use QWE ASD to move around the Hexmap. For a full list of hotkeys use the command [`] '> help'.",
rows: defaultRows,
scrollData: {X: 50, Y:50, Z:1},
cols: defaultCols, 
palette: [
{ id: "color1", color: "rgb(57, 128, 60)" },
{ id: "color2", color: "rgb(33, 113, 129)" },
{ id: "color3", color: "rgb(16, 77, 23)" },
{ id: "color4", color: "rgb(101, 69, 39)" },
{ id: "color5", color: "rgb(124, 72, 144)" },
{ id: "color6", color: "rgb(117, 122, 41)" },
{ id: "color7", color: "rgb(12, 95, 83)" },
{ id: "color8", color: "rgb(88, 83, 86)" },
{ id: "color9", color: "rgb(185, 192, 162)" },
]
}],
zones:[],
}}

return EXCEL_DM 

}







