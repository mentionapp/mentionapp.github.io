function addDemoSelect(){if(/_/.test(segmentID)===!1){console.log("add demo select");var e=$("#form-webinar-demo");e.removeClass("hidden").addClass("visible"),e.attr("required","true")}}function checkDemoRequest(e){var a=$("#form-webinar-demo");a.hasClass("visible")&&"Yes"===a.val()&&pushDemoRequest(e)}function pushDemoRequest(e){$.ajax({url:"https://zapier.com/hooks/catch/3zt23g/",type:"POST",dataType:"json",data:e}).done(function(){console.log("sent to zapier"),analytics.track("Submitted demo request",{demo_request_source:"Webinar form",email:e.email}),console.log("demo tracked")}).fail(function(){console.log("error")})}function registerWebinar(e){$.ajax({url:"https://zapier.com/hooks/catch/39ijg9/",type:"POST",dataType:"json",data:e,success:function(){console.log("Success call");var e=moment.tz(webinar_date,"ddd, MMM Do, YYYY h:mm A",webinar_tz).format();analytics.track("Registered for webinar",{webinar_name:webinar_name,webinar_date:e}),console.log("tracked")},error:function(){console.log("Error call")}})}function authorParsing(){author_webinar&&author_webinar.length>0&&(console.log("has author"),/Vincent/.test(author_webinar)?($("#author_name--main").text("Vincent Le Hénaff"),$("#author_position--main").text("Business Developer"),$("#author_img--main").attr("src","https://avatars.slack-edge.com/2014-07-22/2478420834_192.jpg")):/Golia/.test(author_webinar)?($("#author_name--main").text("Matt Golia"),$("#author_position--main").text("Account Manager"),$("#author_img--main").attr("src","https://avatars.slack-edge.com/2015-05-15/4900888766_915d7be691f8ad89b4f7_192.jpg")):($("#author_name--main").text(author_webinar),$("#author_position--main").text(author_position_webinar),$("#author_img--main").attr("src",author_img_webinar))),guest_webinar&&guest_webinar.length>0&&(console.log("has guest"),$(".card--guest").removeClass("hidden"),$("#author_name--guest").text(guest_webinar),$("#author_position--guest").text(guest_position_webinar),$("#author_img--guest").attr("src",guest_img_webinar)),guest2_webinar&&guest2_webinar.length>0&&(console.log("has guest"),$(".card--guest2").removeClass("hidden"),$("#author_name--guest2").text(guest2_webinar),$("#author_position--guest2").text(guest2_position_webinar),$("#author_img--guest2").attr("src",guest2_img_webinar))}function parseWebinarInfo(){console.log("parsing");var e=jstz.determine().name(),a=moment.tz(webinar_date,"ddd, MMM Do, YYYY h:mm A",webinar_tz);console.log(a);var t=a.tz(e).format("dddd, MMMM Do - HH:mm"),o=moment.tz(e).format("z");$("h1").text(webinar_name),$(".metas-item span").text(t+" "+o),$(".men__btn-big--ye").text("Register to the webinar"),$(".learn p").html(webinar_description),authorParsing(),$(".men__btn-big--ye").css("background","#FC0")}function noWebinarUpcoming(){$("h1").text("No upcoming webinar. Stay tuned."),$(".metas-item span").text("No date available"),$(".men__btn-big--ye").prop("disabled",!0),$(".men__btn-big--ye").text("Button disabled")}var author_webinar="Matthieu Vaxelaire",author_position_webinar="CEO @ Mention",author_img_webinar="https://pbs.twimg.com/profile_images/3341057349/a011c23d421e9fe52d8eb0d6eb0cbf44.png",guest_webinar="Steli Efti",guest_position_webinar="CEO @ Close.io",guest_img_webinar="https://pbs.twimg.com/profile_images/599572599874551808/iE-hncdT.jpg",guest2_webinar="Rob Long",guest2_position_webinar="VP Growth @ Workable",guest2_img_webinar="https://pbs.twimg.com/profile_images/378800000137102878/de3a6ac1365442b01faac6e0a1e3bfa7.jpeg",webinar_name="Social Sales: Dos and Don'ts with Close.io and Workable",webinar_date="Thu, Dec 10, 2015 1:00 PM",webinar_tz="EST",webinar_description="A lot of people say social media can’t be used for sales.<br><br>Do you know how to prove them wrong?<br><br>We’ll be talking with Steli Efti (CEO at Close.io) and Rob Long (VP Growth at Workable) about how to generate leads with social, and what to avoid at all costs. Steli’s a social media skeptic, while Rob loves it, so you get to hear both sides of the argument.<br><br> Join our Q & A to learn social sales dos and don'ts and ask them your own questions!",webinar_key="5435968266388082946",title="Social Sales: Dos and Don'ts with Close.io and Workable",description="Join our CEO Matthieu Vaxelaire for a live Q&amp;A about social sales with Steli and Rob on Thursday, December 10th at 1 pm EST / 10 am PST.",webinar_img="https://mention.com/wp-content/uploads/2015/12/dos-donts-us-grey.png",isAnonymous,segmentID;analytics.ready(function(){segmentID=analytics.user().id(),null!==segmentID&&segmentID.length>0?(segmentID=analytics.user().id(),analytics.identify(segmentID,{}),isAnonymous=!1,addDemoSelect()):(segmentID=analytics.user().anonymousId(),analytics.identify(segmentID,{}),isAnonymous=!0,addDemoSelect())});var getUrlParameter=function(e){var a,t,o=decodeURIComponent(window.location.search.substring(1)),i=o.split("&");for(t=0;t<i.length;t++)if(a=i[t].split("="),a[0]===e)return void 0===a[1]?!0:a[1]};$(document).ready(function(){var e=getUrlParameter("firstName"),a=getUrlParameter("lastName"),t=getUrlParameter("email");$("#form-webinar-email").val(t),$("#form-webinar-first").val(e),$("#form-webinar-last").val(a)}),$("#form-webinar").submit(function(e){e.preventDefault();var a=$("#form-webinar-email").val(),t=$("#form-webinar-first").val(),o=$("#form-webinar-last").val(),i={email:a,firstName:t,lastName:o,webinar:webinar_key},n={email:a,firstName:t,lastName:o,webinar:webinar_name};$(".overlay").addClass("overlay-is-visible"),$(".success").addClass("visible"),webinar_key&&(registerWebinar(i),checkDemoRequest(n))});var upcomingWebinars;$(window).load(function(){console.log("loading..."),webinar_name?parseWebinarInfo():noWebinarUpcoming()}),$(".closer").click(function(e){e.preventDefault(),$(".overlay, body").removeClass("overlay-is-visible ov-fixed"),$(".error, .success").removeClass("visible"),$(".men__btn-main--wh").removeClass("hidden")}),$(document).mouseup(function(e){var a=$(".modal");a.is(e.target)||0!==a.has(e.target).length||($(".overlay").removeClass("overlay-is-visible"),$("body").removeClass("ov-fixed"),$(".error, .success").removeClass("visible"))});