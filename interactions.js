var X_b;
var Y_b;
var max_Y;
var pen_X;
var pen_Y;
refresh_values();

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var text_box_X_b = document.getElementById('X_b');
var text_box_Y_b = document.getElementById('Y_b');
var text_box_Y_max = document.getElementById('Y_max');
var text_box_pen_X = document.getElementById('pen_X');
var text_box_pen_Y = document.getElementById('pen_Y');



function draw_canvas()
{
    let coef = window.screen.width/3000;
    console.log(coef);
    let X_b_draw = X_b * coef;
    let Y_b_draw = Y_b * coef;
    let max_Y_draw = max_Y * coef;
    let pen_X_draw = pen_X * coef;
    let pen_Y_draw = pen_Y * coef;
    let x_A_for_draw = 5;
    let y_A_for_draw = 5;


    canvas.setAttribute('width', X_b_draw+5);
    canvas.setAttribute('height', max_Y_draw);
    
    ctx.fillStyle = 'red';
    ctx.font = "12px serif";

    if(Y_b <= 0)
    {
        y_A_for_draw = 5 - Y_b;
        Y_b_draw = 5;
    }

    ctx.beginPath();
    ctx.arc(x_A_for_draw, y_A_for_draw, 5, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(X_b_draw, Y_b_draw, 5, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x_A_for_draw + pen_X_draw, y_A_for_draw + pen_Y_draw, 5, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.fillText("A", x_A_for_draw + 5, y_A_for_draw + 15);
    ctx.fillText("B", X_b_draw - 15, Y_b_draw + 15);
    ctx.fillText("PEN", x_A_for_draw + pen_X_draw + 10, y_A_for_draw + pen_Y_draw);

    
    ctx.strokeRect(5+400*coef, 5+400*coef, X_b_draw-800*coef, max_Y_draw-400*coef);
    ctx.fillStyle = 'black';
    ctx.fillText("Recommended Draw Area", 5+400*coef, 400*coef);
}

function refresh_values()
{
    X_b = document.getElementById('X_b').value;
    Y_b = document.getElementById('Y_b').value;
    max_Y = document.getElementById('Y_max').value;
    pen_X = document.getElementById('pen_X').value;
    pen_Y = document.getElementById('pen_Y').value;
}

text_box_X_b.addEventListener("change", function(){refresh_values();draw_canvas();});
text_box_Y_b.addEventListener("change", function(){refresh_values();draw_canvas();});
text_box_Y_max.addEventListener("change", function(){refresh_values();draw_canvas();});
text_box_pen_X.addEventListener("change", function(){refresh_values();draw_canvas();});
text_box_pen_Y.addEventListener("change", function(){refresh_values();draw_canvas();});

draw_canvas();