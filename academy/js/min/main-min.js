$(document).ready(function(){var e=document.referrer,n="twitter";if(particlesJS.load("particles-js","/js/particles.json",function(){console.log("callback - particles.js config loaded")}),$("#ac__input-default").is(":visible")){var i=$("#ac__input-default");console.log("ok def")}else if($("#ac__input-mobile").is(":visible")){var i=$("#ac__input-mobile");console.log("ok mob")}e.indexOf(n)>-1&&($("#ac__input-default").attr("type","text"),$("#ac__input-default").attr("placeholder","Your Twitter handle without @")),$(".ac__input").focusout(function(){if(i.val().length>0){var l=$(".ac__form"),o=analytics.user().anonymousId();if(console.log(o),e.indexOf(n)>-1){if(console.log("twitter, get augur for twitter"),""!==i.val())var t=i.val();window.augurAPI="http://api.augur.io/v2/user?key=ikxxvks77804a1n8a37dn0pt088q00qf&twitter_handle="+t,$.getJSON(augurAPI).done(function(e){console.log("got twitter data"),console.log("begin identify 1"),analytics.identify(""+o,{twitter:t}),console.log("begin identify 2"),properties={email:null,name:null,gender:null,location:null,linkedin:null},void 0!==e.DEMOGRAPHICS.gender&&e.DEMOGRAPHICS.gender.length>0&&(properties.gender=e.DEMOGRAPHICS.gender.name[0].value),void 0!==e.PRIVATE.name&&e.PRIVATE.name.length>0&&(properties.name=e.PRIVATE.name[0].value),void 0!==e.PRIVATE.email&&e.PRIVATE.email.length>0&&(properties.email=e.PRIVATE.email[0].value),void 0!==e.GEOGRAPHICS.location&&e.GEOGRAPHICS.location.length>0&&(properties.location=e.GEOGRAPHICS.location[0].value),void 0!==e.PROFILES.linkedin_handle&&e.PROFILES.linkedin_handle.length>0&&(properties.linkedin=e.PROFILES.linkedin_handle[0].value),analytics.identify(""+t,properties),console.log("begin track"),analytics.track("Registered for academy"),console.log("end")}).fail(function(){console.log("failed to get json from augur API")})}else{if(console.log("no-ref, get augur for email"),""!==i.val())var a=i.val();window.augurAPI="http://api.augur.io/v2/user?key=ikxxvks77804a1n8a37dn0pt088q00qf&email="+a,$.getJSON(augurAPI).done(function(e){console.log("got mail data"),console.log("begin identify 1"),analytics.identify(""+o,{email:a}),console.log("begin identify 2"),properties={email:a,name:null,gender:null,location:null,twitter:null,linkedin:null},void 0!==e.DEMOGRAPHICS.gender&&e.DEMOGRAPHICS.gender.length>0&&(properties.gender=e.DEMOGRAPHICS.gender.name[0].value),void 0!==e.PRIVATE.name&&e.PRIVATE.name.length>0&&(properties.name=e.PRIVATE.name[0].value),void 0!==e.PROFILES.twitter_handle&&e.PROFILES.twitter_handle.length>0&&(properties.twitter=e.PROFILES.twitter_handle[0].value),void 0!==e.GEOGRAPHICS.location&&e.GEOGRAPHICS.location.length>0&&(properties.location=e.GEOGRAPHICS.location[0].value),void 0!==e.PROFILES.linkedin_handle&&e.PROFILES.linkedin_handle.length>0&&(properties.linkedin=e.PROFILES.linkedin_handle[0].value),analytics.identify(""+a,properties),console.log("begin track"),analytics.track("Registered for academy"),console.log("end")}).fail(function(){console.log("failed to get json from augur API")})}}})});