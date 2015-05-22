$(document).ready(function() {
  updateSvg(parseInt(qs["score"]));
  console.log(qs["score"]);
});


var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));


function updateSvg(point){
    $('#result .right .text_value span').text(point);

    $('.pie_progress').asPieProgress({
        namespace: 'pie_progress'
    });

    console.log('anim svg');

    // Example with grater loading time - loads longer
    $('.pie_progress--slow').asPieProgress({
        namespace: 'pie_progress',
        delay: 200,
        goal: 1000,
        min: 0,
        max: 1000,
        speed: 20,
        easing: 'linear'
    });

    // Example with grater loading time - loads longer
    // $('.pie_progress--countdown').asPieProgress({
    //     namespace: 'pie_progress',
    //     delay: 10000,
    //     easing: 'linear',
    //     first: 120,
    //     max: 120,
    //     goal: 0,
    //     speed: 1200, // 120 s * 1000 ms per s / 100
    //     numberCallback: function(n){
    //         var minutes = Math.floor(this.now/60);
    //         var seconds = this.now % 60;
    //         if(seconds < 10) {
    //             seconds = '0' + seconds;
    //         }
    //         return minutes + ': ' + seconds;
    //     }
    // });

    $('.pie_progress').asPieProgress('go', point+2+'%');
}
