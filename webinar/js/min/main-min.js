var getUrlParameter=function e(a){var i=decodeURIComponent(window.location.search.substring(1)),s=i.split("&"),l,n;for(n=0;n<s.length;n++)if(l=s[n].split("="),l[0]===a)return void 0===l[1]?!0:l[1]},date_webinar=getUrlParameter("date"),plaindate=getUrlParameter("plaindate"),webinar_name=$("h1").text(),calendarLink="https://www.google.com/calendar/event?action=TEMPLATE&text="+webinar_name+"&dates="+date_webinar;$(document).ready(function(){plaindate.length&&$("#date").html(plaindate),date_webinar.length&&$("#calendar_link").attr("href",calendarLink)}),$(".men__btn-main--wh").click(function(e){e.preventDefault();var a=analytics.user().id();null!==a&&a.length>0?($(this).addClass("hidden"),$(".loading").addClass("visible-ib"),analytics.identify(""+a),console.log("identified"),analytics.track("Registered for webinar",{webinar_name:webinar_name,webinar_date:date_webinar}),console.log("tracked"),setTimeout(function(){$(".loading").removeClass("visible-ib"),$(".overlay").addClass("overlay-is-visible"),$(".success").addClass("visible")},2e3)):($(this).addClass("hidden"),console.log("failed"),$(".loading").addClass("visible-ib"),setTimeout(function(){$(".loading").removeClass("visible-ib"),$(".overlay").addClass("overlay-is-visible"),$("body").addClass("ov-fixed"),$(".error").addClass("visible")},2e3))}),$(".closer").click(function(e){e.preventDefault(),$(".overlay").removeClass("overlay-is-visible"),$("body").removeClass("ov-fixed"),$(".error, .success").removeClass("visible"),$(".men__btn-main--wh").removeClass("hidden")}),$(document).mouseup(function(e){var a=$(".modal");a.is(e.target)||0!==a.has(e.target).length||($(".overlay").removeClass("overlay-is-visible"),$("body").removeClass("ov-fixed"),$(".error, .success").removeClass("visible"))});