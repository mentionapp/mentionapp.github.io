function addDemoSelect(){if(/_/.test(segmentID)===!1){console.log("add demo select");var e=$("#form-webinar-demo");e.removeClass("hidden").addClass("visible"),e.attr("required","true")}}function checkDemoRequest(e){var a=$("#form-webinar-demo");a.hasClass("visible")&&"Yes"===a.val()&&pushDemoRequest(e)}function pushDemoRequest(e){$.ajax({url:"https://zapier.com/hooks/catch/3zt23g/",type:"POST",dataType:"json",data:e}).done(function(){console.log("sent to zapier"),analytics.track("Submitted demo request",{demo_request_source:"Webinar form",email:e.email}),console.log("demo tracked")}).fail(function(){console.log("error")})}function registerWebinar(e){$.ajax({url:"https://zapier.com/hooks/catch/39ijg9/",type:"POST",dataType:"json",data:e,success:function(){console.log("Success call"),analytics.track("Registered for webinar",{webinar_name:webinar_name,webinar_date:webinar_date}),console.log("tracked")},error:function(){console.log("Error call")}})}function authorParsing(){author_webinar_inURL&&author_webinar_inURL.length>0&&(console.log("has author"),/Vincent/.test(author_webinar_inURL)?($("#author_name--main").text("Vincent Le Hénaff"),$("#author_position--main").text("Business Developer"),$("#author_img--main").attr("src","https://avatars.slack-edge.com/2014-07-22/2478420834_192.jpg")):/Matt/.test(author_webinar_inURL)?($("#author_name--main").text("Matt Golia"),$("#author_position--main").text("Account Manager"),$("#author_img--main").attr("src","https://avatars.slack-edge.com/2015-05-15/4900888766_915d7be691f8ad89b4f7_192.jpg")):($("#author_name--main").text(author_webinar_inURL),$("#author_position--main").text(author_position_webinar_inURL),$("#author_img--main").attr("src",author_img_webinar_inURL))),guest_webinar_inURL&&guest_webinar_inURL.length>0&&(console.log("has guest"),$(".card--guest").removeClass("hidden"),$("#author_name--guest").text(guest_webinar_inURL),$("#author_position--guest").text(guest_position_webinar_inURL),$("#author_img--guest").attr("src",guest_img_webinar_inURL))}function parseWebinarInfo(){console.log("parsing");var e=Intl.DateTimeFormat().resolvedOptions().timeZone,a=moment.tz(webinar_date,e),t=a.format("dddd, MMMM Do - HH:mm"),n=moment.tz(webinar_date,e).format("z");$("h1").text(webinar_name),$(".metas-item span").text(t+" "+n),$(".men__btn-big--ye").text("Register to the webinar"),$(".learn p").text(webinar_description),authorParsing(),$(".men__btn-big--ye").css("background","#FC0")}function noWebinarUpcoming(){$("h1").text("No upcoming webinar. Stay tuned."),$(".metas-item span").text("No date available"),$(".men__btn-big--ye").prop("disabled",!0),$(".men__btn-big--ye").text("Button disabled")}var isAnonymous,segmentID;analytics.ready(function(){segmentID=analytics.user().id(),null!==segmentID&&segmentID.length>0?(segmentID=analytics.user().id(),analytics.identify(segmentID,{}),isAnonymous=!1,addDemoSelect()):(segmentID=analytics.user().anonymousId(),analytics.identify(segmentID,{}),isAnonymous=!0,addDemoSelect())});var getUrlParameter=function e(a){var t=decodeURIComponent(window.location.search.substring(1)),n=t.split("&"),i,r;for(r=0;r<n.length;r++)if(i=n[r].split("="),i[0]===a)return void 0===i[1]?!0:i[1]},name_webinar_inURL=getUrlParameter("webinar_name"),author_webinar_inURL=getUrlParameter("author_name"),author_position_webinar_inURL=getUrlParameter("author_position"),author_img_webinar_inURL=getUrlParameter("author_img"),guest_webinar_inURL=getUrlParameter("guest_name"),guest_position_webinar_inURL=getUrlParameter("guest_position"),guest_img_webinar_inURL=getUrlParameter("guest_img"),webinar_name,webinar_date,webinar_timezone,webinar_description,webinar_key;$(document).ready(function(){var e=getUrlParameter("firstName"),a=getUrlParameter("lastName"),t=getUrlParameter("email");$("#form-webinar-email").val(t),$("#form-webinar-first").val(e),$("#form-webinar-last").val(a)}),$("#form-webinar").submit(function(e){e.preventDefault();var a=$("#form-webinar-email").val(),t=$("#form-webinar-first").val(),n=$("#form-webinar-last").val(),i={email:a,firstName:t,lastName:n,webinar:webinar_key},r={email:a,firstName:t,lastName:n,webinar:webinar_name};$(".overlay").addClass("overlay-is-visible"),$(".success").addClass("visible"),webinar_key&&(registerWebinar(i),checkDemoRequest(r))});var upcomingWebinars;$(window).load(function(){console.log("loading..."),$.ajax({url:"https://mention.com/wp-content/themes/mention/scripts/wp-webinars.php",type:"GET",success:function(e){console.log(e);var a;for(a=0;a<e.length;++a){var t=e[a].subject;if(e[a].subject===name_webinar_inURL){upcomingWebinars=e[a],console.log("matched"),webinar_name=t,webinar_date=e[a].times[0].startTime,webinar_timezone=e[a].timeZone,webinar_description=e[a].description,webinar_key=e[a].webinarKey,console.log(webinar_key),$(".men__btn-big--ye").prop("disabled",!1),parseWebinarInfo(),console.log("done"),console.log(upcomingWebinars);break}noWebinarUpcoming()}},error:function(){console.log("nope"),noWebinarUpcoming()}})}),$(".closer").click(function(e){e.preventDefault(),$(".overlay, body").removeClass("overlay-is-visible ov-fixed"),$(".error, .success").removeClass("visible"),$(".men__btn-main--wh").removeClass("hidden")}),$(document).mouseup(function(e){var a=$(".modal");a.is(e.target)||0!==a.has(e.target).length||($(".overlay").removeClass("overlay-is-visible"),$("body").removeClass("ov-fixed"),$(".error, .success").removeClass("visible"))});