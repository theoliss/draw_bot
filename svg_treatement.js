var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var button_load = document.getElementById("load_svg");
var fileInput = document.getElementById("fileInput");

var sliders = document.getElementById("sliders");
var slider_X = document.getElementById("svg_pos_x");
var slider_Y = document.getElementById("svg_pos_y");
var slider_scale = document.getElementById("svg_scale");

var svgImage = new Image();

button_load.addEventListener("click", function()
{
    fileInput.click();
    fileInput.addEventListener('change', function() 
    {
        const file = fileInput.files[0];

        if (file) 
        {
            const reader = new FileReader();

            reader.onload = function(event) 
            {

                sliders.hidden = false;
                slider_X.min = 0;
                slider_X.max = X_b;
                slider_X.value = pen_X;
                slider_Y.min = 0;
                slider_Y.max = max_Y;
                slider_Y.value = pen_Y;
                slider_scale.min = 1;
                slider_scale.max = 200;
                slider_scale.value = 100;

                svgImage.src = event.target.result;

                svgImage.onload = function() 
                {
                    ctx.drawImage(svgImage, slider_X.value, slider_Y.value);
                };
            };

            reader.readAsDataURL(file);
            }
    });
});

slider_X.addEventListener("change", function()
{
    draw_canvas();
    ctx.drawImage(svgImage, slider_X.value, slider_Y.value, svgImage.width * slider_scale.value/100, svgImage.height * slider_scale.value/100);
})

slider_Y.addEventListener("change", function()
{
    draw_canvas();
    ctx.drawImage(svgImage, slider_X.value, slider_Y.value, svgImage.width * slider_scale.value/100, svgImage.height * slider_scale.value/100);
})

slider_scale.addEventListener("change", function()
{
    draw_canvas();
    ctx.drawImage(svgImage, slider_X.value, slider_Y.value, svgImage.width * slider_scale.value/100, svgImage.height * slider_scale.value/100);
})
