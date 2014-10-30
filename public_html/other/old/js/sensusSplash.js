/* 
 * Lazy Line Painter - Path Object 
 * Generated using 'SVG to Lazy Line Converter'
 * 
 * http://lazylinepainter.info 
 * Copyright 2013, Cam O'Connell  
 *  
 */ 
 
//var pathObj = {
//    "mask": {
//        "strokepath": [
//            {
//                "path": "M 164.56,373.12 L 215.572,373.129 241.075,328.957  215.572,284.777 164.56,284.777 139.061,328.957 z",
//                "duration": 600,
//                "strokeColor": "#ED3531" // red
//            },
//            {
//                "path": "M 110.142,373.12 L 84.635,328.957 110.142,284.777    161.147,284.777 186.653,328.957 161.147,373.129  z",
//                "duration": 600,
//                "strokeColor": "#1473B7" // blue
//            },
//            {
//                "path": "M 164.439,289.15 L 215.447,289.156 240.948,244.976 215.447,200.801 164.439,200.801 138.935,244.976   z",
//                "duration": 600,
//                "strokeColor": "#DC277E" // purple
//            },
//            {
//                "path": "M 110.021,289.15 L 84.515,244.976 110.021,200.801    161.028,200.801 186.53,244.976 161.028,289.156  z",
//                "duration": 600,
//                "strokeColor": "#2DA590" // green
//            },
//            {
//                "path": "M 125.179,349.14 L 87.506,283.891 125.179,218.634    200.532,218.634 238.21,283.891 200.532,349.149  z",
//                "duration": 600,
//                "strokeColor": "#D48A1D" // yellow
//            }
//        ],
//        "dimensions": {
//            "width": 320,
//            "height": 568
//        }
//    }
//}; 
// 
// 
///* 
// Setup and Paint your lazyline! 
// */ 
// 
//$(document).ready(function(){
//    console.log('Drawing the animation');
//    $('#mask').lazylinepainter({
//        "svgData": pathObj,
//        "strokeWidth": 1,
//        "delay": 500,
//        "onComplete": endOfSplash
//    }).lazylinepainter('paint');   
//});
 
 
 
 
// ------------------------------------------------------------------------------------------
// ------------------------------ Fade from splash screen  -------------------------------
// ------------------------------------------------------------------------------------------

$(document).on("pageshow","#splashPage",function(){
    setTimeout(function(){endOfSplash();}, 1500);
});

var endOfSplash = function()
{
    // In the redirect we check the local storage for the logged in status
    // If the value is returned 'Yes' the app redirects direct to #mapPage
        console.log('Decide which page to show:');
        if(window.localStorage.getItem('logged') === 'Yes')
        {
            console.log('localStorage logged value = Yes');
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "#mapPage", { transition: "flow" } );
        }
        else
        {
            console.log('No localStorage logged value');
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "#loginPage", { transition: "flow" } );
        }
};

