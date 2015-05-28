$(document).ready(function() {
    var score = parseInt(qs["score"]);
    console.log(score);
    updateSvg(score);
    textScore(score);
    var url = $('#share-twitter').attr("href");
    var url_modified = "https://twitter.com/share?url=http://get.mention.com/monitoring-grader&text=I got a score of " + score + " at the Mention Media Monitoring Grader! Test your skills too";
    url = url.replace('parse', url_modified);
    $('#share-twitter').attr('href', url)
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


function textScore(score){
    var  title = null;
    var  descr = null;
    var  link = "https://en.mention.com/features";

    console.log(title);

    switch (true) {
        case (score <= 25):
            title = "Don’t give up! ";
            descr = "You’re a monitoring newbie, but that just means you’re a candidate for “most improved!” Get ready to learn the ins and outs of monitoring an online presence for your business. <a href='"+ link +"'>Take a look around.</a>";
            break;
        case (score <= 50):
            title = "It’s a good start!";
            descr = "When it comes to your monitoring skills, you’ve laid the groundwork pretty well. This definitely isn’t your first rodeo. But you’ve still got a lot to learn, so I hope you’re excited to get started! <a href='"+ link +"'>Become an advanced monitor.</a>";
            break;
        case (score <= 75):
            title = "Not too shabby!";
            descr = "Okay, you’ve impressed us. You’re definitely no beginner student. In fact, your skills may give ours a run for our money. But remember, there’s always room for improvement. <a href='"+ link +"'>See what you’re missing.</a>";
            break;
        case (score <= 100):
            title = "You’re a true monitoring master!";
            descr = "What can’t you do? You are a true expert when it comes to monitoring for your business. At this point, it’s just a matter of ‘practice makes perfect’ for you. <a href='"+ link +"'>Keep on practicing.</a>";
            break;
    }

    console.log(title);

    $('h2#title-score').text(title);
    $('p.descr').html(descr);
}

$(window).load(function() {
    var score = parseInt(qs["score"]);
    var anoID = analytics.user().anonymousId();
    analytics.identify(''+ anoID +'');
    analytics.track('Completed Marketing Grader', { 
        marketing_grader_score: score
    });
});





