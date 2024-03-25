function svg_to_arduino(svg_as_text) {
    let location_number = 1;
    let text_amount = 1;
    let text_pos = 0;

    let text_path = svg_as_text;
    do {
        
        text_pos = text_path.indexOf("<");
        text_path = text_path.substring(text_pos + 1); // take string after character "<"
        text_amount = text_path.length;

        let draw_type = text_path.substring(0, 4); // take 4 letters after "<" to detect draw type: path or line or rect ...

        switch (draw_type.toLowerCase()) {
            case "path":
                if (text_amount > 0) {
                    extract_one_path(text_path);
                }
                break;
            case "line":
                if (text_amount > 0) {
                    extract_line_path(text_path);
                }
                break;
            case "rect":
                if (text_amount > 0) {
                    extract_rect(text_path);
                }
                break;
            case "elli":
                if (text_amount > 0) {
                    extract_elli(text_path);
                }
                break;
            case "poly":
                if (text_amount > 0) {
                    extract_poly(text_path);
                }
                break;
        }

        location_number++;

        console.log("c'est ca ? "  + location_number);

    } while (text_amount > 0);
}

function extract_one_path(text_path_value) {

    let text_pickup = text_path_value;

    //console.log(text_pickup);
    
    text_pickup = extract_move(text_pickup); // call extract move and replace string for the next call 
    let text_result = text_pickup;
    //console.log(text_pickup);

    let text_remain_length = text_pickup.length;

    console.log(text_result);
    
    let point0_xy = text_result.match(/\(([^)]+)\)/)[1]; // take point0_xy

    while (text_remain_length > 3) {
        //console.log(text_pickup);
        text_result = extract_value(text_pickup);
        let text_first = text_result.charAt(0);

        //console.log(text_first);

        switch (text_first) {
            case "L":
                //console.log("go in extract line");
                extract_line(text_result);
                break;
            case "C":
                //console.log("go in extract curve");
                extract_curve(point0_xy, text_result);
                break;
            case "M":
                //console.log("go in extract move relative");
                extract_move_relative(point0_xy, text_result);
                break;
        }

        text_pickup = text_pickup.substring(text_result.length); // for next extract
        text_remain_length = text_pickup.length;
        //console.log("c'est lui non ?" + text_remain_length);
    }
}

function extract_line(text_path_value) {
    let text_result = '';
    let text1 = '';
    let pointx1 = '';
    let pointy1 = '';
    let pointx2 = '';
    let pointy2 = '';
    let x1 = 0;
    let x2 = 0;
    let y1 = 0;
    let y2 = 0;
    let pos1 = 0;

    text1 = text_path_value;
    pos1 = text1.indexOf('x1');
    text1 = text1.substring(pos1 + 3); // Prendre la chaîne après x1
    pos1 = text1.indexOf('y1');
    pointx1 = text1.substring(0, pos1 - 1); // Prendre la chaîne avant y1, c'est x1
    x1 = parseFloat(pointx1);
    
    pos1 = text1.indexOf('y1');
    text1 = text1.substring(pos1 + 3); // Prendre la chaîne après y1
    pos1 = text1.indexOf('x2');
    pointy1 = text1.substring(0, pos1 - 1); // Prendre la chaîne avant x2, c'est y1
    y1 = parseFloat(pointy1);
    
    pos1 = text1.indexOf('x2');
    text1 = text1.substring(pos1 + 3); // Prendre la chaîne après x2
    pos1 = text1.indexOf('y2');
    pointx2 = text1.substring(0, pos1 - 1); // Prendre la chaîne avant y2, c'est x2
    x2 = parseFloat(pointx2);
    
    pos1 = text1.indexOf('y2');
    text1 = text1.substring(pos1 + 3); // Prendre la chaîne après y2
    pos1 = text1.indexOf('/');
    pointy2 = text1.substring(0, pos1 - 1); // Prendre la chaîne avant /, c'est y2
    y2 = parseFloat(pointy2);
    
    //console.log('move_pen_abs(' + x1 + ',' + y1 + ');');
    x2 -= x1;
    y2 -= y1;
    
    //console.log('draw_line(0,0,' + x2 + ',' + y2 + ');');
}

