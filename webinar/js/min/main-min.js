$(".men__btn-main--wh").click(function(e){e.preventDefault();var s=analytics.user().id();null!==s&&s.length>0?($(this).addClass("hidden"),$(".loading").addClass("visible-ib"),analytics.identify(""+s),console.log("identified"),analytics.track("Registered for webinar",{webinar_name:"Test"}),console.log("tracked"),setTimeout(function(){$(".loading").removeClass("visible-ib"),$(".overlay").addClass("overlay-is-visible"),$(".success").addClass("visible")},2e3)):($(this).addClass("hidden"),console.log("failed"),$(".loading").addClass("visible-ib"),setTimeout(function(){$(".loading").removeClass("visible-ib"),$(".overlay").addClass("overlay-is-visible"),$("body").addClass("ov-fixed"),$(".error").addClass("visible")},2e3))}),$(".closer").click(function(e){e.preventDefault(),$(".overlay").removeClass("overlay-is-visible"),$("body").removeClass("ov-fixed"),$(".error, .success").removeClass("visible"),$(".men__btn-main--wh").removeClass("hidden")}),$(document).mouseup(function(e){var s=$(".modal");s.is(e.target)||0!==s.has(e.target).length||($(".overlay").removeClass("overlay-is-visible"),$("body").removeClass("ov-fixed"),$(".error, .success").removeClass("visible"))});