function extract_curve(point0xy, text_all) {
    let text_remain = '';
    let text_temp = text_all;
    let text_result = '';
    let pos_space = 0;
    let pos_z = 0;
    let pos_next = 0;
    let pos_memo = 0;

    text_temp = text_temp.substring(1); // Supprimer le premier caractère "c"
    
    while (pos_space !== -1) {
        //console.log(text_temp);
        pos_space = text_temp.indexOf(' '); // Trouver le prochain espace
        pos_next = pos_space;
        
        if (pos_space === -1) {
            pos_z = text_temp.indexOf('z'); // Trouver la lettre z si pas d'espace (c'est à la fin du texte)
            pos_next = pos_z;
        }
        
        text_remain = text_temp.substring(pos_next); // Récupérer le reste du texte
        
        if (pos_next !== -1) {
            text_result = text_temp.substring(0, pos_next); // Extraire la partie jusqu'à l'espace ou z
        } else {
            text_result = text_temp; // Si c'est la fin du texte
        }
        
        switch (pos_memo) {
            case 0:
                //console.log('draw_curve(' + point0xy + ',' + text_result); // Imprimer la valeur
                break;
            case 1:
                //console.log(',' + text_result);
                break;
            case 2:
                //console.log(',' + text_result + ');');
                break;
        }
        
        pos_memo++;
        
        if (pos_memo === 3) {
            pos_memo = 0;
            point0xy = text_result;
        }
        
        text_temp = text_remain; // Sauvegarder le reste du texte pour la prochaine boucle
    }
}

function extract_move_relative(point0xy, text_all) {
    let text_remain = '';
    let text_temp = text_all;
    let text_result = '';
    let pos_space = 0;
    let pos_z = 0;
    let pos_next = 0;
    let pos_memo = 0;

    text_temp = text_temp.substring(1); // Supprimer le premier caractère "m"
    
    while (pos_space !== -1) {
        pos_space = text_temp.indexOf(' '); // Trouver le prochain espace
        pos_next = pos_space;
        
        if (pos_space === -1) {
            pos_z = text_temp.indexOf('z'); // Trouver la lettre z si pas d'espace (c'est à la fin du texte)
            pos_next = pos_z;
        }
        
        text_remain = text_temp.substring(pos_next); // Récupérer le reste du texte
        
        if (pos_next !== -1) {
            text_result = text_temp.substring(0, pos_next); // Extraire la partie jusqu'à l'espace ou z
        } else {
            text_result = text_temp; // Si c'est la fin du texte
        }
        
        switch (pos_memo) {
            case 0:
                //console.log('move_pen_rel(' + text_result); // Imprimer la valeur
                break;
            case 1:
                //console.log(',' + text_result + ');');
                break;
        }
        
        pos_memo++;
        
        if (pos_memo === 2) {
            pos_memo = 0;
            point0xy = text_result;
        }
        
        if (pos_z > 0) {
            //console.log('move_pen_rel(' + point0xy + ');');
        }

        text_temp = text_remain; // Sauvegarder le reste du texte pour la prochaine boucle
    }
}

function extract_move(text_all) {
    let pos1 = text_all.indexOf("d=");
    let text1 = text_all.substring(pos1 + 4); // take string after d="M

    pos1 = text1.indexOf("L");
    let pos2 = text1.indexOf("C");
    let pos3 = text1.indexOf("M");

    if (pos1 === -1) pos1 = 22000; // if no letter "l" -> no care
    if (pos2 === -1) pos2 = 22000; // if no letter "c" -> no care
    if (pos3 === -1) pos3 = 22000; // if no letter "m" -> no care

    let pos_latest = Math.min(pos1, pos2, pos3); // position of next letter

    let text2 = text1.substring(0, pos_latest); // string from M to next letter c or l
    let text_remain = text1.substring(pos_latest); // string from letter c or l to end

    //console.log(text2);

    document.getElementById("draw").innerHTML += "move_pen_abs(" + text2 + ");"; // move_pen_abs
    return text_remain
}

function extract_value(text_all) {
    let text1 = text_all.substring(1); // take string after one letter

    let pos1 = text1.indexOf("L");
    let pos2 = text1.indexOf("C");
    let pos3 = text1.indexOf("M");
    let pos4 = text1.indexOf("/") - 1;

    if (pos1 === -1) pos1 = 22000; // if no letter "l" -> no care
    if (pos2 === -1) pos2 = 22000; // if no letter "c" -> no care
    if (pos3 === -1) pos3 = 22000; // if no letter "m" -> no care
    if (pos4 === -1) pos4 = 22000; // if no letter "/" -> no care

    let pos_latest = Math.min(pos1, pos2, pos3, pos4); // position of next letter

    let text2 = text_all.substring(0, pos_latest); // string from begining text to next letter c or l
    let text_remain = text1.substring(pos_latest); // string from letter c or l to end

    return text2;
}

document.getElementById("done").addEventListener('click', function()
{
    // Define other extract functions similarly...

// Main function call
svg_to_arduino(svgTxt);

    if (svgTxt != "")
    {
        
    }
    else    
    {
        //console.log("nothing to slice");
    }
}
)